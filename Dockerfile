FROM node:latest
ADD ./ /projet-stage-licence-sig-backend
WORKDIR /projet-stage-licence-sig-backend
EXPOSE 3001
CMD [ "npm", "start" ]