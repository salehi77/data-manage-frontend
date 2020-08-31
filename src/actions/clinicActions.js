import api from '../api'
import { errorControl } from './errorActions'
import userActions from './userActions'

const clinicActions =
{
  getClinics: (data, options = { autoErrorControl: true }) => {
    return api.clinic.getClinics()
      .then(data => {
        return data
      })
      .catch(error => {
        if (options.autoErrorControl) {
          let e = errorControl(error)
          if (e.message === 'token_not_valid') {
            userActions.refresh()
          }
          else {
            return e
          }
        }
        else
          throw error
      })
  },


  getClinic: (data, options = { autoErrorControl: true }) => {
    return api.clinic
      .getClinic(data.clinicID)
      .then(data => {
        return data
      })
      .catch(error => {
        if (options.autoErrorControl)
          return errorControl(error)
        else
          throw error
      })
  },

  saveDiagram: (data, options = { autoErrorControl: true }) => {
    return api.clinic
      .saveDiagram(data.clinicID, data.diagramModel, data.diagramTree)
      .then(data => {
        return data
      })
      .catch(error => {
        if (options.autoErrorControl)
          return errorControl(error)
        else
          throw error
      })
  },

  addClinic: (data, options = { autoErrorControl: true }) => {
    return api.clinic
      .addClinic(data.clinicName, data.diagramModel, data.diagramTree)
      .then(data => {
        return data
      })
      .catch(error => {
        if (options.autoErrorControl)
          return errorControl(error)
        else
          throw error
      })
  },

  deleteClinic: (data, options = { autoErrorControl: true }) => {
    return api.clinic
      .deleteClinic(data.clinicID)
      .then(data => {
        return data
      })
      .catch(error => {
        if (options.autoErrorControl)
          return errorControl(error)
        else
          throw error
      })
  },

}

export default clinicActions