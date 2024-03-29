const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    Name:String,
    Cutprice:{type:Number,default:0},
    Price:{type:Number,default:0},
    Company:String,
    image:String,
    author:String,
    Stock:{type:Number,default:10},
    Type:{type:String,enum:['Mindfulness Books','Stress Busters','Herbals','Sleepwell']}
});
module.exports=mongoose.model('Product',ProductSchema);