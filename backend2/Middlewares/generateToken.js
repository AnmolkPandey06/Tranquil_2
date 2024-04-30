const jwt = require("jsonwebtoken");


// const generateToken=(userId,res)=>{
//   // console.log("anmol is here");
//   const token=jwt.sign({userId},process.env.JWT_SECRET,{
//       expiresIn:'15d'
//   })
//   res.cookie("jwttranquil",token,{
//       maxAge:15*24*60*60*1000,
//       httpOnly:true  //prevent XSS attacks   cross site attacks. Not accessibe by js
//      ,sameSite:"strict",
//   });
// }




const generateToken = (id,res) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30days",

  });
};

module.exports = generateToken;



