    import mongoose from 'mongoose';
    import Todo from '../models/todos.js';

    export const readTodos = async (req, res) => {
        try {
        const Todos = await Todo.find();
        res.status(200).json(Todos);
        console.log(Todos);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
    }

    export const createTodos = async(req,res)=>{
        const todo = new Todo(req.body);
        try{
            await todo.save();
            res.status(201).json(todo);
        }catch(error){
            res.status(409).json({error:error.message})
        }
    }

    export const updateTodo = async(req,res)=>{
        const {id} = req.params;
        const {title}=req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`The id ${id} is not valid`);
        }
        const todo ={title,_id:id};
        await Todo.findByIdAndUpdate(id,todo,{new:true})
        res.json(todo);
    }

    export const deleteTodo = async(req,res)=>{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`The id ${id} is not valid`);
        }
        await Todo.findByIdAndRemove(id)
        res.json({message:`Todo deleted successfully`});
    }