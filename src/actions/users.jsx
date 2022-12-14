import axios from "../api/axios";

export const updateUser = (Name, Rut, Telefono, Correo, Id, xtoken) => {
    const body = { 
        nombre: Name,
        rut: Rut,
        telefono: Telefono,
        correo: Correo,
        id: Id
       };
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.post(`/user/update/usuarios`, body, token);
  };

  export const updateMultasyReparaciones = (id, multa, reparacion, xtoken) => {
    const body = { 
        id: id,
        multas: multa,
        costosReparaciones: reparacion
       };
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.post(`/user/update/multas`, body, token);
  };