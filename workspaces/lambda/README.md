# Fuku.tv-lambda

This is the code for fuku.tv-lambda. There are three functions contained within the directories and a SAM template that wires them up to a DynamoDB table and provides the minimal set of permissions needed to run the app:

```text
.
├── README.md                   <-- This instructions file
├── tsconfig.json               <-- typscript config for AWS Lambda
├── src/common                  <-- Util functions for websocket responses
├── src/websockets              <-- websocket routes/Lambda functions
└── serverless.yml              <-- SAM template for Lambda Functions and DDB
```

## AWS CLI commands

Runs the API Gateway/lambda functions locally

```bash
yarn dev
```

If you prefer, you can install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) and use it to package, deploy, and describe your application. These are the commands you'll need to use:

```bash
yarn deploy
```

**Note:** `.gitignore` contains the `samconfig.toml`, hence make sure backup this file, or modify your .gitignore locally.

## Testing the websocket API Locally

To test the WebSocket API, you can use [wscat](https://github.com/websockets/wscat), an open-source command line tool.

1. On the console, connect to your published API endpoint by executing the following command:

```bash
yarn wscat -c ws://localhost:{PORT}
```

1. or to connect to the deployed gateway

```bash
yarn wscat -c wss://{YOUR-API-ID}.execute-api.{YOUR-REGION}.amazonaws.com/{STAGE}
```

1. To test the lambda function, send a JSON message to the desired endpoint. The gateway routes your request via the request.body.action property. The Lambda function sends it back using the callback URL:

```bash
$ wscat -c wss://{YOUR-API-ID}.execute-api.{YOUR-REGION}.amazonaws.com/prod
connected (press CTRL+C to quit)
> {"action":"enterQueue"}
< {RESPONSE}
```

```bash
$ wscat -c wss://{YOUR-API-ID}.execute-api.{YOUR-REGION}.amazonaws.com/prod
connected (press CTRL+C to quit)
> {"action":"startGame"}
< {RESPONSE}
```
