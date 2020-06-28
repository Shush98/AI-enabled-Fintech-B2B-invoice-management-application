import React, { Component } from 'react';
import theme from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import Cards from './Card'
import Card1 from './Card1'
import Card2 from './Cards2'
import Card3 from './Card3'
import {Grid} from '@material-ui/core';
import SimpleAppBar from './SimpleAppBar'
import Table2 from './Table2'
import Table from './Table'
import Highcharts from 'highcharts'
import crossfilter from 'crossfilter2';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import  {setData}  from './action';
import { myStore } from './store'

 const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  styles1: {
    color: 'white',
    textAlign:'center'
  },
});



class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data :[],
      Rows1:[],
      Filters:0     

    }
    
  }

  componentDidMount()
   {
    

      console.log(this.props.data)
  
      var Cases = crossfilter(this.props.data);
    
    var BCode = Cases.dimension(d => d.business_code);
 
    
    var TotalCust = BCode.group().reduceCount(d=>d.pk_id);
    var TotalAR=BCode.group().reduceSum(d=>d.actual_open_amount)
    var TotalIO=BCode.group().reduceSum(d=>d.isOpen)
    var Avg=BCode.group().reduceSum(d=>d.dayspast_due)
    function TotalCUST()
    {
      var TOT=0
      var gdata=TotalCust.all();
      gdata.forEach(d=>{
        TOT+=d.value;
      })
      return TOT
    }
    var TC=TotalCUST();

    function TotalSumAVG()
    {
      var TOT=0
      var gdata=Avg.all();
      gdata.forEach(d=>{
        TOT+=d.value;
      })
      return Math.round(TOT/TC)
    }
    myStore.dispatch({
      type: "SET_TAD",
      payload:TotalSumAVG()
    })
    function TotalAvgSum(sel)
         {
           var TOT=0
           var i=0
           var TotInv=0
           var gdata=Avg.all();
           var tdata=TotalCust.all();
           gdata.forEach(d => {
               
              sel.forEach(s=>{
                  if(d.key===s.category)
                  {
                  TOT+=d.value;
                  TotInv+=tdata[i].value;
                }
              })
              i++;
             
              
           })

           return Math.round(TOT/TotInv)
         }
    function TotalSumIO()
         {
           var TOT=0
           
           var gdata=TotalIO.all();
           gdata.forEach(d => {
               TOT+=d.value;
            })
           return TOT
         }
    myStore.dispatch({
          type: "SET_TIO",
          payload:TotalSumIO()
        })
    function TotalIOSum(sel)
        {
          var TOT=0
          var gdata=TotalIO.all();
          gdata.forEach(d => {
             sel.forEach(s=>{
                 if(d.key===s.category)
                 TOT+=d.value;
             }) 
             
          })
          return TOT
        }         
    function TotalSum()
         {
           var TOT=0
           
           var gdata=TotalAR.all();
           gdata.forEach(d => {
               TOT+=d.value;
            })
            if(TOT>=1000000)
        {
           TOT=(TOT/1000000).toFixed(2)  + "M"
        }
      else if(TOT>=1000)
      {
        TOT=(TOT/1000).toFixed(2)  +"K"
      } 
           return TOT
         }
    myStore.dispatch({
          type: "SET_TAR",
          payload:TotalSum()
        })    
    function TotalAmtSum(sel)
         {
           var TOT=0
           var gdata=TotalAR.all();
           gdata.forEach(d => {
              sel.forEach(s=>{
                  if(d.key===s.category)
                  TOT+=d.value;
              }) 
              
           })
           if(TOT>=1000000)
        {
           TOT=(TOT/1000000).toFixed(2)  + "M"
        }
      else if(TOT>=1000)
      {
        TOT=(TOT/1000).toFixed(2)  +"K"
      } 
           return TOT
         }
    function prepareDataForHighcharts(groups){
        var categories = [];
        var data = [];
        var gdata = groups.all();
        gdata.forEach(d => {
            categories.push(d.key);
            data.push(d.value);
        });

        return {
            categories: categories,
            data: data
        }
    }
    
    
    
    var tempObject2 = prepareDataForHighcharts(TotalAR);

    
    
    // console.log(this.props.loading)
    Highcharts.chart({
      
      chart: {
        backgroundColor:'#252C48',
        renderTo: 'business_code',
        type: 'bar',
        height:'2000vh',
        
        scrollablePlotArea: {
          
          maxWidth:500,
          
          scrollPositionY: 1
      }
        
    },
    
    title: {
        text:'Total Amount by Business Code',
        style:{
          color:'white'
        }
    },
    xAxis: {
       
        categories: tempObject2.categories,
        labels:{
          style:{
            color:'white'
          }
        }  
    },
    yAxis: {
        
        labels: {
          enabled: false
      }
    },
    plotOptions: {
    column: {
    pointPadding: 0.2,
    pointWidth:'50px',
    borderWidth: 0
    },
    
    series:{
            point:{
                events:{
                    click: function(){
                        this.select(null,true);
                        var selectedPoints = this.series.chart.getSelectedPoints();
                        
                        var FilterPoints = [];
                        for(let index=0; index<selectedPoints.length;index++)
                        {
                            FilterPoints.push(selectedPoints[index].category);
                        }
                        
                        function multivalue_filter(values){
                            return function(v){
                                return values.indexOf(v) !==-1;
                            }
                        }
                        myStore.dispatch({
                          type:"TABLE_CHART",
                          payload:FilterPoints
                        })
                        if(FilterPoints.length>0){
                            BCode.filterFunction(multivalue_filter(FilterPoints));
                            myStore.dispatch({
                              type: "SET_DATA",
                              payload:FilterPoints.length
                            })
                            myStore.dispatch({
                              type: "SET_TAR",
                              payload:TotalAmtSum(selectedPoints)
                            })
                            myStore.dispatch({
                              type: "SET_TIO",
                              payload:TotalIOSum(selectedPoints)
                            })
                            myStore.dispatch({
                              type: "SET_TAD",
                              payload:TotalAvgSum(selectedPoints)
                            })
                            
                        }
                        else{
                          BCode.filterAll();
                          myStore.dispatch({
                            type: "SET_TAD",
                            payload:TotalSumAVG()
                          })
                          myStore.dispatch({
                            type: "SET_TIO",
                            payload:TotalSumIO()
                          })
                          myStore.dispatch({
                            type: "SET_TAR",
                            payload:TotalSum()
                          })
                          myStore.dispatch({
                            type: "SET_DATA",
                            payload:51
                          })
                        } 
                          

                        
                        
                        
                    }
                }
            }
        }
    
    },
    series: [{
        name: 'Count',
        data: tempObject2.data,
        color:'rgb(93,175,240,0.5)'
    }]
    });
   }

  render() {
    const mahStyle={
      paddingLeft:"20px",
      paddingRight:"20px",
      padding: theme.spacing.unit*2
    }
    const MStyle={
      paddingLeft:"1vw",
      paddingRight:"1vw"
     
    }
    
    
    
    
    
    return (
      
      <div>
        <SimpleAppBar />
        <Grid container >
          
              
          
          <Grid item xs={12}>
               <Grid container spacing={16} style={mahStyle}>
                  <Grid item xs={3} >
                    <Cards keyss="Total Customer"  />
                  </Grid>
                  <Grid item xs={3} >
                    <Card1 keyss="Total OpenAR"  />
                  </Grid>
                  <Grid item xs={3} >
                    <Card2 keyss="Average Days Delay"  />
                  </Grid>
                  <Grid item xs={3} >
                    <Card3 keyss="Total Open Invoices"/>
                  </Grid>
                </Grid>
          </Grid>
          <Grid item xs={12}  >
                 <Grid container style={MStyle} >
                 <Grid item xs={4} >
                   <Grid container style={{width:"31.6vw",height:"28.5vh",backgroundColor:'#252C48',marginBottom:'2.5vh'}}>
                   
                    <Paper style={{width:'31.6vw',height:'28.5vh',overflowY:'scroll'}}>
                    <div 
                    autoid="companycode-chart"
                    id="business_code">
                    </div>
                    </Paper>

                   </Grid>
                   <Grid container style={{width:"31.6vw",height:"35vh" ,backgroundColor:'#252C48'}}>

                         <Table ROWS={this.state.Rows1} style={{height:"30vh"}}/>

                   </Grid> 
                 </Grid>
                 <Grid item xs={8} style={{backgroundColor:'#252C48',width:"100%",height:'66vh'}}>
                   
                   <Table2 DATA={this.props.data} style={{width:"140vw"}}/>
                   
                 </Grid>
                 </Grid>  

                    
                    
                    
                    </Grid>
                   </Grid>


       <Footer/>
       </div>
      
      
    );
      
  }
}



const mapStateToProps = state => {
  return{
  loading:state.loading,  
  Tcust:state.Tcust,
  data:state.data,
  TAR:state.data,
  SmallData:state.SmallData,
  loading1:state.loading1,
  FilterP:state.FilterP
}}
const mapDispatchToProps =dispatch=> {
  return{
   setData:(payload)=> dispatch(setData(payload))
 }}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollectorDashboard));
