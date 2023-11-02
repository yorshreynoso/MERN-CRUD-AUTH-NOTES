import Task from '../models/task.model.js';

const getTasks = async(req, res) => { 

    try {
        const tasks = await Task.find({user: req.user.id}).populate('user');
        res.json(tasks);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Error"});
    }
} 

const createTask = async(req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title, description, date,
            user: req.user.id //we saved req.user.id from our middleware
        });
    
        const taskSaved = await newTask.save();
        res.json(taskSaved)
        
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({message:"Task was not created"})
    }
}  


const getTask = async(req, res) => {
    try {
        const { id } = req.params;
    
        const task = await Task.findById(id).populate('user');
    
        if(!task) return res.status(404).json({message: "Task not found"});
    
        res.json(task);
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({message: "Task not found"});
    }

}

const deleteTask = async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if(!task) return res.status(404).json({message:"Task not found"});
    
        res.status(204).json({ message: "deleted correctly" });
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({message: "Task not found"});
    }
}  

const updateTask = async(req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        
        const taskUpdated = await Task.findByIdAndUpdate(id, task, {new: true }); // return the new Value, not the old one
    
        if(!taskUpdated) return res.status(404).json({message: "Task not updated"});
    
        res.json(taskUpdated);
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({message: "Task not updated"});
    }
}  

export { getTask, getTasks, createTask, deleteTask, updateTask }