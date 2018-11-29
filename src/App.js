import React, { Component } from 'react';
import LoanForm from './components/LoanForm';
import './App.css';



class App extends Component {
  render() {
    return (
      <section className="l-loan-calculator">
        <h1 className="text-center text-light">Auto Loan Calculator</h1>
        <div className="loan-form-container">
          
          <LoanForm header='Get you instate quote now.'/>
          
        </div>
      </section>
    );
  }
}

export default App;
