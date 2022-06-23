const User = require('../models/user');

module.exports = {
    // index: (req,res,next)=>{

    //     User.find({},(err,users)=>{
    //         console.log('err',err);
    //         console.log('users',users);
    //     })

    //     if(err){
    //         next(err);
    //     }
    //     // res.status(200).json({
    //     //   message:'You have requested index page'
    //     // });
    // },
    // index:(req,res,next)=>{
    //     User.find({}).then(users =>{
    //           res.status(200).json(users);
    //     }).catch(err =>{
    //         console.log(err);
    //         next(err);
    //     })
    // },
    index:async (req,res,next) =>{
       //using the new router
    const  users = await User.find({});       
       res.status(200).json(users);
    },
    // newUser: (req,res,next)=>{
    //     const newUser = new User(req.body);       
    //     newUser.save((err,user)=>{
    //         console.log(err);
    //         res.status(201).json(user);
    //     })
    // },
    // newUser : (req,res,next)=>{
    //     const newUser = new User(req.body); 
    //     newUser.save().then(user=>{
            
    //     }).catch(err=>{
            
    //     });
    // },
    newUser : async (req,res,next)=>{       
        
    const newUser = new User(req.body); 
    const user = await newUser.save();
    return res.status(201).json(user);
    }
};


/*

We an deal with mongoose via three ways
1)Callbacl
2)promise
3)async await
*/ 