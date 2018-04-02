import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ReactGridLayout from 'react-grid-layout';


class InputFields extends Component {

render() {

  let layout = [
       {i: 'a', x: 0, y: 0, w: 8, h: 3},
     ];

        return (
          // <ReactGridLayout className="layout"
          // layout={layout} cols={12} rowHeight={30} width={1200}>
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
          // </ReactGridLayout>
        )
      }
}

export default InputFields;
