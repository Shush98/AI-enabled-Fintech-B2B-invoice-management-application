import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FredaButton from '../assets/FredaButton.png'
import Send from '../assets/send-24px.svg'
import axios from 'axios';
import {  Typography,Grid,IconButton } from '@material-ui/core'
import theme from '../utils/theme'


const styles = {
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
   
    right: false,
    TY:0
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  createUi=(data,type)=>{
    if(type===0){
      
      var para = document.createElement("msg");
      para.innerHTML = data;
      para.style.fontSize="1rem";
      para.style.margin="16px";
      para.style.listStyleType="none";
      para.style.justifyContent="flex-end";
      para.style.display="flex";
      para.style.color="white";
      para.autoid="human"
      document.getElementById("chat").appendChild(para);
    }else{
      
      var para = document.createElement("msg");
      para.innerHTML = data;
      para.style.fontSize="1rem";
      para.style.margin="16px";
      para.style.maxWidth="60%";
      para.style.justifyContent="flex-start";
      para.style.display="flex";
      para.style.listStyleType="none";
      para.style.left="4px";
      para.style.color="white";
      para.autoid="ai"
      document.getElementById("chat").appendChild(para);
    }
  }

  Chatting=()=>{
    const inputval=document.getElementById("input").value.trim();
    document.getElementById("input").value="";
    this.createUi(inputval,0);


    axios.post('http://localhost:4000/chat',{message: inputval})
      
      .then((response) => {
      this.createUi(response.data.message,1);
      console.log(response)
    }, (error) => {
      console.log(error);
    });
    
}

  render() {
    

    

    return (
      <div 
      autoid="professor-button"
      >
        
        <img onClick={this.toggleDrawer('right', true)}  src={FredaButton} alt="FredaButton" />
        
        <Drawer  anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
           
          >
           
            <Grid xs={12} hidden={this.props.isClosed}>
                <div style={{ minHeight: '100%', backgroundColor:theme.palette.primary.main
                , borderTop:'solid 1px orange'}}>
                    {/* <Typography style={{ float:'left',color: 'white', padding: 5, fontSize: 20 }}>
                      PROFESSOR</Typography> */}
                    <IconButton 
                    autoid="professor-close-button"
                    style={{float:'right',color:'white'}} 
                    onClick={this.toggleDrawer('right', false)}>
                        X
                    </IconButton>
                    <div id="chat" style={{display:"flex",flexDirection:"column",width:"95%"
                    ,height:"75%", padding:"5vh", position:"relative"
                    , overflowY:"auto", overflowX:"hidden",minWidth:250,maxWidth:250, minHeight:685}}
                    >

                    </div>
                        <input id="input" type="text" 
                        autoid="professor-input-box"
                        style={{ width: "90%",position: "relative"
                        , marginTop: ".5rem"
                        , marginLeft: "8px", border: "1px solid #00c0ff", borderRadius: "20px", fontSize: ".8rem"
                        , padding: "8px", color: "white", backgroundColor:theme.palette.primary.main }}
                        placeholder="Type here..."> 
                        </input>
                        <img 
                        autoid="professor-send-button"
                        onClick={this.Chatting} src={Send} alt="Send" 
                        style={{float:'right', width: "6", position:"relative", right:30
                        , bottom:30, cursor:"pointer"}}></img>
                </div>
            </Grid>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);