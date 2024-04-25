import JWT from 'jsonwebtoken';
import ApplicationError from './error.handler.js';


export let loggedInUser;
export let loggedInId;

 const jwtAuth = (req,res,next)=>{
const token = req.headers['authorization'];

if(!token){
    throw new ApplicationError("Unauthorized",400);
}

try{
    const payload = JWT.verify(token,process.env.JWT_SECRET);
    req.email = payload.email;
    loggedInUser = payload.email;
    req.userID = payload.userID;
    loggedInId = payload.userID;

}
catch(err){
    throw new ApplicationError("Unauthorized user",401);
}
next();

}

export default jwtAuth;