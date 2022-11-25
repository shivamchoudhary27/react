import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function sweetAlert() { Swal.fire({
  position: "center",
  icon: "success",
  title: "Course Added to Cart!",
  showConfirmButton: false,
  timer: 1500,
});
}

export default sweetAlert;
