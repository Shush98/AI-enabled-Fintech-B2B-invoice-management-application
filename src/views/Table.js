
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { myStore} from './store'
import searchIcon from '../assets/mag-glass.svg'
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {

    // overflowX: 'auto',
    overflowY:'auto',
    flexGrow: 1,
  },
  table: {
    minWidth: 500,
  },
  search: {
    position: 'relative',
    borderRadius: "15px",
    color:'white',
    backgroundColor: '#1B1F38',

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'2px'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    
  },
  inputInput: {

    paddingLeft: theme.spacing.unit *7,
    transition: theme.transitions.create('width'),
    width: '100%',
    
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

class SimpleTable extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
      search:'',
      name:''
    }
    
  }
  handleChange = event => {
    
    this.setState({ search: event.target.value });
  };
  handleEnter=event=>{
    
    // console.log(event.target.value)
    this.setState({name:this.state.search});
  }
  componentDidMount()
  {
      this.fetchCardData();
      myStore.dispatch({
        type: "FETCH_REQUEST",
        
      })

  } 
  fetchCardData()
   {
     
    let uniqueNumber = [];
    let uniqueNames=[];
    let Amount=[];
    let countArr=[];
    
    let ii=0;
    {this.props.data.map((row)=>{    
        if(uniqueNumber.indexOf(row.customer_number) === -1)
        {
            uniqueNumber.push(row.customer_number);
            uniqueNames.push(row.customer_name);
            Amount.push(parseFloat(row.actual_open_amount));
            countArr.push(parseInt(row.isOpen));
       
        }
        else 
          {
            Amount[uniqueNumber.indexOf(row.customer_number)]=Amount[uniqueNumber.indexOf(row.customer_number)]+parseFloat(row.actual_open_amount);
            countArr[uniqueNumber.indexOf(row.customer_number)]=countArr[uniqueNumber.indexOf(row.customer_number)]+parseInt(row.isOpen);

          }

      })}
 
      let Rows=[];
      
      {uniqueNumber.map((I,idx)=>{
        var obj=
        { 
          pk_id:idx+1,
          customer_number:I,
          customer_name:uniqueNames[idx],
          actual_open_amount:Amount[idx],
          isOpen:countArr[idx]
        }
        Rows.push(obj);
      
      })
      
      }
      
      myStore.dispatch({
        type: "FETCH_SMALL_DATA",
        payload:Rows
      })
      console.log(this.props.SmallData)
   }
  
  render()
  {
    
    const {classes}=this.props
    
    console.log(this.props.loading1)
    if(this.props.loading1===true)
    {
  return (
    
    
    <Paper >
      <Toolbar
      className={classNames(classes.root)}
      style={{backgroundColor:'#252C48'}}
      
    >
      <div className={classes.title} >
      <div className={classes.root}>
      
    <div className={classes.search}>
              {/* <img src={searchIcon} alt="Search" onClick={this.handleEnter} style={{borderRadius:'15px',color:'blue',borderColor:'blue'}}/> */}
              
              <InputBase
              autoid="search-text-field"
                placeholder="Select customers by customer name or number"
                                                       
                style={{fontSize:14,border: "1px solid #00c0ff", borderRadius: "20px"}}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleEnter}
              />
                <Button
                autoid="search-icon"
                onClick={this.handleEnter.bind(this)}>
              <img src={searchIcon} alt="Search"  style={{borderRadius:'15px',color:'blue',borderColor:'blue',height:'30px',width:"30px",marginTop:'-50px'}}/>
              </Button>
            </div>
            </div>  
          
        
      </div>
      
      </Toolbar>
      <Paper style={{overflowX:'auto',overflowY:'auto',height:'27vh'}}>
      <Table style={{overflowY:'scroll', height:'30vh'}} >
        <TableHead style={{backgroundColor:'#252C48'}}>
          <TableRow >
          <TableCell style={{color:'white'}}>Customer Name</TableCell> 
          <TableCell style={{color:'white'}}> Customer Number</TableCell> 
          <TableCell style={{color:'white'}}>Open Amount</TableCell>
         
          

          </TableRow>
        </TableHead>
        
        <TableBody style={{backgroundColor:'#252C48'}} >
          {this.props.SmallData.filter(name => name.customer_name.includes(this.state.name) || name.customer_number===this.state.name).map((row) => {
            return (
            // <Link to={`/customer-dashboard?name=${row.customer_name}`}>
            <TableRow key={row.pk_id}
            //  onClick={<Link to={`/customer-dashboard?name=${row.customer_name}`}/>}
            component={Link} to={`/customer-dashboard?number=${row.customer_number}`}
            style={{color:'inherit' , textDecoration:'none'}}
            >
              <TableCell style={{color:'white'}} component="th" scope="row">{row.customer_name}</TableCell>
              <TableCell style={{color:'white'}} align="right">{row.customer_number}</TableCell>
              
              <TableCell style={{color:'white'}} align="right">{row.actual_open_amount}</TableCell>
             
            </TableRow>
            // </Link>
          );})}
        </TableBody>
        
      </Table>
    
      </Paper>
      </Paper>
    
  );
}
else return null;

}
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return{
  data:state.data,
  SmallData:state.SmallData,
  loading1:state.loading1
}}
export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));