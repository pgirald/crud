import React,{useState,useEffect} from 'react';
import {isEmpty,size} from 'lodash';
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode,setEditMode]=useState(false);
  const [id,setId]=useState("");
  const [error,setError]=useState(null);

  useEffect(function(){
    (async function(){
    const result=await getCollection('tasks');
    setTasks(result.data);
    })();
  },[]);

  function validForm()
  {
    setError("Especifique el nombre de la tarea");
    if(isEmpty(task))
    {
      return false;
    }
    setError("");
    return true;
  }

  function onTextChangedhandler(text)
  {
    return setTask(text.target.value);
  }

  async function addTask(e)
  {
    e.preventDefault();
    if(!validForm())
    {
      return;
    }
    const result=await addDocument("tasks",{name:task});
    if(!result.statusResponse)
    {
      setError(result.error);
      return;
    }
    setTasks([...tasks,{id:result.data.id,name:task}]);
    setTask("");
  }

  async function removeTask(id)
  {
    const result=await deleteDocument("tasks",id);
    if(!result.statusResponse){
      setError(result.error);
      return;
    }
    const newTasks=tasks.filter(task=>task.id!==id);
    setTasks(newTasks);
  }

  function modifyTask(theTask)
  {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  }

  async function saveTaskChanges(e)
  {
    e.preventDefault();
    if(!validForm())
    {
      return;
    }
    const result=await updateDocument("tasks",id,{name:task});
    if(!result.statusResponse){
      setError(result.error);
      return;
    }
    setEditMode(false);
    const selectedTask=tasks.find(task=>task.id==id);
    selectedTask.name=task;
    setTask("");
    setId("");
  }

  return (<div className="container mt-5">
    <h1>Tareas</h1>
    <hr/>
    <div className="row">
      <div className="col-8">
        <h4 className="text-center">Lista de tareas</h4>
        {
          (size(tasks)===0)?(<h5 className="list-group-item">Aun no hay tareas programadas</h5>):(
          <ul className="list-group">
            {
              tasks.map(task=>(
              <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=>removeTask(task.id)}>Eliminar</button>
                <button className="btn btn-warning btn-sm float-right" onClick={()=>modifyTask(task)}>Editar</button>
              </li>))
            }
          </ul>
          )
        }
      </div>
      <div className="col-4">
        <h4 className="text-center">Nombre de la tarea</h4>
        <form onSubmit={editMode?saveTaskChanges:addTask}>
          {
            error && <span className="text-danger">{error}</span>
          }
          <input type="text" className="form-control mb-2" placeholder="Nombre"
          onChange={onTextChangedhandler} value={task}/>
          <button type="submit" className="btn btn-dark btn-block">
            {editMode?"Modificar":"Agregar"}
            </button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
