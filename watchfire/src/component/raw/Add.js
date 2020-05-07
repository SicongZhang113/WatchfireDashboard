import React from 'react';
import $ from "jquery";

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
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import { compose } from 'recompose';
import {withStyles} from'@material-ui/core';

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


const styles = theme => ({
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
    padding: theme.spacing(4),
    //display: 'flex',
    overflow: 'auto',
    //flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
    finishButton:{
      paddingLeft: theme.spacing(130)
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});



class Add extends React.Component{
    constructor() {
        super()
        this.state = {
            open : true,
            id: 0,
            model: 'NULL',
            time: 0,
            historical:'NULL',
            firm_prediction:'NULL',
            IBC_prediction:'NULL'
        }
    }



    addNew(){
        $.ajax({
                type: "POST",
                url: "api/add",
                data: {id:this.state.id,
                model:this.state.model,
                time:this.state.time,
                historical:this.state.historical,
                firm_prediction: this.state.firm_prediction,
                IBC_prediction: this.state.IBC_prediction},
            });
    }




    render() {
        const id = (event) => {
            this.setState({id:event.target.value})
        }


        const handleChange = (event) => {
            this.setState({model:event.target.value})
            //console.log(event.target.value)
        };

        const time = (event) =>{
            this.setState({time:event.target.value})
        }

        const hist = (event) =>{
            this.setState({historical:event.target.value})
        }

        const firm = (event) =>{
            this.setState({firm_prediction:event.target.value})
        }

        const IBC = (event) => {
            this.setState({IBC_prediction:event.target.value})
        }

        const handleDrawerOpen = () => {
            this.setState({open:true});
        };
        const handleDrawerClose = () => {
            this.setState({open:false})
        };

        const [open_nest, setOpen_nest] = React.useState(true);
        const handleClick = () => {
          setOpen_nest(!open_nest);
        };

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />

                <AppBar position="absolute" color="primary" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>

                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
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
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
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
          <Paper className={classes.paper}>
              <div>
            <TextField required label = "Id" autoComplete="current-password" margin="normal" className={classes.textField} onChange={id} />
           <FormControl margin="normal" className={classes.textField}>
                         <InputLabel >Model*</InputLabel>
                         <Select
                             native
                             onChange={handleChange}
                             >
                             <option aria-label="None" value="" />
                             <option value={'2219'}>2219</option>
                             <option value={'W8'}>W8</option>
                             <option value={'W10'}>W10</option>
                             <option value={'W16'}>W16</option>
                             <option value={'W19'}>W19</option>
                             <option value={'X8'}>X8</option>
                             <option value={'X10'}>X10</option>
                             <option value={'X16'}>X16</option>
                             <option value={'X19'}>X19</option>
                         </Select>
                     </FormControl>
            <TextField required label = "Time" autoComplete="current-password" margin="normal" className={classes.textField} onChange={time}/>
            <br/>
            <TextField label= "Historical Data" autoComplete="current-password" margin="normal" className={classes.textField} onChange={hist}/>
            <TextField label= "Firm Prediction" autoComplete="current-password" margin="normal" className={classes.textField} onChange={firm}/>
            <TextField label= "IBC Prediction" autoComplete="current-password" margin="normal" className={classes.textField} onChange={IBC}/>
              </div>
            <br/>
            <p>* indicate required field</p>
            <br/>
            <div className={classes.finishButton}>
                <Button variant="contained" color="primary" onClick={() => this.addNew()} href="/raw">
                    Finish
                </Button>
            </div>
          </Paper>
        </Container>
      </main>
    </div>
  );
    }
}


export default compose(
  withStyles(styles),
)(Add);







