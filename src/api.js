import axios from "axios";

const serverUrl = "http://localhost:8000";

export default {
  clinic: {
    getClinics: () => {
      return axios.get(serverUrl + "/get_clinics").then(res => {
        return res.data;
      });
    },

    getClinic: id => {
      return axios.get(serverUrl + "/get_clinic?id=" + id).then(res => {
        return res.data;
      });
    },

    updateDiagram: (id, diagramModel) => {
      return axios
        .patch(serverUrl + "/update_diagram", { id, diagramModel })
        .then(res => {
          console.log(res)
          return res.data;
        });
    },

    addClinic: (clinicName) => {
      return axios
        .post(serverUrl + "/add_clinic", { clinicName })
        .then(res => {
          return res.data;
        });
    }
  }
};
