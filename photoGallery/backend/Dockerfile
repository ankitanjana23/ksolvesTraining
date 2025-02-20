
FROM node:18

WORKDIR /backend

COPY package*.json ./

# copy all 
COPY . . 

RUN npm install 

EXPOSE 3001

CMD ["node" , "index.js"]