pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "angelocapone/my-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        IP_SERVER = "192.168.4.61"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/angcapstep1980/new-web-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                    @echo off
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    '''
                }
            }
        }
        
        stage('Push Image') {
            steps {
                bat "docker push %DOCKER_IMAGE%:%DOCKER_TAG%"
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'server-creds',
                    usernameVariable: 'SSH_USER',
                    passwordVariable: 'SSH_PASS'
                )]) {
                    bat """
                    plink -ssh %SSH_USER%@%IP_SERVER% -pw %SSH_PASS% ^
                    "docker pull %DOCKER_IMAGE%:%DOCKER_TAG% && ^
                     docker stop myapp || true && ^
                     docker rm myapp || true && ^
                     docker run -d -p 80:3000 --name myapp %DOCKER_IMAGE%:%DOCKER_TAG%"
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deploy completato con successo'
        }
        failure {
            echo 'Pipeline fallita'
        }
        always {
            echo 'Pulizia workspace...'
            deleteDir()
        }        
    }
}