const mongoose = require("mongoose");

//schema
const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        }
    },
    { timestamps: true }
);


// model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;