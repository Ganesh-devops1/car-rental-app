pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ganeshdevops'                     // your DockerHub username
        APP_NAME = 'car-rental-app'                         // your app name
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "🔹 Checking out repository from GitHub (handled by Jenkins)..."
                // Jenkins automatically checks out code when Jenkinsfile is in GitHub
                checkout scm
            }
        }

        stage('Build Docker Images') {
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
                echo "🔹 Deploying to Kubernetes cluster..."
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
            echo "✅ Pipeline completed successfully — Application deployed!"
        }
        failure {
            echo "❌ Pipeline failed — please check the Jenkins console output for details."
        }
    }
}
