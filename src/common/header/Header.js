import React, { Component } from "react";
import "./Header.css";
import Fastfood from '@material-ui/icons/Fastfood';
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
const styles = {
  root: {
    color: "#FFFFFF"
  },
  searchInput: {
    width: "80%",
    color: "white"
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  formControl: {
    width: "90%"
  }
}
const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      mobile: "",
      passwordReg: "",
      usernameRequired: "dispNone",
      passwordRequired: "dispNone",
      loginError: "dispNone",
      signupError: "dispNone",
      emailRequired: "dispNone",
      firstnameRequired: "dispNone",
      lastnameRequired: "dispNone",
      mobileRequired: "dispNone",
      passwordRegRequired: "dispNone",
      registrationSuccess: false,
      loginErrorMsg: "",
      signUpErrorMsg: "",
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
      showUserProfileDropDown: false,
      open: false,
      anchorEl: null,
      snackBarOpen: false
    }
  }

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value })
  }

  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value })
  }

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value })
  }

  inputFirstnameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value })

  }

  inputLastnameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value })

  }

  inputMobileChangeHandler = (e) => {
    this.setState({ mobile: e.target.value })

  }

  inputPasswordRegChangeHandler = (e) => {
    this.setState({ passwordReg: e.target.value })

  }

  componentDidMount() {

  }
  loginClickHandler = () => {
    this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
    this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
    this.state.loginErrorMsg === "" ? this.setState({ loginError: "dispBlock" }) : this.setState({ loginError: "dispNone" });

    if (this.state.username === "" || this.state.password === "") { return }
    let that = this;
    let dataLogin = null
    let xhrLogin = new XMLHttpRequest();
    xhrLogin.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let loginResponse = JSON.parse(xhrLogin.response);  
        if (loginResponse.code === 'ATH-001' || loginResponse.code === 'ATH-002') {
          that.setState({ loginError: "dispBlock" });
          that.setState({ loginErrorMsg: loginResponse.message });
        } else {
          sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
          sessionStorage.setItem('access-token', xhrLogin.getResponseHeader('access-token'));

          that.setState({ loggedIn: true });
          that.closeModalHandler();
        }
      }
    })
    xhrLogin.open("POST", this.props.baseUrl + "customer/login");
    xhrLogin.setRequestHeader("authentication", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
    xhrLogin.setRequestHeader("Content-Type", "application/json");
    xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhrLogin.send(dataLogin);

  }
  checkForm = () => {
    this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
    this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
    this.state.mobile === "" ? this.setState({ mobileRequired: "dispBlock" }) : this.setState({ mobileRequired: "dispNone" });
    this.state.passwordReg === "" ? this.setState({ passwordRegRequired: "dispBlock" }) : this.setState({ passwordRegRequired: "dispNone" });
    if (this.state.email === "" || this.state.firstname === "" || this.state.lastname === "" || this.state.mobile === "" || this.state.passwordReg === "") { return; }
    
  }
  signUpClickHandler = () => {
    let that = this;
    let dataSignUp = JSON.stringify({
      "contact_number": this.state.mobile,
      "email_address": this.state.email,
      "first_name": this.state.firstname,
      "last_name": this.state.lastname,
      "password": this.state.passwordReg
    })

    let xhrSignup = new XMLHttpRequest();
    xhrSignup.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let signupResponse = JSON.parse(this.response);
        if (signupResponse.code === 'SGR-001'
          || signupResponse.code === 'SGR-002'
          || signupResponse.code === 'SGR-003'
          || signupResponse.code === 'SGR-004') {
          that.setState({ signupError: "dispBlock" });
          that.setState({ "signUpErrorMsg": signupResponse.message });
        } else {
          that.setState({ registrationSuccess: true });
          that.openMessageHandler();
          that.closeModalHandler();
        }
      }
    })

    xhrSignup.open("POST", this.props.baseUrl + "customer/signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhrSignup.send(dataSignUp);
  }

  openModalHandler = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false })
  }

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  }
  openMessageHandler = () => {
    this.setState({ snackBarOpen: true })
  }

  profileIconClickHandler = (e) => {
    this.setState({
      showUserProfileDropDown: !this.state.showUserProfileDropDown,
      anchorEl: e.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      showUserProfileDropDown: !this.state.showUserProfileDropDown
    })
  }

  handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false })
  }

  logoutClickHandler = () => {
    sessionStorage.clear();
    this.props.history.push({
      pathname: "/"
    });
  };

  render() {
    const { classes } = this.props;
    let logoToRender = null;
    logoToRender = (
      <Fastfood className={classes.icon} />
    )

    let logoutBtnToRender = null;


    return (
      <div>
        <div className="header-main-container">
          <div className="header-logo-container">{logoToRender}</div>
          {this.props.showSearch &&
            <div className="header-search-container">
              <div className="search-icon">
                <SearchIcon style={{ color: "#FFFFFF" }} />
              </div>
              <Input
                onChange={this.props.searchRestaurantsByName.bind(this)}
                className={classes.searchInput}
                placeholder="Search by Restaurant Name"
              />
            </div>
          }
          {!this.state.loggedIn ?
            <div className="login-button">
              <Button variant="contained" color="default" onClick={this.openModalHandler}><AccountCircle />Login</Button>
            </div>
            :
            <div className="login-button">
              <Button variant="contained" color="default" onClick={this.profileIconClickHandler}><AccountCircle/> {this.state.firstname}</Button>
              {this.state.showUserProfileDropDown ? (
                <Popper open={this.state.open} anchorEl={this.state.anchorEl} keepMounted >
                  <Paper className={classes.paper}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem onClick={this.handleClose}><Link to="/profile" style={{ textDecoration: 'none', color: "black" }}>My Profile</Link></MenuItem>
                        <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popper>
              ) : null}
            </div>}
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}>
          <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>
          {this.state.value === 0 &&
            <TabContainer>

              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="username"> Contact No. </InputLabel>
                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                <Typography variant="subtitle1" color="error" className={this.state.loginError} align="left">{this.state.loginErrorMsg}</Typography>
              </FormControl><br /><br />
              <Button variant="contained" color="primary" onClick={this.loginClickHandler} className={classes.formControl}>LOGIN</Button>
            </TabContainer>}
          {this.state.value === 1 && <TabContainer>
            <form>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" type="text" onChange={this.inputFirstnameChangeHandler} value={this.state.firstname} />
                <FormHelperText className={this.state.firstnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" type="text" onChange={this.inputLastnameChangeHandler} value={this.state.lastname} />
                <FormHelperText className={this.state.lastnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" onChange={this.inputEmailChangeHandler} value={this.state.email} />
                <FormHelperText className={this.state.emailRequired}><span className="red">required valid email</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
                <Input id="mobile" type="number" onChange={this.inputMobileChangeHandler} value={this.state.mobile} />
                <FormHelperText className={this.state.mobileRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />
              <FormControl required aria-describedby="name-helper-text" className={classes.formControl}>
                <InputLabel htmlFor="passwordReg">Password</InputLabel>
                <Input type="password" id="passwordReg" onChange={this.inputPasswordRegChangeHandler} />
                <FormHelperText className={this.state.passwordRegRequired}><span className="red">required strong password</span></FormHelperText>
              </FormControl><br /><br />
              {this.state.registrationSuccess === false &&
                <FormControl className={classes.formControl}>
                  <Typography variant="subtitle1" color="error" className={this.state.signupError} align="left">{this.state.signUpErrorMsg}</Typography>
                </FormControl>}<br /><br />
              {/*this.state.registrationSuccess === true &&
                            <FormControl className={classes.formControl}>
                                <span className="successText"> Registration Successful. Please Login!</span>
                            </FormControl><br /><br />*/}
              <Button variant="contained" color="primary" onClick={this.signUpClickHandler} className={classes.formControl}>
                SIGNUP
                        </Button>
            </form>
          </TabContainer>}
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Registration Successful. Please Login!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Header);
