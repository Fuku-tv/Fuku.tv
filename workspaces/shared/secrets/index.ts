// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
import AWS from 'aws-sdk';

export interface Secrets {
  STRIPE_API_KEY: string;
  STRIPE_API_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  AMAZON_GIFTCARD_KEY: string;
  AMAZON_GIFTCARD_SECRET: string;
}

const region = 'us-east-1';
const SECRET_NAME = 'Fuku.tv-Production-Secrets';

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
  region,
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

export const getSecrets = async (): Promise<Secrets> => {
  const getValue = client.getSecretValue({ SecretId: SECRET_NAME }, (err) => {
    switch (err?.code) {
      case 'DecryptionFailureException':
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      case 'InternalServiceErrorException':
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      case 'InvalidParameterException':
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;

      case 'InvalidRequestException':
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;

      case 'ResourceNotFoundException':
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      default:
        break;
    }
  });

  return JSON.parse((await getValue.promise()).SecretString);
};

export default getSecrets;
