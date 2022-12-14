import React, {  useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";



import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {
  formatDateInventory,
} from "../../common/utils";
import { GananciasDiarias } from "../Ganancias/GananciasDiarias";
import { GananciasSemanales } from "../Ganancias/GananciasSemanales";
import { GananciasMensuales } from "../Ganancias/GananciasMensuales";
import { GananciasAnuales } from "../Ganancias/GananciasAnuales";




const URL_RESERVAS= '/reservas/'


export const TablaGanancias = () => {
  const [key, setKey] = useState("gananciaDiaria");
  const { auth } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  React.useEffect(() => {
    if (key === "gananciaDiaria") {
      async function fetchReservas() {
        const config  = {
          headers: {
            "Content-Type": "application/json",
            "x-token": authLocal?.token,
          },
        }
        const { data } = await axios.get(URL_RESERVAS,config);
        setReservas(data.reservas);
        setIsLoading(false);
      }
      fetchReservas();
    }
  }, [key, isLoading]);

  
  const reservaDiaDepto = reservas.map((item) => {
    return {
      fecha: formatDateInventory(item.created),
      TotalReservas: 1,
      deptoInfo: item.departamento?.nombre,
      valor : item.valorFinal
      
    };
  });

  const reservaDiaZona = reservas.map((item) => {
    return {
      fecha: formatDateInventory(item.created),
      TotalReservas: 1,
      zona: item.departamento?.ubicacion,
      valor : item.valorFinal
      
    };
  });
  console.log('reservaZona' , reservaDiaZona);

//venta diaria por departamento
  const resultadoDiaDepto = [];
  reservaDiaDepto.reduce(function(res, value) {

      // Creamos la posición del array para cada mes
      let dia = new Date(value.fecha).getDate();
      let mes = new Date(value.fecha).getMonth()+1;
      let depto = value.deptoInfo;
      if (!res[`${dia}/${mes}/${depto}`]) {
         res[`${dia}/${mes}/${depto}`] = { fecha: `${dia}/${mes}`,deptoInfo: depto};
      
         // Inicializamos a 0 el valor de cada key
         Object.keys(value).forEach(function(key) {
             if(key !== 'fecha' && key !== 'deptoInfo'){
                 res[`${dia}/${mes}/${depto}`][key] = 0;
                 
             }
       })
  
       resultadoDiaDepto.push(res[`${dia}/${mes}/${depto}`])
      }
      
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'deptoInfo'){
            res[`${dia}/${mes}/${depto}`][key] += value[key];
        }
      })
  
      return res;
  }, {});

   //venta diaria por zona
   const resultadoDiaZona = [];
   reservaDiaZona.reduce(function(res, value) {
   
       // Creamos la posición del array para cada mes
       let dia = new Date(value.fecha).getDate();
       let mes = new Date(value.fecha).getMonth()+1;
       let zona = value.zona;
       if (!res[`${dia}/${mes}/${zona}`]) {
          res[`${dia}/${mes}/${zona}`] = { fecha: `${dia}/${mes}`,zona: zona};
       
          // Inicializamos a 0 el valor de cada key
          Object.keys(value).forEach(function(key) {
              if(key !== 'fecha' && key !== 'zona' ){
                  res[`${dia}/${mes}/${zona}`][key] = 0;
              }
        })
   
        resultadoDiaZona.push(res[`${dia}/${mes}/${zona}`])
       }
       
       // Sumamos el valor de cada clave dentro de un bucle
       Object.keys(value).forEach(function(key) {
         if(key !== 'fecha' && key !== 'zona' ){
             res[`${dia}/${mes}/${zona}`][key] += value[key];
         }
       })
   
       return res;
   }, {});
 
   //venta semanal por departamento
   const resultadoSemanaDepto = [];
   reservaDiaDepto.reduce(function(res, value) {
   
       // Creamos la posición del array para cada mes
       let dia = new Date(value.fecha).getDate();
       let mes = new Date(value.fecha).getMonth()+1;
       let semana =  Math.ceil(dia/7);
       let depto = value.deptoInfo;
       if (!res[`${semana}/${mes}/${depto}`]) {
          res[`${semana}/${mes}/${depto}`] = { fecha: `Semana ${semana} del mes ${mes}`,deptoInfo: depto};
       
          // Inicializamos a 0 el valor de cada key
          Object.keys(value).forEach(function(key) {
              if(key !== 'fecha' && key !== 'deptoInfo'){
                  res[`${semana}/${mes}/${depto}`][key] = 0;
              }
        })
   
        resultadoSemanaDepto.push(res[`${semana}/${mes}/${depto}`])
       }
       
       // Sumamos el valor de cada clave dentro de un bucle
       Object.keys(value).forEach(function(key) {
         if(key !== 'fecha' && key !== 'deptoInfo'){
             res[`${semana}/${mes}/${depto}`][key] += value[key];
         }
       })
   
       return res;
   }, {});

   //venta semanal por zona
   const resultadoSemanaZona = [];
   reservaDiaZona.reduce(function(res, value) {
   
       // Creamos la posición del array para cada mes
       let dia = new Date(value.fecha).getDate();
       let mes = new Date(value.fecha).getMonth()+1;
       let semana =  Math.ceil(dia/7);
       let zona = value.zona;
       if (!res[`${semana}/${mes}/${zona}`]) {
          res[`${semana}/${mes}/${zona}`] = { fecha: `Semana ${semana} del mes ${mes}`,zona: zona};
       
          // Inicializamos a 0 el valor de cada key
          Object.keys(value).forEach(function(key) {
              if(key !== 'fecha' && key !== 'zona'){
                  res[`${semana}/${mes}/${zona}`][key] = 0;
              }
        })
   
        resultadoSemanaZona.push(res[`${semana}/${mes}/${zona}`])
       }
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'zona'){
            res[`${semana}/${mes}/${zona}`][key] += value[key];
        }
      })
  
      return res;
  }, {});

  //venta mensual por departamento
  const resultadoMesDepto = [];
  reservaDiaDepto.reduce(function(res, value) {
  
      // Creamos la posición del array para cada mes
      let mes = new Date(value.fecha).getMonth()+1;
      let depto = value.deptoInfo;
      if (!res[`${mes}/${depto}`]) {
         res[`${mes}/${depto}`] = { fecha: `Mes ${mes}`,deptoInfo: depto};
      
         // Inicializamos a 0 el valor de cada key
         Object.keys(value).forEach(function(key) {
             if(key !== 'fecha' && key !== 'deptoInfo'){
                 res[`${mes}/${depto}`][key] = 0;
             }
       })
  
       resultadoMesDepto.push(res[`${mes}/${depto}`])
      }
      
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'deptoInfo'){
            res[`${mes}/${depto}`][key] += value[key];
        }
      })
  
      return res;
  }, {});

  //venta mensual por zona
  const resultadoMesZona = [];
  reservaDiaZona.reduce(function(res, value) {
  
      // Creamos la posición del array para cada mes
      let mes = new Date(value.fecha).getMonth()+1;
      let zona = value.zona;
      if (!res[`${mes}/${zona}`]) {
         res[`${mes}/${zona}`] = { fecha: `Mes ${mes}`,zona: zona};
      
         // Inicializamos a 0 el valor de cada key
         Object.keys(value).forEach(function(key) {
             if(key !== 'fecha' && key !== 'zona'){
                 res[`${mes}/${zona}`][key] = 0;
             }
       })
  
       resultadoMesZona.push(res[`${mes}/${zona}`])
      }
     
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'zona'){
            res[`${mes}/${zona}`][key] += value[key];
        }
      })
      return res;
  }, {});

  //venta anual por departamento
  const resultadoAnualDepto = [];
  reservaDiaDepto.reduce(function(res, value) {
  
      // Creamos la posición del array para cada mes
      let anio = new Date(value.fecha).getFullYear();
      let depto = value.deptoInfo;
      if (!res[`${anio}/${depto}`]) {
         res[`${anio}/${depto}`] = { fecha: `Año ${anio}`,deptoInfo: depto};
      
         // Inicializamos a 0 el valor de cada key
         Object.keys(value).forEach(function(key) {
             if(key !== 'fecha' && key !== 'deptoInfo'){
                 res[`${anio}/${depto}`][key] = 0;
             }
       })
  
       resultadoAnualDepto.push(res[`${anio}/${depto}`])
      }
      
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'deptoInfo'){
            res[`${anio}/${depto}`][key] += value[key];
        }
      })
  
      return res;
  }, {});

  //venta anual por zona
  const resultadoAnualZona = [];
  reservaDiaZona.reduce(function(res, value) {
  
      // Creamos la posición del array para cada mes
    
      let anio = new Date(value.fecha).getFullYear();
      let zona = value.zona;
      if (!res[`${anio}/${zona}`]) {
         res[`${anio}/${zona}`] = { fecha: `Año ${anio}`,zona: zona};
      
         // Inicializamos a 0 el valor de cada key
         Object.keys(value).forEach(function(key) {
             if(key !== 'fecha' && key !== 'zona'){
                 res[`${anio}/${zona}`][key] = 0;
             }
       })
  
       resultadoAnualZona.push(res[`${anio}/${zona}`])
      }
     
      // Sumamos el valor de cada clave dentro de un bucle
      Object.keys(value).forEach(function(key) {
        if(key !== 'fecha' && key !== 'zona'){
            res[`${anio}/${zona}`][key] += value[key];
        }
      })
  
      return res;
  }, {});


  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-1">
      <Tab eventKey="gananciaDiaria" title="Ganancia Diaria">
        <GananciasDiarias arrayZona ={resultadoDiaZona} arrayDepto={resultadoDiaDepto} />
      </Tab>
      <Tab eventKey='gananciaSemanal' title='Ganancia Semanal'>
        <GananciasSemanales arrayZona ={resultadoSemanaZona} arrayDepto={resultadoSemanaDepto} />

      </Tab>
      <Tab eventKey='gananciaMensual' title='Ganancia Mensual'>
        <GananciasMensuales arrayZona ={resultadoMesZona} arrayDepto={resultadoMesDepto} />
      </Tab>
      <Tab eventKey='gananciaAnual' title='Ganancia Anual'>
        <GananciasAnuales arrayZona ={resultadoAnualZona} arrayDepto={resultadoAnualDepto} />
      </Tab>
    </Tabs>
  );
};
