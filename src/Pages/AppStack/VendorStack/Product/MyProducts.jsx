import React, {useState, useEffect} from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import { useNavigate } from 'react-router-dom';
import ProductSwal from '../../../../Utils/Swal/ProductSwal';
import StockService from '../../../../Services/InventoryService/StockService';
import ProductService from '../../../../Services/Product/ProductService';
import LocalStore from '../../../../Store/LocalStore'
import Toaster from '../../../../Utils/Toaster/Toaster';
export default function MyProducts() {
    const user = LocalStore.getUser()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigation = useNavigate();
    const navigateToDisplayProduct = (id) => {
        navigation(`/app/vendor/products/displayProduct/${id}`)
    }

    const navigateToAddProduct = () => {
        navigation(`/app/vendor/products/addMyProduct`)
    }
    
    const navigateToEditProduct = (id) => {
        navigation(`/app/vendor/products/editProduct/${id}`)
    }

    const handleDeleteProduct = async (id) => {
        ProductSwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Deleting Product')
            try {
                const result = await ProductService.deleteProduct(id);
                if (result) {
                    const stockResult = await StockService.deleteStock(id);
                    Toaster.justToast('success', "Product Deleted", () => { });
                }
            } catch (error) {
                alert(error)
                // ResponseHandler.handleResponse(error);
            } finally {
                fetchAllProducts();
                Toaster.dismissLoadingToast()
            }
        });
    };
    const fetchAllProducts = async () => {
        try {
            setLoading(true)
            const result = await ProductService.getAllProducts()
            if (result.data.Status) {
                setProducts(result.data.Data)
                console.log(`products: ${result.data.Data.length}`)
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const myProducts = products.filter(product =>
        (
            product.VendorID.toLowerCase().includes(user.Id)
        )
    )
    const filteredProducts = myProducts.filter(product =>
        (
            product.Name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    useEffect(() => {
        fetchAllProducts()
    }, [])
    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4">
            <div className="container">
                <BreadCrumb page={'Products'} icon={'fa-shopping-cart'}/>
                {/* row */}
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        {/* card */}
                        <div className="card h-100 card">
                            <div className="px-6 py-6">
                                <div className="row justify-content-between">
                                    {/* form */}
                                    <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                                        <form className="d-flex" role="search">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search Users"
                                                aria-label="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </div>
                                    {/* select option */}
                                    <div className="col-lg-2 col-md-4 col-12 text-end">
                                        <button className='btn btn-dark' onClick={()=>{navigateToAddProduct()}}>Add Product</button>
                                    </div>
                                </div>
                            </div>
                            {/* card body */}
                            <div className="card-body p-0">
                                {/* table */}
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                                        <label className="form-check-label" htmlFor="checkAll" />
                                                    </div>
                                                </th>
                                                <th>Image</th>
                                                <th>Proudct Name</th>
                                                <th>Category</th>
                                                <th>Subcategory</th>
                                                <th>Status</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => (
                                                    <tr key={product.Id}>
                                                        <td><input type='checkbox'/></td>
                                                        <td><img width={30} height={30} src={product.ImageUrl} /></td>
                                                        <td>{product.Name}</td>
                                                        <td>{product.Category}</td>
                                                        <td>{product.SubCategory}</td>
                                                        <td>{product.Status}</td>
                                                        <td>{product.Price}</td>
                                                        <td>
                                                            <button className="btn btn-primary me-3" onClick={()=>{navigateToDisplayProduct(product.Id)}}>
                                                                More
                                                            </button>
                                                            <button className="btn btn-warning me-3" onClick={() => { navigateToDisplayProduct(product.Id) }}>
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger" onClick={() => { handleDeleteProduct(product.Id) }}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Paginator/>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}
