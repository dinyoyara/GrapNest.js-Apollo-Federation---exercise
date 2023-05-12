import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    //Validate jwt
    return { user: { id: 6 } }; // return dummy user
  }
  throw new UnauthorizedException();
};
