import React from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import { Link, useNavigate } from 'react-router-dom'

export default function Categories() {
    const navigation = useNavigate()
    const navigateToAddCategory = () => {
        navigation('/app/admin/categories/addCategories')
    }
    return (
        <main className="main-content-wrapper">
            <div className="container">
                {/* row */}
                <BreadCrumb page={'Categories'} icon={'fa-sitemap'}/>
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        {/* card */}
                        <div className="card h-100 card">
                            <div className="px-6 py-6">
                                <div className="row justify-content-between">
                                    <div className="col-md-6 col-12 mb-2 mb-md-0">
                                        {/* form */}
                                        <form className="d-flex" role="search">
                                            <input className="form-control" type="search" placeholder="Search Category" aria-label="Search" />
                                        </form>
                                    </div>
                                    {/* select option */}
                                    <div className="text-end col-md-6 col-12">
                                        <button className='btn btn-dark' onClick={() => { navigateToAddCategory() }}>
                                            <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add New
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* card body */}
                            <div className="card-body p-0">
                                {/* table */}
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>Category Name</th>
                                                <th>#Proudcts</th>
                                                <th>Status</th>
                                                <th>Sub Categories</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><a className="text-reset">Electronics</a></td>
                                                <td>12</td>
                                                <td>
                                                    <span className="badge bg-light-primary text-dark-primary">Published</span>
                                                </td>
                                                <td>
                                                    Mobile Phones, Tablets, <Link>See more...</Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-warning me-3" >
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger me-3" >
                                                        Delete
                                                    </button>
                                                    <button className="btn btn-danger" >
                                                        Unpublished
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a className="text-reset">Home Appliances</a></td>
                                                <td>37</td>
                                                <td>
                                                    <span className="badge bg-light-danger text-dark-danger">Unpublished</span>
                                                </td>
                                                <td>
                                                    Mobile Phones, Tablets, <Link>See more...</Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-warning me-3" >
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger me-3" >
                                                        Delete
                                                    </button>
                                                    <button className="btn btn-primary" >
                                                        &nbsp;&nbsp;&nbsp;Published&nbsp;&nbsp;&nbsp;
                                                    </button>
                                                </td>
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
