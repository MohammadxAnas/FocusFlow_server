const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res ,next) =>{
    const auth = req.headers('authorization');
    if (!auth){
        return res.status(403)
        .json({message:"Unauthorized, JWT token is required"});
    }
    try{
        const decoded = jwt.verify(auth,process.env.jwt_secret);
        req.user = decoded;
        next();
    }catch (err){
        return res.status(403)
        .json({message:"Unauthorized, JWT expired or wrong"});
    }
}

module.exports = ensureAuthenticated;