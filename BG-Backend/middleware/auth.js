import jwt from 'jsonwebtoken'

const auth = async(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }

    try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = {userId:decoded.id}
        next()
        
    } catch (error) {
        return res.status(401).json({success:false,message:'Please authenticate.'})
    }
}
export default auth;
