# Broc en ligne
> Broc en ligne is P2B for individuals who wish to sell in fla market and at home with reservation.

## Steps to run this project :

1. Run `npm i` or `npm install` command for install packages to run the project work correctly.
2. Setup database settings inside `data-source.ts` file.
3. Run `npm start` command.

## Steps to run this project with Docker :
1. Run `docker compose up -d` command for init datasource.
2. Run `docker exec -it mysl bash` command for launch container.
3. Run `mysql -u user -p` then `paris` command for connect our user *ROOT* and have access to our database.
4. Run `USE db_test` command for use databse.

## Technologies :
- **Node.js**
- **Typescript**
- **TypeOrm** *ORM*: https://www.npmjs.com/package/typeorm
- **Routing-controllers** *for create class controller*: https://github.com/typestack/routing-controllers
- **Multer** *for uploading files*: https://www.npmjs.com/package/multer

## Dependencies :

```Json
"devDependencies": {
      "@types/body-parser": "^1.19.2",
      "@types/express": "^4.17.1",
      "@types/node": "^16.11.10",
      "body-parser": "^1.20.1",
      "concurrently": "^7.6.0",
      "eslint": "^8.31.0",
      "nodemon": "^2.0.20",
      "ts-node": "10.7.0",
      "typescript": "4.5.2"
},
"dependencies": {
      "@types/bcrypt": "^5.0.0",
      "@types/cors": "^2.8.13",
      "@types/jsonwebtoken": "^9.0.0",
      "bcrypt": "^5.1.0",
      "cors": "^2.8.5",
      "dotenv": "^16.0.3",
      "express": "^4.17.1",
      "jsonwebtoken": "^9.0.0",
      "path": "^0.12.7",
      "pg": "^8.4.0",
      "reflect-metadata": "^0.1.13",
      "routing-controllers": "^0.10.0",
      "sequelize": "^6.28.0",
      "ts-node": "^10.9.1",
      "typeorm": "0.3.11"
}
```
