FROM node:10.16.3

ENV HOME=/home/app

WORKDIR $HOME/wraporg

COPY package*.json ./

RUN npm install --silent --progress=false

COPY . .

EXPOSE 3000

CMD ["npm", "run", "production"]