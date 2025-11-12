pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'kganeshdev'              // your DockerHub username
    APP_NAME = 'car-rental-app'                // your project name
    GIT_REPO = 'https://github.com/kganeshdev/car-rental-app.git'  // your GitHub repo
  }

  stage('Clone Repository') {
  steps {
    echo "Cloning repository from GitHub..."
    git branch: 'main',
        credentialsId: 'github-creds',
        url: 'https://github.com/Ganesh-devops1/car-rental-app.git'
     }
   }

    stage('Build Docker Images') {
      steps {
        echo "Building Docker images for backend and frontend..."
        sh """
          docker build -t ${DOCKERHUB_USER}/${APP_NAME}-backend -f docker/Dockerfile.backend .
          docker build -t ${DOCKERHUB_USER}/${APP_NAME}-frontend -f docker/Dockerfile.frontend .
        """
      }
    }

    stage('Push Images to DockerHub') {
      steps {
        echo "Logging into DockerHub and pushing images..."
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
        echo "Deploying application to Kubernetes cluster..."
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
      echo "✅ Deployment completed successfully!"
    }
    failure {
      echo "❌ Deployment failed! Check the Jenkins console logs for more details."
    }
  }
}
