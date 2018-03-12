import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


class App extends Component {
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCostPerHourChange = this.handleCostPerHourChange.bind(this);
    this.handleCostPerMonthChange = this.handleCostPerMonthChange.bind(this);
    this.handleCostPerYearChange = this.handleCostPerYearChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }
  state = {
    name: '',
    currency: 'RON',
    cost: 0,
    cost_month: 0,
    cost_year: 0,
  };

  handleCurrencyChange(event){
    this.setState({currency: event.target.value});
    let conversionRate;
    switch(event.target.value) {
      case 'EUR':
        conversionRate = 4.7;
      break;
      case 'USD':
        conversionRate = 3.8;
      break;
      case 'RON':
        conversionRate = 1;
      break;
      default:
        conversionRate = 1;
      break;

    }
    this.setState({
      cost: Math.round(this.state.cost / conversionRate, 2),
      cost_month: Math.round(this.state.cost_month / conversionRate, 2),
      cost_year: Math.round(this.state.cost_year / conversionRate, 2),
    });


  };

  resetFields(event) {
    this.setState({
      cost: 0,
      cost_month: 0,
      cost_year: 0,
      name: '',
      currency: 'RON',
    });
  }

  handleCostPerHourChange(event) {
    this.setState({
      cost_year: Math.round(event.target.value * 8 * 21 * 12, 2),
      cost_month: Math.round(event.target.value * 8 * 21, 2),
      cost: Math.round(event.target.value, 2),
    });
  }

  handleCostPerMonthChange(event) {
    this.setState({
      cost_year: Math.round(event.target.value * 12, 2),
      cost_month: Math.round(event.target.value, 2),
      cost: Math.round(event.target.value / 8 / 21, 2),
    });
  }

  handleCostPerYearChange(event) {
    this.setState({
      cost_year: Math.round(event.target.value, 2),
      cost_month: Math.round(event.target.value / 12, 2),
      cost: Math.round(event.target.value / 8 / 21 / 12, 2),
    });
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
          onChange={this.handleCostPerHourChange}
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
          onChange={this.handleCostPerMonthChange}
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
          onChange={this.handleCostPerYearChange}
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
