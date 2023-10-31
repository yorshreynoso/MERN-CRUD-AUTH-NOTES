import React, { useEffect } from 'react' //rfce
import { useTasks } from '../context/TasksContext';
import TaskCard from '../components/TaskCard';

function TaskPage() {
  const {getTasks, tasks} = useTasks();
  
  useEffect(() => {
    getTasks();
  }, []);
    
    
 if(tasks.length === 0 ) return(<h1>No task</h1>)

  return (
    <div className='grid sm:grid-cols-2 grid-cols-3 gap-2'>
      {tasks.map((task) => (
        <TaskCard  task={task} key={task._id}/>
      )) 
      }
    </div>
  )
}


export default TaskPage;