# Fuku.tv

[![Netlify Status](https://api.netlify.com/api/v1/badges/ea724180-2f3a-4617-b1a3-e92e40808302/deploy-status)](https://app.netlify.com/sites/inspiring-pike-fd13b4/deploys)

welcome to fuku.tv! 😊

## summary

this project consists of 2 apps in the /worksapces folder:

### client

contains the UI for the claw machine, connects to the wss server hosted on the server workspace.

### server

Contains the wss server that interfaces with the Raspberry PI, listens for requests from the client workspace.

## Commands (any cli)

### install NPM packages and build workspace projects

```bash
yarn
```

### run dev instance (should apply to both client and server)

```bash
yarn start
```

#### run client

```bash
yarn start:client
```

#### run Server (WIP)

```bash
yarn start:server
```

Let me know if you have any questions!
