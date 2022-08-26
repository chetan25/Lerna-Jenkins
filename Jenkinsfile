def shoulDeploy = false;
pipeline {
    agent any

    tools {nodejs "Node"}

    stages {
        stage("CLean checkout") {
            steps {
                script {
                    echo "checking out to main"
                    sh 'git branch -r'
                    sh 'git checkout main'
                    sh "git fetch --depth=1 origin +refs/tags/*:refs/tags/*"
                }
            }
        }
        stage('Create DraftPR') {
            when { branch 'main' }
            steps {
                script { 
                    try {
                        echo 'Checking Changes'
                        sh 'npm ci'
                        sh 'npm run custom:changed'
                    } catch(e) {
                        shoulDeploy = false
                        echo 'Message: ${e.message}'
                    }
                }
            }    
        }
        stage('Check changeset') {
            when {
                allOf {
                    branch 'main'
                    changeset 'packages/appA/**'
                }
            }
            steps {
                script {
                    echo 'Starting package A'
                }
            }
        }
        stage('Release and Publish') {
            when {
                allOf {
                    equals(actual: shoulDeploy, expected: true)
                    branch 'main'
                }
            }
            steps {
                script {
                    echo 'Starting release on changed packages'
                    sh 'npm run publish'
                }
            }
        }
    }
}
