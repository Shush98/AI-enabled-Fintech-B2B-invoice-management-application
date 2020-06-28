import React, { Component } from 'react';

import './App.css';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CollectorDashboard from '../src/views/CollectorDashboard';
import CustomerDetails from '../src/views/CustomerDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {ROLL_NUMBER} from '../src/utils/constants';
import {bindActionCreators} from 'redux'
import * as myAction from './views/action'
import { myStore } from './views/store'
import { connect } from 'react-redux';
import axios from 'axios'
import { color } from 'highcharts';

const styles = (theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      backgroundColor:'#1B1F38',
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    background: theme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
});


class App extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount()
  {
    axios.get(`http://localhost:8080/1705076/login`)
    .then(res => {
      
      var data=res.data
      data.map(n=>{
        n['predictions']=null;
        n['predicted_payment_type']=null
      })
      myStore.dispatch({
        type: "FETCH_SUCCESS",
        payload:data
      })

    })
 

  }
  


  render() {
    
    const { classes, user } = this.props;
 
    // console.log(this.props.loading)  
    if(this.props.loading==true)
    {
    return (
      
      <div className={classes.mainBackground}>
        <Router basename={`/${ROLL_NUMBER}`}>
          <Switch>
            <Route exact path="/" component={CollectorDashboard} />
            <Route path="/customer-dashboard" component={CustomerDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
  else
      return (
        <div className={classes.mainBackground}>
           <h1 style={{marginLeft:'40vw',marginTop:'40vh' ,color:'white'}}>
             Please wait Data is Loading........</h1>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return{
  loading:state.loading,
  data:state.data,
  SmallData:state.SmallData
}}
const mapDispatchToProps =dispatch=> {
  return{
   myACTION:bindActionCreators(myAction,dispatch)
 }}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(App));
