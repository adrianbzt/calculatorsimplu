import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class InputFields extends Component {

render() {

        return (
            <div key="a">
            <TextField
              id="number"
              label="Hourly Cost"
              value={this.props.cost}
              onChange={this.props.costHourly}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              helperText={this.props.value}
            />
            <TextField
              id="number"
              label="Monthly Cost"
              value={this.props.costMonth}
              onChange={this.props.costMonthly}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              helperText={this.props.value}
            />

            <TextField
              id="number"
              label="Yearly Cost"
              value={this.props.costYear}
              onChange={this.props.costYearly}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              helperText={this.props.value}
            />
            </div>
        )
      }
}

export default InputFields;
