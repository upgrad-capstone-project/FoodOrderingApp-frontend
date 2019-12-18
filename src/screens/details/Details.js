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
        resData:[]
    }
    this.apiURL = "http://localhost:8080/api/";
}


  componentWillMount() {
    let xhr_resDetails = new XMLHttpRequest();
    let dataRes = null;
    let resId = "1dd86f90-a296-11e8-9a3a-720006ceb890";
    let that = this;
    xhr_resDetails.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
            const data = JSON.parse(this.responseText);
            that.setState({
              resData:data
            });
      }
//      alert(that.state.resData);
  });
  xhr_resDetails.open("GET", this.apiURL+"restaurant/"+resId);
  xhr_resDetails.setRequestHeader("Cache-Control", "no-cache");
  xhr_resDetails.send(dataRes);
  }

  componentDidMount(){
    
  }

render(){
  const { classes } = this.props;
return(<div><Header/><div><div className={classes.paper_big}>
  <Grid className="gridContainer"  container spacing={3}>
    <Grid  className="gridItemImage" item xs={50}>
      <div className="imageDisplay">
      <img className="detailsPageimage" src={this.state.resData.photo_URL} alt={this.state.resData.restaurant_name}/>
      </div>
    </Grid>
    <Grid className="gridItemComments" item xs={6}>
      <Grid container spacing={3} alignItems="center" justify="flex-start"  >
        <Grid item><Typography variant="h6">{this.state.resData.restaurant_name}</Typography>  
        </Grid> 
      </Grid>
      <hr className="modalRule"/>
      <Grid container spacing={3} alignItems="center" justify="flex-start"  >
      <Grid item><Typography variant="h6"> {this.state.resData.locality}</Typography>
      <Typography variant="h6"> {this.state.resData.city}</Typography>
       </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="center" justify="flex-start"  >
        <Grid item>
          {(this.state.resData.categories || []).map((category, index) => {
            return (<span key={"span" + category.id}
            className="hash-tags">{category.category_name}</span>
            );
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" justify="flex-start"  >
      <Grid item>
          {(this.state.resData.categories || []).map((category, index) => {
            return (<span key={"span" + category.id}
            className="hash-tags">{category.category_name} </span>
            );
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" justify="flex-start"  >
      <Grid item>
      
        </Grid>
      </Grid>
      <div className="innercommentbox">
      <Grid className="gridCommentContainer" container spacing={3} alignItems="center" justify="flex-start"  >
      <Grid className="gridComment" item>

        </Grid>

      </Grid>
      </div>
    </Grid>
  </Grid>
</div></div></div>);
  }
}

export default withStyles(styles)(Details);