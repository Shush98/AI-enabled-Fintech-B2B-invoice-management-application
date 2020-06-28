import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import Professor from './professor'
import { Button } from '@material-ui/core'
import backButton from '../assets/navigate_before.svg'
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar2(props) {
  const { classes } = props;
  const MStyle={
    backgroundColor:'#1B1F38',
    color:'white'
  }

  let CustName='';
  props.SmallData.filter(A=> A.customer_number==props.val).map(n=>{
    CustName=n.customer_name
  })
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar style={MStyle}>
          <Grid container spacing={40}>
             <Grid item xs={0.5}>
               <div>
               <Button
               autoid="navigation-back-button"
               component={Link} to={`/`}>
               <ArrowBackIcon  style={{color:'white'}}/>
               </Button>
               </div>
             </Grid>
             <Grid item  xs={4.5}>
               <Grid container >
                  <h2 
                  autoid="customer-name"
                  style={{marginBottom:'0px',marginTop:'1vh'}}>{CustName}</h2>
               </Grid>
               <Grid container >n
                  <h5 
                  autoid="customer-number"
                  style={{marginTop:'0px',marginBottom:'1vh'}}>{props.val}</h5>
               </Grid>
             </Grid>
             <Grid item xs={5}>
               <Button varient='contained'  style={{backgroundColor:'orange',height:'20px'
               ,marginBottom:'5vh'}}>Receivables Dashboard</Button>
             </Grid>
             <Grid item xs={2} >
               <Professor  />
             </Grid>  
          </Grid>  
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar2.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return{
  
  SmallData:state.SmallData,
  val:state.val
  
}}

export default connect(mapStateToProps)(withStyles(styles)(SimpleAppBar2));