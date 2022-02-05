# Boilerplate for express + React apps

## Installation

Clone repository, then:
```
make install
```

After installation `.env.example` is automatically copied to `.env`.

## Development
To run dev environment:
```
make dev
```
It runs backend and frontend in parralel. After run, chrome tab should open automatically. If not, go to http://localhost:3000.

## Build
Simply run:
```
make build
```

This command:
- run lint and tests for both frontent and backend
- clean all build dirs
- build backend and frontend
- moves `backend/build/` to root dir `build/`
- moves `frontend/build/` to `build/public/`
- moves `package.json` to `build/` dir and install dependencies
- copy `.env.example` to `build/.env`

## Additional commands:
- `make clean` - removes `build/` directories (in root, backend and frontend directories)
- `make clean_all` - removes build (as above) plus all `node_modules/`
- `make test` - run tests (frontent and backend)
- `make lint` - run eslint against frontent and backend
