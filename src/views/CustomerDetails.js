import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import queryString from 'query-string'
import SimpleAppBar2 from './SimpleAppBar2'
import Table1 from './Table1'
import Footer from './Footer'
import { connect } from 'react-redux'
import { myStore } from './store'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  hellotext: {
    fontSize: '4vw',
    color: '#FFFFFFA6',
    height: '10vh',
  },
  hellotext1: {
    fontSize: '2.5vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext3: {
    fontSize: '1vw',
    marginTop: '5vh',
    padding: '0.5vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext2: {
    fontSize: '1.2vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext4: {
    fontSize: '1.5vw',
    marginTop: '2vh',
    padding: '1vh',
    color: '#FFFFFF',
  },
  searchBtn: {
    marginTop: '2vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
});

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:''
    };
  }

  componentDidMount() {
        //  console.log(this.props.location.search)
         const values=queryString.parse(this.props.location.search)
        //  console.log(values.name)
        //  this.setState({values:values.number})
        myStore.dispatch({
          type:"VALUE",
          payload:values.number
        })
  }

  render() {
    // console.log('Data', this.props);
    const { classes } = this.props;
    return (
      <div>
           <SimpleAppBar2/>
           <Grid container style={{backgroundColor:'#252C48'}}>
             <Table1  />
           </Grid>
           <Footer/>

      </div>
      
    );
  }
}
const mapStateToProps = state => {
  return{
  
  val:state.val
}}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CustomerDetails));
