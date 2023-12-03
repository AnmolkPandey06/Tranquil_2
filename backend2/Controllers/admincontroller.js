const bcrypt = require("bcrypt");
//model
const Product = require("../Models/products");
const doc = require("../Models/doctors");
const feed = require("../Models/feed");
const comment = require("../Models/comments");
const administer = require("../Models/admin");

module.exports.postlogin = async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;
    console.log(email);
    console.log(password);
    if (!(password && email)) {
      res.status(400).json({ message: "Give THe password and email" });
      return;
    }

    // Validate if user exist in our database
    const admin = await administer.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.hash))) {
      res.status(200).json({ adminid: admin._id });
      return;
    } else {
      res.status(400).json({ message: "wrong Credentials" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error" ,error:error});
  }
};

module.exports.getadminprofile = async (req, res) => {
  try {
    if (req.params.id) {
      const admini = await administer.findById(req.session.adminid);
      const docs = await doc.find({ pendingstatus: true });
      const feeds = await feed.find({}).populate("author");
      res.status(200).json({ admini: admini, docs: docs, feeds: feeds });
      return;
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error:error });
  }
};

module.exports.getadminproductmanage = async (req, res) => {
  try {
    if (req.params.id) {
      const prod = await Product.find({});
      res.status(200).json({ prod: prod });
      // res.render('adminproductsmanage',{navactive:navactive, prod:prod})
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error"  ,error:error});
    return;
  }
};

module.exports.productupdate = async (req, res) => {
  try {
    if (req.params.id) {
      pid = req.params.pid;
      cutprice = req.body.productcutprice;
      stock = req.body.productstock;
      console.log(cutprice, stock);
      const product = await Product.findOneAndUpdate(
        { _id: pid },
        { Cutprice: cutprice, Stock: stock }
      );
      console.log(product);
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.expertaccept = async (req, res) => {
  try {
    if (req.params.id) {
      tid = req.params.tid;
      //console.log('delete');
      await doc.updateOne({ _id: tid }, { pendingstatus: false });
      res.status(200);
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.expertdelete = async (req, res) => {
  try {
    if (req.params.id) {
      tid = req.params.tid;
      //console.log('delete');
      await doc.deleteOne({ _id: tid });
      res.status(200);
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.productdelete = async (req, res) => {
  try {
    if (req.params.id) {
      pid = req.params.pid;
      console.log("delete");
      await Product.deleteOne({ _id: pid });
      res.status(200);
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.feedaccept = async (req, res) => {
  try {
    if (req.params.id) {
      fid = req.params.fid;
      //console.log('delete');
      await feed.findByIdAndUpdate({ _id: fid }, { checked: true });
      res.status(200);
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.feeddelete = async (req, res) => {
  try {
    if (req.params.id) {
      fid = req.params.fid;
      // console.log('delete');
      post = await feed.findById(fid);
      for (let index = 0; index < post.comments.length; index++) {
        await comment.deleteOne({ _id: post.comments[index] });
      }

      await feed.deleteOne({ _id: fid });
      res.status(200);
    } else {
      res.status(400).json({ message: "You need to admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }
};

module.exports.productadd = async (req, res) => {

  try {
    if (req.params.id) {
        console.log(req.body);
        Name = req.body.name;
        Cutprice = req.body.cutprice;
        Price = req.body.price;
        Company = req.body.company;
        image = req.body.imgurl;
        author = req.body.author;
        Stock = req.body.stock;
        Type = req.body.category;
      
        const newprod = new Product({
          Name: Name,
          Cutprice: Cutprice,
          Price: Price,
          Company: Company,
          image: image,
          author: author,
          Stock: Stock,
          Type: Type,
        });
        console.log(newprod);
        await newprod.save();
        res.status(200);
      } else {
        res.status(400).json({ message: "You need to admin" });
        return;
      }
      
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
    return;
  }


 
};
