pipeline {
    agent any

    tools {nodejs "Node"}

    stages {
        stage('Create DraftPR') {
            steps {
                script { 
                    echo 'Checking Changes'
                    sh 'npm ci'
                    sh 'npm run custom:changed'
                }
            }    
        }
    }
}
