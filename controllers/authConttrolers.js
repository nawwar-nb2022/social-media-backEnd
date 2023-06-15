import userInformation from "../model/userSchema.js"
import bcrypt from "bcrypt"
const CustomErrorMessage = (err)=>{
    let error = {userName : "" , email : "" , password : ""}
    if (err.code === 11000){
        if (Object.keys(err.keyPattern) == "userName"){
            error.userName = "this name is already user"
        }
        else if (Object.keys(err.keyPattern) == "email"){
            error.email = "this email is already user"
        }
        return error
    }

    if(err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message
        })
    }
    return error
}

export const signPost = (req , res ) =>{
    const user = new userInformation({
        userName : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    user.save()
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(err=>{
            console.log(err)
            const errors = CustomErrorMessage(err)
            res.status(400).json({errors})
        })
}

export const loginPost = (req  , res )=>{
     userInformation.findOne({email :  req.body.email}).then(result=>{
         if(result == null ){
             res.status(404).json('user not found')
         }
         else{
            bcrypt.compare( req.body.password , result.password )
            .then(passResult=>{
                if(!passResult){
                    res.status(404).json("user not found or password is un correct")
                }
                else{
                    res.status(200).json(`welcome ${result.userName}`)
                }
            })
         }
         
     }).catch(err=>{
         console.log({error : err})
     })

}