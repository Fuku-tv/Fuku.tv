import auth0, { UserData } from 'auth0';

const auth0Client = new auth0.AuthenticationClient({
  domain: 'fukutv-alpha.us.auth0.com',
});

export const validateUser = async (token: string): Promise<UserData> => {
  const parsedToken = token.replace('Bearer ', '');
  const user = await auth0Client.getProfile(parsedToken);
  return user;
};

export default validateUser;
