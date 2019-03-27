
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
        unique: true,
  },
      likes: {
          type: Number,
          default: 0,

    },
    created: {
        type: Date,
        default:Date.now
    },
  _questionId: { type: Schema.Types.ObjectId, ref: "Question" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" }
});

AnswerSchema.method('like', function likes(like, cb) {
    this.likes += 1;
    this.parent().save(cb);

});
const Answer = mongoose.model("Answers", AnswerSchema);
module.exports = Answer;
