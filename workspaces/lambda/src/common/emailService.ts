import * as AWS from 'aws-sdk';

const ses = new AWS.SESV2({
  region: 'us-east-1',
});
const charset = 'UTF-8';

export const sendEmail = async (sender: string, recipient: string, subject = 'NULL SUBJECT', body = 'NULL_BODY'): Promise<void> => {
  // Specify the parameters to pass to the API.
  const params: AWS.SESV2.SendEmailRequest = {
    FromEmailAddress: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Content: {
      Simple: {
        Subject: {
          Data: subject,
          Charset: charset,
        },
        Body: {
          Text: {
            Data: body,
            Charset: charset,
          },
          Html: {
            Data: body,
            Charset: charset,
          },
        },
      },
    },
  };

  try {
    const test = await ses.sendEmail(params).promise();
    console.log('Email Response: ', test);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
