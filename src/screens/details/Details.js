import React, { Component } from "react";
import Header from '../../common/header/Header';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import Favorite from "@material-ui/icons/Favorite";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/Star';

import './Details.css';

const styles = theme => ({
 
  paper_big: {
    height:"30%",
    width:"100%",
    position: "absolute",
    backgroundColor: "grey",
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
return(<div>

   <Header/><div><div className={classes.paper_big}>
  <Grid cols={3} className="gridContainer"  container spacing={3}>
    <Grid  className="gridItemImage" item xs={50}>
      <div className="imageDisplay">
      <img className="detailsPageimage" src={this.state.resData.photo_URL} alt={this.state.resData.restaurant_name}/>
      </div>
    </Grid>
    <Grid className="gridItemComments" item xs={6}>
      <Typography variant="h4">{this.state.resData.restaurant_name}</Typography>  
      <Typography variant="h6"> {this.state.locality}-{this.state.city}</Typography>
      {(this.state.resData.categories || []).map((category, index) => {
            return (<span key={"span" + category.id}
            className="hash-tags">{category.category_name}, </span>
            );
          })}<br/><br/>
          <div><span className="cusRating"><StarIcon/>{this.state.resData.customer_rating}</span></div>
        </Grid>
       </Grid>
</div></div></div>);
  }
}

export default withStyles(styles)(Details);