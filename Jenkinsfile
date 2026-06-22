pipeline {
    agent any

    environment {
        // Secret: Discord webhook used by the post-build notifier.
        DISCORD_WEBHOOK = credentials('discord-pws-builds-channel-webhook')

        // Deployment identity / topology (non-secret, declared here for auditability).
        COMPOSE_PROJECT_NAME = 'jakeswestcoast'
        APP_CONTAINER        = 'jakeswestcoast'
        DEPLOY_NETWORK       = 'traefik'

        // Clean, pinned image used to run static checks in isolation.
        LINT_IMAGE = 'node:18-alpine'

        // Health/smoke probing (served internally on port 80, reached via the container).
        HEALTH_URL   = 'http://localhost:80/'
        SMOKE_MARKER = 'id="root"'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Preflight') {
            steps {
                sh '''
                    set -e
                    [ -n "$DISCORD_WEBHOOK" ] || { echo "ERROR: DISCORD_WEBHOOK credential is missing."; exit 1; }
                    docker network inspect "$DEPLOY_NETWORK" >/dev/null 2>&1 \
                        || { echo "ERROR: external network '$DEPLOY_NETWORK' does not exist."; exit 1; }
                    docker compose config -q \
                        || { echo "ERROR: docker-compose configuration is invalid."; exit 1; }
                '''
            }
        }

        stage('Lint & Type-check') {
            steps {
                // Run checks in a throwaway container so host state can't mask errors.
                sh '''
                    set -e
                    docker run --rm -v "$WORKSPACE:/app" -w /app "$LINT_IMAGE" \
                        sh -c "npm install --no-audit --no-fund && npx eslint src/" \
                        || { echo "ERROR: static checks failed."; exit 1; }
                '''
            }
        }

        stage('Teardown') {
            steps {
                sh '''
                    set -e
                    docker compose down --remove-orphans \
                        || { echo "ERROR: failed to tear down the previous deployment."; exit 1; }
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    set -e
                    docker compose up -d --build \
                        || { echo "ERROR: build and deploy failed."; exit 1; }
                '''
            }
        }

        stage('Health Check') {
            steps {
                // Poll until the container serves, failing fast if it exits or never becomes ready.
                sh '''
                    set -e
                    for i in $(seq 1 20); do
                        running=$(docker inspect -f '{{.State.Running}}' "$APP_CONTAINER" 2>/dev/null || echo "false")
                        [ "$running" = "true" ] || { echo "ERROR: container '$APP_CONTAINER' is not running."; exit 1; }
                        if docker exec "$APP_CONTAINER" wget -q -O /dev/null "$HEALTH_URL"; then
                            echo "App is live."
                            exit 0
                        fi
                        echo "Waiting for app to become ready ($i)..."
                        sleep 3
                    done
                    echo "ERROR: app did not become healthy in time."
                    exit 1
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    set -e
                    body=$(docker exec "$APP_CONTAINER" wget -q -O- "$HEALTH_URL") \
                        || { echo "ERROR: smoke request failed."; exit 1; }
                    echo "$body" | grep -q "$SMOKE_MARKER" \
                        || { echo "ERROR: smoke test did not find expected content ('$SMOKE_MARKER')."; exit 1; }
                    echo "Smoke test passed."
                '''
            }
        }
    }

    post {
        always {
            script {
                def result = currentBuild.currentResult
                def emoji = result == 'SUCCESS' ? ':green_circle:' : (result == 'FAILURE' ? ':red_circle:' : ':yellow_circle:')
                def branch = env.GIT_BRANCH ?: env.BRANCH_NAME ?: 'Main/Manual'
                def duration = currentBuild.durationString.replace(' and no weeks', '').replace(' and counting', '')

                def commitLines = []
                for (changeSet in currentBuild.changeSets) {
                    for (commit in changeSet.items) {
                        commitLines.add("> ${commit.msg} (by *${commit.author.fullName}*)")
                    }
                }
                def commits = commitLines ? commitLines.join('\n') : 'No recent changes detected.'

                def discordDescription = """**Status:** ${emoji} ${result}
**Branch:** `${branch}`
**Duration:** :stopwatch: ${duration}

**Commits:**
${commits}"""

                discordSend(
                    webhookURL: env.DISCORD_WEBHOOK,
                    title: "📦 Build Alert: ${env.JOB_NAME} [Build #${env.BUILD_NUMBER}]",
                    link: "${env.BUILD_URL}",
                    result: "${currentBuild.currentResult}",
                    description: discordDescription
                )
            }
        }
        failure {
            sh '''
                echo "===== docker compose ps ====="
                docker compose ps || true
                echo "===== recent logs ====="
                docker compose logs --no-color --tail=200 || true
            '''
        }
    }
}
