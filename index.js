const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://logvnDB:HlogvnDB1998@tempusdb.wdoin.mongodb.net/timeDatabase?retryWrites=true&w=majority'
);

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.post('/edit/:id/time/:index', async (req, res) => {
  const id = req.params.id;
  const index = Number(req.params.index);
  const body = req.body;

  const updatedUser = await UserModel.updateOne(
    { _id: id },
    { $set: { [`time.${index}`]: body } }
  );
  res.json(updatedUser);
});

app.listen(3001, () => {
  console.log('SERVER RUNNING ON PORT 3001');
});

// (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// }
