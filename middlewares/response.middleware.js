const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if(res.err)
  {
    res.status(400);
    if(!res.data)
    {
      res.status(404);
    }

    res.data = {error: true, message: res.err.message};
  }
  else
  {
    res.status(200);
  }

  res.send(res.data);

  next();
};

export { responseMiddleware };
