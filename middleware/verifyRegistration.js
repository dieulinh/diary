import User from '../models/user';

const verifyRegistration = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: 'Failed to register! Username is already in use!'});
      return;
    }
    // verifying email

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: 'Failed to register! Email is already in use!'});
        return;
      }
      next();
    });

  });
};

export default verifyRegistration;
