pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/Ganesh-devops1/car-rental-app.git'
        GIT_BRANCH = 'main'
        DOCKERHUB_USER = 'ganeshdevops'
        APP_NAME = 'car-rental-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "🔹 Cloning the repository from GitHub..."
                git branch: "${GIT_BRANCH}", credentialsId: 'github-creds', url: "${GIT_REPO}"
            }
        }

        stage('Build Backend & Frontend Docker Images') {
            steps {
                echo "🔹 Building Docker images for backend and frontend..."
                sh """
                    docker build -t ${DOCKERHUB_USER}/${APP_NAME}-backend -f docker/Dockerfile.backend .
                    docker build -t ${DOCKERHUB_USER}/${APP_NAME}-frontend -f docker/Dockerfile.frontend .
                """
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                echo "🔹 Logging into DockerHub and pushing images..."
                withCredentials([string(credentialsId: 'dockerhub-cred', variable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u ${DOCKERHUB_USER} --password-stdin
                        docker push ${DOCKERHUB_USER}/${APP_NAME}-backend
                        docker push ${DOCKERHUB_USER}/${APP_NAME}-frontend
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "🔹 Deploying application to Kubernetes cluster..."
                sh """
                    kubectl apply -f k8s/namespace.yaml
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl apply -f k8s/ingress.yaml
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully — App deployed to Kubernetes!"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins logs for details."
        }
    }
}
