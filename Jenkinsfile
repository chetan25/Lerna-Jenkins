pipeline {
    agent any

    tools {nodejs "Node"}

    stages {
        stage('Create DraftPR') {
            steps {
                script { 
                    echo "checking out to main"
                    sh "git checkout main"
                    sh "git fetch --depth=1 origin +refs/tags/*:refs/tags/*"
                    echo 'Checking Changes'
                    sh 'npm ci'
                    sh 'npm run custom:changed'
                }
            }    
        }
    }
}
