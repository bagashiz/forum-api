# Description

This is my submission for Dicoding's [Menjadi Back-End Developer Expert](https://www.dicoding.com/academies/276) course. It is built with [Hapi.js](https://hapi.dev/) web framework for Node.js and [PostgreSQL](https://www.postgresql.org/) database.

## Dependencies

- [Node.js](https://nodejs.org/en/) v18.19.0
- [NPM](https://www.npmjs.com/) v9.8.1
- [Hapi.js](https://hapi.dev/) v20.1.5
- [Hapi JWT](https://www.npmjs.com/package/@hapi/jwt) v3.2.0
- [Hapi Inert](https://www.npmjs.com/package/@hapi/inert) v6.0.3
- [Joi](https://www.npmjs.com/package/joi) v17.9.2
- [Pg](https://www.npmjs.com/package/pg) v8.11.1
- [Node-Pg-Migrate](https://www.npmjs.com/package/node-pg-migrate) v6.2.2
- [Bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.0
- [Nano ID](https://www.npmjs.com/package/nanoid) v3.3.6
- [Dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [EsLint](https://eslint.org/) v8.33.0
- [Nodemon](https://nodemon.io/) v3.0.1

## How to run

1. Clone this repository
2. You can use [devcontainer](https://code.visualstudio.com/docs/remote/containers) to run this project in a containerized environment, or you can install all dependencies manually and run postgres database only using `docker compose up -d postgres`
3. Run `npm install` to install all dependencies
4. Run `npm run migrate up` to create the database and tables
5. Run `npm run start:dev` to start the server

## Learning and Reference Sources

- [Belajar Membuat Aplikasi Back-End untuk Pemula](https://www.dicoding.com/academies/261) by [Dicoding](https://www.dicoding.com)
- [Belajar Fundamental Aplikasi Back-End](https://www.dicoding.com/academies/271) by [Dicoding](https://www.dicoding.com)
- [Menjadi Back-End Developer Expert](https://www.dicoding.com/academies/276) by [Dicoding](https://www.dicoding.com)
