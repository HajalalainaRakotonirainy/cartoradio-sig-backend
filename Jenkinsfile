def gv

pipeline{
    agent any
    tools{
        nodejs "NodeJS"
    }
    stages{
        stage("init"){
            steps{
                script {
                    gv = load("script.groovy")
                }
            }
            post{
                always{
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++init executed successfully++++===="
                }
                failure{
                    echo "====++++init execution failed++++===="
                }
            }
        }
        stage("Build image"){
            steps{
                script{
                    gv.buildImage()
                }
            }
            post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========Build executed successfully========"
                }
                failure{
                    echo "========Build execution failed========"
                }
            }
        }
        stage("A"){
            steps{
                echo "====++++executing A++++===="
            }
            post{
                always{
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++A executed successfully++++===="
                }
                failure{
                    echo "====++++A execution failed++++===="
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}