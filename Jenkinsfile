pipeline {
  agent any
  environment {
    DOCKERHUB_USER = 'yourdockerhubusername'
  }
  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/yourusername/car-rental-app.git'
      }
    }
    stage('Build Docker Images') {
      steps {
        sh 'docker build -t $DOCKERHUB_USER/car-rental-backend -f docker/Dockerfile.backend .'
        sh 'docker build -t $DOCKERHUB_USER/car-rental-frontend -f docker/Dockerfile.frontend .'
      }
    }
    stage('Push to DockerHub') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
          sh 'docker push $DOCKERHUB_USER/car-rental-backend'
          sh 'docker push $DOCKERHUB_USER/car-rental-frontend'
        }
      }
    }
    stage('Deploy to K8s') {
      steps {
        sh 'kubectl apply -f k8s/namespace.yaml'
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
        sh 'kubectl apply -f k8s/ingress.yaml'
      }
    }
  }
}
