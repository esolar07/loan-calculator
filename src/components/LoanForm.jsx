import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class LoanForm extends Component 
{

    constructor(props){
        super(props);
        this.state = {
            carPrice : '',
            carDownPayment : '',
            loanDurationMonth :  '0',
            loanDurationYear : '1',
            loanInterestRate : 10.00,
            carPayment : 0,
            interestPaid : 0
        }
    }

    /*
    event handler function the sets state once an input field is set
    */
    handleInputChange = (event) => {
        const { target } = event;
        const { name } = target;
        const { value } = target;
        this.setState({
            [name]: value
        })
    }
    /*
    function to calculte the years in months
    */
    calculateLength = () => {
        const yearsToMonth = this.state.loanDurationYear * 12;
        return yearsToMonth + parseInt(this.state.loanDurationMonth);
    }

    /*
    function to calculte the month payments of the loan
    */
    payment = () => {
        let price = parseInt(this.state.carPrice - this.state.carDownPayment);
        let rate = this.state.loanInterestRate / 1200;
        let length = this.calculateLength();
        let interest = Math.pow((1 + rate), length);
        let payment = (price * rate * interest) / (interest - 1) || 0;
        let interestPaid = (payment.toFixed(2) * length) - price;
        this.setState({
            'carPayment': payment.toFixed(2),
            'interestPaid' : interestPaid.toFixed(2)
        });
    }
    
    render(){
        return(
            
            <Form>
                <h4 className="text-center"> {this.props.header}</h4>

                <div className='py-2'>
                    { 
                        this.state.carPayment !== 0 && this.state.interestPaid !== 0?
                        <div className='text-center alert alert-success text-dark'>
                            <h6>Estimated Payment</h6>
                            <h5 className='font-weight-bold'>{` $${this.state.carPayment} / mo`}</h5>
                            <h6>Total Interest Paid</h6>
                            <h5 className='font-weight-bold'>{`$${this.state.interestPaid}`}</h5>
                        </div>
                        :
                        <p></p>
                    }
                </div>
                <div className='mt=5' role='loan calculator '>
                    <FormGroup>
                        <Label for="car-price">Car Price</Label>
                        <Input 
                            type="number" 
                            min='0'
                            name="carPrice" 
                            id="car-price" 
                            aria-describedby="secondNumberHelp"
                            placeholder="Enter price of the car" 
                            onBlur={this.handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="car-downpayment">Car DownPayment</Label>
                        <Input 
                            type="number" 
                            min='0'
                            name="carDownPayment" 
                            id="car-downpayment" 
                            placeholder="Enter your downpayment" 
                            onBlur={this.handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>

                        <Label for="car-durationMonth">Month(s)</Label>
                        <Input 
                            type="select" 
                            name="loanDurationMonth" 
                            id="car-durationMonth" 
                            onChange={this.handleInputChange}
                            required
                        >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </Input>

                        <Label for="car-durationYear">Year(s)</Label>
                        <Input 
                            type="select" 
                            name="loanDurationYear" 
                            id="car-durationYear" 
                            onChange={this.handleInputChange}
                            required
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </Input>

                    </FormGroup>

                     <FormGroup>
                        <Label for="car-interestRate">Interest Rate</Label>
                        <Input 
                            type="number"
                            min='0'
                            name="loanInterestRate" 
                            id="car-interestRate" 
                            defaultValue={this.state.loanInterestRate}
                            onBlur={this.handleInputChange}
                            required
                        />
                    </FormGroup>
                    <div className='btn__container'>
                        <Button 
                            className='btn__submit'
                            color="primary"
                            onClick={()=> this.payment()}
                        >Calculate
                        </Button>
                    </div>
                </div>
            </Form>
        )
    }



}

export default LoanForm;
