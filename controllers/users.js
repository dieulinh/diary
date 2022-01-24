import User from '../models/user';
import verifyToken from '../middleware/verifyToken';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import user from '../models/user';

export const signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err});
      return;
    }
    res.send({ message: 'Register successfully' });
  });
}
export const signIn = (req, res) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err});
      return;
    }
    if (!user) {
      res.status(404).send({message: 'User not found'});
      return;
    }
    const passwordIsValid = bcrypt.compareSync(
      res.body.password, user.password
    );
    if (!passwordIsValid) {
      res.status(401).send({ message: 'Invalid password', accessToken: null});
      return;
    }
    const accessToken = jwt.sign({id: user._id}, 'very-top-secret', {expiresIn: 86400});
    // 24 h
    res.status(200).send({id: user._id, username: user.username, email: user.email, accessToken: accessToken});
  })
}
