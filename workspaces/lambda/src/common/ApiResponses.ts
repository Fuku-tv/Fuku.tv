import { APIGatewayProxyResult } from 'aws-lambda';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
};

export const ok = (data = {}): APIGatewayProxyResult => ({
  headers,
  statusCode: 200,
  body: JSON.stringify(data),
});

export const badRequest = (data = {}): APIGatewayProxyResult => ({
  headers,
  statusCode: 400,
  body: JSON.stringify(data),
});

export const unauthorized = (): APIGatewayProxyResult => ({
  headers,
  statusCode: 401,
  body: 'unauthorized',
});

export const serverError = (data = {}): APIGatewayProxyResult => ({
  headers,
  statusCode: 500,
  body: JSON.stringify(data),
});
