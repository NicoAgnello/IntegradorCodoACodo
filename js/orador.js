// const crearOperador = () => {
//   const orador = {
//     nombre: document.getElementById("nombre").value,
//     apellido: document.getElementById("noapellidombre").value,
//     mail: document.getElementById("mail").value,
//     tema: document.getElementById("tema").value,
//   };

//   //debo enviar estos datos al servidor
//   //con post
//   fetch("http://localhost:8080/web-app-23544/api/orador", {
//     method: "POST",
//     body: JSON.stringify(orador),
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const traerOrador = () => {
//   const respuesta = fetch("http://localhost:8080/web-app-23544/api/orador");

//   respuesta
//     .then((response) => response.json()) //convierto
//     .then((data) => procesarUsers(data)) // fullfilled
//     .catch((err) => console.log(err)); // rejected
// };

// function procesarUsers(data) {
//   //dato ---> Desestructuring
//   const listadrOradores = data;

//   if (listadrOradores.length === 0) {
//     const emptyRow = `<tr>
//                         <th  colspan="5"> No hay mas datos que mostrar </th>
//                       </tr>`;
//     document.getElementById("tbody-users").innerHTML = emptyRow;
//     return;
//   }

//   let rows = "";
//   for (let orador of listadrOradores) {
//     rows += `<tr>
//               <th scope="row">${orador.id}</th>
//               <td>${orador.nombre}</td>
//               <td>${orador.apellido}</td>
//               <td>${orador.email}</td>
//               <td>${orador.tema}</td>
//             </tr>`;
//   }
//   document.getElementById("tbody-users").innerHTML = rows;
// }

// document.getElementById("btnCrear").addEventListener("click", crearOperador);
// document.getElementById("btnGetOrador").addEventListener("click", traerOrador);
