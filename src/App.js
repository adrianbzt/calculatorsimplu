import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import _ from 'lodash';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import InputFields from './InputFields';

const monthFormula = 8 * 21;
const yearFormula = monthFormula * 12;

const conversions = {
  'RON': {},
  'EUR': {},
  'USD': {},
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// conversions['RON']['EUR'] =  4.7;
// conversions['RON']['USD'] =  3.8;
// conversions['EUR']['USD'] =  0.8;
// conversions['EUR']['RON'] =  0.2;
// conversions['USD']['EUR'] =  1.2;
// conversions['USD']['RON'] =  0.2;
// conversions['RON']['RUB'] =  4.7;

class App extends Component {
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNewCurrency = this.addNewCurrency.bind(this);
    this.updateField = this.updateField.bind(this);
    this.removeCurrency = this.removeCurrency.bind(this);
    this.addCurrencyComponent = this.addCurrencyComponent.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.openCurrencyModal = this.openCurrencyModal.bind(this);
    this.closeCurrencyModal = this.closeCurrencyModal.bind(this);
  }
  state = {
    name: '',
    currency: 'RON',
    cost: '',
    cost_month: '',
    cost_year: '',
    open: false,
    openCurrency: false,
    new_currency_name: '',
    new_currency_exchange: '',
    toAddCurrency: '',
    currencies: [
      {
        value: "RON",
        label: "RON",
        exchange: 1,
      },
      {
        value: "EUR",
        label: "EUR",
        exchange: 0.21,
      },
      {
        value: "USD",
        label: "USD",
        exchange: 0.27,
      },
      {
        value: "RUB",
        label: "RUB",
        exchange: 15.33,
      },
    ],
    widgets: [
    ],
    buttons: [
      {
        gigel: "primary",
      },
    ]
  };

addCurrencyComponent(toAddCurrency) {

    // // lodash way
    // let newEntry = _.concat(
    //   this.state.widgets,
    //   {
    //     currency: 'RUB',
    //     exchange: 15.33,
    //   },
    //   {
    //     currency: 'EUR',
    //     exchange: 0.21,
    //   },
    //   {
    //     currency: 'USD',
    //     exchange: 0.27,
    //   },
    // );

    let toAdd = this.state.currencies.filter(function(obj) {
      if(obj.value === toAddCurrency) {
        return obj;
      }
    })

    // lodash way
    let newEntry = _.concat(
      this.state.widgets,
      toAdd
    );

    this.setState({
      openCurrency: false
    });

    this.setState({
      widgets: newEntry
    });
}
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
      open: false,
    });
  }

  handleCostChange(formula, exchange, event) {
      this.setState({
        cost_year: Math.round(event.target.value * formula * yearFormula / exchange * 100) / 100,
        cost_month: Math.round(event.target.value * formula * monthFormula / exchange * 100) / 100,
        cost: Math.round(event.target.value * formula / exchange * 100)/ 100,
      });
  }

  handleCostChangeOld(formula) {
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

  openModal() {
    this.setState({
      open: true
    })
  }

  closeModal() {
    this.setState({
      open: false,
      new_currency_name: '',
      new_currency_exchange: '',
    });
  }

  openCurrencyModal() {
    this.setState({
      openCurrency: true
    })
  }

  closeCurrencyModal() {
    this.setState({
      openCurrency: false,
    });
  }

  changeColor(event) {

    let values = ["secondary", "default", "primary"];

    let rand = Math.floor(Math.random() * Math.floor(values.length));

    console.log(rand)
    console.log(values[rand])

    let color = [{gigel: values[rand]}];
    this.setState({
      buttons: color
    })
  }

  addNewCurrency() {

    let currencies = this.state.currencies.map(obj => obj.value);

    let isPresent =  _.indexOf(currencies, this.state.new_currency_name);

    if(isPresent === -1) {
      // js way
      // let newEntry = this.state.currencies.concat(
      //   [{
      //   value: this.state.new_currency_name,
      //   label: this.state.new_currency_name
      //   }]
      // );

      // lodash way
      let newEntry = _.concat(
        this.state.currencies,
        {
          value: this.state.new_currency_name,
          label: this.state.new_currency_name,
          exchange: this.state.new_currency_exchange
        }
      );

      this.setState({
        currencies: newEntry
      });

    }
    this.closeModal();
  }

  removeCurrency(key) {

    return () => {

      let updatedCurrencies = _.remove(this.state.currencies, function(n) {

        if(n.value !== key) {
          return n;
        }
      });


    if(_.size(updatedCurrencies) >= 1) {
      this.setState({
        currencies: updatedCurrencies
      })
    }
    }
  }

  updateField (name) {
    return (event) => {
      this.setState( {
        [name] : event.target.value
      })
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <TextField
          id="number"
          label="Cost Per Hour"
          value={this.state.cost}
          onChange={this.handleCostChange.bind(this, 1, 1)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          helperText={this.state.currency}
        />
        <TextField
          id="number"
          label="Cost Per Month"
          value={this.state.cost_month}
          onChange={this.handleCostChange.bind(this, 1/monthFormula, 1)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          helperText={this.state.currency}
        />
        <TextField
          id="number"
          label="Cost Per Year"
          value={this.state.cost_year}
          onChange={this.handleCostChange.bind(this, 1/yearFormula, 1)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          helperText={this.state.currency}
        />
      {/*<Select
          value={this.state.currency}
          onChange={this.handleCurrencyChange}
          input={<Input name="currency" id="currency-helper" />}
          >
          {
            this.state.currencies.map((test) => {
             return <MenuItem key= {test.value} value={test.value}>{test.label}</MenuItem>
          })
          }

      </Select>
      */}
      <Button variant="raised" color="primary"
        onClick={this.resetFields}>
        Reset
      </Button>

      <Modal open={this.state.open} onClose={this.closeModal}>
        <div style={getModalStyle()} className={classes.paper}>
          <TextField
            id="number"
            label="New Currency Name"
            value={this.state.new_currency_name}
            type="text"
            onChange={this.updateField('new_currency_name')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="number"
            label="EURO Exchange Rate"
            value={this.state.new_currency_exchange}
            type="number"
            onChange={this.updateField('new_currency_exchange')}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />


        <Button variant="raised" color="primary"
          onClick={this.addNewCurrency}> Add </Button>

        <List component="nav">
          {
            this.state.currencies.map((test) => {
             return (
             <div key= {"remove-" + test.value}>

               <ListItem key= {test.value} button>
                 <ListItemText primary={test.label} />
                   <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={this.removeCurrency(test.value)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
               </ListItem>


             </div>
             )
          })
          }
        </List>

        </div>
      </Modal>

      <Modal open={this.state.openCurrency} onClose={this.closeCurrencyModal}>

        <div style={getModalStyle()} className={classes.paper}>
        <List component="nav">
          {
            this.state.currencies.map((test) => {
             return (
             <div key= {"add-" + test.value}>

               <ListItem key= {test.value} button>
                 <ListItemText primary={test.label} />
                   <ListItemSecondaryAction>
                        <IconButton onClick={() => this.addCurrencyComponent(test.value)}>
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
               </ListItem>


             </div>
             )
          })
          }
        </List>
      </div>

      </Modal>

      <Button variant="raised" color="default"
        onClick={this.openModal}>
        Settings
      </Button>

      <Button variant="raised" color="secondary"
        onClick={this.openCurrencyModal}>
        Add
      </Button>

      {
        this.state.buttons.map((test) => {
          return (
            <Button variant="raised" backgroundcolor="#673ab7" color={test.gigel} key={test.gigel} onClick={this.changeColor}>
              Click Me!
            </Button>
            //<div key={test.color} style="color:red"> Ana Are mere</div>
          )
        })
      }

      {
        this.state.widgets.map((widgetName) => {

          return (
            <InputFields key={widgetName.value}
              value={widgetName.value}
              cost={Math.round(this.state.cost * widgetName.exchange * 100) / 100}
              costMonth={Math.round(this.state.cost_month * widgetName.exchange * 100) / 100}
              costYear={Math.round(this.state.cost_year * widgetName.exchange * 100) / 100}
              costHourly={this.handleCostChange.bind(this, 1, parseFloat(widgetName.exchange))}
              costMonthly={this.handleCostChange.bind(this, 1/monthFormula, parseFloat(widgetName.exchange))}
              costYearly={this.handleCostChange.bind(this, 1/yearFormula, parseFloat(widgetName.exchange))}
              />
          )
        })
      }
    </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
