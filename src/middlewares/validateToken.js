import jwt from 'jsonwebtoken';
import config from 'config';
const { TOKEN_SECRET_JWT } = config.get("Auth");

export const authRequired = (req, res, next) => {
    if(!req.headers.cookie) return res.status(401).json({message: "No token, authorization"});
    
    const token = req.headers.cookie.split('=')[1];

    jwt.verify(token, TOKEN_SECRET_JWT, (err, user) => {
        if(err) return res.json({message: "Invalid token"});

        req.user = user;
        next();
    });
    
}