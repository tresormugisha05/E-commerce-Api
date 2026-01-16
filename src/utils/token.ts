import  Jwt from "jsonwebtoken";
export const GenerateToken=(payload:object)=>{
    return Jwt.sign(payload,process.env.JWT_SECRET!, {
        expiresIn:"7d"
    })
}
