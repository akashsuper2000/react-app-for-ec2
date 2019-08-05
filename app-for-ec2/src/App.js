import React, { Component } from 'react';
import './bootstrap.css';
import './App.css';

class App extends Component {
  
  handleSubmit(e){
    e.preventDefault();
    
  };
  
render() {
      document.title='React Form'
      return (
          <div className='Container'>

          <h1 className='Heads'>Form</h1>
          <div className='Content'>

          <form action='http://localhost:5000/api' method='post'>
            
            <div className='FormGroup'>
            <span className='Subheads'>Date </span>
            <input className='Boxes' type="date" required name='date'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>Country</span>
            <select className='Boxes' name='country'>
            <option default>India</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>UK</option>
            <option>Swizerland</option>
            </select>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>Number of days</span>
            <input className='Boxes' name='days' type="text" required/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>State</span>
            <select className='Boxes' name='states'>
            <option default>TN</option>
            <option>AP</option>
            <option>MP</option>
            <option>HP</option>
            <option>Delhi</option>
            </select>
            </div>
            
            <input className="btn-lg btn btn-default" type="submit"/>
        
        </form>
        </div>
        </div>
      );
    }
}

export default App;