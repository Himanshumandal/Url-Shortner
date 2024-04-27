const express=require("express");
const app=express();
const mongoose=require("mongoose");
const short=require('./models/short')
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/urlshortner',{
    useNewurlparser:true,useunifiedtopology:true
})
app.use(express.urlencoded({extended:false}));

app.get('/',async(req,resp)=>{
    const shorturl=await short.find()
    resp.render('index',{shorturl:shorturl})
resp.render('index');
})

app.post('/shorturl',async(req,resp)=>{
    await short.create({full:req.body.fullurl})
    resp.redirect('/');
})

app.get('/:shorturl',async(req,resp)=>{
    const shorturl=await short.findOne({short:req.params.shorturl});
    if(shorturl==null) return resp.sendStatus(404);

    shorturl.clicks++;
    shorturl.save();
    resp.redirect(shorturl.full);
})
app.listen(4000);