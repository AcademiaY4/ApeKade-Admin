import React from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'

export default function AddCategory() {
    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Add Category'} icon={'fa-sitemap'} />
                {/* row */}
                <div className="row">
                    <div className="col-md-7 col-12 mb-5">
                        <div className="card p-5">
                            <form>
                                <div className="row row-gap-4">
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" placeholder="Category Name" aria-label="Category Name" required />
                                    </div>
                                    <div className="col-12">
                                        <select className="form-select">
                                            <option selected>Select Status</option>
                                            <option value={1}>Published</option>
                                            <option value={2}>Unpublished</option>
                                        </select>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input type="text" className="form-control" placeholder="Business Name" />
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input type="text" className="form-control" placeholder="Business Name" />
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input type="text" className="form-control" placeholder="Business Name" />
                                    </div>
                                    <div className="col-12 text-end">
                                        <button className='btn btn-primary'>Add Category</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 offset-1 col-12 d-none d-md-block card">
                        <img src="/assets/images/banner/catBanner.png" className='rounded img-fluid' alt="banner" />
                    </div>
                </div>
            </div>
        </main>
    )
}
