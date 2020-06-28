const elementomulti = require("../modelo/elementomulti");
const imagen=require("../modelo/imagen");
const Elementomulti = require("../modelo/elementomulti");


// Listar todos los objetos
exports.findAll=function(req,res){

    elemntomulti.findAll((err, elemntomulti)=>{
        
        if(err){
            res.send(err);
        }
        console.log(err, elemntomulti);
        res.send(elemntomulti);
    });

};

// guardar nuevo elemento multimedia 

exports.create=function(req, res){ 

    //Los datos normales
    let params=req.body;

    //Los datos de la imagen
    let img_id=req.files.imagen;

    var filePath = req.files.imagen.path;
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[1];

    //Ahora remplazamos el parametro imagen por el filename del mutiparty
    params.imagen = fileName;

    //El proceso que sigue
    let newElementomulti= new elementomulti(params);
    if(req.body.contructor=== Object && Object.keys(req.body).length===0){
        res.status(400).send({error:true, message: "proporcione todos los campos requeridos"});
    }else{
        elementomulti.create(newElementomulti, (err, elementomulti)=>{
            if(err){
                res.send(err);
            }
            res.json({error:false,message:"elementomulti agredado", data:elementomulti });
        });
    }
};

// buscar por id 

exports.findById=function(req, res){

    elementomulti.findById(req.params.id, (err, elementomulti)=>{
        if(err){
            res.send(err);
        }
        res.json(elementomulti);
    });
}; 

// editar elementos multimedia 

exports.update=function(req, res){
    if(req.body.contructor=== Object && Object.keys(req.body).length===0){
        res.status(400).send({erro:true, message: "por favor ingrese todos los datos requeridos"});
        
    }else{
        elementomulti.update(req.params.id, new elementomulti (req.body), (err,elementomulti)=>{
            if(err){
                res.send(err);
            }else{
                res.json({
                    error:false, 
                    message: "elemento cargado con exito" +elementomulti
                });

            }

        });
    }
};

// eiminar elementos multimedias

exports.delete=function(req, res){
    elementomulti.delete(req.params.id, (err, elementomulti)=>{
        if(err){
            res.send(err);
        }
        res.json({
            error:false,
            message:"el elemento multimedia fue eliminado"
         });

    });
};

//SUBIR IMAGENES AL SERVIDOR 

///Esta funcion sirve para actualizar la imagen por ejemplo si le quiere combiar la imagen de la pelicula una vez ya exista la imagen
exports.uploadImage=function(req, res){
    var id =req.params.id;
    var img_id=req.files.imagen;
    var fileName="Imagen no subida";

     if(req.files){
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        
        elementomulti.updateImage([fileName, id] ,(err,elementomulti)=>{
            if(err){
                res.send(err);
            }else{
                res.json({
                    error:false, 
                    message: "elemento cargado con exito" +elementomulti
                });
            }

        });
      
     }else{
         return res.status(200).send({
	            message: "Error no se puede subior imagen"
            })
    }

}