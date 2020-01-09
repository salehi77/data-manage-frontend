import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems } from './../elements/listItems'
import Orders from './../elements/ClinicsTable.jsx'


function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='http://localhost:3000/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  appBar: {
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShifted: {
    width: `calc(100% - ${theme.spacing(30)}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

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
    flexDirection: 'column',
  },
}))

export default function Dashboard(props) {
  const theme = useTheme()

  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <div className={classes.root}>


      <CssBaseline />



      <AppBar
        position='absolute'
        className={clsx(classes.appBar, drawerOpen && classes.appBarShifted)}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleDrawerOpen}
            style={{
              marginLeft: 30,
              display: drawerOpen ? 'none' : '',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            style={{
              flexGrow: 1
            }}
          >
            داشبورد
          </Typography>
        </Toolbar>
      </AppBar>



      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)
        }}
        open={drawerOpen}
      >

        <Toolbar className={classes.drawerToolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>

        <List>{mainListItems}</List>

      </Drawer>



      <main className={classes.content}>

        <div className={classes.appBarSpacer} />

        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>



      </main>


    </div>
  )
}
