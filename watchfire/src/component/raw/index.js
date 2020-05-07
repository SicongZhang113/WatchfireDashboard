import React from 'react';
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import RawList from './list'
import Fab from "@material-ui/core/Fab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import './index.module.css'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorageIcon from '@material-ui/icons/Storage';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LineChartIcon from '@material-ui/icons/Timeline';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import VisualIcon from '@material-ui/icons/DonutLarge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    //justifyContent: 'spaceAround',
    //alignItems: 'flexStart',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  sticky:{
    position:'sticky',
    bottom:theme.spacing(0),
    top:theme.spacing(95),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Raw() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open_nest, setOpen_nest] = React.useState(true);
  const handleClick = () => {
    setOpen_nest(!open_nest);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" color="primary" className={clsx(classes.appBar, open && classes.appBarShift)}>

        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Raw Data
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
            <Link color="primary" href="/">
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>

            <Link color="primary" href="/raw">
                <ListItem button >
                    <ListItemIcon>
                        <StorageIcon />
                    </ListItemIcon >
                    <ListItemText primary="Raw Data" />
                </ListItem>
            </Link>

            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <VisualIcon />
              </ListItemIcon>
              <ListItemText primary="Visualization" />
              {open_nest ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open_nest} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link color="primary" href="/vis">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <LineChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Line Chart" />
                  </ListItem>
                </Link>
                <Link color="primary" href="/barchart">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bar Chart" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
          <Grid item xs = {1} >
            <Fab
                color="secondary"
                aria-label="add"
                className={classes.sticky}
                href = '/add'>
              <AddCircleIcon />
            </Fab>
          </Grid>
          <Grid item xs = {11}>
            <Paper className={classes.paper}>
             <RawList/>
            </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
