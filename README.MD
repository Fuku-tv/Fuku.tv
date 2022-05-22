# Fuku.tv

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

### clear cache (excluding node_modules)

```sh
yarn clean
```

### clear cache (everything)

```sh
yarn clean:deep
```

### kill running node processes

```sh
yarn kill
```

## file descriptors (root)

- .editorconfig - ensures vscode files are saved with 'LF' versus windows 'CRLF'
- .eslintrc - linting rules for repo
- .gitignore - ignores generated files from git tracking
- lintstagedrc.mjs - lint-staged command list per file (triggered by pre-commit hook)
- .prettierrc - config file for format on save extension
- package.json - list of node dependencies
- sst.json - serverless-stack config file, specifies main stack location and default region (us-east-1)
- tsconfig.json - config file for typescript language
- turbo.json - handles monorepo command behavior
- yarn.lock - tells Seed.run to use yarn to install node packages before deploying app to S3 (DO NOT TOUCH)

## folder descriptors

- .husky - container for git hooks (just runs lint-staged on staged files before git commit)
- .github - container for github issue template and workflow file (used only for testing, not needed to deploy)
- .sst - auto-generated from serverless-stack, safe to remove
- .vscode - contains settings.json for vscode, prevents "CRLF" line endings when making a new file
- packages - workspace items for forked packages ('h264-live-encoder' and 'node-agcod')
- stacks - serverless-stack schema code for deploying our static website and serverless stacks.
- tools - reusable config files for typescript, jest, eslint and ts-node compiler
- workspaces - workspace items for the full-stack fuku
  - client - react.js frontend
  - iot - raspberry PI code (maintained by Jason outside deploys)
  - lambda - serverless resources suck as AWS lambdas, API gateways and Dynamodb
  - server - node.js websocket server, serves connections to web clients and connects to Raspberry Pi's controller and camera
  - shared - library of reusable javascript code
- stacks - schema for AWS Cloudformation stack for app

Let me know if you have any questions!
