const getElement = (id) => {
  return document.getElementById(id).value;
};

const generarResumen = () => {
  const firstName = getElement("first-name");
  const lastName = getElement("last-name");
  const email = getElement("email");
  validarNombres(firstName, lastName);
  validarEmail();
  validarCantidad();
  if (firstName && lastName && email) {
    const categoria = getElement("categoria");
    const cantidad = Number(getElement("cantidad-tickets"));
    const valorTicket = 200;
    let descuento;
    if (categoria === "estudiante") {
      descuento = 0.8;
    } else if (categoria === "trainee") {
      descuento = 0.5;
    } else if (categoria === "junior") {
      descuento = 0.15;
    }
    const precio = valorTicket * cantidad;
    const descuentoFinal = precio * descuento;
    const precioFinal = precio - descuentoFinal;
    if (!isNaN(precioFinal)) {
      document.getElementById("container-resumen").classList.add("container-resumen");
      document.getElementById("resumen-compra").innerText = `Total a pagar : $${precioFinal}`;
    }
  }
};

function validarNombres(firstName, lastName) {
  if (firstName.length <= 2 ) {
    return Swal.fire({
      title: "Error!",
      text: "Nombre incorrecto o incompleto",
      icon: "warning",
      confirmButtonText: "Ok",
      confirmButtonColor: "#96c93e",
    });
  } else if (lastName.length <= 2 ) {
    return Swal.fire({
      title: "Error!",
      text: "Apellido incorrecto o incompleto",
      icon: "warning",
      confirmButtonText: "Ok",
      confirmButtonColor: "#96c93e",
    });
  }
}

function validarCantidad() {
  const cantidad = document.getElementById("cantidad-tickets").value;
  if (!cantidad || isNaN(cantidad)) {
    return Swal.fire({
      title: "Error!",
      text: "Ingrese una cantidad valida",
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#96c93e",
    });
  }
}

function validarEmail() {
  const email = document.getElementById("email").value;
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (!emailRegex.test(email)) {
    document.getElementById("span-warning").innerText = "Email incorrecto";
  } else {
    document.getElementById("span-warning").innerText = " ";
  }
}

function reiniciarFormulario() {
  const form = document.getElementById("formulario");
  form.reset();
}
