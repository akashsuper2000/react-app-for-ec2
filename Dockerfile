FROM node:10.15-alpine

WORKDIR /app

COPY . /app

WORKDIR /app

RUN npm install yarn -g

RUN npm install nodemon -g

RUN yarn

RUN yarn global add create-react-app

RUN cd app-for-ec2/

RUN yarn

RUN cd ..

EXPOSE 3000 5000

CMD ["yarn", "start"]