# Boilerplate for express + React apps

Basic boilerplate that uses expressjs for serving React front-end application. It uses GraphQL for client-server communication.

## Installation

Clone repository, then:
```
make install
```

After installation `.env.example` is automatically copied to `.env`. During development, please use only `.env` file.

## Development
To run dev environment:
```
make dev
```

It runs backend server at http://localhost:5000 and frontend react's default live server at http://localhost:3000.

## Build

**NOTES**: 
- Before build, make sure all variables passed to `.env.production` file in the root directory are correct. This file will be copied to `build/.env `.
- To prevent creating `build/.env` file, remove `.env.production` file from root directory before build
- Production server default port is `5000`

To build application, run:

```
make build
```

What this command do:
- run lint and tests for both frontend and backend
- clean all build dirs
- build backend and frontend
- moves `backend/build/` to root `build/`
- moves `frontend/build/` to `build/public/`
- moves `package.json` to `build/` dir and install dependencies
- copy `.env.production` (if present) to `build/.env`

## Additional commands:

To see full list of available commands, run:

```
make help
```

## Used technology

### Common

- [GraphQL](https://graphql.org/) ([documentation](https://graphql.org/code/#javascript)) - query language for APIs

### Frontend

- [React](https://reactjs.org/) ([documentation](https://reactjs.org/docs/getting-started.html)) - Created by `yarn create react-app`. Also "proxy" key with `http://localhost:5000` (for local dev purposes)) is set in package.json.

### Backend

- [Expressjs](https://expressjs.com/) ([documentation](https://expressjs.com/en/4x/api.html)) - http server for deliver frontend application at `/` route, and for `/api` requests

### Development support

- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [Jest](https://jestjs.io/) - Testing framework
- [ESLint](https://eslint.org/) - JavaScrip linter