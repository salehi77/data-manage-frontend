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
import LeftSidebar from '../elements/Diagram/LeftSidebar'
import Links from '../elements/Diagram/Links'





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
      id: 'b60ab1a1232926a71a5bbf9bc15e74d7e27782ba',
      text: 'برای وارد کردن متن دوبار کلیک کنید',
      left: 730,
      top: 300,
      root: true,
    },
    {
      id: '5d662db453fa1b90cea2440f4216775cc27f7ec7',
      text: 'برای وارد کردن متن دوبار کلیک کنید',
      left: 352,
      top: 92,
    },
    {
      id: 'bbc5a91332aaf1f5398dcaa2cda353afe5b79224',
      text: '',
      top: 465,
      left: 334,
    }
  ])
  const [links, setlinks] = React.useState([
    {
      from: 'b60ab1a1232926a71a5bbf9bc15e74d7e27782ba',
      to: '5d662db453fa1b90cea2440f4216775cc27f7ec7',

    },
    {
      from: 'b60ab1a1232926a71a5bbf9bc15e74d7e27782ba',
      to: 'bbc5a91332aaf1f5398dcaa2cda353afe5b79224',
    }
  ])



  const [mode, setmode] = React.useState(null)


  // console.log(mode)


  // React.useEffect(() => {
  //   const { params: { clinicID } } = props.match
  //   getClinic({ clinicID }, { autoErrorControl: true })
  //     .then(data => {
  //       if (data.success && data.result) {
  //         const diagramModel = JSON.parse(data.result.diagramModel)
  //         setnodes(diagramModel.nodes ? diagramModel.nodes : [])
  //         setlinks(diagramModel.links ? diagramModel.links : [])
  //       }
  //     })
  //     .catch(err => { })
  // }, [])




  const saveAction = () => {

    let a = links.find(link => {
      return links.find(link2 => {
        return link.from === link2.to && link.to === link2.from
      })
    })

    if (a) {
      toast.error('دور در درخت وجود دارد')
    }
    else {
      let root = nodes.find(node => node.root)
      if (root) {
        let t = model2tree(root.id)
        const { params: { clinicID } } = props.match
        saveDiagram(
          { clinicID, diagramModel: { nodes, links }, diagramTree: { text: root.text, childs: t } },
          { autoErrorControl: true }
        ).then(data => {
          if (data.success) {
            toast.success(<div style={{ display: 'flex' }}><CheckCircleRoundedIcon style={{ marginLeft: 5 }} /> ذخیره شد </div>)

          }
        }).catch(err => { })
      }
    }
  }

  const model2tree = (nodeID) => {
    let t = links.filter(link => link.from === nodeID)
    if (t.length === 0) return []
    t = nodes.filter(node => t.filter(tt => tt.to === node.id).length > 0)
    return t.map(tt => ({ text: tt.text, childs: model2tree(tt.id) }))
  }



  // console.log(links[1].from, links[1].to)

  let from = nodes.find(node => node.id === links[1].from)
  let to = nodes.find(node => node.id === links[1].to)


  if (from && to) {

    let offset = { x: from.left - to.left, y: from.top - to.top }

    // from.left < to.left ? offset.x = -10 : offset.x = 160

    // console.log(from.left, from.top, to.left, to.top)
    console.log(offset)

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
                  setmode(null)
                }}
                onMouseMove={e => {
                  if (movingId !== null) {
                    e.persist()
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
                  if (mode) {
                    e.persist()
                    setmode({ ...mode, endX: mode.endX + e.movementX * (1 / board.scale), endY: mode.endY + e.movementY * (1 / board.scale) })
                  }
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



                  {/* <Links
                    board={board}
                    links={links}
                    nodes={nodes}
                  /> */}

                  <svg
                    style={{
                      height: '100%',
                      width: '100%',
                      transform: `scale(${board.scale}) translate(${board.x}px, ${board.y}px)`,
                      position: 'absolute',
                      overflow: 'visible',
                    }}
                  >
                    <defs>
                      <marker id='triangle' viewBox='0 0 10 10'
                        refX='1' refY='5'
                        markerUnits='strokeWidth'
                        markerWidth='4' markerHeight='4'
                        orient='auto'>
                        <path d='M 0 0 L 10 5 L 0 10 z' fill='#aaaaaa' />
                      </marker>
                    </defs>

                    {

                      links.map((link, index) => {

                        let from = nodes.find(node => node.id === link.from)
                        let to = nodes.find(node => node.id === link.to)


                        if (from && to) {

                          // let offset = { x: 0, y: 0 }
                          let offset = { x: from.left - to.left, y: from.top - to.top }
                          offset.x = offset.x > 0 ? 155 : -5
                          offset.y = offset.y > 0 ? 105 : -5

                          return (
                            <path
                              key={index} fill='transparent' stroke='#aaaaaa' strokeWidth='3'
                              d={`M ${from.left + 75} ${from.top + 50} L ${to.left + offset.x} ${to.top + offset.y}`}
                              markerEnd='url(#triangle)'
                            />
                          )
                        }

                      })

                    }

                    {
                      mode

                      &&

                      <path
                        fill='transparent' stroke='#aaaaaa' strokeWidth='3'
                        d={`M ${mode.startX} ${mode.startY} L ${mode.endX} ${mode.endY}`}
                        markerEnd='url(#triangle)'
                      />
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
                      nodes.map((node, index) => {

                        return (

                          <div
                            key={index}
                            style={{
                              top: node.top,
                              left: node.left,
                            }}
                            className={`
                              node
                              ${editingId === node.id ? 'edit-node' : ''}
                              ${selectingId === node.id ? 'select-node' : ''}
                              ${mode && mode.id !== node.id ? 'link-node' : ''}
                            `}
                            onMouseDown={(e) => {
                              if (editingId === null || editingId === node.id) {
                                e.stopPropagation()
                              }
                              if (editingId === null) {
                                setmovingId(node.id)
                                setselectingId(node.id)
                              }
                            }}
                            onMouseUp={(e) => {
                              if (mode && mode.id !== node.id) {
                                if (!links.find(link => link.from === mode.id && link.to === node.id))
                                  setlinks([...links, { from: mode.id, to: node.id }])
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
                                top: 0,
                                left: 0,
                              }}
                              className='corner'
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                setmode({ id: node.id, startX: node.left, startY: node.top, endX: node.left, endY: node.top })
                              }}
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

              <LeftSidebar
                selectingId={selectingId}
                saveAction={saveAction}
                setlinkMode={setlinkMode}
                removeClicked={() => {
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
              />

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