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

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 120,
    height:120,
    boxShadow: '1px 2px 2px grey',
    marginRight:80
  },
  profileAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    boxShadow: '1px 2px 2px grey'
},
  fab: {
    width:50
  },
  
  paper: {
    position: "absolute",
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  
  paper_big: {
    position: "absolute",
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
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
      alert(that.state.resData);
  });
  xhr_resDetails.open("GET", this.apiURL+"restaurant/"+resId);
  xhr_resDetails.setRequestHeader("Cache-Control", "no-cache");
  xhr_resDetails.send(dataRes);
  }

  componentDidMount(){
    
  }

render(){
  const { classes } = this.props;
return(<div><Header/><div>{this.state.resData.id}</div></div>);
  }
}

export default withStyles(styles)(Details);