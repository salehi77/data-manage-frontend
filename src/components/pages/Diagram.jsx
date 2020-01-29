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




const Diagram = (props) => {

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }


  const [zoom, setzoom] = React.useState(1)
  const [move, setmove] = React.useState({ x: 0, y: 0, enable: false })

  const [childs, setchilds] = React.useState([{}, {}, {}, {}, {}, {}])



  return (


    <div style={{ display: 'flex', height: '100%' }}>






      <MyAppbar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />




      <MyDrawer drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />





      <main style={{ flexGrow: 1, minHeight: '100vh' }}>



        <div style={{ minHeight: 64 }} />




        <Container maxWidth={false}
          style={{
            padding: 0,
            height: 'calc(100% - 64px)',
          }}
        >


          <Grid container spacing={0} style={{ height: '100%' }}>


            <Grid item xs={10}>

              <Paper
                style={{
                  backgroundColor: 'rgb(60, 60, 60)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'move',
                }}
                onWheel={(e) => {
                  e.persist()
                  let scale = zoom + e.deltaY * -0.01;
                  setzoom(Math.min(Math.max(.2, scale), 2))
                }}
                onMouseDown={() => {
                  setmove({ ...move, enable: true })
                }}
                onMouseUp={() => {
                  setmove({ ...move, enable: false })
                }}
                onMouseMove={e => {
                  if (move.enable) {
                    e.persist()
                    setmove({ x: move.x + e.movementX, y: move.y + e.movementY, enable: move.enable })
                  }
                }}
              >
                <div
                  style={{
                    backgroundColor: 'green',
                    height: '100%',
                    width: '100%',
                    transform: `scale(${zoom}) translate(${move.x}px, ${move.y}px)`,
                    position: 'relative',
                  }}
                >


                  {
                    childs.map((child, index) => {
                      return (
                        <div
                          style={{
                            minWidth: 100,
                            maxWidth: 150,
                            minHeight: 100,
                            fontSize: 18,
                            overflowWrap: 'break-word',
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: index * 150,
                            left: index * 150,
                          }}
                        >
                          actual size of a square is depend on it's width and height jdkfslsdfsleflsdf5sdf6sdf
                        </div>
                      )
                    })
                  }





                </div>

              </Paper>


            </Grid>

            <Grid item xs={2}>


              <Paper
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '40px 4px',
                  border: '1px solid rgba(0, 0, 0, .35)',
                }}
              >



                <div
                  style={{
                    backgroundColor: 'green',
                    height: 90,
                    width: 90,
                  }}
                  draggable
                >
                </div>





              </Paper>


            </Grid>


          </Grid>


        </Container>




      </main>


    </div>
  )
}

export default Diagram