import api from "../api";
import { errorControl } from "./errorActions";

export const getClinics = (data, options = {}) => {
  return api.clinic
    .getClinics()
    .then(data => {
      return data;
    })
    .catch(error => {
      if (options.autoErrorControl)
        return errorControl(error);
      else
        throw error
    });
};

export const getClinic = (data, options = {}) => {
  return api.clinic
    .getClinic(data.clinicID)
    .then(data => {
      return data;
    })
    .catch(error => {
      if (options.autoErrorControl)
        return errorControl(error);
      else
        throw error
    });
};

export const updateDiagram = (data, options = {}) => {

  return api.clinic
    .updateDiagram(data.clinicID, data.rootID, data.diagramModel)
    .then(data => {
      return data;
    })
    .catch(error => {
      if (options.autoErrorControl)
        return errorControl(error);
      else
        throw error
    });
};

export const addClinic = (data, options = {}) => {
  return api.clinic
    .addClinic(data.clinicName)
    .then(data => {
      return data;
    })
    .catch(error => {
      if (options.autoErrorControl)
        return errorControl(error);
      else
        throw error
    });
};

export const deleteClinic = (data, options = {}) => {
  return api.clinic
    .deleteClinic(data.clinicID)
    .then(data => {
      return data;
    })
    .catch(error => {
      if (options.autoErrorControl)
        return errorControl(error);
      else
        throw error
    });
};
