import Post from "../model/postSchema.js"
import userInformation from "../model/userSchema.js"

export const postCreate = ( req ,res)=>{
    const post = new Post(req.body)
    post.save()
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(err=>{
            res.status(500).json("something went wrong")
            console.log(err)
        })
}
export const updatePost = (req , res)=>{
    Post.findById(req.params.id)
        .then(result=>{
            if(result.userId === req.body.userId){
                Post.findByIdAndUpdate(req.params.id, {$set : req.body})
                .then(result =>{
                    res.status(200).json({result})
                    console.log(req.body)
                })
                .catch(err=>{
                    res.status(400).json({err})
                })
            }else{
                res.status(403).json("you cant update this post")
            }
        })
        .catch(err=>{
            res.status(500).json("some thing went wrong")
            console.log(err)
        })
}
export const deletePost = (req  , res)=>{
    Post.findById(req.params.id)
        .then(result=>{
            if(result.userId === req.body.userId){
                Post.findByIdAndDelete(req.params.id)
                    .then(result=>{
                        res.status(200).json("this post successfully deleted")
                    })
                    .catch(err=>{
                        res.status(500).json("something went wrong")
                        console.log(err)
                    })
            }else{
                res.status(403).json("you can only delete your post")
            }
        })
        .catch(err=>{
            res.status(404).json("their is no post")
        })
}
export const likePost = (req ,res)=>{
    Post.findById(req.params.id)
    .then(result=>{
        if(!result.likes.includes(req.body.userId)){
            result.updateOne({$push : {likes :req.body.userId}})
                .then(Like=>{
                    console.log({Like})
                    res.status(200).json("successfully like this post")
                })
                .catch(err=>{
                    console.log(err)
                    res.status(500).json("something went wrong ")
                })
        }else{
            res.status(400).json("you already like this post")
        }
    })
    .catch(err=>{
        res.status(404).json("their is no post")
        console.log(err)
    })
}
export const desLikePost = (req , res)=>{
    Post.findById(req.params.id)
        .then(result=>{
            if(result.likes.includes(req.body.userId)){
                result.updateOne({$pull : {likes : req.body.userId}})
                    .then(desLike=>{
                        res.status(200).json("successfully deslike this post")
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json("something went wrong ")
                    })
            }else{
                res.status(400).json("you are not liked this post")
            }
        })
        .catch(err=>{
            res.status(404).json("their is no post with this id")
        })
}

export const GetPost = (req, res)=>{
    Post.findById(req.params.id)
        .then(result=>{
            res.status(200).json({result})
        })
        .catch(err=>{
            res.status(404).json("their is no post")
            console.log(err)
        })
}

export const ShowPost = async (req ,res)=>{
    const currentUser = await userInformation.findById(req.body.userId);
    const userPosts = await Post.find({userId : currentUser.id}) // get the user post
    const userFriends = await Promise.all(
        currentUser.following.map(friendId=>{
           return Post.find({userId : friendId});
        })
    )
    res.json(userPosts.concat({...userFriends}))
}