# Use a imagem oficial do Node.js como base
FROM node:18

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

#Copiando apenas o package.json e yarn.lock primeiro
COPY package.json yarn.lock ./

#Instalando dependênciass
RUN yarn install

#Copiando o resto do código
COPY . .

#Construindo o projeto
RUN yarn build


#Mudando o diretório de trabalho para o diretório de distribuição
WORKDIR /app/dist

#Expondo a porta
EXPOSE 3000

#Comando para rodar o aplicativo
CMD ["yarn", "start"]
