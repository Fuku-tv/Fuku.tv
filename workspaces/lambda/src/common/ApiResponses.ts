import { APIGatewayProxyResult } from 'aws-lambda';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
};

export const ok = (data = {}): APIGatewayProxyResult => {
  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const badRequest = (data = {}): APIGatewayProxyResult => {
  return {
    headers,
    statusCode: 400,
    body: JSON.stringify(data),
  };
};

export const unauthorized = (): APIGatewayProxyResult => {
  return {
    headers,
    statusCode: 401,
    body: 'unauthorized',
  };
};

export const serverError = (data = {}): APIGatewayProxyResult => {
  return {
    headers,
    statusCode: 500,
    body: JSON.stringify(data),
  };
};
