import jwt  from 'jsonwebtoken';
import config from 'config';
const  { TOKEN_SECRET_JWT, EXPIRES_TOKEN } = config.get('Auth');


function createToken(payload) {

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET_JWT, 
        {
            expiresIn:EXPIRES_TOKEN //default 1d
        }, 
        (err, token) => {
            if(err) reject(err);
            resolve(token);
        });  
    });
}

export { createToken }