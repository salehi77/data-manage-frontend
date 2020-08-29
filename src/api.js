import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER_URL || 'http://localhost:8000/'

console.log(process.env, serverURL)


export default {
  clinic: {
    getClinics: () => {
      return axios.get(serverURL + 'clinic/').then(res => {
        return res.data;
      });
    },

    getClinic: id => {
      return axios.get(`${serverURL}clinic/${id}/`).then(res => {
        return res.data;
      });
    },

    saveDiagram: (id, diagramModel, diagramTree) => {
      return axios
        .put(serverURL + 'clinic/', { id, diagramModel: JSON.stringify(diagramModel), diagramTree: JSON.stringify(diagramTree) })
        .then(res => {
          console.log(res)
          return res.data;
        });
    },

    addClinic: (clinicName, diagramModel, diagramTree) => {
      console.log(clinicName, diagramModel, diagramTree)
      return axios
        .post(serverURL + 'clinic/', { clinicName, diagramModel: JSON.stringify(diagramModel), diagramTree: JSON.stringify(diagramTree) })
        .then(res => {
          return res.data;
        });
    },

    deleteClinic: (clinicID) => {
      return axios
        .delete(`${serverURL}clinic/${clinicID}/`)
        .then(res => {
          return res.data;
        });
    }
  }
};
