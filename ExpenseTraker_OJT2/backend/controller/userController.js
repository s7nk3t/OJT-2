const userModel = require('../db/userModel')
const { error, success } = require('../utils/handler')
const nodemailer = require("nodemailer");

const resetpasswordContorller = async (req,res)=>{
    try {
        const {email} = req.body;
        if(!email) {
           return res.send(error(400,"Email Required!!"));
            
        }
         user = await userModel.findOne({email});
        if(!user)
        {
           return res.send(error(401 , "User Not Found!! Please Sign Up"))
        }

        let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user:'shrutipingat2@gmail.com', // generated ethereal user
			  pass:'hinogmfqyubgungp', // generated ethereal password
        
			},
		  });


		  let mailOptions = {
			from: 'shrutipingat2@gmail.com',
			to:email,
			subject:'Reset Password',
			html:'hello '+user.username+' please click here to reset password  <a href="http://localhost:3000/resetpassword/'+user._id+'"> reset password   </a>'
			};

			transporter.sendMail(mailOptions, function (err1, info) {
				if (err1) {
				  res.json("err="+err1);
				} else {
				  console.log("Email Sent: " + info.response)
		
                }})

				// req.flash("success", "Please check Your Mail, Email is sent !!");
        return res.send(success(201 , user));
    } catch (err) {
        return res.send(error(401,err.message));
    }
}

const resetpassword_post=async (req,res) => {
	
	try
	{

const password= req.body.password;
const email= req.body.email;
console.log("id="+email)

const userData = await userModel.findById(email);
console.log("u="+userData)
if(userData){

const updated_data= await userModel.findByIdAndUpdate({_id:userData._id},{$set:{password:password}})
return res.send(success(201 , user));
			
			
}else{
    return res.send(error(401,err.message));


}
	}
	catch(err)
	{
		console.log(err);
        return res.send(error(500,err.message));

	}
};

const loginController = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) {
           return res.send(error(400,"Email and password Required!!"));
            
        }
         user = await userModel.findOne({email , password});
        if(!user)
        {
           return res.send(error(401 , "User Not Found!! Please Sign Up"))
        }
        return res.send(success(201 , user));
    } catch (err) {
        return res.send(error(401,err.message));
    }
}

const signupContorller =async (req,res)=>{
    try {
        const {username , email , password } = req.body;
        if(!username || !email || !password)
        {
           return res.send(error(401 , "Enter Every Field!!!"));
        }
        const newUser = await userModel.create({
            username , 
            email,
            password
        })
        
        return res.send(success(201 , "user is created"));
    } catch (err) {
       return res.send(error(401 , err.message));
    }
}

const logoutController =async (req,res) => {

}

module.exports = {
    loginController,
    logoutController,
    signupContorller,resetpasswordContorller,resetpassword_post
}