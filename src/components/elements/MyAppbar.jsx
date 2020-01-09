import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles(theme => ({

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

}))

export const MyAppbar = (props) => {
  const classes = useStyles()


  return (


    <AppBar
      position='absolute'
      className={clsx(classes.appBar, props.drawerOpen && classes.appBarShifted)}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          onClick={() => props.handleDrawerOpen(true)}
          style={{
            marginLeft: 30,
            display: props.drawerOpen ? 'none' : '',
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
  )
}