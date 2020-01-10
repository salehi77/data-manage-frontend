import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const useStyles = makeStyles(theme => ({

  drawerToolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  drawerPaper: {
    width: theme.spacing(30),
    position: 'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: theme.spacing(9),
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

}))

export const MyDrawer = (props) => {
  const classes = useStyles()


  return (


    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !props.drawerOpen && classes.drawerPaperClose)
      }}
      open={props.drawerOpen}
    >

      <Toolbar className={classes.drawerToolbar}>
        <IconButton onClick={() => props.handleDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>


      <List>


        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText secondary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText>Orders</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>

      </List>

    </Drawer>


  )
}