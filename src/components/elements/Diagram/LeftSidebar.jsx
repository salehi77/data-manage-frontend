import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'



const DiagramLeftSidebar = (props) => {


  return (



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
        onClick={() => props.setlinkMode(1)}
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
        disabled={props.selectingId ? false : true}
        onClick={props.removeClicked}
      >

        <CloseIcon
          style={{ fontSize: '4rem' }}
          className={props.selectingId ? 'alizarin' : ''}
        />

      </IconButton>


      <Divider style={{ width: '100%', margin: '20px 0 30px' }} />


      <Button
        variant='contained'
        size='large'
        startIcon={<SaveRoundedIcon />}
        onClick={props.saveAction}
      >
        ذخیره
      </Button>




    </Paper>






  )
}

export default DiagramLeftSidebar