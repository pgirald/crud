import react,{useState} from 'react';
import {isEmpty,size} from 'lodash'
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode,setEditMode]=useState(false);
  const [id,setId]=useState("");

  function onTextChangedhandler(text)
  {
    return setTask(text.target.value);
  }

  function addTask(e)
  {
    e.preventDefault();
    if(isEmpty(task))
    {
      console.log("Task empty");
      return;
    }
    const newTask={
      id:shortid.generate(),
      name:task};
    setTasks([...tasks,newTask]);
    setTask("");
  }

  function removeTask(id)
  {
    console.log(id);
    const newTasks=tasks.filter(task=>task.id!==id);
    setTasks(newTasks);
  }

  function modifyTask(theTask)
  {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  }

  function saveTaskChanges(e)
  {
    e.preventDefault();
    if(isEmpty(task))
    {
      console.log("Task empty");
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
          (size(tasks)===0)?(<h5 className="text-center">Aun no hay tareas programadas</h5>):(
          <ul className="list-groud">
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
          <input type="text" className="form-control mb-2" placeholder="ingrese la tarea:"
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
