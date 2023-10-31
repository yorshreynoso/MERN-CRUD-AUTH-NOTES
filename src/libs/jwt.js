import jwt  from 'jsonwebtoken';
import  { TOKEN_SECRET_JWT } from '../config.js';


function createToken(payload) {

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET_JWT, 
        {
            expiresIn:"1d"
        }, 
        (err, token) => {
            if(err) reject(err);
            resolve(token);
        }); 

        
    });
}

export { createToken }