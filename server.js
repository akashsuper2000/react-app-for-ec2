const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
const s3 = new aws.S3({
 accessKeyId: '',//fill
 secretAccessKey: '',//fill
 sessionToken: '',//fill
 Bucket: ''//fill
});

function checkFileType( file, cb ){
 const filetypes = /jpeg|jpg|png|gif/;
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 const mimetype = filetypes.test( file.mimetype );
  if( mimetype && extname ){
    return cb( null, true );
  } else {
    cb( 'Error: Images Only!' );
    }
}

const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: '',//fill
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');

app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/img',(req,res)=>{

profileImgUpload( req, res, ( error ) => {
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    const imageName = req.file.key;
    const imageLocation = req.file.location;
    res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });


});

app.post('/',(req,res)=>{



var con = mysql.createConnection({
  host: "",//fill
  user:"",//fill
  password:"",//fill
  database: ""//fill
});
con.connect(function(err) {
  if (err) throw err;
  con.query("select * from details", function (err, result, fields) {
    if (err) 
      {
        console.log('error');
        throw err;
      }
    Object.keys(result).forEach(function(key) {
      var res = result[key];
    });
  });
});



  var {name, zip, city, phone}=req.body;
  console.log(name);
  console.log(req.body);
  var xtra="";
  var records = [[req.body.name,req.body.zip,req.body.city,req.body.phone]];
if(records[0][0]!=null)
{
  con.query("insert into details (name, zip, city, phone) values ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });
}


});

app.listen(5000,()=>{
  console.log("Port 5000");
})
