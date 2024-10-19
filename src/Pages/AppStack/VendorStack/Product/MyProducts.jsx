import React from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import { useNavigate } from 'react-router-dom';
import ProductSwal from '../../../../Utils/Swal/ProductSwal';

export default function MyProducts() {
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

    const handleDeleteProduct = async () => {
        ProductSwal.deleteConfiramation(()=>{});
    };
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
                                            <input className="form-control" type="search" placeholder="Search Products" aria-label="Search" />
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
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="productOne" />
                                                        <label className="form-check-label" htmlFor="productOne" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#!"><img src="/assets/images/products/product-img-20.jpg" alt className="icon-shape icon-md" /></a>
                                                </td>
                                                <td><a href="#" className="text-reset">Galaxy S22 Ultra 5G</a></td>
                                                <td>Electronics</td>
                                                <td>Mobile Phones</td>
                                                <td>
                                                    <span className="badge bg-light-primary text-dark-primary">Active</span>
                                                </td>
                                                <td>LKR 310000</td>
                                                <td>
                                                    <button className="btn btn-primary me-3" onClick={() => {navigateToDisplayProduct('6875443123456')}}>
                                                        More
                                                    </button>
                                                    <button className="btn btn-warning me-3" onClick={() => {navigateToEditProduct('6875443123456')}}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger" onClick={()=>handleDeleteProduct()}>
                                                        Delete
                                                    </button>
                                                </td>
                                                {/*<td>
                                                    <div className="dropdown">
                                                        <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="feather-icon icon-more-vertical fs-5" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="bi bi-trash me-3" />
                                                                    Delete
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="bi bi-pencil-square me-3" />
                                                                    Edit
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>*/}
                                            </tr>
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
