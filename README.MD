# Fuku.tv

[![Netlify Status](https://api.netlify.com/api/v1/badges/fedd9d52-a656-4216-8041-2cee0ae035e0/deploy-status)](https://app.netlify.com/sites/trusting-allen-033a44/deploys)

![AWS Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiN3RPYzUwY2g3SmdTS3cweGY3dG5wbkJkTGd3bDNPelhLd3BkSzFjYlhKM2xNQ0dzMEVQUXZUaFVuYUp3azBVOVQ3dm13bkxTZzZld2hkcjd2MDVTTmcwPSIsIml2UGFyYW1ldGVyU3BlYyI6IlNrYTRJMmV6eW8ra1BzV0giLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main)

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
yarn dev
```

#### run client

```bash
yarn start:client
```

#### run Server

```bash
yarn start:server
```

Let me know if you have any questions!
