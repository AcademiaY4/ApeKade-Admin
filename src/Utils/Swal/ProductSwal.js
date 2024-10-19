import Swal from 'sweetalert2';
class ProductSwal {
  deleteConfiramation = async (onDeleteConfirmed) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#DC3545",
      reverseButtons: true,
      width: "400px",
    })
    if (result.isConfirmed) {
      //callBack
      onDeleteConfirmed()
    }
  }
}

export default ProductSwal = new ProductSwal()