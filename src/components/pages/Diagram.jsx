import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { MyAppbar } from '../elements/MyAppbar'
import { MyDrawer } from '../elements/MyDrawer'
import Draggable from 'react-draggable'

const useStyles = makeStyles(theme => ({

  // appBarSpacer: theme.mixins.toolbar,
  appBarSpacer: {
    minHeight: 64,
  },
  container: {
    padding: 0,
  },
  paper: {
    padding: theme.spacing(2),
  },
  fullHeight: {
    minHeight: 'calc(100vh - 64px)',
  }
}))



const Diagram = (props) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [yyy, setyyy] = React.useState({ scale: 1 })
  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }



  return (
    <div style={{ display: 'flex', height: '100%' }}>






      <MyAppbar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />




      <MyDrawer drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />





      <main style={{ flexGrow: 1, minHeight: '100vh' }}>



        <div className={classes.appBarSpacer} />




        <Container maxWidth={false} disablegutters className={classes.container}
          style={{
            // backgroundColor: 'blue',
            height: 'calc(100% - 64px)',
          }}
        >


          <Grid container spacing={0} style={{ height: '100%' }}>


            <Grid item xs={10}
              style={{
                overflow: 'hidden',
              }}
            >

              <Paper
                style={{
                  backgroundColor: 'rgb(60, 60, 60)',
                  padding: 5,
                  height: '100%',
                  border: '1px solid #afaaaa',
                }}
                onWheel={(e) => {
                  e.persist()
                  console.log(e.deltaY)

                  let scale = yyy.scale + e.deltaY * -0.01;
                  // this.setState = Math.min(Math.max(.125, scale), 4);

                  setyyy({ scale: Math.min(Math.max(.125, scale), 4) })

                }}
              >
                <div
                  style={{
                    // backgroundColor: 'green',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: `scale(${yyy.scale})`,
                  }}
                >


                  <div
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: 'red',
                    }}
                  >

                  </div>


                </div>

              </Paper>


            </Grid>

            <Grid item xs={2} style={{ backgroundColor: '' }}>


              <Paper
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  // height: '90%',
                  padding: '40px 4px',
                  border: '1px solid rgba(0, 0, 0, .35)',
                }}
              >



                <Draggable>
                  <div
                    style={{
                      backgroundColor: 'green',
                      height: 90,
                      width: 90,
                    }}
                  >
                  </div>
                </Draggable>




              </Paper>


            </Grid>


          </Grid>


        </Container>




      </main>


    </div>
  )
}

export default Diagram