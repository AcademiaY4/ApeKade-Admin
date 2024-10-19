import Swal from 'sweetalert2';
class StockSwal {
  cannotDeleteStock = async () => {
    const result = await Swal.fire({
      title: "Cannot Delete This Stock",
      text: "This stock is part of an ongoing order",
      showCancelButton: false,
      confirmButtonText: "OK",
      confirmButtonColor: "#636c74",
      reverseButtons: false,
      width: "400px",
    })
  }
}

export default StockSwal = new StockSwal()