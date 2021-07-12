const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");

// connect data base and schema
require("../db/conn");
const User = require("../model/userSchema");

//############# Registration Router ############

router.post("/register" , async(req , res)=>{
 
    const {name , email , phone , work , password , cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error : "Input all The Fild"})
    };

    try {

       const userExist = await User.findOne({email : email});
        
       if(userExist){
            return res.status(422).json({error : "This Email is Already used"});
        }else if(password != cpassword){
            return res.status(422).json({error : "password dosen't mach"});
        }else{
            const user = new User({name , email , phone , work , password , cpassword});
            await user.save();
            res.status(201).json({message : "user registered successful..."});
        }
    
    } catch (error) {
        console.log(error)
    }
});

// ############## Login Router #################

router.post("/login" , async(req , res)=>{
   try {
       let token;

       const {email , password} = req.body;

       if(!email || !password){
           return res.status(400).json({error : "input fild can't be blank"})
       }

       const userLogin = await User.findOne({email:email});
      

       if(userLogin){

        const isMatch = await bcrypt.compare(password , userLogin.password);

        token = await userLogin.generateAuthToken();

        res.cookie("jwtoken" , token,{
            expires: new Date(Date.now() + 258920000000),
            httpOnly: true
        });
      

            if(!isMatch){
                // for password
                res.status(400).json({nessage : "password invalid"});
                console.log("password invalid");
            }else{
                return res.json({nessage : "User Login Successful..."})
             }
       }else{
             //for user
             res.status(400).json({nessage : "Email invalid "});
             console.log("Email invalid");
       }
    

   } catch (error) {
       console.log(error)
   }
});


router.get("/about", Authenticate ,(req , res)=>{
    res.send(req.rootUser)
});

router.get("/getdata" , Authenticate , (req , res)=>{
    res.send(req.rootUser)
})

router.post("/contact" ,Authenticate, async(req , res)=>{
    
    try {
        const {name , email , phone , message} = req.body;

        if(!name || !email || !phone || !message){
            return res.json({error:"Fil The Contact From"})
        }

        const userContact = await User.findOne({_id:req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name , email , phone , message);
            await userContact.save();

            res.status(201).json({message:"Message Send"})
        }

    } catch (err) {
        console.log(err);
    }


});

router.get("/logout" ,(req , res)=>{
    res.clearCookie('jwtoken' , {path:'/'});
    res.status(200).send("User Log Out");
});


module.exports = router;