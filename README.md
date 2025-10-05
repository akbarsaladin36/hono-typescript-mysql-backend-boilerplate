<h1 align="center">REST API Backend Boilerplate with Bun, Hono, and Typescript</h1>

This API is created by me to make backend job more easier. With this boilerplate, you can free to use, change, and add any request that you need for your backend website. This API use Hono as Bun framework, Typescript, and MySQL as store database.

## Built With

[![Bun](https://img.shields.io/badge/Bun-1.2.x-white.svg?style=rounded-square)](https://bun.com/)
[![Hono](https://img.shields.io/badge/Hono-4.9.x-orange.svg?style=rounded-square)](https://hono.dev/)
[![Typescript](https://img.shields.io/badge/Typescript.5.x-blue.svg?style=rounded-square)](https://www.typescriptlang.org/)


## Requirements

1. Bun
2. Node_modules
3. Hono
3. Typescript
4. Postman
5. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `bun install` for install dependencies
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/14780095/2sB3QGus6S)
9. Type `bun start` to activated the server.

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
APP_PORT = <YOUR SERVER PORT>
DB_HOST= <YOUR DATABASE HOST>
DB_USER= <YOUR DATABASE USERNAME>
DB_PASSWORD= <YOUR DATABASE PASSWORD>
DB_DATABASE= <YOUR DATABASE NAME>
JWT_SECRET_KEY = <YOUR JWT SECRET KEY>
JWT_EXPIRED_TIME = <YOUR JWT EXPIRE TIME>
```

## Feature

1. Login and Register API
2. Protected CRUD Users API

## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)

