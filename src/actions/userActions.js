import api from '../api'
import { errorControl } from './errorActions'
import axios from 'axios'
export default
  {

    login: (data, options = { autoErrorControl: true }) => {
      return api.user.login(data.username, data.password)
        .then(data => {
          localStorage.setItem('token', data.refresh)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access
          return data
        })
        .catch(error => {
          if (options.autoErrorControl)
            return errorControl(error)
          else
            throw error
        })
    },
    refresh: (data, options = { autoErrorControl: true }) => {
      const token = localStorage.getItem('token')
      if (token) {
        return api.user.refresh(token)
          .then(data => {
            localStorage.setItem('token', data.refresh)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access
            return data
          })
          .catch(error => {
            if (options.autoErrorControl)
              return errorControl(error)
            else
              throw error
          })
      }
      else {
        return new Promise((resolve, reject) => {
          reject(new Error('No Available Token'))
        })
      }
    },


    logout: (data, options = { autoErrorControl: true }) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        }
        catch (e) {
          reject()
        }
      })
    },


  }