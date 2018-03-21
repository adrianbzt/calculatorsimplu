import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class InputFields extends Component {

render() {

  return(
  <TextField
    id="number"
    label="Ana are mere"
    value="5"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    margin="normal"
  />
  )
}
}

export default InputFields;
