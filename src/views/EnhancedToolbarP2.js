import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {Button, Grid} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { myStore } from './store'
import FormDialog from './FormDialog'
import { CSVLink } from "react-csv";


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
      // flex: '0 0 auto',
    },
  });
class EnhancedTableToolbar2 extends React.Component {
    constructor(props)
    {
      super(props);
      this.state={
        
      }
    
  }
    
    buttonComponent(CSV)
    {
        if(this.props.SELECTED.length===0)
        {
             return(
                <div> 
                <Grid container spacing={16} >
                <Grid item xs={1.5}>        
                <FormDialog  dis={true} colT="gray" style={{marginTop:'1vh'}}/>
                </Grid>
                <Grid item xs={10.5}>
                <Button 
                autoid="export-button"
                variant="outlined" disabled='true' 
                style={{backgroundColor:'#252C48',fontSize:13,color:'gray'
                ,borderColor:'gray',marginTop:'6vh'}}>
                <CSVLink
                  style={{color:'gray',textDecoration:'none'}}
                  data={CSV}
                  filename={"1705076_exportedData.csv"}
                >
                 Export
                 </CSVLink>
                </Button>
                </Grid>
                </Grid>
                 </div>
             );
        }
        else if(this.props.SELECTED.length===1)
        {
            return (
                <div>
                <Grid container spacing={16}>
                <Grid item xs={1.5} >    
                <FormDialog  dis={false} colT="rgb(93,175,240,1)"/>
                </Grid>
                <Grid item xs={10.5}>
                <Button 
                autoid="export-button"
                variant="outlined" style={{backgroundColor:'#252C48'
                ,fontSize:13,color:'rgb(93,175,240,1)',borderColor:'rgb(93,175,240,1)'
                ,marginTop:'6vh'}}>
                <CSVLink
                style={{color:'rgb(93,175,240,1)',textDecoration:'none'}}
                data={CSV}
                filename={"1705076.csv"}
                >
                Export
                </CSVLink>
                </Button>
                </Grid>
                </Grid>
                </div>

            );
        } 
        else
        {
            return(
                <div>
                      
                <Grid container spacing={16}>  
                <Grid item xs={1.5} >  
                <FormDialog  dis={true} colT="gray"/>
                </Grid>
                <Grid item xs={10.5}>
                <Button 
                autoid="export-button"
                variant="outlined" style={{backgroundColor:'#252C48'
                ,fontSize:13,color:'rgb(93,175,240,1)',borderColor:'rgb(93,175,240,1)'
                ,marginTop:'6vh'}}
                >
                <CSVLink
                style={{color:'rgb(93,175,240,1)',textDecoration:'none'}}
                data={CSV}
                filename={"1705076.csv"}
                >
                Export
                </CSVLink>
                </Button>
                </Grid>
                </Grid>
                      
                </div>
            );
        }
    }
    render()
    { 
      
      // console.log(this.props.SELECTED)
      const { numSelected, classes} = this.props;
      myStore.dispatch
      ({
          type:'SEL_ROW',
          payload:numSelected
      })
      var csvData=[]
      this.props.data.filter(A=>this.props.SELECTED.indexOf(A.pk_id)!=-1).map(n=>{
           csvData.push(n);
      })


      let TotAmt=0;
      let TotOI=0
      console.log(this.props.val)
      console.log(this.props.SmallData)
      console.log(this.props.SmallData.filter(A=> A.customer_number==this.props.val))
      this.props.SmallData.filter(A=> A.customer_number==this.props.val).map(n=>{
        
        TotAmt=n.actual_open_amount
        TotOI=n.isOpen
        console.log(TotAmt)
        console.log(TotOI)
      })
      if(TotAmt>=1000000)
        {
           TotAmt=(TotAmt/1000000).toFixed(2)  + "M"
        }
      else if(TotAmt>=1000)
      {
        TotAmt=(TotAmt/1000).toFixed(2)  +"K"
      }
    return (
      <div>
      
      <Toolbar style={{backgroundColor:'#252C48'}}
        className={classNames(classes.root, {
          [classes.highlight]: numSelected.length > 0,
        })}
      >
        
            <Grid container spacing={16}>
            <Grid item xs={9}>           
              {this.buttonComponent(csvData)}
            </Grid>
            <Grid item xs={1.5} style={{marginRight:'5vw'}}>
              <Grid container>
                 <h1 
                 autoid="total-open-invoices-customer"
                 style={{color:'white',marginBottom:'0px'}}>{TotOI}</h1>
              </Grid>
              <Grid container>
                 <h6 style={{color:'white',marginTop:'0px'}}>Total Open Invoices</h6>
              </Grid>  
            </Grid>
            <Grid item xs={1.5}>
              <Grid container>
                 <h1 
                 autoid="total-open-amount-customer"
                 style={{color:'white',marginBottom:'0px'}}>{TotAmt}</h1>
              </Grid>
              <Grid container>
                 <h6 
                 
                 style={{color:'white',marginTop:'0px'}}>Total Opem Amount</h6>
              </Grid>
               
            </Grid>
            </Grid>
        
        
      </Toolbar>
      </div>
    );
        }
  };
  
  EnhancedTableToolbar2.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };
  const mapStateToProps = state => {
    return{
    SmallData:state.SmallData,  
    data:state.data,
    SELECTED:state.SELECTED,
    val:state.val
  }}
  export default connect(mapStateToProps)(withStyles(toolbarStyles)(EnhancedTableToolbar2));