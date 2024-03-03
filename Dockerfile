FROM node:latest
ADD ./ /projet-stage-licence-sig-backend
WORKDIR /projet-stage-licence-sig-backend
ENV DB_HOST="" DB_NAME="" DB_PORT="" DB_USER="" DB_PASSWORD=""
EXPOSE 3001
CMD [ "npm", "start" ]