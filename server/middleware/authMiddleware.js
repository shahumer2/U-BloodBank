var jwt = require('jsonwebtoken');


module.exports= async(req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    if(err){
        return res.status(401).send({
            success:false,
            message:"auth failed while deocding",
            error
        })
    }
    else{
        req.body.userId=decode.userId
        next();
    }


})
        
    } catch (error) {
        res.status(401).send({
            message:"auth failed",
            error
        })
        
    }
}