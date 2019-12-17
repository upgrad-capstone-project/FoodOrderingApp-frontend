import React, {Component} from 'react';
import './Header.css';
import Fastfood from '@material-ui/icons/Fastfood';


const styles = theme => ({
    icon: {
        color: '#FFFFFF',
        fontSize: 32,
      }
});

class Header extends Component{
    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            username:"",
            password:"",
            email:"",
            firstname:"",
            lastname:"",
            mobile:"",
            
        }
    }
    render(){
        const { classes } = this.props;
        let logoToRender =(
            <Fastfood className ={classes.props}/>
        )
        return(
            <div>
                <div className="header-main-container">
                    <div className="header-logo-container">{logoToRender}</div>

                </div>
            </div>
        );
    }
}