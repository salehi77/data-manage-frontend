import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './components/pages/Dashboard';
import DescriptionEdit from './components/pages/DescriptionEdit';
import Custom from './components/pages/Custom';
import Diagram from './components/pages/Diagram'
import Algo from './components/pages/Algorithm'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles({
  toast: {
    borderRadius: 5,
    fontFamily: 'XM Yekan',
  }
})


function App(props) {

  const classes = useStyles()

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

      <Switch>

        <Route exact path='/' component={Dashboard} />

        <Route exact path='/dg/:clinicID' component={Diagram} />

        <Route exact path='/algo/:id' component={Algo} />

        <Route path='/edit/:id' component={DescriptionEdit} />

        <Route path='/a' component={Custom} />

        <Route path='*'>not found</Route>

      </Switch>

    </div>

  );
}

export default App;
