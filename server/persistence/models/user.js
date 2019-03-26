import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import QuestionsSchema from './questions';
import AnswerSchema from './answers';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  answered: {
    type: Number,
    default: 0
  },
  myQuestions: [{ type: Schema.Types.ObjectId, ref: "Questions" }],
    myAnswers: [{ type: Schema.Types.ObjectId, ref: "Answers" }]
});
// register every answer
UserSchema.method('answer', function answering(answer, cb) {
    this.answered += 1;
    this.parent().save(cb);
})
// hash password before saving
UserSchema.pre('save', (next) => {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err); }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });

    }
    else {
        return next();
    }
});
//compare hashed passwords
UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) { return cb(err); }
        cb(null, isMatch);
    });
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
