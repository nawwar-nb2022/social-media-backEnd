import userInformation from "../model/userSchema.js"
// update user 
export const updateUser = (req , res)=>{
    if(req.body.userId === req.params.id || req.userInformation.isAdmin){
        userInformation.findByIdAndUpdate(req.params.id ,{
            $set : req.body,
        })
            .then(result=>{
                res.status(200).json({result})
            })
            .catch(err=>{
                res.status(400).json({error : err})
            })
    }else{
        res.status(400).json("you cant update this user")
    }
}
// delete user 
export const deleteUser = (req , res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        userInformation.findByIdAndDelete(req.body.userId)
            .then(result =>{
                res.status(200).json("you have successfully deleted this user" , {result})

            })
            .catch(err=>{
                res.status(500).json({err})
            })
    }else{
        res.status(403).json("err")
    }
}

export const getUserInfo = (req ,res) =>{
    userInformation.findById(req.params.id)
        .then(result=>{
            res.status(200).json({userInfo : result})
        })
        .catch(err=>{
            res.status(500).json({error : err})
        })
}

export const followUser = async (req , res)=>{
    if(req.body.userId === req.params.id){
        res.json("you cant follow your account")
    }else{
        try{
            const user = await userInformation.findById(req.params.id)
            const currentUser = await userInformation.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : {followers : req.body.userId}})
                await currentUser.updateOne({$push : { following : req.body.userId}})
                res.status(200).json("user has been fallowed ")
            }else{
                res.status(401).json("you already fallow this user")
            }
        }catch(err){
            console.log(err)
        }
    }
}
export const unFollowUser = async (req , res)=>{
    if(req.body.userId === req.params.id){
        res.json("you cant unFollow your account")
    }else{
        try{
            const user = await userInformation.findById(req.params.id)
            const currentUser = await userInformation.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers : req.body.userId}})
                await currentUser.updateOne({$pull : { following : req.body.userId}})
                res.status(200).json("user has been unFallowed ")
            }else{
                res.status(401).json("you are not following this account")
            }
        }catch(err){
            console.log(err)
        }
    }
}