import React from 'react';
import "./RestaurantCard.css";
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
//import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';


const RestaurantCard = function(props){
    // const image = props.image;
    const index = props.index;
	const classes = props.classes;	    	

    return (
		<div onClick={() => {let detailsPageUrl = '/restaurant/'+ props.resId; return props.history.push(detailsPageUrl)}} key={index}>
			<Card className={classes.resCard} key={index}>			
					<CardMedia
						component="img"
						alt={props.resName}
						height="160"
						image={props.resURL}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.resName}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{props.resFoodCategories}
						</Typography>
						<br />
						<Typography variant="body2" component="div">
							<div className="rating-main-contnr">
								<div className="rating-bg-color">
									<span><i className="fa fa-star"></i></span>
									<span> {props.resCustRating} ({props.resNumberCustRated})</span>
								</div>
								<div className="avg-price">
									<span><i className="fa fa-rupee-sign"></i> {props.avgPrice} for two</span>                            
								</div>
							</div>
						</Typography>
					</CardContent>						
			</Card>
		</div>
    )

}

export default withRouter(RestaurantCard);
