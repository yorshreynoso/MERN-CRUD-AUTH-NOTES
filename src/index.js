import  app from './app.js'; // our own modules we must add .js
// import { connectDB }  from './db.js';    // or
import  connectDB  from './db.js';

import config from 'config';

const { PORT } = config.get("configuration");

app.listen(PORT, ()=> {
    console.info(`Server on port ${PORT}, mode: ${process.env.NODE_ENV}`);
});

connectDB();

// qJERzR9EUVOsCOaX