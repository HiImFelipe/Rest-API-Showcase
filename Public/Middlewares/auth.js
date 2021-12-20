import jsonWebToken from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  const noTokenProvided = !authHeader;

  if (noTokenProvided)
    return res.status(401).send({ error: "No token provided" });

  // Bearer + hash is the default format for tokens
  // So we can split it in two parts

  const parts = authHeader.split(" ");

  if (parts.length != 2)
    return res.status(401).send({ error: "Invalid token" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    //regex to check if string has Bearer
    return res.status(401).send({ error: "Malformatted token" });

  jsonWebToken.verify(token, process.env.HASH_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid token 2" });

    req.userId = decoded.id;
    return next();
  });
};
