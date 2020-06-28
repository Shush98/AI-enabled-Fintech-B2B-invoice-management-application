import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'
import {connect} from 'react-redux'
import { myStore } from './store'

 class FormDialog extends React.Component {
  constructor(props){
   super(props);
  this.state = {
    open: false,
    amount:0,
    Doc:""
  };
  // this.handleClickOpen=this.handleClickOpen();
  // this.handleClose=this.handleClose();
  // this.handleAMTChange=this.handleAMTChange(this);
  // this.handleDOCChange=this.handleDOCChange(this);
  // this.onSubmit=this.onSubmit(this);
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAMTChange=(e) =>{
    this.setState({amount: e.target.value})
    // console.log(this.state.amount)
  };

  handleDOCChange=(e) =>{
    this.setState({Doc: e.target.value})
    // console.log(this.state.Doc)

  };

  onSubmit(e) {
    
    this.handleClose();
    e.preventDefault();
    var Data=this.props.data
    Data.filter(A=>A.pk_id==this.props.SELECTED).map(n=>{
      n.actual_open_amount=this.state.amount
      n.doctype=this.state.Doc
    })
    
    myStore.dispatch({
      type: "SET_DataAgain",
      payload:Data
    })
    console.log(this.props.data)
    const DATA = {
      actual_open_amount:this.state.amount,
      doctype:this.state.Doc,
      pk_id:this.props.SELECTED
    }
    
    axios.post(`http://localhost:8080/1705076/login` ,{}, { params: DATA })
    .then(res => {
        // const persons = res.data;
        // this.setState({ persons });
        // console.log(res);
      })         
      myStore.dispatch({
        type:"SELTABLE",
        payload:[]
      })
} 

  render() {
    
    return (
      <div>
        <Button 
        autoid="modify-button"
        variant="outlined" disabled={this.props.dis}  onClick={this.handleClickOpen} 
        style={{backgroundColor:'#252C48',fontSize:13,color:this.props.colT
        ,borderColor:this.props.colT ,marginTop:'6vh'}}
        >
          Modify
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          
        >
          <DialogTitle id="form-dialog-title">Modify</DialogTitle>
          
          <DialogContent>
             <label>Open Amount ($)</label>
            <input 
            autoid="open-amount-input"
            type="number" onChange={this.handleAMTChange} value={this.state.amount} style={{paddingLeft:'20px'}} />
            <br/>
            <br/>
            <label>Document Type</label>
            <input 
            autoid="doctype-input"
            type="text" onChange={this.handleDOCChange} input={this.state.Doc}  style={{paddingLeft:'20px'}}/>
            </DialogContent>
          <DialogActions >
          <Button
          autoid="modify-cancel-button"
          variant="outlined" onClick={this.handleClose} color="primary" style={{border:'2px'}}>Cancel</Button>
            <Button
            autoid="modify-save-button"
            type="submit" value="submit" variant="outlined" onClick={(e) => this.onSubmit(e)} color="primary" >Save</Button>
            
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
  data:state.data,
  SELECTED:state.SELECTED,
  SELTable:state.SELTable
}}
export default connect(mapStateToProps)(FormDialog)