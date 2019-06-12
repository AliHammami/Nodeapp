const jwt = require('jsonwebtoken');
require ('dotenv').config();
const User = require ('../models/user')

  exports.register = async (req, res) => {
    // wait to see if the user exist
    console.log(User)
    const userExists = await User.findOne({$or: [
        {email: req.body.email},
        {username: req.body.username}
    ]})
    if (userExists) return res.status(403).json({
        error: 'Email or username are already taken!'
    })
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Register success!" });   
}

 exports.signin = (req, res) => {
    //find the user based on email
    const{email, password} = req.body;
    User.findOne({email}, (err, user)=> {
       //if error or no user
       if(err || !user){
           res.status(401).json({
               error: "User don't exist! Please signup!"});
       }
       // if user find make sure password match with email.
       if(!user.authenticate(password)){
        res.status(401).json({
            error: "Email and password do not match!"});
       }
       // if user exists, authenticate
    //generate a token with user id and secret
    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

    //persist the token as 't' in cookie with expery date
    const cookie = ('t', token, {expire: new Date() + 9999}) 
    //return response with user and token to the frontend
    const{_id, username} = user
    return res.json({token, user: {_id, username, email}})
    })  
}