import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { MyAppbar } from '../elements/MyAppbar'
import { MyDrawer } from '../elements/MyDrawer'
import Draggable from 'react-draggable'


const useStyles = makeStyles(theme => ({

  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

const Diagram = (props) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }

  return (
    <div style={{ display: 'flex' }}>


      <CssBaseline />




      <MyAppbar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />




      <MyDrawer drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />





      <main style={{ flexGrow: 1 }}>



        <div className={classes.appBarSpacer} />




        <Container maxWidth='lg' className={classes.container}>


          <Grid container spacing={1}>


            <Grid item xs={9} style={{ backgroundColor: 'orange' }}>

              iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiii



            </Grid>

            <Grid item xs={3} style={{ backgroundColor: 'blue' }}>


              <Paper>




              </Paper>


            </Grid>


          </Grid>


        </Container>




      </main>


    </div>
  )
}

export default Diagram