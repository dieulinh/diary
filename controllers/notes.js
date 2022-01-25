import Note from '../models/note';
import User from '../models/user';

const createNote = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      message: 'Title or content cannot be blank'
    });
    return;
  }
  const username = req.params.username;
  User.findOne({username: username}).exec((err, user) => {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      userId: user._id
    })
    note.save(note).then(data => {
      res.send(data);
    }).catch(error => {
      res.status(500).send({message: error.message || "Some errors occurred while creating the note."})
    })
  })
};
export default {
  createNote
}
