import  app from './app.js'; // our own modules we must add .js
// import { connectDB }  from './db.js';    // or
import  connectDB  from './db.js';


app.listen(3000, ()=> {
    console.info(`Server on port 3000`);
});

connectDB();

// qJERzR9EUVOsCOaX