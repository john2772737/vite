const User = require("../models/user.model");
const transporter =require('../utils/node.mailer')
const createUser = async (req, res) => {
  try {
    // Proceed with creating the user if the fields are not empty
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    // Handle other errors
    if (error.code === 11000 && error.keyPattern) {
      if (error.keyPattern.email) {
        res.status(409).json({ message: "Email already exists" });
      } else if (error.keyPattern.username) {
        res.status(409).json({ message: "Username already exists" });
      }
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createUserProvider = async (req, res) => {
  try {
    // Proceed with creating the user if the fields are not empty
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
   
   
      res.status(500).json({ message: error.message });
    }
};

const isuid = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    console.log('UID from request:', uid);
    if (user) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getEmail =async(req,res)=>{
  const {email} = req.params;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({message:"Login Successful",exists:true,user});
    
    } else {
      res.status(200).json({ message: "Email is not yet Registered", exists:false})
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message:"Login Succesful"});
  }
}


function generateVerificationCode() {
  // Generate a random number between 1000 and 9999 (inclusive)
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const sendVerification = async(req, res) => {
  const { email } = req.params;
  const verificationCode = generateVerificationCode();
  
  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json({ message: "Email was already registered" });
    return;
  }
  console.log(email)
  

  const mailOptions = {
    from: 'johnregulacion5555@gmail.com',
    to: email,
    subject: 'Email Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending verification code');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({message:'Verification code sent successfully',verificationCode});
    }
  });
};

module.exports = {
  createUser,
  isuid,
  createUserProvider,
  getEmail,
  sendVerification

};
