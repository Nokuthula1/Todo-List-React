    import express from 'express';
    import dotenv from 'dotenv';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import todosRoutes from './routes/todos.js'

    const app = express();
    dotenv.config();
    app.use(express.json({ limit: "30mb", extended: true }));
    app.use(express.urlencoded({ limit: "30mb", extended: true }))
    app.use(cors());
    app.use('/todos',todosRoutes);

    const mongodb = 'mongodb://127.0.0.1:27017/todoList';

    app.get('/', (req, res) => {
    res.send('Welcome to server')
    })
    const PORT = process.env.PORT || 5000;
    mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT} `)))
    .catch((error) => console.log(error));