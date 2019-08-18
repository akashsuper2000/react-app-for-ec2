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
 accessKeyId: 'ASIASNVVKT7MIENWCRQN',
 secretAccessKey: 'ZRaxBt3ujVkhO3z1noXQUt+Z8UktVV6fVU/X2svQ',
 sessionToken: 'FQoGZXIvYXdzEPT//////////wEaDExbRyz2pQXoN6aS/yL8BCBmGDbUSb+xwdsXLNX7ZYyuMxIiP+V0zBBPqYtSuPBFfffAYJyWaPA0gWJwYn/a9hf3yoj+rlJiDcEFTaP+vSGV+WCdWaAsJn+4X0IPjHeNBlMkI7Yd7luizm34wASrXOP43eH6KwSWV9ZJQjUmp6fi9y5IsZJbskz5msenkEGEkNdYByyS3XmbAfsJ/3qig3tBJTOz8WopC3VThCX12e9oWvIWjNJInBdpe+9bpbNQiMxUJDYsZ+Z7AsWc/SKiX3c3fYayyfXAO+YmF45Yts5gD6ZPgF2Pq2z2QJR5suvHOgP95RCaPvt+tS0qDk23yJNjcRirapx+NLhpvAEOyHQGN0jmzihSH9kUnLkzHYzwghtUzhLUvtqLAlu/4LZyR66nCEyk3kQAwBjK92AEBxZdnqVEKnPfDOXCk8HEFnWrGmmVqE+oibrhJY7NtZ2QcfeCUGLN3SW2WqUQ93ZgOVVHBDlWiUY4NrjHto0MZROwgECv3qMjBc08MfliRSdBSygI1K14fy3I/HuI/VtsWJ1/Boh9YzDbt1MFexqWBIZBXmw4lVn6BklsLvHjskQ8mKiIuLJB4koMuL4IByGIRtR0b0nnDESA7Z/oPbs5zPB7lacLq+iHqGxWP1NXCTkCUsYjlnu8UVC9xOPBkL3cu7pCKJzvL4aW5iWirzLttXiSEW6/ud5wdQKY8vJEf5xfS9M18RBY0c/pNssH3ZbWgQl19TT/d76/EvphNTL0wALoBZm2r3rGg8pREU+0V3LjmJ4XwYoQ3DsaRwQuD5T9zkoPUCO2rdncmfGEMBfyezTsgaqGuFLSxpusckGpW+Y9dzfwFbxeh9qjppTFkSjwtubqBQ==',
 Bucket: 'akashsuper2000'
});





function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg|png|gif/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
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
  // acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');




app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/img',(req,res)=>{

profileImgUpload( req, res, ( error ) => {
  // console.log( 'requestOkokok', req.file );
  // console.log( 'error', error );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const imageName = req.file.key;
    const imageLocation = req.file.location;
// Save the file name into database into profile model
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
  host: "database-1.cs3qjthqb1zr.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  //host:"34.67.178.8",
  user:"admin", // user name to your mysql database
  password:"akash2000", // corresponding password
  database: "form" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("Select * from details", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('ITS OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
 //     console.log(res)
    });
  });
});



  var {seldate,days,country,states}=req.body;
 // console.log(name);
 //console.log(req.body);
    var today = new Date();
    var date3 = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

    var date1 = new Date(date3); 
    var date2 = new Date(seldate);
   
const diffTime = (date2.getTime() - date1.getTime());
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffDays-1);
diffDays=diffDays-1;

console.log(diffDays>=30);
console.log(diffDays+"<0-->"+(diffDays<0)); 
 if(diffDays>=30)
 {
console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date within 30 days from today"
   }
   res.json(JSON.stringify(abc));

 }

 else if(diffDays<0)
 {
  console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date shouldn't be before today"
   }
   res.json(JSON.stringify(abc));

 }

else
{

  var xtra="";
  var records = [[req.body.seldate,req.body.days,req.body.country,req.body.states]];
//console.log(records)
if(records[0][0]!=null)
{
  con.query("INSERT INTO details (Date,Days,Country,States) VALUES ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });

}
}


});

app.listen(5000,()=>{
  console.log("Port 5000");
})
