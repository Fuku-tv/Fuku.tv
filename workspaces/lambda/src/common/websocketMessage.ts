import * as AWS from 'aws-sdk';

export const sendMessage = (
  domainName: string,
  stage: string,
  connectionId: string,
  message: unknown
): Promise<{
  $response: AWS.Response<unknown, AWS.AWSError>;
}> => {
  const ws = create(domainName, stage);

  const postParams = {
    Data: message,
    ConnectionId: connectionId,
  };

  return ws.postToConnection(postParams).promise();
};

const create = (domainName: string, stage: string) => {
  // IS_OFFLINE variable set by serverless-offline
  const endpoint = process.env.IS_OFFLINE ? 'http://localhost:3001' : `${domainName}/${stage}`;
  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint,
  });
};

export default {};
