import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Header from "../../common/header/Header";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import * as Utils from '../../common/Utils';
import * as Constants from '../../common/Constants';
import { withStyles } from "@material-ui/core/styles";
import { border } from '@material-ui/system';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from "@material-ui/core/Button";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import GridList from '@material-ui/core/GridList';
import {GridListTile} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import Divider from "@material-ui/core/Divider";
import { CardActions } from "@material-ui/core";
import { FormControl, InputLabel, Input, Select, AppBar } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircle from '@material-ui/icons/CheckCircle'
import './Checkout.css';

const styles = muiBaseTheme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: muiBaseTheme.spacing(),
    marginRight: muiBaseTheme.spacing()
  },
  actionsContainer: {
    marginBottom: muiBaseTheme.spacing(2)
  },
  resetContainer: {
    padding: muiBaseTheme.spacing(3)
  },
  connector: {
    display: "none"
  },
  step: {
    marginBottom: muiBaseTheme.spacing(5)
  },
  iconContainer: {
    transform: "scale(2)",
    marginRight: muiBaseTheme.spacing(5)
  },
  formControl:{
      width:"90%",
      minWidth:120
  },
  saveAddressButton:{
      display:"block",
      marginTop:30
  },
  summaryCard:{
    marginLeft:"-10px;"
  },
  divider:{
    marginTop:"10px",
    marginBottom:"10px",
    marginLeft:"auto",
    width:"10px"
  },
  card: {
    maxWidth: 250,        
    boxShadow: "3px -3px 0px 6px rgba(255,0,102,1)",    
  },
  media: {
    height:0,
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    width:"10%"
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  CardAction:{
    marginLeft : "auto",
    flex:1
  },
  IconButton:{
    color:"#009999"
  } 
});

const access_token =sessionStorage.getItem("access-token");
const req_header = {
  "Accept": "application/json;charset=UTF-8",
  "authorization": "Bearer " +  access_token,
  "Access-Control-Allow-Origin" : "*",
  "Cache-Control":"no-cache"
}


function TabContainer(props) {
  return (
      <Typography component={'div'} variant={'body2'} style={{ padding: 8 * 3 }}>
          {props.children}
      </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function getSteps() {
return ["Delivery", "Payment"];
}
const baseURL = "http://localhost:8080/api/";


class Checkout extends Component {
  constructor(){
    super();
    this.state = {            
        value:0, 
        activeStep : 0,            
        dataAddress:[], 
        selected:0,
        dataPayments:[],
        paymentMethod:"",
        dataStates:[], 
        flatBldNo : "",
        flatBldNoRequired : 'dispNone',
        locality:"",
        localityRequired : 'dispNone',
        city:"",
        cityRequired : 'dispNone',
        pincode:"",
        pincodeRequired : 'dispNone',
        stateRequired:'dispNone',
        saveAddressSuccess : false,
        saveAddressError : 'dispNone',
        saveAddressErrorMsg : '',
        checkOutAddressRequired : 'dispNone',
        selAddress : "",        
        chcartItems:[],
        totalCartItemsValue:"",
        resDetails:null,
        onNewAddress:false,
        changeOption:"dispNone"
    };
}

renderOptions() {
  return this.state.data.map((dt, i) => {         
    return (
        <MenuItem
          label="Select a country"
          value={dt.country_code}
         key={i} name={dt.country_name}>{dt.country_name}</MenuItem>
    );
  });
}
getAddresses(baseURL, access_token){      
let data = null;
let xhrAddresses = new XMLHttpRequest();
access_token = sessionStorage.getItem("access-token");
let that = this;

xhrAddresses.addEventListener("readystatechange", function () {  
    if (this.readyState === 4) {                                      
          let address = JSON.parse(xhrAddresses.response);
          that.setState({dataAddress: address});
    }
})
xhrAddresses.open("GET", baseURL + "address/customer");
xhrAddresses.setRequestHeader("authorization", "Bearer " + access_token); //sessionStorage.getItem('access-token')
xhrAddresses.setRequestHeader("Cache-Control", "no-cache");
xhrAddresses.send(data);
}


getPaymentMethods(){
  let data = null;
  let xhrPayments= new XMLHttpRequest();
  let that = this;
  xhrPayments.addEventListener("readystatechange", function () {  
    if (this.readyState === 4) {                                      
          let paymentMethods = JSON.parse(xhrPayments.response);
          that.setState({dataPayments: paymentMethods});
    }
})
xhrPayments.open("GET", baseURL + "payment");
xhrPayments.setRequestHeader("Accept", "application/json;charset=UTF-8");
xhrPayments.send(data);
  }

getStates(){
  let data = null;
const url = baseURL + 'states'
const that = this;

Utils.makeApiCall(
  url, 
  null,
  null,
  Constants.ApiRequestTypeEnum.GET,
  null,
  responseText => {
    that.setState({
      dataStates : JSON.parse(responseText).states
    })
    }
  )
}



onStateChange = (event) => {
  this.setState({selected:event.target.value})
};

componentDidMount(){
this.getAddresses(baseURL, access_token);
this.getPaymentMethods();
this.getStates();
}
componentWillMount(){
this.setState({chcartItems:this.props.history.location.state.chcartItems});
this.setState({totalCartItemsValue:this.props.history.location.state.totalCartItemsValue});
this.setState({resDetails:JSON.parse(sessionStorage.getItem("restaurantDetails"))});
}
onExistingAddressTab=()=>{
  this.setState({onNewAddress:false});
}
onNewAddressTab=()=>{
this.setState({onNewAddress:true});
}
handleChange = (event) => {
this.setState({paymentMethod:event.target.value})
sessionStorage.setItem("paymentMethod", event.target.value);
}

flatBldNoChangeHandler = (e) => {
this.setState({ flatBldNo: e.target.value })    
}
localityChangeHandler = (e) => {
this.setState({locality : e.target.value })
}
cityChangeHandler = (e) => { 
this.setState({city : e.target.value })
}
pinCodeChangeHandler = (e) => {
this.setState({pincode : e.target.value })
}



addressClickHandler = () =>    
{
this.state.flatBldNo === "" ? this.setState({ flatBldNoRequired: "dispBlock" }) : this.setState({ flatBldNoRequired: "dispNone" });      
this.state.locality === "" ? this.setState({ localityRequired: "dispBlock" }) : this.setState({ localityRequired: "dispNone"});
this.state.city === "" ? this.setState({ cityRequired: "dispBlock" }) : this.setState({ cityRequired: "dispNone" });
this.state.pincode === "" ? this.setState({ pincodeRequired: "dispBlock" }) : this.setState({ pincodeRequired: "dispNone" });
this.state.selected === 0 ? this.setState({ stateRequired: "dispBlock" }) : this.setState({ stateRequired: "dispNone" });

if(this.state.flatBldNo === "" || this.state.locality === "" || this.state.city === "" || this.state.pincode === ""  || this.state.selected === ""){return}

let dataAddress =             
    "flatBuildingName="+ this.state.flatBldNo +
    "&locality="+ this.state.locality+
    "&city="+this.state.city+
    "&pincode="+this.state.pincode+
    "&stateUuid="+ this.state.selected;  
let that = this;
let xhrSaveAddress = new XMLHttpRequest();
xhrSaveAddress.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {              
        let saveAddressResponse = JSON.parse(this.response);
        if(saveAddressResponse.code === 'SAR-002' || saveAddressResponse.code === 'SAR-002'){
          that.setState({saveAddressError : "dispBlock"});
          that.setState({"saveAddressErrorMsg":saveAddressResponse.message});            
        }else{
          that.setState({ saveAddressSuccess: true });
          window.location.reload();                
        }
        
    }
})

xhrSaveAddress.open("POST", this.props.baseUrl + "address"+"?"+dataAddress);
xhrSaveAddress.setRequestHeader("authorization", "Bearer " + access_token);
//xhrSaveAddress.setRequestHeader("Accept", "*/*");
xhrSaveAddress.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhrSaveAddress.send (null);
}

addressChangeHandler = () => {
  this.setState({selAddress: sessionStorage.getItem("selected")});
}
checkoutHandler = () => {      
let dataItem = [];      
if(this.state.selAddress == ""){
  this.setState({saveOrderResponse : "Please select Address"})        
  this.openMessageHandler();   
  return;                        
}else if(this.state.paymentMethod === ""){
  this.setState({saveOrderResponse : "Please select payment method"})        
  this.openMessageHandler();                   
  return;
}

let orders = JSON.parse(localStorage.getItem("orders"));            
let dataCheckout = JSON.stringify({                    
    "address_id": this.state.selAddress,
    "bill": localStorage.getItem("OrderDataTotal"),
    "coupon_id": "",
    "discount": 0,
    "item_quantities": 
      orders.map(item => (
        {
        "item_id":  item.id,
        "price" : item.price,
        "quantity" : item.qty
        }))
    ,
    "payment_id": this.state.paymentMethod,
    "restaurant_id": sessionStorage.getItem("selRestaurant")        
})       
let that = this;
let xhrCheckout = new XMLHttpRequest();
xhrCheckout.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {              
        let checkoutResponse = JSON.parse(this.response);              
          that.setState({saveOrderResponse : checkoutResponse.message});
          that.openMessageHandler();                              
    }
})

xhrCheckout.open("POST", this.props.baseUrl + "order");
xhrCheckout.setRequestHeader("Authorization", "Bearer " + access_token); //sessionStorage.getItem('access-token')
xhrCheckout.setRequestHeader("Content-Type", "application/json");
xhrCheckout.setRequestHeader("Cache-Control", "no-cache");
xhrCheckout.setRequestHeader("Access-Control-Allow-Origin", "*");  
xhrCheckout.send(dataCheckout);
}
openMessageHandler = () => {
this.setState({snackBarOpen:true})  
}
handleClose = (event, reason) => {
if (reason === 'clickaway') {
  return;
}
this.setState({snackBarOpen:false})
}
getStepContent= (step) => {       

  switch (step) {
    case 0:
      return (
          <div>
              <AppBar position={"static"}>
              <Tabs className={this.props.tabs} value={this.state.value} onChange={this.tabChangeHandler}>
                  <Tab onClick={this.onExistingAddressTab} label="Existing Address" />
                  <Tab onClick={this.onNewAddressTab} label="New Address" />
              </Tabs>
              </AppBar>
              {this.state.value === 0 && 
              
                  <TabContainer>
                    {this.state.dataAddress.addresses===null?
                    <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={this.props.root}
                    >
                      <Grid container spacing={5}>
                      <GridList cellHeight={"auto"} className="gridListMain">
                  <GridListTile style={{width:"100%",marginTop:"4%"}} >
                    <span style={{fontSize:"20px"}}>There are no saved addresses! You can save an address using the "New Address" tab or using your "Profile" Menu</span>
                      </GridListTile>
           
                      </GridList>  
                    </Grid>
                  </Grid>
                    
                    :
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={this.props.root}
                    >
                      <Grid container spacing={5}>
                      <GridList cellHeight={"auto"} className="gridListMain">
                      {(this.state.dataAddress.addresses || []).map((exisAddress,index) => {
                      return (<GridListTile className={exisAddress.id===sessionStorage.getItem("selected")?"selectedAddress":"gridListTile"} id={exisAddress.id} style={{padding: '5px'}}>
                       <div className="App">
      <Card className={this.props.card} key={exisAddress.id} >
        <CardContent className="addressCard">
          <Typography
          style={{width:"100%"}}
                       variant={"h6"}
            gutterBottom
          >
            {exisAddress.flat_building_name} <br /> {exisAddress.locality} <br />
            {exisAddress.city} <br />
            {exisAddress.state.state_name} <br />
            {exisAddress.pincode} <br />
          </Typography>          
          <IconButton className="selectAddresscircle" aria-label="Select Address" onClick={()=>this.onAddressClick(exisAddress)}>            
                      {exisAddress.id===this.state.selected ? <CheckCircle style={{color:"green"}} />:<CheckCircle style={{color:"#999999"}} />}      
          </IconButton>          
        </CardContent>
        
      </Card>
    </div>
                      </GridListTile>
            );
          })}
                      </GridList>  
                    </Grid>
                  </Grid>}
                  </TabContainer>
              },
              {this.state.value === 1 && 
                  <TabContainer>
                      <div className="login">                            
                          <FormControl required className={this.props.formControl}>
                              <InputLabel htmlFor="FltBldNo">Flat/Build No.</InputLabel>
                              <Input 
                                  id="FlatBldNo"
                                  type="text"
                                  onChange={this.flatBldNoChangeHandler}  
                              />
                              <FormHelperText className={this.state.flatBldNoRequired}><span className="red">required</span></FormHelperText>
                          </FormControl><br/><br />
                          <FormControl required className={this.props.formControl}>
                              <InputLabel htmlFor="Locality">Locality</InputLabel>
                              <Input 
                                  id="Locality"
                                  type="text"
                                  onChange={this.localityChangeHandler}  
                              />
                              <FormHelperText className={this.state.localityRequired}><span className="red">required</span></FormHelperText>
                          </FormControl><br/><br/>
                          <FormControl required className={this.props.formControl}>
                              <InputLabel htmlFor="city">City</InputLabel>
                              <Input 
                                  id="City"
                                  type="text"
                                  onChange={this.cityChangeHandler}  
                              />
                              <FormHelperText className={this.state.cityRequired}><span className="red">required</span></FormHelperText>
                          </FormControl><br/><br/>                                
                          <FormControl required className={this.props.formControl}>
                              <InputLabel htmlFor="State" shrink>State</InputLabel>
                              <Select 
                                  value={this.state.selected}
                                  onChange={this.onStateChange}                                        
                                  input={<Input name="state" id="state" />} 
                                  style={{width:'200px'}} 
                                  placeholder="Select State"                                      
                                  >
                                      <MenuItem selected value="0">
                                          Select State
                                      </MenuItem>                                   
                                      {this.state.dataStates.map((state,i) => (                                                
                                      <MenuItem key={"state_" + state.id + "_" + i} value={state.id}>
                                          {state.state_name}
                                      </MenuItem>
                                      ))}
                                  </Select>
                                  <FormHelperText className={this.state.stateRequired}><span className="red">required</span></FormHelperText>
                          </FormControl><br/><br/>
                          <FormControl required className={this.props.formControl}>
                              <InputLabel htmlFor="Pincode">Pin Code</InputLabel>
                              <Input 
                                  id="Pincode"
                                  type="text"
                                  onChange={this.pinCodeChangeHandler}  
                              />
                              <FormHelperText className={this.state.pincodeRequired}><span className="red">required</span></FormHelperText>
                          </FormControl><br/><br/>
                          <FormControl className={this.props.formControl}>
                            <Typography variant="subtitle1" color="error" className={this.state.saveAddressError} align="left">{this.state.saveAddressErrorMsg}</Typography>                                                              
                          </FormControl><br /><br />
                          <Button variant="contained" style={{width:"20%",height:"40px"}} color="secondary" onClick={this.addressClickHandler} className={this.props.formControl}>
                            SAVE ADDRESS
                          </Button>                                                        
                      </div>
                  </TabContainer>
              }
          </div>
        );
    case 1:
      return (
        <div>
         <FormControl component="fieldset" className={this.props.formControl}>
         <FormLabel component="legend">Select Mode of Payment</FormLabel>
         <RadioGroup
            aria-label="Payment Method"
            name="payment"
            className={this.props.group}
            value={this.state.paymentMethod}
            onChange={this.handleChange}
          >
        {this.state.dataPayments.paymentMethods.map((payMethod,index) => (                
          <FormControlLabel value={payMethod.id} control={<Radio />} label={payMethod.payment_name} key={index}/>                
        ))}
        </RadioGroup>
        </FormControl>
        </div>
      )
    default:
      return "Unknown step";
  }
}

handleNext = () => {
  if(this.state.onNewAddress===true){
    //do nothing
  } else {
    if(this.state.activeStep===1){
      this.setState(state => ({
        activeStep: this.state.activeStep + 1,
        changeOption:"dispText"
        }));
    } else {
  this.setState(state => ({
    activeStep: this.state.activeStep + 1,
    changeOption:"dispNone"
    }));}
}
};

onAddressClick=(address)=>{
  if(address.id===sessionStorage.getItem("selected")){
    sessionStorage.setItem("selected",null);
    sessionStorage.setItem("selAddress",null);
    this.setState(state=>({
      selected:null,
      selAddress:null
    }));
  } else {
    sessionStorage.setItem("selected",address.id);
    sessionStorage.setItem("selAddress",JSON.stringify(address));
    this.setState(state=>({
      selected:address.id,
      selAddress:address
    }));

  }

  };

handleBack = () => {
  this.setState(state => ({
  activeStep: this.state.activeStep - 1
  }));
  };

handleReset = () => {
this.setState({
activeStep: 0
});
};

tabChangeHandler = (event, value) => {
this.setState({value})
};

searchRestaurantsByName = event => {        
const searchValue = event.target.value;    
};

render(){
  const { classes } = this.props;
  const steps = getSteps();
  const { activeStep } = this.state;        
  return (
    <div>
      <Header showSearch = {false} searchRestaurantsByName = {this.searchRestaurantsByName}/>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map(label => {
                return (
                  <Step key={label} className={classes.step}>
                    <StepLabel classes={{iconContainer: classes.iconContainer}}>
                      <Typography component={'div'} variant={"h5"}>
                        {label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography component={'div'}>{this.getStepContent(activeStep)}</Typography>
                      <div>
                          <div>
                          <Button style={{fontSize:"20px"}}disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                              Back
                          </Button>
                          <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                              {activeStep === steps.length - 1 ? "Finish" : "Next"}
                          </Button>
                          </div>
                      </div>               
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper><div className={this.state.changeOption}>View the summary and place your order now!<br/>
            <div ><Button style={{fontSize:"20px",marginLeft:"2%"}} onClick={this.handleReset} className={classes.button}>
                              CHANGE
                          </Button></div></div>                           
          </div>
        </Grid>
        <Grid  item xs={8} md={3}>
        <Card >        
            <CardHeader title="Summary" titleTypographyProps={{ variant: 'h4' }} />
            <div style={{marginLeft:"3%",fontSize:"200%", color:"grey",fontWeight:"bold"}}>{this.state.resDetails.restaurant_name}</div>
            <CardContent>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
    >
      {this.props.history.location.state.chcartItems.itemList.map((item, index) => {
        return(
               <Grid container item xs={12} spacing={1} key={index}>
               <Grid item xs={1}>
                   {item.item.item_type === 'VEG' ?  <FiberManualRecord style={{ color: "#008000" }}/> : <FiberManualRecord style={{ color: "#b20505" }}/>}
               </Grid>
               <Grid item xs={6}>
                   {item.item.item_name}                        
               </Grid>
               <Grid item xs={1}>
                   {item.quantity}                      
               </Grid>
               <Grid item xs={1}>               
               </Grid>
               <Grid  item xs={2}>
                   {item.item.price}                            
               </Grid>
               </Grid>);
               })
               }
                 <Grid container item xs={12}>
                 <Grid className="tileContainer" item xs={10} >                  
                 <Divider className={this.props.divider} variant="middle" /> 
                 </Grid>                                           
                 </Grid>
                    <Grid container item xs={15} >
                        <Grid item xs={5}>
                            <Typography style={{marginLeft:"3%",color:"grey",fontWeight:"bold"}} variant="h5">
                            Net Amount
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>                            
                        </Grid>
                        <Grid item xs={3}>
                        <Typography style={{marginLeft:"3%",color:"grey",fontWeight:"bold"}} variant="h5">                                                       
                            {this.props.history.location.state.totalCartItemsValue}
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>                
            </CardContent>
            <CardActions >
                <Button variant="contained" color="primary" className={this.props.classes.orderButton} onClick={this.props.checkoutHandler}>
                    Place Order
                </Button>
            </CardActions>
        </Card>
        </Grid>
      </Grid>
      <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.snackBarOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.saveOrderResponse}</span>}
                action={[              
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
    </div>
  );
}
}

Checkout.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(Checkout);