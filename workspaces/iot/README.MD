# Outline

## Directories

### src/

Temporaily moved all code here to make PI build process easier.

## Commands

Run in the workspaces/server directory

### run dev server using node (src/controllerServer.js)

```bash
yarn start
```

### build typescript using tsc (src/\*)

```bash
yarn build
```

### run dev server using ts-node (src/\*)

```bash
yarn build:ts-node
```

### serve file compiled from tsc build (dist/index.js)

```bash
yarn serve
```
