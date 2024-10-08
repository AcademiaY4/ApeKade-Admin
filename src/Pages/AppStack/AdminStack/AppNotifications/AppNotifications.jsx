import React from 'react'
import Paginator from '../../../../Components/Paginator/Paginator'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import { Link } from 'react-router-dom'

export default function AppNotifications() {
    return (
        <main className="main-content-wrapper">
            <div className="container">
                <BreadCrumb icon={'fa-bell'} page={'Notifications'} />
                {/* row */}
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        {/* card */}
                        <div className="card h-100 card">
                            <div className="p-6">
                                <div className="row justify-content-between">
                                    <div className="col-md-4 col-12 mb-2 mb-md-0">
                                        {/* form */}
                                        <form className="d-flex" role="search">
                                            <input className="form-control" type="search" placeholder="Search Notification" aria-label="Search" />
                                        </form>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-12">
                                        {/* main */}
                                        <select className="form-select">
                                            <option selected>Select Status</option>
                                            <option value={1}>One</option>
                                            <option value={2}>Two</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* card body */}
                            <div className="card-body p-0">
                                {/* table */}
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                                        <thead className="bg-light">
                                            <tr>

                                                <th>Title</th>
                                                <th>Message</th>
                                                <th>Related</th>
                                                <th>Type</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><a  className="text-reset">Low Stock Alert</a></td>
                                                <td>
                                                    <span className="text-truncate">Stock of one of your products is low..</span>
                                                </td>
                                                <td>
                                                    Product | <Link style={{ textDecoration:'underline' }}>67030bb...</Link>
                                                </td>
                                                <td>
                                                    <span className="text-truncate text-danger">Low Stock</span>
                                                </td>
                                                <td>02 Oct 2024</td>
                                                {/*<td>
                                                    <div className="dropdown">
                                                        <a  className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="feather-icon icon-more-vertical fs-5" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a className="dropdown-item" >
                                                                    <i className="bi bi-trash me-3" />
                                                                    Delete
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" >
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
                                <Paginator />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
