import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import validate from 'validate.js'
import userActions from '../../actions/userActions'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

var constraints = {
  username: {
    presence: true,
    exclusion: {
      within: ['nicklas'],
      message: "'%{value}' is not allowed"
    }
  },
  password: {
    presence: true,
    length: {
      message: 'must be at least 6 characters'
    }
  }
}



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))



const Login = () => {
  const history = useHistory()
  const classes = useStyles()
  const [controlForm, setControlForm] = useState({
    errors: {},
    values: {}
  })

  const changeValue = ({ target }) => {
    const v = { ...controlForm.values, [target.name]: target.value }
    const e = validate(v, constraints)
    setControlForm({ errors: e ? e : {}, values: v })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    if (Object.values(controlForm.errors).length === 0) {
      userActions.login({ ...controlForm.values })
        .then(data => {
          toast.success('با موفقیت وارد شدید')
          history.push('/dashboard')
        })
        .catch(e => { })
    }
  }


  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          ورود به سیستم
        </Typography>
        <Typography variant="caption" gutterBottom>
          username: admin, password: 123
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitLogin} >
          <TextField
            error={Boolean(controlForm.values.username && controlForm.errors.username)}
            helperText={controlForm.values.username && controlForm.errors.username ? controlForm.errors.username[0] : null}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='نام'
            name='username'
            autoFocus
            onChange={changeValue}
          />
          <TextField
            error={Boolean(controlForm.values.password && controlForm.errors.password)}
            helperText={controlForm.values.password && controlForm.errors.password ? controlForm.errors.password[0] : null}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='رمز'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={changeValue}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='من را به یاد بیاور'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}

          >
            ورود
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                فراموشی رمز؟
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {'حساب ندارید؟'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}


export default Login