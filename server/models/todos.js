  import mongoose from 'mongoose'
  // const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  
  //Create schema for Todo List
  const todoSchema = new Schema({
    title: {
      type: String,
      required: [true, 'The todo text field is required']
    },
  },{timestamps:true})

  //Create model for todo
  const Todo = mongoose.model('Todo', todoSchema);
  export default Todo;