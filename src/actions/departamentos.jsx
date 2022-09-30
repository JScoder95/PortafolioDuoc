import axios from "../api/axios";

  export const reserveDepartment = (dptoId, xtoken) => {
    const body = { departamento: dptoId };
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
  