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
const updateNote = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      message: 'Title or content cannot be blank'
    });
    return;
  };
  const id = req.params.id;
  console.log(id);
  const noteData = {title: req.body.title, content: req.body.content };
  Note.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then((data) => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({message: `Error when updating note with id ${id}`});
  })
};
const getNote = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
  .then((note) => {
    if(!note) {
      res.status(404).send({message: `Not found note with id: ${id}`})
    } else {
      res.status(200).send(note);
      return
    }

  }).catch(err => {
    res.status(500).send({message: `Error when fetching note with id ${id}`});
  })
}
const getAllNotes = (req, res) => {
  User.findOne({username: req.params.username}).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    const notes = Note.find({userId: user._id}).then(data => {
      res.status(200).send(data);
    }).catch(error => {
      res.status(500).send({message: error.message || "Some errors occurred while fetching notes"});
      return;
    })
  })
}
export default {
  createNote,
  getNote,
  updateNote,
  getAllNotes
}
