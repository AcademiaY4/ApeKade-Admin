import React, { useState } from 'react'
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb'

export default function DisplayStock() {
    
    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Stock'} icon={'fa-sitemap'} />
                {/* row */}
                <div className="row">
                    <div className="col-md-7 col-12 ">
                        <div className="card p-5">
                            <form>
                                <div className="row row-gap-4">
                                    <div className="col-md-6">
                                        <label>Stock ID</label>
                                        <input type="text" disabled className="form-control" placeholder="Stock ID" aria-label="Stock ID" value="6875443123456" required />
                                    </div>
                                    <div className="col-6">
                                        <label>Product ID</label>
                                        <input type="text" disabled className="form-control" placeholder="Stock ID" aria-label="Stock ID" value="6875443123456" required />
                                    </div>
                                    <div className="col-6 ">
                                        <label>Category</label>
                                        <input type="text" disabled className="form-control" placeholder="Business Name" value="Electronics" />
                                    </div>
                                    <div className="col-6 ">
                                        <label>Product Name</label>
                                        <input type="text" disabled className="form-control" placeholder="Business Name" value="Galaxy S22 Ultra 5G"/>
                                    </div>
                                    <div className="col-6 ">
                                        <label>Subcategory</label>
                                        <input type="text" disabled className="form-control" placeholder="Business Name" value="Mobile Phones"/>
                                    </div>
                                    <div className="col-6 ">
                                        <label>Quantity</label>
                                        <input type="text" disabled className="form-control" placeholder="Business Name" value="30"/>
                                    </div>
                                    
                                    <h3 className='h5 mb-0 mt-2'>Available Colors</h3>
                                    <div className="col-md-4 ">
                                      <div className="input-group">
                                        <div class="input-group-text" style={{width:'50%'}}>Black</div>
                                        <input
                                          type="text"
                                          maxLength={9}
                                          className="form-control"
                                          placeholder="Telephone"
                                          aria-label="Telephone"
                                          name="Telephone"
                                          value="12"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4 ">
                                      <div className="input-group">
                                        <div class="input-group-text" style={{width:'50%'}}>White</div>
                                        <input
                                          type="text"
                                          maxLength={9}
                                          className="form-control"
                                          placeholder="Telephone"
                                          aria-label="Telephone"
                                          name="Telephone"
                                          value="9"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4 ">
                                      <div className="input-group">
                                        <div class="input-group-text" style={{width:'50%'}}>Blue</div>
                                        <input
                                          type="text"
                                          maxLength={9}
                                          className="form-control"
                                          placeholder="Telephone"
                                          aria-label="Telephone"
                                          name="Telephone"
                                          value="9"
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button className='btn btn-primary me-4'>See Product</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 d-none d-md-block card mx-5">
                        <img src="/assets/images/products/product-img-20.jpg" className='rounded img-fluid' alt="banner" />
                    </div>
                </div>
            </div>
        </main>
    )
}
