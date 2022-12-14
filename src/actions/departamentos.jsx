import axios from "../api/axios";

export const reserveDepartment = (dptoId, xtoken, valor, diasArriendo,fechaInicio,fechaFin,serviciosContratados) => {
  const body = {
    departamento: dptoId,
    valorFinal: valor,
    cantidadDias: diasArriendo,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    serviciosContratados: serviciosContratados
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  
  localStorage.setItem('token', xtoken);
  return axios.post(`/reservas/`, body, token);
};

export const addDepartment = (
  xtoken,
  nombre,
  direccion,
  ubicacion,
  banos,
  habitaciones,
  valorArriendo,
  disponible
) => {
  const body = {
    nombre: nombre,
    direccion: direccion,
    ubicacion: ubicacion,
    banos: banos,
    habitaciones: habitaciones,
    valorArriendo: valorArriendo,
    disponible: disponible,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.post(`/depto/create`, body, token);
};

export const editDepartment = (
  dptoId,
  xtoken,
  nombre,
  direccion,
  ubicacion,
  banos,
  habitaciones,
  valorArriendo,
  fechaPublicacion,
  disponible
) => {
  const body = {
    id: dptoId,
    nombre: nombre,
    direccion: direccion,
    ubicacion: ubicacion,
    banos: banos,
    habitaciones: habitaciones,
    valorArriendo: valorArriendo,
    fechaPublicacion: fechaPublicacion,
    disponible: disponible,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.post(`/depto/update`, body, token);
};

export const editInventoryDepartment = (
  dptoId,
  xtoken,
  inventario
) => {
  const body = {
    id: dptoId,
    inventario: inventario,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.post(`/depto/update/inventario`, body, token);
};

export const deleteDepartment = (dptoId, xtoken) => {
  return axios.delete(`/depto/${dptoId}`);
};

export const cancelReserve = (dptoId, xtoken) => {
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.delete(`/reservas/${dptoId}`, token);
};

export const doCheckIn = (idReserva, xtoken, listaChequeo) => {
  const body = {
    id: idReserva,
    checkIn: true,
    estado: listaChequeo,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.post(`/reservas/update/check`, body, token);
};
export const doCheckOut = (idReserva, xtoken, listaChequeo) => {
  const body = {
    id: idReserva,
    checkIn: true,
    checkOut: true,
    estado: listaChequeo,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
  return axios.post(`/reservas/update/check`, body, token);
};

export const toAssignTransport = (idReserva, transporte,xtoken) => {
  const body = {
    id: idReserva,
    transporte: transporte,
  };
  const token = {
    headers: {
      "x-token": xtoken,
    },
  };
 
  return axios.post(`/reservas/transporte`, body, token);
}
