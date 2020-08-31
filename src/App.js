import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './components/pages/Dashboard'
import Custom from './components/pages/Custom'
import Diagram from './components/pages/Diagram'
import Login from './components/pages/Login'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ToastContainer } from 'react-toastify'
import userActions from './actions/userActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  toast: {
    borderRadius: 5,
    fontFamily: 'XM Yekan',
  },
}))


function App(props) {

  const classes = useStyles()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    userActions.refresh({})
      .then(data => {
        setStatus('login')
      })
      .catch(e => {
        setStatus('notLogin')
      })
  }, [])


  return (

    <div dir='rtl'>

      <CssBaseline />
      <ToastContainer
        position='top-left'
        autoClose={3000}
        // autoClose={false}
        // hideProgressBar
        newestOnTop
        closeOnClick
        rtl
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        toastClassName={classes.toast}
      />



      {
        status === 'loading'
          ?


          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >

            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>


          :
          <>

            <Switch>

              <Route exact path='/dashboard' component={Dashboard} />

              <Route exact path='/dg/:clinicID' component={Diagram} />


              <Route path='/a' component={Custom} />

              <Route path='/login' component={Login} />


              < Route path='*'>not found</Route>

            </Switch>

            <Redirect exact from='/' to={status === 'login' ? '/dashboard' : '/login'} />

          </>
      }


    </div >

  )
}

export default App
