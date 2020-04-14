import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../constants";
import imageNotAvailable from "../../assets/images/image_not_available.jpg";
import Grid from "@material-ui/core/Grid";
import Chip from "../Chip/Chip"

const useStyles = makeStyles({
    root: {
        width: 350,
        margin: 'auto'
    },
    media: {
       minHeight: 200,

    },

});

export default function MediaCard(props) {
    const classes = useStyles();
    let image = imageNotAvailable;

    if (props.image) {
        image = apiURL + '/' + props.image;
    }
    return (
        <>
            <div style={{marginTop: '50px'}}></div>
            <Grid   item xs={12} lg={12} mt={5}>
                <Card  style={{width: '1000px'}} className={classes.root}>
                    <Typography align="center" component="h5" variant="h5">

                    </Typography>
                    <CardActionArea>

                        <CardMedia
                            height="300"
                            component="img"
                            className={classes.media}
                            image={image}
                            title={props.title}
                        />
                        <CardContent>
                            <Typography variant="h5" color="textSecondary" component="h3">
                                Author: {props.displayName ||  props.username}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" component="div">
                                {props.tags.map((t,i) => (<Chip key={i} text={t}/>))}
                            </Typography>
                            <Grid item container direction="column"  alignContent="center">
                                <Grid item>
                            <Typography  gutterBottom variant="body2" component="div">
                                {props.title}
                            </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>

                </Card>
            </Grid>
        </>
    );
}