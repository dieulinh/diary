import User from '../models/user';
import verifyToken from '../middleware/verifyToken';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
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
      return res.status(500).send({ message: err});
    }

    if (!user) {
      return res.status(404).send({message: 'User not found'});
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password, user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password', accessToken: null});
    }
    const accessToken = jwt.sign({id: user._id}, process.env.APP_SECRET, {expiresIn: 86400});
    // 24 h
    res.status(200).send({id: user._id, username: user.username, email: user.email, accessToken: accessToken});
  })
}

