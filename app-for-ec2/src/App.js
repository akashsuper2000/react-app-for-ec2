  import React,{Component} from 'react';
  import './App.css';
  import './bootstrap.css';
  import axios from 'axios';
  import zipcodes from 'zipcodes';


  class App extends Component {


  constructor(props)
  {
    super(props);
    this.state={
      name: '',
      zip: '',
      phone: '',
      city: '',
      response:{error:{}},
      filename:''
    }

  }

  handleChange = (event) => {
      event.preventDefault();
      const {name,value} = event.target;
      this.setState({[name]:value});
      console.log(name+" "+value);
      console.log(this.state);
      // eslint-disable-next-line 
      try{
            if(this.state.zip!=''){
              var thecity = zipcodes.lookup(parseInt(this.state.zip)).city;
              this.setState({city: thecity});
            }
        }catch(e){
            console.log('error', e);        
        }
      
  }

  printstate=(e)=>
  {
    console.log(this.state);
  }

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line
    if(this.state.filename!='')
  data.append( 'profileImage', this.state.filename, this.state.filename.name );
  console.log("UPLOADING IMAGE");
  axios.post( 'http://:5000/img', data, {//fill
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       // eslint-disable-next-line
       'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
      }
     })
      .then( ( response ) => {
  if ( 200 === response.status ) {
        if( response.data.error ) {
          console.log( response.data );
          alert( response.data.error );
        } 
        else {
         let fileName = response.data;
         if(fileName==='Error: No File Selected')
         alert("Select a file!");
         // eslint-disable-next-line
         if(fileName!='Error: No File Selected')
         alert( 'File Uploaded' );
        }
       }
    else {
     // eslint-disable-next-line
   console.log( 'Please upload file'+ 'red' );
    }
    

      }).catch( ( error ) => {
       console.log( error+ 'red' );
     });
    }
    
  handleSubmit = (event) => {

  event.preventDefault();


  fetch('http://:5000/',{//fill
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    name:this.state.name,
    zip:this.state.zip,
    city:this.state.city,
    phone:this.state.phone
  })
  }).then(res=> res.json())
  .then(data=>{this.setState({response:JSON.parse(data)})})
  .then(x=>{
   if(JSON.stringify(this.state.response.error)==='null')
  { 
   alert('Record insertion done!');
  this.handleUpload(event);
  }
  else
    alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));

  })

  }


  upload=(e)=>{
    console.log(e.target.files[0]);
    this.setState({filename:e.target.files[0]});
  }



  render(){
   
    return (
      <div className='Container'>

          <h1 className='Heads'>Shipping Info</h1>
          <div className='Content'>

          <form onSubmit={this.handleSubmit}>
            
            <div className='FormGroup'>
            <span className='Subheads'>Product Name *</span>
            <input className='Boxes' type="text" onChange={this.handleChange} required name='name' id='name'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>Shipping City Zipcode *</span>
            <input className='Boxes' type="number" pattern='^[0-9]{5}$' onChange={this.handleChange} required name='zip' id='zip'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>Phone Number *</span>
            <input className='Boxes' type="number" pattern='^[0-9]{10}$' onChange={this.handleChange} required name='phone' id='phone'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>Upload an image</span>
            <input className='Boxes' style={{borderWidth: 0}} label='Upload to S3' accept='image/*' name='file' type="file" onChange={this.upload} required/>
            </div>
            
            <input className="btn-lg btn btn-default" type="submit"/>
        
        </form>
        </div>
        </div>
    );

  }}

  export default App;
