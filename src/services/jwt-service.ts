type JwtType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1])) as JwtType;
  } catch (e) {
    console.error('parseJwt Error: ', e);
    return null;
  }
}

export function verboseJwt(token: string) {
  const jwt = parseJwt(token);

  return (
    jwt && {
      id: jwt.sub,
      first_name: jwt.given_name,
      last_name: jwt.family_name,
      name: jwt.name,
      picture: jwt.picture,
      email: jwt.email,
      token_id: jwt.jti,
      token_created_at: jwt.iat,
      token_expires_at: jwt.exp,
    }
  );
}
