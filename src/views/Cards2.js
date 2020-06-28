import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {blueGrey} from '@material-ui/core/colors'
import { connect } from 'react-redux';

// const useStyles = (theme)=>({
//   root: {
//     minWidth: 275,
    
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });
const styles = {
    card: {
        minWidth: 275,
      },
      cardss: {
        color: 'white',
        
      },
      
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
  };

 function Cards(props) {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
  const myStyle={
      backgroundColor:'#252C48',
      textAlign:'center',
      
  };
  const { classes}=props;
  
  return (
      <div >
    <Card 
    autoid="average-days-delay-text-collector"
    style={myStyle}>
      <CardContent>
        <Typography style={styles.cardss} gutterBottom>
            <div>
            <h2 >{props.keyss}</h2>
            <h1 >{props.TAD} Days</h1>
            </div>
        </Typography>
        {/* <Typography variant="h5" component="h2">
          benevolent
        </Typography>
        <Typography  color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    </div>
  );
}
const mapStateToProps = state => {
 return{
  TAD:state.TAD
}}
export default connect(mapStateToProps)(Cards);