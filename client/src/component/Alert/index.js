import React from "react"
import Swal from "sweetalert2"

export function Alert(prop) {
  console.log(prop)
  if (prop === "success"){
    Swal.fire({
      icon: "success",
      title: "Create account successfully!",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
  else if (prop === "err") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: "<a href>Why do I have this issue?</a>",
    })
  } else {
    Swal.fire({
      title: `Hello ${prop.firstName + " " + prop.lastName}`,
      text: "Welcome back to SmartMelon!",
      imageUrl: `http://localhost:5000/assets/${prop.picture}`,
      imageAlt: "Custom image",
    })
  }
}
