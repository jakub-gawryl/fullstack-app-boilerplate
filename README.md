# Boilerplate for express + React apps

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
- By default, the build process will get all the keys from the file `.env.example` (with no value) and copy them to `build/.env`. To pass the variables required to run your application in production, you can create a `.env.production` file in the root directory, which will then be copied to `build/.env `.
- Production serverdefault port is `5000`

To build application, siply run:

```
make build
```

it creates backend server with `api/` support and 

What this command do:
- run lint and tests for both frontent and backend
- clean all build dirs
- build backend and frontend
- moves `backend/build/` to root `build/`
- moves `frontend/build/` to `build/public/`
- moves `package.json` to `build/` dir and install dependencies
- copy `.env.example` to `build/.env`

## Additional commands:
- `make clean` - removes `build/` directories (in root, backend and frontend directories)
- `make clean_all` - removes build (as above) plus all `node_modules/`
- `make test` - run tests (frontent and backend)
- `make lint` - run eslint against frontent and backend

## Used technology

### Frontend

TypeScript / Jest / ESLint

- [React](https://reactjs.org/) ([documentation](https://reactjs.org/docs/getting-started.html)) - Created by `yarn create react-app`. Also "proxy" key with `http://localhost:5000` (for local dev purposes)) is set in package.json.

### Backend

TypeScript / Jest / ESLint

- [Expressjs](https://expressjs.com/) ([documentation](https://expressjs.com/en/4x/api.html)) - Http server for deliver frontent application at `/` route, and for `/api` requests