import api from '../api'
import { errorControl } from './errorActions'

export default
  {
    getClinics: (data, options = {}) => {
      return api.clinic.getClinics()
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


    getClinic: (data, options = {}) => {
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

    saveDiagram: (data, options = {}) => {
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

    addClinic: (data, options = {}) => {
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

    deleteClinic: (data, options = {}) => {
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