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
 accessKeyId: 'ASIASNVVKT7MKL7GQ4AA',
 secretAccessKey: 'GTCfafsmrwefT+jfwEhnk7SrFqK09wbuXGEnlbzn',
 sessionToken: 'FQoGZXIvYXdzEAMaDBu0gCsJiqYh6fNfXyL8BGINQWbcTs8Pre2nLl6HitdxdD5xjBxOEwL/pAlkIcDSCF8kVTKKnLSOGDsDnrWn6z+Wv4K+NLEwgskAjAcNiHLV5OAf2xYur2Nt36FzGehjfkiG5dW8wa72nL1KGiTNyN8J7X9v7EApiiofS5oqY/FN2TJLZETTzBxttyOAPTiDEy5Vl9YR95i14t6AWZSK+h5flsefAghu/1gZC+JFLKFAyJQyZFPAtykkwSsQy+hyA94UcJqKmzdOFcREm8yJ03QCWxA4l5GcRvO04HeEttF9w5VIIeU1OF2ACDRyZ9BpfKeEj5yFgIWt4YvL8Czp0Ic2Ino4+yaUZHOA1eRCUZO+oubE9rdrmaDvOJ2ae34nJNsSvOChhlrCNpzYAFUE2oBZybFL1P/VV+KCOWce/MMdxpq9UN7+ffKkh6K3qt45lXr90klC1wbAYi+ZzNlCSnh+BTT/AVoPzZ1dNhFF9tsf/BDgYzd+OKvzzfE+hPs38Fgi8cFP6KkwmT1J/CXZFVZ1jsQDyZv2aVN8f0pmsEZPRkpLMzL60vcBuzhhaBJfz5CG9t9DTcfSt7nQT+Ziyy00G3W9YXOPnLXFEX8WVOda9xcKEDJtNmLfH+aNtt8921kP3V/L2fxmR0t6+kLReTzygu3WOTWejDXIyYE4dtqObJvt1ye47csKNkCCG/l4+x0sJCMkbnf1Sb+w3eeDjuIYjN6jPPX/g5THZLjeytLnNhD6kNn2Eyl5tpnNIIwYRl49ij09cZj33eJmBeVylMHhy5bj1QgUNaylB5sTqbazDo/F7PoPXFpzdAx6OQ8bVOVd7q8I4MNjdf5pEFEzHH/KPt9RiANdXev4NCiK3unqBQ==',
 Bucket: 'akashsuper2000'
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
  bucket: 'akashsuper2000',
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
  host: "database-1.cs3qjthqb1zr.us-east-1.rds.amazonaws.com",
  user:"admin",
  password:"akash2000",
  database: "form"
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
