import api from "../api";
import { errorControl } from "./errorActions";

export const getClinics = () => {
  return api.clinic
    .getClinics()
    .then(data => {
      return data;
    })
    .catch(error => {
      return errorControl(error);
    });
};

export const getClinic = id => {
  return api.clinic
    .getClinic(id)
    .then(data => {
      return data;
    })
    .catch(error => {
      return errorControl(error);
    });
};
