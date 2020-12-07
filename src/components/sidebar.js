import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Codes from './codes'
import LanguageMenu from './languages';
import nlogo from '../images/Nblack.png'
import FlpsCard from './card';

import Dates from './dates'

import Paper from '@material-ui/core/Paper';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'rgba(111,111,111, 0.25)',
  },
  drawer: {
    backgroundColor: 'rgba(111,111,111, 0.25)',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  intro: {
    padding: '15px 15px 0 15px',
    margin: '15px',
  },
  langheader: {
    padding: '15px 15px 15px 0',
    margin: '15px',
  },
  noresults: {
    padding: '15px',
    margin: '15px',
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [ lang, setLang ] = useState('Albanian')
  const [ code, setCode ] = useState('')
  const [ date, setDate ] = useState([1850, 1950])
  const wholeFile = require('../data/referents/py_' + lang + '.json')
  const data = wholeFile.items
  let itemList = Object.keys(data).filter( i => {
    let retVal = true
    console.log(date !== date)
    if ( date !== [1850, 1950] && ( data[i].dateYear < date[0] || data[i].dateYear > date[1]) ) {
      console.log(data[i].id + ': date ' + data[i].dateYear + ' is out of range')
      retVal = false
    } 
    if ( code !== '' && data[i].codes.indexOf(code) === -1 ) {
      console.log(data[i].id + ': code ' + code + ' is out of scope')
      retVal = false
    } 
    return retVal
  })
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <LanguageMenu setLang={setLang} setDate={setDate} setCode={setCode} />
      <Dates setDate={setDate}  date={date} />
      <Codes setCode={setCode} codes={props.codes} />
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Newberry" src={nlogo} variant="square" className={classes.large} />
          <Typography variant="h4" noWrap>
            Foreign Language Press Survey
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper elevation={3} variant="outlined" className={classes.intro}>

        <Typography paragraph>
          The Chicago Foreign Language Press Survey was published in 1942 by the Chicago Public Library Omnibus Project of the Works Progress Administration of Illinois. The purpose of the project was to translate and classify selected news articles that appeared in the foreign language press from 1855 to 1938. The project consists of 120,000 typewritten pages translated from newspapers of 22 different foreign language communities of Chicago.
        </Typography>
        <Typography paragraph>
          The Chicago Foreign Language Press Survey is a collection of translations of newspaper articles originally published in Chicago's ethnic press between the 1860s and the 1930s. The Chicago Public Library administered the project that created this collection in the 1930s with funding from the U.S. Federal Works Progress Administration. The Press Survey was one of many initiatives during the Great Depression that employed Americans to document and enrich national culture. Translators and editors organized nearly 50,000 articles from 22 ethnic groups according to a hierarchical subject scheme created for the project. In total, the Survey produced approximately 120,000 sheets of typescript. The paper sheets are now cared for in the Special Collections Research Center at the University of Chicago, and several institutions hold copies of the microfilm. The Library of the University of Illinois at Urbana Champaign digitized its microfilm copy and contributed the files to the Internet Archive. In 2009 the Newberry Library received a grant from the National Endowment for the Humanities to create a new digital transcription of the Survey.
        </Typography>
        <Typography paragraph>
          The 1930s project intended to offer English-speaking researchers and students access to primary materials on ethnicity and urban life in one of America's great polyglot cities during a formative span of its history. In subsequent decades the Survey has been invaluable to scholars and students of Chicago history, and it has been used effectively in high school and college classrooms. This digital collection is intended to provide broader and better organized access than has been possible with paper and microfilm. The Survey translations have considerable value for teaching and research in immigration studies, urban history, the history of popular culture, and many other fields. They can reward browsing for curiosity as well as targeted research.
        </Typography>
        <Typography paragraph>
          <em>Please excuse our limited functionality as we transition to a new version of the FLPS database in 2021.</em>
        </Typography>
        </Paper>
        <Paper elevation={3} variant="outlined" className={classes.langheader}><Typography variant="h4">{lang + (code !=='' ? ', ' + code : '') + (date !== [0,2000] ? ', ' + date[0] + ' - ' + date[1] : '')} </Typography></Paper>
        <CardSection itemList={itemList} data={data} />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

const colors = [
  ['#43a047', '#76d275', '#c8e6c9'],
  ['#00897b', '#4ebaaa', '#b2dfdb'],
  ['#00acc1', '#00acc1', '#b2ebf2'],
  ['#039be5', '#63ccff', '#b3e5fc'],
  ['#1e88e5', '#6ab7ff', '#bbdefb'],
  ['#7cb342', '#aee571', '#dcedc8']
]
const CardSection = ({itemList, data}) => {

  const classes = useStyles();
  const noResults = <Paper className={classes.noresults}><Typography>No Results.</Typography></Paper>
  const cards = Object.keys(data).filter(i => itemList.indexOf(data[i].id) > -1 ).map((i, index) => {
    const randomColor = colors[index % 6]
    return <FlpsCard item={data[i]} key={index} colorz={randomColor} />})
  return <>{cards.length > 0 ? cards : noResults}</>
}

// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
};