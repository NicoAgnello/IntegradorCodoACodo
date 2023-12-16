const crearOperador = () => {
  const orador = {
    nombre: document.getElementById("nombre-orador").value,
    apellido: document.getElementById("apellido-orador").value,
    email: document.getElementById("email-orador").value,
    tema: document.getElementById("floatingTextarea2").value,
  };

  //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
  fetch(`http://localhost:8080/web-app-23544/api/orador`, {
    method: "POST",
    body: JSON.stringify(orador),
  })
    .then((response) => response.json())
    .then((json) => {
      Swal.fire({
        position: "top",
        title: "Se ha creado el orador",
        text: `ID : ${json.id}`,
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      document.getElementById("nombre-orador").value = "";
      document.getElementById("apellido-orador").value = "";
      document.getElementById("email-orador").value = "";
      document.getElementById("floatingTextarea2").value = "";
    })
    .catch((err) => console.log(err));
};

document.getElementById("btnCrear").addEventListener("click", crearOperador);
