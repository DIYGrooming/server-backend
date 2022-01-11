import jwt from 'jsonwebtoken';

const secret = 'test';

// Middleware will make sure all User required actions actually have Users.
const auth = async (req, res, next) => {
  // We check if the user's token is valid.
  try {
    // Grabbing the token from req.body
    const isThereToken = req.headers.authorization;
    if (!isThereToken) {
      console.log('No User Token');
    }

    const token = req.headers.authorization.split(' ')[1];
    const ourAuth = token.length < 500;

    let decodedData;

    // Working with User's Token
    if (token && ourAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      // Working with GoogleAuth's Token if we decide to use Google Auth.
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    // Auth middleware gives permission
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
