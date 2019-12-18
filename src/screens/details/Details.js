import React, { Component } from "react";
import Header from '../../common/header/Header';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
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
        stylePath: "path/to/font-awesome/css/font-awesome.min.css"
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
<div className="testing">
{(this.state.resData.categories || []).map((category, index) => 
{
            return (<div><div key={"span" + category.id}
            className="categoriesCart">{category.category_name} </div>
            <Divider/>
            {
              category.item_list.map(item => {
              return(<div>
               {item.item_type==='VEG'?
                <div><span ><i className="fa fa-circle" style={{color:"green"}} aria-hidden="true"></i></span><span className="itemName">{item.item_name}</span><span className="price"><i className="fa fa-inr"></i> {item.price}</span><span className="addIcon"><IconButton><AddIcon/></IconButton></span></div>
                :
                <div><span ><i className="fa fa-circle" style={{color:"red"}} aria-hidden="true"></i></span><span className="itemName">{item.item_name}</span><span className="price"><i className="fa fa-inr"></i> {item.price}</span><span className="addIcon"><IconButton><AddIcon/></IconButton></span></div>
               }
                </div>)
              })
            }</div>
            );
          })}

</div>
</div>
);
  }
}

export default withStyles(styles)(Details);