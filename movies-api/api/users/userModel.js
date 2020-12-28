import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  //original
  //id: Number,
  //title: String

  //exercise
  id: {type: Number, required: true},
  title: {type: String, required: true}
});

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favourites: [MovieSchema]
});


export default mongoose.model('User', UserSchema);