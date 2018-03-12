import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

class App extends Component {
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    name: '',
    currency: 'RON',
    cost: 0,
    cost_month: 7777
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

     const { classes } = this.props;

    return (
      <div>
        <TextField
          id="number"
          label="Cost Per Hour"
          value={this.state.cost}
          onChange={this.handleChange('cost').bind(this)}
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
          onChange={this.handleChange('cost_month').bind(this)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="number"
          label="Cost Per Year"
          value={this.state.cost}
          onChange={this.handleChange('cost').bind(this)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Select
          value={this.state.currency}
          onChange={this.handleChange('currency').bind(this)}
          input={<Input name="currency" id="currency-helper" />}
>

      <MenuItem value={'RON'}>RON</MenuItem>
      <MenuItem value={'EUR'}>EUR €</MenuItem>
      <MenuItem value={'USD'}>USD $</MenuItem>

      </Select>
    </div>
    );
  }
}

export default App;
