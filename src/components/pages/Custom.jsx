import React from 'react'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import hash from 'object-hash'
import { toast } from 'react-toastify';

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Divider from '@material-ui/core/Divider'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'

import { getClinic, saveDiagram } from '../../actions/clinicActions'

import { MyAppbar } from '../elements/MyAppbar'
import { MyDrawer } from '../elements/MyDrawer'





const Diagram = (props) => {

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }



  const [board, setboard] = React.useState({ scale: 1, x: 0, y: 0 })

  const [movingId, setmovingId] = React.useState(null)
  const [editingId, seteditingId] = React.useState(null)
  const [selectingId, setselectingId] = React.useState(null)

  const [linkMode, setlinkMode] = React.useState(null)

  // const [nodes, setnodes] = React.useState([])
  // const [links, setlinks] = React.useState([])

  const [nodes, setnodes] = React.useState([
    {
      id: "b60ab1a1232926a71a5bbf9bc15e74d7e27782ba",
      text: "برای وارد کردن متن دوبار کلیک کنید",
      left: 730,
      top: 300,
      root: true,
    },
    {
      id: "5d662db453fa1b90cea2440f4216775cc27f7ec7",
      text: "برای وارد کردن متن دوبار کلیک کنید",
      left: 352,
      top: 92,
    },
    {
      id: "bbc5a91332aaf1f5398dcaa2cda353afe5b79224",
      text: "",
      top: 465,
      left: 334,
    }
  ])
  const [links, setlinks] = React.useState([
    {
      from: "b60ab1a1232926a71a5bbf9bc15e74d7e27782ba",
      to: "5d662db453fa1b90cea2440f4216775cc27f7ec7",

    },
    {
      from: "b60ab1a1232926a71a5bbf9bc15e74d7e27782ba",
      to: "bbc5a91332aaf1f5398dcaa2cda353afe5b79224",
    }
  ])




  const [coor, setcoor] = React.useState({ x: 200, y: 250 })




  const saveAction = () => {

  }






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
                  backgroundColor: `rgb(60, 60, 60, ${linkMode ? .7 : 1})`,
                  height: '100%',
                  overflow: 'hidden',
                  cursor: 'move',
                }}
                onWheel={(e) => {
                  e.persist()
                  setboard({ ...board, scale: Math.min(Math.max(.2, board.scale + e.deltaY * -0.01), 2) })
                }}
                onMouseDown={() => {
                  setmovingId(-1)
                  seteditingId(null)
                  setselectingId(null)
                }}
                onMouseUp={() => {
                  setmovingId(null)
                }}
                onMouseMove={e => {
                  e.persist()
                  if (movingId !== null) {
                    if (movingId === -1) {
                      setboard({
                        ...board,
                        x: board.x + e.movementX * (1 / board.scale),
                        y: board.y + e.movementY * (1 / board.scale),
                      })
                    }
                    else {
                      let i = nodes.findIndex(node => node.id === movingId)
                      if (i > -1) {
                        let c = nodes[i]
                        c = {
                          ...c,
                          top: c.top + e.movementY * (1 / board.scale),
                          left: c.left + e.movementX * (1 / board.scale),
                        }
                        setnodes([
                          ...nodes.slice(0, i),
                          c,
                          ...nodes.slice(i + 1)
                        ])
                      }
                    }
                  }
                  window.e = e
                  console.log(e.clientX, e.clientY)
                  // setcoor({ x: coor.x + e.movementX, y: coor.y + e.movementY })
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  const v = e.dataTransfer.getData('foo');
                  if (v === 'panel')
                    setnodes([...nodes, { id: hash('' + Date.now()), text: '', top: 0, left: 0 }])
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

                        let from = nodes.find(node => node.id === link.from)
                        let to = nodes.find(node => node.id === link.to)


                        if (from && to)
                          return (
                            <path
                              key={index} fill='transparent' stroke='#aaaaaa' strokeWidth='3'
                              d={`M ${from.left + 75} ${from.top + 50}
                              L ${to.left + 75} ${to.top + 50}`}
                            />
                          )

                      })

                    }



                    <path
                      fill='transparent' stroke='#aaaaaa' strokeWidth='3'
                      d={`M ${50} ${50}
                      L ${coor.x} ${coor.y}`}
                    />



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
                      nodes.map((node, index) => {

                        return (

                          <div
                            key={index}
                            style={{
                              width: 150,
                              minHeight: 100,
                              fontSize: 18,
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                              backgroundColor: editingId === node.id ? '#ecf0f1' : '#2ecc71',
                              position: 'absolute',
                              top: node.top,
                              left: node.left,
                              borderRadius: 5,
                              padding: 5,
                              cursor: 'default',
                              border: `3px solid ${selectingId === node.id ? '#2980b9' : '#000'}`,
                            }}
                            onMouseDown={(e) => {
                              if (editingId === null || editingId === node.id) {
                                e.stopPropagation()
                              }
                              if (editingId === null) {
                                setmovingId(node.id)
                                setselectingId(node.id)
                              }
                            }}
                            onDoubleClick={() => {
                              seteditingId(node.id)
                            }}
                            onClick={() => {
                              if (linkMode) {
                                if (linkMode === 1)
                                  setlinkMode(node.id)
                                else if (linkMode !== node.id) {
                                  setlinks([...links, { from: linkMode, to: node.id }])
                                  setlinkMode(null)
                                }
                              }
                            }}
                          >


                            {node.root && <div className='mbadge'>ریشه</div>}



                            <div
                              style={{
                                width: 10,
                                height: 10,
                                position: 'absolute',
                                backgroundColor: 'blue',
                                bottom: 0,
                                left: 0
                              }}
                              onMouseDown={e => e.stopPropagation()}
                            ></div>



                            {

                              node.id !== editingId

                                ?

                                <>
                                  {node.text}
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
                                  defaultValue={node.text}
                                  onChange={e => {
                                    e.persist()
                                    setnodes([...nodes.slice(0, index), { ...node, text: e.target.value }, ...nodes.slice(index + 1)])
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
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '40px 4px',
                  border: '1px solid rgba(0, 0, 0, .35)',
                }}
              >



                <div
                  style={{
                    width: 150,
                    minHeight: 100,
                    fontSize: 18,
                    backgroundColor: '#2ecc71',
                    borderRadius: 5,
                    border: '3px solid #000',
                    cursor: 'grab',
                  }}
                  draggable
                  onDragStart={e => e.dataTransfer.setData('foo', 'panel')}
                >
                </div>


                <Divider style={{ width: '100%', margin: '20px 0 30px' }} />


                <IconButton
                  onClick={() => {
                    !linkMode && setlinkMode(1)
                  }}
                >

                  <ShareIcon
                    style={{
                      fontSize: '4rem',
                      color: '#16a085',
                    }}
                  />

                </IconButton>


                <Divider style={{ width: '100%', margin: '20px 0 30px' }} />


                <IconButton
                  disabled={selectingId ? false : true}
                  onClick={() => {

                    let c = nodes.find(node => node.id === selectingId)

                    if (c) {
                      if (c.root) {
                        toast.info(<div style={{ display: 'flex' }}><InfoIcon style={{ marginLeft: 5 }} /> ریشه را نمی‌توان حذف کرد </div>)
                      }
                      else {
                        let l = links.filter(link => {
                          return link.from !== c.id && link.to !== c.id
                        })
                        setlinks(l)
                        let i = nodes.indexOf(c)
                        if (i > -1) {
                          let c = [...nodes]
                          c.splice(i, 1)
                          setnodes(c)
                        }
                      }
                    }
                  }}
                >

                  <CloseIcon
                    style={{ fontSize: '4rem' }}
                    className={selectingId ? 'alizarin' : ''}
                  />

                </IconButton>


                <Divider style={{ width: '100%', margin: '20px 0 30px' }} />


                <Button
                  variant='contained'
                  size='large'
                  startIcon={<SaveRoundedIcon />}
                  onClick={saveAction}
                >
                  ذخیره
                </Button>




              </Paper>


            </Grid>





          </Grid>




        </Container>


        <Snackbar
          open={!!linkMode}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            action={
              <Button className='alizarin' size='small' onClick={() => setlinkMode(null)}>
                انصراف
              </Button>
            }
            severity='info'>
            {
              linkMode === 1
                ?
                <>اولین آیتم را انتخاب کنید</>
                :
                <>دومین آیتم را انتخاب کنید</>
            }
          </Alert>
        </Snackbar>


      </main>


    </div >
  )
}

export default Diagram