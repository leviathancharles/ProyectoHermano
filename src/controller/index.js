let express =require("express");
let router=express.Router();

router.get("/", (req, res)=>{
    res.send("hola mundo");
});

router.post("/login", (req, res)=>{

   var params=req.body;
   var usuario=params.usuario;
   var password=params.password;
   console.log(usuario);
   console.log(password);        

    if (usuario==="admin" && password==="1234"){
        res.redirect("user/")
    }else{
        res.redirect("/")
    }
});

module.exports=router;
