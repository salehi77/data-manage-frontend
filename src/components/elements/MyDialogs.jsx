import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles(theme => ({
  dialog: {
    margin: 0,
    paddingLeft: theme.spacing(1),
    minWidth: 400
  },
  dialogTitle: {
    padding: theme.spacing(2),
  },
  dialogContent: {
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))



export const ConfirmDeleteDialog = (props) => {

  const classes = useStyles()

  const { open, onClose, onAccept, name } = props

  return (
    <Dialog
      style={{ direction: 'rtl' }}
      onClose={onClose}
      open={open}
      classes={{ paper: classes.dialog }}
    >

      < DialogTitle
        disableTypography
        classes={{ root: classes.dialogTitle }}
      >

        <Typography variant="h6">
          آیا از حذف
          {` ${name} `}
          اطمینان دارید؟
        </Typography>

        {
          onClose
            ?
            (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            )
            :
            null
        }

      </DialogTitle >


      <DialogActions
        classes={{ root: classes.dialogActions }}
      >

        <Button
          onClick={onAccept}
          className='alizarin'
        >
          بله
      </Button>

      </DialogActions>

    </Dialog >
  )
}
