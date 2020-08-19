const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
let date_ob = new Date();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(, {
  useNewUrlParser: true
});

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();
console.log(hours + ":" + minutes);
const slotSchema = new mongoose.Schema({
  start: Number,
  end: Number,
  available: Boolean,
  empty: Boolean
});

const Slots = mongoose.model("Slots", slotSchema);

// const slot1 = new Slots({
//   start: 930,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot2 = new Slots({
//   start: 1030,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot3 = new Slots({
//   start: 1130,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot4 = new Slots({
//   start: 1230,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot5 = new Slots({
//   start: 1330,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot6 = new Slots({
//   start: 1430,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot7 = new Slots({
//   start: 1530,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot8 = new Slots({
//   start: 1630,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot9 = new Slots({
//   start: 1730,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot10 = new Slots({
//   start: 1830,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot11 = new Slots({
//   start: 1930,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot12 = new Slots({
//   start: 2030,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot13 = new Slots({
//   start: 2130,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot14 = new Slots({
//   start: 2230,
//   end: 0,
//   available: false,
//   empty: true
// });
//
// const slot15 = new Slots({
//   start: 2330,
//   end: 0,
//   available: false,
//   empty: true
// });
// slot1.save();
// slot2.save();
// slot3.save();
// slot4.save();
// slot5.save();
// slot6.save();
// slot7.save();
// slot8.save();
// slot9.save();
// slot10.save();
// slot11.save();
// slot12.save();
// slot13.save();
// slot14.save();
// slot15.save();
app.post("/leave",function(req,res){
  Slots.updateOne({ _id : req.body.slot},{$set:{ empty :false}},function(err){
    res.redirect("/");
  });
});
app.post("/payment",function(req,res){
  console.log(req.body);
  Slots.updateOne({ _id : req.body.slot},{$set:{ empty :false}},function(err){
    res.render("payment");
  });
});

app.get("/", function(req, res) {
  res.render("index",{slots:[]});
});

app.post("/Search", function(req, res) {
  console.log(req.body);
  Slots.find({
    $and: [{
      available: false
    }, {
      start: {
        $gte: req.body.start
      }
    }, {
      start: {
        $lte: req.body.end
      }
    }]
  }, function(err, values) {
    console.log(values);
    var c = 0;
    var slots = [];
    var arr = [];
    for(let i = 0; i < values.length ; i++){
      if(c == 3){
        c = 0;
        slots.push(arr);
        arr = [];
      }
      arr.push(values[i]);
      c+=1;
    }
    console.log(slots);
    res.render("index",{slots:slots});
  });
});



app.listen(3000, function() {
  console.log("connected");
});
