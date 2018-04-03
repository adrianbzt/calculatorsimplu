import React, { Component } from 'react';
import Button from 'material-ui/Button';

class ControlPanel extends Component {

    render() {
        return (
            <div>
                <Button variant="raised" color="primary" onClick={this.props.resetFields}>
                    Reset
            </Button>

                <Button variant="raised" color="default"
                    onClick={this.props.openModal}>
                    Settings
</Button>

                <Button variant="raised" color="secondary"
                    onClick={this.props.openCurrencyModal}>
                    Add
      </Button>
            </div>


        )
    }
}

export default ControlPanel;