def buildImage(){
    sh "npm -v"
    sh "node -v"
    sh "docker -v"
    // sh "docker build -t localhost:5000/test:latest ."
    // sh "docker push localhost:5000/test:latest"
}

return this