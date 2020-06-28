import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core'
import company from '../assets/companyLogo.svg'
// import FredaButton from '../assets/FredaButton.png'
import { Grid } from '@material-ui/core'
import Professor from './professor'

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  const MStyle={
    backgroundColor:'#1B1F38',
    color:'white'
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar style={MStyle}>
          <Grid container>
            <Grid item>
              <img src={company}/>
              </Grid>
              <Grid item>
          <Typography variant="h4"  color="inherit">
            ABC Products
          </Typography>
          </Grid>

          <Grid item>
          <Button varient='contained'  style={{backgroundColor:'orange',height:'20px',marginLeft:'28vw',marginBottom:'5vh'}}>Receivables Dashboard</Button>
          </Grid>
          <Grid item style={{marginLeft:'29vw'}}>
          <Professor  />
          </Grid>
          
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);