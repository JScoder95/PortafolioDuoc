import axios from "../api/axios";

  export const reserveDepartment = (dptoId, xtoken, valor, diasArriendo) => {
    const body = { 
      departamento: dptoId,
      valorFinal: valor,
      cantidadDias: diasArriendo
     };
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.post(`/reservas/`, body, token);
  };

  export const cancelReserve = (dptoId, xtoken) => {
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.delete(`/reservas/${dptoId}`, token);
  };
  
  export const doCheckIn = (id, xtoken) => {
    const token = {
      headers: {
        'x-token': xtoken,
      },
    };
    return axios.post(`/checkin/${id}`, token);
  };