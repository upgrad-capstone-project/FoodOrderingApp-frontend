import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Typography from "@material-ui/core/Typography";
// const summary = this.props.summary;
// const index = this.props.index;
// const classes = this.props.classes;
// const data = this.props.cartItems;
// const total = this.totalCartItemsValue;

class SummaryCard extends Component{
    constructor(){
        super();
        this.state = {            
            cartItems:[]
        };
    }

  //  let data = JSON.parse(localStorage.getItem("orders"));
 // let data = props.cartItems;
 //   let total = localStorage.getItem("OrderDataTotal");
 //let total = props.totalCartItemsValue;


 render(){
    return(
        <Card>        
            <CardHeader title="Summary" />
            <CardContent>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
    ><div>{this.props.cartItems}</div>   
                 <Grid container item xs={12}>
                 <Grid item xs={12}>                    
                    <Divider variant="middle" className={this.props.classes.divider}/>
                 </Grid>                                           
                 </Grid>
                    
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <Typography variant="h6">
                            Net Amount
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>                            
                        </Grid>
                        <Grid item xs={3}>
                        <Typography variant="h6">                                                       
                            {this.props.totalCartItemsValue}
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>                
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" className={this.props.classes.orderButton} onClick={this.props.checkoutHandler}>
                    Place Order
                </Button>
            </CardActions>
        </Card>
    )
};}

export default SummaryCard;