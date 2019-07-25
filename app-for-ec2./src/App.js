import React, { Component } from 'react';
import './bootstrap.css';
import './App.css';

class App extends Component {
  state = {
    name: '',
    email: '',
    title: '',
    fund: '',
    url: '',
    type: '',
    copls: '',
    amount: '',
    revdate: '',
    date: '',
    rev: '',
    attempt: '',
    response: ''
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      name: document.getElementsByName('name')[0].value,
      email: document.getElementsByName('email')[0].value,
      title: document.getElementsByName('title')[0].value,
      fund: document.getElementsByName('fund')[0].value,
      url: document.getElementsByName('url')[0].value,
      type: document.getElementsByName('type')[0].value,
      copls: document.getElementsByName('copls')[0].value,
      amount: document.getElementsByName('amount')[0].value,
      revdate: document.getElementsByName('revdate')[0].value,
      date: document.getElementsByName('date')[0].value,
      rev: document.getElementsByName('rev')[0].value,
      attempt: document.getElementsByName('attempt')[0].value
    });
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: this.state.name, email: this.state.email, title: this.state.title, fund: this.state.fund, url: this.state.url, type: this.state.type, copls: this.state.copls, amount: this.state.amount, revdate: this.state.revdate, date: this.state.date, rev: this.state.rev, attempt: this.state.attempt, response: this.state.response}),
    });
    const body = await response.text();

    this.setState({response: body});
    
  };
  
render() {

      return (
          <div className='Container'>

          <div className='Headdiv'>
            <h1 className='Heads'>Proposal Submission Form</h1>
          </div>
          <div className='Content'>
          <p className='Desc'>Hi CB.EN.U4CSE17105@cb.students.amrita.edu, when you submit this form, the owner will be able to see your name and email address.</p>
          <p className='Desc'>* Required</p>

          <form onSubmit={this.handleSubmit}>
            
            <div className='FormGroup'>
            <span className='Subheads'>1. Name of the PI in Amrita * </span>
            <input className='Boxes' type="text" required pattern='^[a-zA-Z]+$' name='name' placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>2. Email Address of PI * </span>
            <input className='Boxes' name='email' type="text" required pattern='^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$' placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>3. Title of the proposal * </span>
            <input className='Boxes' name='title' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>4. Funding Agency * </span>
            <input className='Boxes' name='fund' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>5. URL of the call for proposal * </span>
            <input className='Boxes' name='url' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>6. Type of the call * </span>
            <p className='Desc'>(International, Travel grant etc)</p>
            <input className='Boxes' name='type' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>7. Co-Pls * </span>
            <p className='Desc'>For Co-Pls not in CSE, mention their affiliation (e.g. Somasundaram, Maths, Amrita, Dr Bharadwaj, Depart of ECE, NUS, Singapore etc)</p>
            <input className='Boxes' name='copls' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>8. Amount requested from India side * </span>
            <input className='Boxes' name='amount' type="text" required pattern='^[0-9]+$' placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>9. Proposal review submission date * </span>
            <input className='Boxes' name='revdate' type="date" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>10. Proposal submission date * </span>
            <input className='Boxes' name='date' type="date" placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>11. Review comments and the status (whether incorporated) * </span>
            <input className='Boxes' name='rev' type="text" required placeholder='Enter your answer'/>
            </div>

            <div className='FormGroup'>
            <span className='Subheads'>12. Number of attempts * </span>
            <p className='Desc'>For a fresh proposal, the value shall be 1 and for re submission, enter the attempt number</p>
            <input className='Boxes' name='attempt' type="text" required placeholder='Enter your answer'/>
            </div>
            
            <input className="btn-lg btn" type="submit"/>

            <p>Thank you for the response {this.state.response}!</p>
        
        </form>
        </div>
        </div>
      );
    }
}

export default App;