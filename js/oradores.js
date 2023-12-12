// LocalStorage

const getOradoresFromLocal = () => {
  const oradores = localStorage.getItem("oradores");
  if (oradores) {
    return JSON.parse(oradores);
  }
  return [];
};

const getOradorSeleccionado = () => {
  const obj = localStorage.getItem("oradorBuscado");
  if (obj) {
    return JSON.parse(obj);
  }
  return null;
};

const saveOradoresFromLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data)); // guarda como texto
};

const removeOradorSeleccionado = () => {
  localStorage.removeItem("oradorBuscado");
};

// Generar Listado de Oradores // GET

document.getElementById("btnGetUsers").addEventListener("click", listarOradores);

function listarOradores() {
  const respuesta = fetch(`http://localhost:8080/web-app-23544/api/orador`);
  respuesta
    .then((response) => response.json())
    .then((data) => procesarListado(data)) //fulfilled
    .catch((error) => dibujarError(error)); //rejected
}

function procesarListado(data) {
  saveOradoresFromLocal("oradores", data);
  const oradores = getOradoresFromLocal();
  const listarOradores = data;
  let rows = "";
  for (let orador of listarOradores) {
    console.log(orador);
    rows += `
          <tr>
              <th scope="row">${orador.id}</th>
              <td>${orador.nombre}</td>
              <td>${orador.apellido}</td>
              <td>${orador.email}</td>
              <td>${orador.tema}</td>
              <td>
                  <button onclick="editar(${orador.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Editar
                  </button>
                  
                  <button class="btn-danger btn" onclick="eliminarOrador(${orador.id})">
                      Eliminar
                  </button>
              </td>
          </tr>
          `;
  }
  document.getElementById("usersRows").innerHTML = rows;
}

function dibujarError(error) {
  console.log(error);
  const alerta = `<div class="alert alert-danger" role="alert">
          ${error.toString()}
      </div>`;
  document.getElementById("msj").innerHTML = alerta;
}

//Eliminar orador // DELETE

const eliminarOrador = (id) => {
  Swal.fire({
    title: "Esta seguro de eliminar el orador?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8080/web-app-23544/api/orador?id=${id}`, {
        method: "DELETE",
      })
        .then((response) => response)
        .then((json) => {
          Swal.fire("Eliminado!", `Se ha eliminado el orador id: ${id}`, "success");
          listarOradores();
        })
        .catch((err) => console.log(err));
    } else if (result.isDenied) {
      Swal.fire("No se ha eliminado el orador seleccionado.");
    }
  });
};

//Editar orador // PUT

const editar = (id) => {
  const oradores = getOradoresFromLocal();
  const oradorBuscado = oradores.find((o) => o.id === id);

  document.getElementById("nombreActualizar").value = oradorBuscado.nombre;
  document.getElementById("apellidoActualizar").value = oradorBuscado.apellido;
  document.getElementById("emailActualizar").value = oradorBuscado.email;
  document.getElementById("temaActualizar").value = oradorBuscado.tema;

  //guardo el id o orador que se quiere actualizar
  saveOradoresFromLocal("oradorBuscado", oradorBuscado);
};

const actualizarOrador = () => {
  const oradorSeleccionado = getOradorSeleccionado("oradorBuscado");
  if (!oradorSeleccionado) {
    return;
  }
  //obtengo los datos del formulario esta en exel
  const nombre = document.getElementById("nombreActualizar").value;
  const apellido = document.getElementById("apellidoActualizar").value;
  const email = document.getElementById("emailActualizar").value;
  const tema = document.getElementById("temaActualizar").value;

  const orador = {
    nombre,
    apellido,
    email,
    tema,
  };

  //ahora puedo enviar a backend para actualizar.
  fetch(`http://localhost:8080/web-app-23544/api/orador?id=${oradorSeleccionado.id}`, {
    method: "PUT",
    body: JSON.stringify(orador),
  })
    .then((response) => response) // statuscode 200
    .then((json) => {
      Swal.fire({
        position: "top",
        title: "Se ha modificado el orador",
        text: `ID : ${oradorSeleccionado.id}`,
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      listarOradores();
      removeOradorSeleccionado();
      cerrarModal();
    })
    .catch((err) => console.log(err));
};

const cerrarModal = () => {
  document.getElementById("btnCerrarModal").click();
};
