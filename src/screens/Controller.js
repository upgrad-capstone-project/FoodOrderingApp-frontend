import React, { Component } from 'react';
import Home from './home/Home';
import Profile from './profile/Profile';
import Details from './details/Details';
import Checkout from './checkout/Checkout';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "testing";
  }
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />
		  <Route exact path='/detail/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
		  <Route exact path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;
