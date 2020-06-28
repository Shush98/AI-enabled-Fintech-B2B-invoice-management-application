import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { connect } from 'react-redux'
import {Button} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { myStore } from './store'


const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
class EnhancedTableToolbar extends React.Component {

   constructor(props)
   {
       super(props);
   }
  

    // FlaskCall()
    // {
    //    const dataNew={
    //      'id':'1705076',
    //      'data':this.props.RowData
    //    }
    //    axios.post('http://localhost:5000/predict?', {},{
    //      header:{'Content-Type':'application/json'},
    //      params:{
    //        data:dataNew
    //      }
    //    })
    //   .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });
  
    // }
  
    render(){
  
    
    const { numSelected, classes } = this.props;
  
    
  
    return (
      <Toolbar style={{backgroundColor:'#252C48'}}
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          
            <Typography variant="h6" id="tableTitle" style={{color:'white'}}>
              Invoices
            </Typography>
          
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Button 
            autoid="predict-button"
            style={{backgroundColor:'rgb(93,175,240,0.5)',fontSize:13,color:'white',borderColor:'rgb(93,175,240,0.5)'}}
            onClick={()=>{
              const dataNew={
                "id":1705076,
                "data":this.props.RowData
              }
              console.log(dataNew)
              axios.post('http://localhost:5000/predict?',{},{
                header:{'Content-Type':'application/json'},
                params:{
                  data:{
                    "id":1705076,
                    "data":this.props.RowData
                
                  }
                  
                  
                }
              })
             .then((response) => {
               console.log(response);
               var tempData=this.props.data;
               for(let i=0;i<this.props.RowData.length;i++)
               {
                   if((response.data[i].predictions>=response.data[i].actual_open_amount) ||((response.data[i].actual_open_amount-response.data[i].predictions)<100))
                     {
                       tempData[this.props.RowData[i].pk_id-1].predictions=response.data[i].actual_open_amount.toFixed(2);
                       tempData[this.props.RowData[i].pk_id-1].predicted_payment_type="Fully Paid";
                     }
                    else{
                        tempData[this.props.RowData[i].pk_id-1].predictions=response.data[i].predictions.toFixed(2);
                       tempData[this.props.RowData[i].pk_id-1].predicted_payment_type="Partially Paid";
                    } 
                   
               }
               myStore.dispatch({
                type: "SET_DataAgain",
                payload:tempData
              })
              console.log(tempData)
              myStore.dispatch({
                type: "FETCH_ROW_DATA",
                payload:[]
              })
             }, (error) => {
               console.log(error);
             });
            }}
            
            >PREDICT</Button>
          ) : (
            <Button disabled='true' style={{backgroundColor:'gray',fontSize:13,color:'white',borderColor:'gray'}}>PREDICT</Button>
          )}
        </div>
      </Toolbar>
    );
          }
  
          
  
  }
  // const mapStateToProps = state => {
  //   return{
    
    
  //   RowData:state.RowData
  // }}
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };

  const mapStateToProps = state => {
    return{
            RowData:state.RowData,
            data:state.data
  }}
  
export default connect(mapStateToProps)(withStyles(toolbarStyles)(EnhancedTableToolbar));
  