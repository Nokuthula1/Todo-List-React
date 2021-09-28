    import { createTodo, deleteTodo, readTodos, updateTodo } from "./api";
    import{useEffect, useState} from 'react';
    import Preloader from "./components/Preloader";

    function App() {

      const [todo, setTodo] = useState({title:''}); 
      const [todos, setTodos] = useState([])
      const [currentId, setCurrentId] = useState(0);

    const clear = ()=>{
    setCurrentId(0);
    setTodo({title:''})
    }
    useEffect(() => {
      let currentTodo = currentId!=0?todos.find(todo=>todo._id ===currentId):{title:''}
      setTodo(currentTodo)
      }, [currentId])
      
      const fetchData = async () =>{
        const result = await readTodos();
        setTodos(result.data);
        console.log(result);
      }

      useEffect(() => {
        fetchData();
      }, [currentId])

      const onSubmitHandler = async(e) =>{
        e.preventDefault();
        if(currentId===0){
          const result = await createTodo(todo);
          console.log(result);
          fetchData();
          setTodos([...todos, result]);
          clear();
        }else{
        await updateTodo(currentId,todo);
          clear();
        }
      }
      const removeTodo =  async(id)=>{
        await deleteTodo(id);
        await fetchData();
      }
      return (
        <div className="container">
          <div className="row">
            {/* <pre>{JSON.stringify(todo)}</pre> */}
            <form className="col s12" onSubmit={onSubmitHandler}>
              <div className="row">
                <h5 className="row center-align">Todo List</h5>
                <div className="input-field col s6">
                    <input id="icon_prefix" type="text" value ={todo.title} className="validate" onChange={e=>setTodo({...todo,title:e.target.value})} />
                    <label htmlFor="icon_prefix">Enter todo</label>
                </div>
                <div className="row right-align">
                <button className ='waves-effect blue waves-purple btn'>Submit</button>
              </div>
              </div>
              
          </form>
          {
            !todos ? <Preloader/> : todos.length > 0 ? <ul className="collection">
              {todos.map(todo=>(
                <li key={todo._id} className="collection-item" ><h5>{todo.title}</h5> 
                <a className="waves-effect blue waves-red btn-floating secondary-content" href="#!"><i className="material-icons " onClick={() => removeTodo(todo._id)}>delete_forever</i></a>
                <a className="waves-effect blue waves-green btn-floating secondary-content" href="#!"><i className="material-icons "  onClick={() => setCurrentId(todo._id)}>edit</i></a>
                </li>
                
              ))}
            </ul>:<div><h5>No to dos</h5></div>
          }
    </div>
    </div>
      )}

    export default App;
