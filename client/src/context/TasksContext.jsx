import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }

    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const getTasks = async() => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data);
            console.log(res.data)
        }
         catch (error) {
            console.error(error);
        }
    }

    const createTask = async(task) => {
        try {
            console.log(task);
            const res =  await createTaskRequest(task);
            
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTask = async(id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204) setTasks(tasks.filter(task => task._id !== id));
            
        } catch (error) {
            console.error(error);
        }
    }

    const getTask = async(id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
            
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async(id, task) => {
        try {
            await updateTaskRequest(id, task);
            
        } catch (error) {
            console.error(error);

        }
    }

    return(
        <TaskContext.Provider 
            value={{
               tasks,
               createTask,
               getTask,
               getTasks,
               deleteTask,
               updateTask
            }}
        >
            {children }
        </TaskContext.Provider>
    )
}