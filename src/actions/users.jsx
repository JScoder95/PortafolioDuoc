import axios from "../api/axios";

export const updateUser = (Name, Rut, Telefono, Correo, xtoken) => {
    const body = { 
        nombre: Name,
        rut: Rut,
        telefono: Telefono,
        correo: Correo
       };
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.post(`/user/update`, body, token);
  };