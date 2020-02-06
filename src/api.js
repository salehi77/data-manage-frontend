import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER_URL || 'http://localhost:8000'

console.log(process.env, serverURL)

export default {
  clinic: {
    getClinics: () => {
      return axios.get(serverURL + '/get_clinics').then(res => {
        return res.data;
      });
    },

    getClinic: id => {
      return axios.get(serverURL + '/get_clinic', { params: { id } }).then(res => {
        return res.data;
      });
    },

    saveDiagram: (id, diagramModel, diagramTree) => {
      return axios
        .patch(serverURL + '/save_diagram', { id, diagramModel, diagramTree })
        .then(res => {
          console.log(res)
          return res.data;
        });
    },

    addClinic: (clinicName, diagramModel, diagramTree) => {
      return axios
        .post(serverURL + '/add_clinic', { clinicName, diagramModel, diagramTree })
        .then(res => {
          return res.data;
        });
    },

    deleteClinic: (clinicID) => {
      return axios
        .delete(serverURL + '/delete_clinic', { params: { id: clinicID } })
        .then(res => {
          return res.data;
        });
    }
  }
};
