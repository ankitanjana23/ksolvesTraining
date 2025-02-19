# select base image ubuntu , install nodejs 
FROM ubuntu  

Run apt-get update

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.js index.js

Run npm install 

ENTRYPOINT [ "node", "index.js" ]

# convert into image write command 
# docker build -t simple-node .         || (dot - filepath)
# pull ubuntu and build image it will take same time 
# know how to run this docker file or start
# docker run -it simple-node   start also give port mining & enviorment variable 
