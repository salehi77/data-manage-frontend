import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { MyAppbar } from '../elements/MyAppbar'
import { MyDrawer } from '../elements/MyDrawer'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'




const Diagram = (props) => {

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }



  const [board, setboard] = React.useState({ scale: 1, x: 0, y: 0 })

  const [movingIndex, setmovingIndex] = React.useState(null)
  const [editingIndex, seteditingIndex] = React.useState(null)
  const [selectingIndex, setselectingIndex] = React.useState(null)

  const [childs, setchilds] = React.useState([
    { text: 'اولین فرزند', left: 100, top: 100 },
    { text: 'دومین فرزند', left: 400, top: 200 },
    { text: 'سومین فرزند', left: 300, top: 500 },
  ])

  const [links, setlinks] = React.useState([
    { from: 0, to: 1 }, { from: 0, to: 2 },
  ])



  return (


    <div style={{ display: 'flex', height: '100%' }}>






      <MyAppbar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />




      <MyDrawer drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />





      <main style={{ flexGrow: 1, minHeight: '100vh' }}>



        <div style={{ minHeight: 64 }} />





        <Container
          maxWidth={false}
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
                  overflow: 'hidden',
                  cursor: 'move',
                }}
                onWheel={(e) => {
                  e.persist()
                  setboard({ ...board, scale: Math.min(Math.max(.2, board.scale + e.deltaY * -0.01), 2) })
                }}
                onMouseDown={() => {
                  setmovingIndex(-1)
                  seteditingIndex(null)
                  setselectingIndex(null)
                }}
                onMouseUp={() => {
                  setmovingIndex(null)
                }}
                onMouseMove={e => {
                  if (movingIndex !== null) {
                    e.persist()
                    if (movingIndex === -1) {
                      setboard({
                        ...board,
                        x: board.x + e.movementX * (1 / board.scale),
                        y: board.y + e.movementY * (1 / board.scale),

                      })
                    }
                    else {
                      let c = childs[movingIndex]
                      c = {
                        ...c,
                        top: c.top + e.movementY * (1 / board.scale),
                        left: c.left + e.movementX * (1 / board.scale),
                      }
                      setchilds([
                        ...childs.slice(0, movingIndex),
                        c,
                        ...childs.slice(movingIndex + 1)
                      ])
                    }
                  }
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  const v = e.dataTransfer.getData('foo');
                  if (v === 'panel')
                    setchilds([...childs, { text: '', top: 0, left: 0 }])
                  e.dataTransfer.clearData()
                }}
              >


                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                  }}
                >




                  <svg
                    style={{
                      height: '100%',
                      width: '100%',
                      transform: `scale(${board.scale}) translate(${board.x}px, ${board.y}px)`,
                      position: 'absolute',
                      overflow: 'visible',
                    }}
                  >

                    {

                      links.map((link, index) => {
                        return (
                          <path
                            key={index} fill="transparent" stroke="#9e9e9e" strokeWidth="3"
                            d={`M ${childs[link.from].left + 75} ${childs[link.from].top + 50} L ${childs[link.to].left + 75} ${childs[link.to].top + 50}`}
                          />
                        )
                      })

                    }

                  </svg>







                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      transform: `scale(${board.scale}) translate(${board.x}px, ${board.y}px)`,
                      position: 'absolute',
                    }}
                  >





                    {
                      childs.map((child, index) => {


                        return (

                          <div
                            key={index}
                            style={{
                              width: 150,
                              minHeight: 100,
                              fontSize: 18,
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                              backgroundColor: editingIndex === index ? '#ecf0f1' : '#2ecc71',
                              position: 'absolute',
                              top: child.top,
                              left: child.left,
                              borderRadius: 5,
                              padding: 5,
                              border: `3px solid ${selectingIndex === index ? '#2980b9' : '#000'}`,
                            }}


                            onMouseDown={(e) => {
                              if (editingIndex === null || editingIndex === index) {
                                e.stopPropagation()
                              }
                              if (editingIndex === null) {
                                setmovingIndex(index)
                                setselectingIndex(index)
                              }
                            }}

                            onDoubleClick={() => {
                              seteditingIndex(index)
                            }}

                          >

                            {

                              index !== editingIndex

                                ?

                                <>
                                  {child.text}
                                </>

                                :

                                <TextareaAutosize
                                  style={{
                                    width: '100%',
                                    fontSize: 'inherit',
                                    fontFamily: 'inherit',
                                    backgroundColor: 'inherit',
                                    outline: 'none',
                                    resize: 'none',
                                    border: 'none',
                                  }}
                                  autoFocus
                                  defaultValue={child.text}
                                  onChange={e => {
                                    e.persist()
                                    setchilds([...childs.slice(0, index), { ...child, text: e.target.value }, ...childs.slice(index + 1)])
                                  }}
                                />

                            }


                          </div>


                        )



                      })

                    }

                  </div>





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
                  onDragStart={e => e.dataTransfer.setData('foo', 'panel')}
                >
                </div>





              </Paper>


            </Grid>





          </Grid>




        </Container>




      </main>


    </div >
  )
}

export default Diagram