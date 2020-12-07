import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '80%',
        margin: '15px auto',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        // marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    codes: {
        backgroundColor: props => props.colorz[0],
        color: '#fff',
        fill: '#fff',
    },
    cardheader: {
        backgroundColor: props => props.colorz[1],
    },
    textcontent: {
        // backgroundColor: props => props.colorz[2],
    },
}));

export default function FlpsCard(props) {
    const item = props.item
    const classes = useStyles(props);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const cardContent = item.content && item.content.length > 0 ? item.content.map((c, index) => <Typography key={index} paragraph>{c}</Typography>) : ''
    const codes = item.codes && item.codes.length > 0 ? item.codes.map((c, index) => 
        <Typography variant="button" display="inline" key={c + '-' + index} gutterBottom>
          {c}
        </Typography>) : ''

    const imageParsed = imageParser(item.id)
    const imageUrl = 'https://iiif.archivelab.org/iiif/' + imageParsed[0] + '$' + imageParsed[1] + '/full/600/0/default.jpg'
    const itemUrl = 'https://archive.org/details/' + imageParsed[0] 
    return (
        <Card className={classes.root} elevation={3} variant="outlined">
        <CardHeader
            title={item.title}
            subheader={(item.topTitle.length > 0 ? item.topTitle + ', ' : '') + item.dateText}
            className={classes.cardheader}
        />
        <CardContent className={classes.codes}>
            {codes}
        </CardContent>
        <CardContent className={classes.textcontent}>
            {cardContent}
        </CardContent>
        <CardActions disableSpacing className={classes.codes}>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>

            <Typography>Card Images</Typography>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardMedia
            className={classes.media}
            image={imageUrl}
            title={item.title}
        />
        </Collapse>
        </Card>
    );
}

function imageParser(string){
    var i = string.lastIndexOf("_")
    var item = string.substr(0,i)
    var file = string.substr(i + 1)
    var fileNum = parseInt(file)
    return [item, file, fileNum]
}
