FROM node:16

EXPOSE 8080

WORKDIR /usr/src/app/
COPY . .

WORKDIR /usr/src/app/02_01_frontend_clientes
RUN npm install
RUN npm run build
RUN rm .gitignore package.json package-lock.json public src node_modules -rf

WORKDIR /usr/src/app/02_02_frontend_empleados
RUN npm install
RUN npm run build
RUN rm .gitignore package.json package-lock.json public src node_modules -rf


WORKDIR /usr/src/app/
RUN rm 04_documentation .gitignore README.md -rf

WORKDIR /usr/src/app/03_backend
RUN npm install --omit=dev
RUN rm SQL package-lock.json -rf


ENTRYPOINT [ "npm", "start" ]