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
    updateClinicDescription: (id, newText) => {
      return axios
        .patch(serverUrl + "/update_clinic_description?id=" + id, { newText })
        .then(res => {
          return res.data;
        });
    },

    updateDiagram: (id, diagramModel) => {
      return axios
        .patch(serverUrl + "/diagram", { id, diagramModel })
        .then(res => {
          return res.data;
        });
    }
  }
};
