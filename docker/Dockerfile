# Используем образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY ../package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из родительского каталога
COPY ../ ./

# Указываем команду для запуска приложения
CMD ["node", "server.js"]

# Открываем порт 3000
EXPOSE 5000
