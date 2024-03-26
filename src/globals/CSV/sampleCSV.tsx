import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const downloadCSVSampleFile = (headerList: string[]) => {
  const headers = headerList;

  const csvContent =
    "data:text/csv;charset=utf-8," + [headers.join(",")].join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "sample.csv");

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    Swal.fire({
      timer: 3000,
      width: "25em",
      color: "#666",
      icon: "success",
      background: "#e7eef5",
      showConfirmButton: false,
      text: "Sample csv file downloaded!",
    });
  }, 1000);
};
