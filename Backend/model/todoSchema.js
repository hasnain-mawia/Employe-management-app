import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    todo: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
});


const TodoModel = mongoose.model('todo', todoSchema);
export default TodoModel;