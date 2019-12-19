import React, { Component } from "react";
import Header from '../../common/header/Header';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent,CardActions} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';
import './Details.css';
import { IconButton } from "@material-ui/core";

const styles = theme => ({
  paper_big: {
    height:"auto",
    width:"100%",
    backgroundColor: "rgb(223,223,223)",
    padding: 5,
    outline: "none",

  }
});


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
        resData:[],
        locality:"",
        city:"",
        stylePath: "path/to/font-awesome/css/font-awesome.min.css",
        sum:"0.00",
        snackBarOpen:false,
        cartItems: { 
          restaurant : null, 
          itemList: [], 
          totalPrice: 0, 
          totalItemCount: 0
      },
    }
    this.apiURL = "http://localhost:8080/api/";
}


  componentWillMount() {
    let xhr_resDetails = new XMLHttpRequest();
    let dataRes = null;
    let temp = this.props.location.pathname;
    let resId = temp.split("/")[2];
    alert(resId);
    let that = this;
    xhr_resDetails.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
            const data = JSON.parse(this.responseText);
            that.setState({
              resData:data,
              locality:data.address.locality,
              city:data.address.city
            });
      }
   //   alert(that.state.resData.address.locality)
  });
  xhr_resDetails.open("GET", this.apiURL+"restaurant/"+resId);
  xhr_resDetails.setRequestHeader("Cache-Control", "no-cache");
  xhr_resDetails.send(dataRes);
  }
/*
  componentDidMount(){
    alert(this.props.location.pathname);
  }
*/

addToCart = (item, category) => {
  this.snackBarHandler("Item added to cart!");
  const addedCartItem = this.state.cartItems || { restaurant : this.state.restaurant, itemList: [], totalPrice: 0, totalItemCount: 0};
  let findIndex = null;

  // Finding item from List which already added
   let findItem = addedCartItem.itemList.find((cartItem, index) => {
       if(cartItem.item.id === item.id) {
           findIndex = index;
           return cartItem;
       }
       return undefined;
   });

   // if Already added then adding quantity and price (total)
   if(findItem !== undefined){
      findItem.quantity =  findItem.quantity + 1;
      findItem.totalItemPrice = findItem.totalItemPrice + item.price;
      addedCartItem.itemList[findIndex] = findItem;
      findIndex = null;
      addedCartItem.totalPrice = addedCartItem.totalPrice + item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
   } else {
       // If not already added then creating temp object and doing other calculations
      const cartItem = {
          quantity : 1,
          categoryName: category.category_name,
          categoryId: category.id,
          item: item,
          totalItemPrice: item.price
      }
      addedCartItem.totalPrice = addedCartItem.totalPrice + item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
      // Push items to cart
      addedCartItem.itemList.push(cartItem);
  }       
  
  // Finally updating our addedcartitem state 
  this.setState({ cartItems: addedCartItem});      
}

/**
     * @description - Remove item from cart when user click (-) button
     */
    removeAnItemFromCart = (removeCartItem, index) => {
       
      const addedCartItem = this.state.cartItems;
      // Finding item based on index
      let findItem = addedCartItem.itemList[index];
      // Updating finded item based on index
      findItem.quantity =  findItem.quantity - 1;
      findItem.totalItemPrice = findItem.totalItemPrice - findItem.item.price;
      addedCartItem.totalPrice = addedCartItem.totalPrice - findItem.item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount - 1; 
      
      // if quantity is goes less than or equal to zero - remove that item from cart
      if( findItem.quantity <= 0)  {
          addedCartItem.itemList.splice(index, 1);
          this.snackBarHandler("Item removed from cart!");
      }else{
          addedCartItem.itemList[index] = findItem;
          this.snackBarHandler("Item quantity descreased by 1!");
      }      
      // Updating cartitem in component state  
      this.setState({ cartItems: addedCartItem});  

  }

  /**
   * @description - add item from Mycart part - on (+) button click
   */
  addAnItemFromCart = (addCartItem, index) => {
      this.snackBarHandler("Item quantity increased by 1!");
      const addedCartItem = this.state.cartItems;
      // Find item based on selected item index
      let findItem = addedCartItem.itemList[index];
      // Item found update properties 
       if(findItem !== undefined){
          findItem.quantity =  findItem.quantity + 1;
          findItem.totalItemPrice = findItem.totalItemPrice + findItem.item.price;
          addedCartItem.totalPrice = addedCartItem.totalPrice + findItem.item.price;
          addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
       }     
       addedCartItem.itemList[index] = findItem;
       // Update cartItems in component state
      this.setState({ cartItems: addedCartItem});    
  }

snackBarHandler = (message) => {
  // if any snackbar open already close that
  this.setState({ snackBarOpen: false});
  // updating component state snackbar message
  this.setState({ snackBarMessage: message});
  // Show snackbar
  this.setState({ snackBarOpen: true});
}

render(){
  const { classes } = this.props;
return(<div className="mainDiv">

   <Header/><div className={classes.paper_big}>
  <div  className="resMainDiv"  >
    <div  className="divImage" >
      <div className="imageDisplay">
      <Avatar id="imageDisplay" variant="square" src={this.state.resData.photo_URL}></Avatar>
      </div>
    </div>
    <div className="resDetails" >
      <div className="resName">{this.state.resData.restaurant_name}</div><br/> 
      <div id="LocalityCity"> {this.state.locality}-{this.state.city}</div><br/>
      <div>
      {(this.state.resData.categories || []).map((category, index) => {
            return (<span key={"span" + category.id}
            className="categories ">{category.category_name}, </span>
            );
          })}</div>
          <br/><br/>
          <div><span className="cusRating"><i className="fa fa-star"></i> {this.state.resData.customer_rating}</span>
          <span style={{display:"block",color:"grey",fontSize:20}}>AVERAGE RATING BY</span>
          <span style={{color:"grey",fontSize:20}}><span style={{fontWeight:"bold",color:"grey",fontSize:20}}>{this.state.resData.number_customers_rated} </span>CUSTOMERS</span>
          </div>
        </div>
        <div className="cost4TwoDiv" >
        <div id="bottom-left"><span className="cusRating"><i className="fa fa-inr"></i> {this.state.resData.average_price}</span>
          <span style={{display:"block",color:"grey",fontSize:20}}>AVERAGE COST FOR</span>
          <span style={{color:"grey",fontSize:20}}>TWO PEOPLE</span>
          </div>
        </div>
       </div> 
</div>
<div className="orderFunction">
<div className="orderMenu">
{(this.state.resData.categories || []).map((category, index) => 
{
            return (<div key={"div"+category.id}><div key={"sub-div" + category.id}
            className="categoriesCart">{category.category_name} </div>
            <Divider/>
            {
              category.item_list.map(item => {
              return(<div key={item.id}>
               {item.item_type==='VEG'?
                <div className="menuList"><span >
                  <i className="fa fa-circle" style={{color:"green",width:"1",height:"1"}} aria-hidden="true"></i>
                </span><span className="itemName">{item.item_name}</span><span className="price">
                  <i className="fa fa-inr"></i> {item.price}</span><span className="addIcon">
                    <IconButton onClick={this.addToCart.bind(this,item,category)}><AddIcon/></IconButton>
                    </span></div>
                :
                <div className="menuList"><span>
                  <i className="fa fa-circle" style={{color:"red"}} aria-hidden="true"></i>
                  </span><span className="itemName">{item.item_name}</span><span className="price">
                    <i className="fa fa-inr"></i> {item.price}</span><span className="addIcon">
                      <IconButton onClick={this.addToCart.bind(this,item,category)}><AddIcon/>
                      </IconButton></span></div>
               }
                </div>)
              })
            }</div>
            );
          })}
</div>
<div className="myCart"><Card className="cardRoot">
        <CardContent className="cardContentRoot">
        <Badge badgeContent={4} color="primary">
<ShoppingCartIcon/></Badge><span style={{fontWeight:"bold",fontSize:"30px",marginLeft:"6%"}}>My Cart</span><br/>
<div>                                            {(this.state.cartItems.itemList || []).map((cartItem, index) => (
                  <Grid item xs container key={cartItem.item.id} >
                      <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                          <Grid item >
                              <Typography variant="caption"  gutterBottom className="capitalize">
                              {cartItem.item.item_type==="VEG"?
                 <div><span><i className="fa fa-circle" style={{color:"green",width:"1",height:"1"}} aria-hidden="true"></i>
                </span><span className="itemName">{cartItem.item_name}</span></div>
                :
                <div><span>
                  <i className="fa fa-circle" style={{color:"red"}} aria-hidden="true"></i>
                  </span><span className="itemName">{cartItem.item_name}</span></div>
               }
                                  <span style={{marginLeft:8}} >{cartItem.item.item_name}</span>
                              </Typography>
                          </Grid> 
                          <Grid item >
                              <Typography variant="caption"  gutterBottom>
                                  <IconButton aria-label="Remove Item" className="padding-4 bold m-r-4" onClick={this.removeAnItemFromCart.bind(this, cartItem, index)}>
                                      <RemoveIcon  style={{fontSize: 16, fill: 'black'}} />
                                  </IconButton>
                                  <Typography variant="body" className="bold">{cartItem.quantity}</Typography> 
                                  <IconButton aria-label="Add Item" className="padding-4 bold m-l-4" onClick={this.addAnItemFromCart.bind(this, cartItem, index)}>
                                      <AddIcon style={{fontSize: 16, fill: 'black'}}/>
                                  </IconButton>                                                                    
                              </Typography>
                              <Typography variant="caption"  gutterBottom className="margin-l-30">
                                  <i className="fa fa-inr"></i>
                                  <span>{cartItem.totalItemPrice}</span>                                                                    
                              </Typography>
                          </Grid>                                                            
                      </Grid>
                  </Grid>
              ))}</div>
                <Grid item xs container justify="space-between" style={{marginTop: 16}}>
            <Grid item >
                <Typography variant="caption"  gutterBottom className="bold">
                    Total Amount                                                                  
                </Typography>
            </Grid>
            <Grid item >
                <Typography variant="caption"  gutterBottom className="bold">
                      <i className="fa fa-inr"></i>
                    {this.state.cartItems.totalPrice}                                                                  
                </Typography>
            </Grid>
        </Grid>
          </CardContent>
          <CardActions><Button style={{width:"100%",fontSize:" 20px"}} variant="contained" color="primary">
            CHECKOUT</Button>
            </CardActions>
</Card></div>
</div>
<Snackbar 
  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
  open={this.state.snackBarOpen} 
  onClose={() => this.setState({ snackBarOpen: false })}
  message={<span id="message-id">{this.state.snackBarMessage}</span>}
  action={[
            <IconButton
            color="inherit"
                onClick={() => this.setState({ snackBarOpen: false })}
                >
                <CloseIcon/>
            </IconButton>
        ]}
  />
</div>
);
  }
}
export default withStyles(styles)(Details);