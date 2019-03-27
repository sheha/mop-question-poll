
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  question: {
    type: String,
    unique: true
  },
  likes: {
    type: Number,
    default: 0
  },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
    created: {
        type: Date,
        default: Date.now
    },
});

QuestionsSchema.method('like', function likes(like, cb) {
    this.likes += 1;
    this.parent().save(cb);

});

const Questions = mongoose.model("Questions", QuestionsSchema);
module.exports = Questions;
