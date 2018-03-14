import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const monthFormula = 8 * 21;
const yearFormula = monthFormula * 12;

const conversions = {
  'RON': {},
  'EUR': {},
  'USD': {},
};

conversions['RON']['EUR'] =  4.7;
conversions['RON']['USD'] =  3.8;
conversions['EUR']['USD'] =  0.8;
conversions['EUR']['RON'] =  0.2;
conversions['USD']['EUR'] =  1.2;
conversions['USD']['RON'] =  0.2;

class App extends Component {
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }
  state = {
    name: '',
    currency: 'RON',
    cost: '',
    cost_month: '',
    cost_year: '',
  };

  handleCurrencyChange(event){
    this.setState({currency: event.target.value});
    let oldCurrency = this.state.currency;
    let newCurrency = event.target.value;

    let conversionRate = 1;

    if (oldCurrency !== newCurrency) {
      conversionRate = conversions[oldCurrency][newCurrency];
    }
    this.setState({
      cost: Math.round(this.state.cost / conversionRate * 100) / 100,
      cost_month: Math.round(this.state.cost_month / conversionRate * 100) / 100,
      cost_year: Math.round(this.state.cost_year / conversionRate * 100) / 100,
    });


  };

  resetFields(event) {
    this.setState({
      cost: '',
      cost_month: '',
      cost_year: '',
      name: '',
      currency: 'RON',
    });
  }

  handleCostChange(formula) {
    return function(event) {
      this.setState({
        cost_year: Math.round(event.target.value * formula * yearFormula * 100) / 100,
        cost_month: Math.round(event.target.value * formula * monthFormula * 100) / 100,
        cost: Math.round(event.target.value * formula * 100)/ 100,
      });
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {

    return (
      <div>
        <TextField
          id="number"
          label="Cost Per Hour"
          value={this.state.cost}
          onChange={this.handleCostChange(1).bind(this)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="number"
          label="Cost Per Month"
          value={this.state.cost_month}
          onChange={this.handleCostChange(1/monthFormula).bind(this)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="number"
          label="Cost Per Year"
          value={this.state.cost_year}
          onChange={this.handleCostChange(1/yearFormula).bind(this)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Select
          value={this.state.currency}
          onChange={this.handleCurrencyChange}
          input={<Input name="currency" id="currency-helper" />}
>

      <MenuItem value={'RON'}>RON</MenuItem>
      <MenuItem value={'EUR'}>EUR €</MenuItem>
      <MenuItem value={'USD'}>USD $</MenuItem>

      </Select>
      <Button variant="raised" color="primary"
        onClick={this.resetFields}>
        Reset
      </Button>
    </div>
    );
  }
}

export default App;
