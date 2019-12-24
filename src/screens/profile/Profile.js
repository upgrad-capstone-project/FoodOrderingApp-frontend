import React, { Component } from "react";
import Header from '../../common/header/Header';

class Profile extends Component{

    componentDidMount(){
        this.mounted = true;
       }

    componentWillMount(){
        let loggedstatuscheck = this.props.loggedincheck;
        if(typeof loggedstatuscheck === "undefined"){
            this.mounted = false;
        this.props.history.push({
            pathname: "/"
          });
        } else {
            //load as usual
        }
      
      }
    
    //Logout action from drop down menu on profile icon
    loginredirect = () => {
        sessionStorage.clear();
        this.props.history.push({
          pathname: "/"
        });
    }

    render(){
        return (this.mounted === true ?      
            <div>
                <Header logoutHandler={this.loginredirect} baseUrl={this.props.baseUrl} showSearch={false} history={this.props.history} />
                <div>Profile Page</div>
            </div> 
            :
            ""
        )
    }
}

export default Profile;