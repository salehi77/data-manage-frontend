import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
}))


const Diagram = (props) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const handleDrawerOpen = (value) => {
    setDrawerOpen(value)
  }



  return (
    <div style={{ display: 'flex' }}>

      custom
      
      
      
    </div>
  )
}

export default Diagram