import User from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

export const signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      res.status(422).send({ error: 'Email is in use'});
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save((err) => {
      if (err)  {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    })
  });
}
