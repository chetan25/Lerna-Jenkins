pipeline {
    agent any

    tools {nodejs "Node"}

    stages {
        stage('Create DraftPR') {
            steps {
                script { 
                    echo "checking out to main"
                    sh "git checkout main"
                    echo 'Checking Changes'
                    sh 'npm ci'
                    sh 'npm run custom:changed'
                }
            }    
        }
    }
}
