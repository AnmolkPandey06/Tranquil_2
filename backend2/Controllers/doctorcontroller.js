const bcrypt = require("bcrypt");

const multer = require("multer");
const uploads = multer({ dest: "routes/uploads" });

//imagur
const imgurUploader = require("imgur-uploader");

//model
const experts = require("../Models/doctors");
const tempdoct = require("../Models/temp-doctors");
const User = require("../Models/temp-doctors");
const Slot = require("../Models/expertschedule");

//Functions :

module.exports.getlogin = (req, res) => {
  navactive = [1, 0, 0, 0, 0, 0];
  res.render("therapy/doctorlogin", { navactive: navactive });
};

module.exports.postlogin = async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;
    if (!(password && email)) {
      req.flash("error", "All fields are necessary");
      return res.redirect("/expert/expertlogin");
    }

    // Validate if user exist in our database
    const doctor = await experts.findOne({ email });
    if (doctor && (await bcrypt.compare(password, doctor.hash))) {
      req.session.doctorid = doctor._id;
      if (req.session.passport) {
        delete req.session.passport;
      }
      if (req.session.adminid) {
        delete req.session.adminid;
      }
      res.redirect("/expert/expertprofile");
    } else {
      req.flash("error", "Mismatched Credential");
      return res.redirect("/expert/expertlogin");
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

module.exports.getnewtherapist = async (req, res, next) => {
  navactive = [0, 0, 0, 1, 0, 0];
  res.render("therapy/therapists", { navactive: navactive });
};

module.exports.postnewtherapist = async (req, res, next) => {
  try {
    password = req.body.doctor.password;
    arr = [];
    if (req.body.doctor.Sub) {
      arr.push("Substance Abuse");
    }
    if (req.body.doctor.rel) {
      arr.push("Relationship");
    }
    if (req.body.doctor.Wor) {
      arr.push("Work Stress");
    }
    if (req.body.doctor.Teen) {
      arr.push("Teen Problems");
    }
    if (req.body.doctor.Sex) {
      arr.push("Sexual Abuse");
    }
    if (req.body.doctor.Harr) {
      arr.push("Harrassment");
    }
    if (req.body.doctor.Lon) {
      arr.push("Loneliness");
    }
    if (req.body.doctor.Anxiety) {
      arr.push("Anxiety");
    }
    console.log(req.body.doctor.password);
    email = req.body.doctor.email;
    console.log(email);
    console.log(arr);
    Name = req.body.doctor.Name;
    yoe = req.body.doctor.yoe;
    document = req.body.doctor.document;
    pfp = req.body.doctor.image;
    charge = req.body.doctor.charge;

    // check if user already exist
    // Validate if user exist in our database
    const tempdoc = await tempdoct.findOne({ email });
    const expert = await experts.findOne({ email });
    if (tempdoc) {
      req.flash("error", "Your Request is due with Admin, please wait");
      return res.redirect("/expert/newtherapists");
    }
    if (expert) {
      req.flash("error", "Your Account Already Exists.....Please Login");
      return res.redirect("/expert/expertlogin");
    }

    // // //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // const tempdoctor = new tempdoct({
    //     email: email,
    //     Name: Name,
    //     hash: encryptedPassword,
    //     ExpertsIn: arr,
    //     Charge: charge,
    //     Experience: yoe,
    //     pfp: pfp,
    //     document: document
    // });
    // console.log(tempdoctor);
    const experter = new experts({
      email: email,
      Name: Name,
      hash: encryptedPassword,
      ExpertsIn: arr,
      Charge: charge,
      Experience: yoe,
      pfp: pfp,
      document: document,
      pendingstatus: true,
    });
    console.log(experter);
    await experter.save();
    const doctor = await experts.findOne({ email });
    // if(req.session.passport){
    //     delete req.session.passport;
    // }
    // if(req.session.adminid){
    //     delete req.session.adminid;
    // }
    // req.session.doctorid=doctor._id;
    // res.redirect('/expert/expertprofile');
    res.status(200).json({ doctorid: doctor._id });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

module.exports.slotmaker = async (req, res) => {
  if (req.params.id) {
    date = req.body.date;
    time = req.body.time;
    doctor = await experts.findById(req.params.id);
    const slotter = new Slot({
      Time: time,
      Date: date,
      Userid: req.user,
      doctorid: doctor,
      status: "pending",
    });
    console.log(slotter);
    await slotter.save();
    res
      .status(200)
      .json({
        message: `Your appointment is pending to be approved by expert on ${date} and ${time}.`,
      });
  } else {
    return res.error("THere is problem related to slot making");
  }
};

module.exports.updateprofile = async (req, res) => {
  try {
    if (req.params.doctorid) {
      console.log(req.body);
      if (req.body.name && req.body.Charge && req.body.pfp) {
        await experts.updateOne(
          { _id: req.params.doctorid },
          { Name: req.body.name, Charge: req.body.Charge, pfp: req.body.pfp }
        );
      }
      res.redirect("/expert/expertprofile");
    } else {
      req.flash("error", "You need to first login");
      return res.redirect("/expert/expertlogin");
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

module.exports.getexpertprofile=async (req,res)=>{
    
  try {
          console.log("anmiol");
          const doc = await experts.findById(req.user._id)
          const slotter = await Slot.find({doctorid:doc._id}).populate('Userid');
          console.log(slotter);
  
          res.status(200).json({doc:doc, slotter:slotter})
      }

  catch (error) {
      console.log(error);
      res.status(500).json({message:"Error",error:error})
  }


  
}

module.exports.acceptslot = async (req, res) => {
  try {
    await Slot.updateOne({ _id: req.params.sid }, { status: "accept" });
    const slotter = await Slot.find({doctorid:req.user._id}).populate('Userid');
    console.log(slotter);
    res.status(200).json({slotter:slotter})
}

catch (error) {
    console.log(error);
     res.status(500).json({message:"Error",error:error})
}
  
};

module.exports.rejectslot = async (req, res) => {
  try {
    console.log("hellow")
    await Slot.deleteOne({ _id: req.params.sid });
    const slotter = await Slot.find({doctorid:req.user._id}).populate('Userid');
    console.log(slotter);
    res.status(200).json({slotter:slotter})
}
catch (error) {
    console.log(error);
     res.status(500).json({message:"Error",error:error})
}
};
