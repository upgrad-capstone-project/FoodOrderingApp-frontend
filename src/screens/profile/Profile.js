import React, {Component} from 'react';
import Header from '../../common/header/Header';

class Profile extends Component{

    render(){
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} showSearch={false} history={this.props.history} />
                <div>Profile Page</div>
            </div>
        )
    }
}

export default Profile;