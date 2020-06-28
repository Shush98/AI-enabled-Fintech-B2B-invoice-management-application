import React from 'react';
import { Paper, Typography,Grid, withTheme, IconButton, InputBase } from '@material-ui/core'
import theme from '../utils/theme'
//import X from '../assets/clear-white.svg'
import Send from '../assets/send-24px.svg'
import axios from 'axios';

export default class Chat1 extends React.Component {

    createUi=(data,type)=>{
        if(type===0){
          var para = document.createElement("LI");
          para.innerHTML = data;
          para.style.fontSize=".8rem";
          para.style.margin="16px";
          para.style.listStyleType="none";
          para.style.justifyContent="flex-end";
          para.style.display="flex";
          para.style.color="white";
          document.getElementById("chat").appendChild(para);
        }else{
          var para = document.createElement("LI");
          para.innerHTML = data;
          para.style.fontSize=".8rem";
          para.style.margin="16px";
          para.style.maxWidth="60%";
          para.style.justifyContent="flex-start";
          para.style.display="flex";
          para.style.listStyleType="none";
          para.style.left="4px";
          para.style.color="white";
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
        const { classes } = this.props;
         return (
            <Grid xs={12} hidden={this.props.isClosed}>
                <div style={{ minHeight: '100%', backgroundColor:theme.palette.primary.main, borderTop:'solid 1px orange'}}>
                    <Typography style={{ float:'left',color: 'white', padding: 5, fontSize: 20 }}>PROFESSOR</Typography>
                    <IconButton style={{float:'right'}} >
                        X
                    </IconButton>
                    <div id="chat" style={{display:"flex",flexDirection:"column",width:"95%",height:"75%", padding:"8px", position:"relative", overflowY:"auto", overflowX:"hidden",minWidth:200,maxWidth:200, minHeight:695}}>

                    </div>
                        <input id="input" type="text" style={{ width: "90%",position: "relative", marginTop: ".5rem", marginLeft: "8px", border: "1px solid #00c0ff", borderRadius: "20px", fontSize: ".8rem", padding: "8px", color: "white", backgroundColor:theme.palette.primary.main }}
                             placeholder="Type here..."> 
                        </input>
                        <img onClick={this.Chatting} src={Send} alt="Send" style={{float:'right', width: "6", position:"relative", right:30, bottom:30, cursor:"pointer"}}></img>
                </div>
            </Grid>
        )
    }
}
            
