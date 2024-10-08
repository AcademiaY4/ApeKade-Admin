import React, { useState } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'

export default function AddCategory() {
    const [subcategories, setSubcategories] = useState([{ subCategoryName: '' }]);
    const addInputField = () => {
        setSubcategories([...subcategories, { subCategoryName: '' }]);
    };

    // Handler to remove an input field
    const removeInputField = (index) => {
        const updatedFields = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedFields);
    };

    // Handler to update the value of an input field
    const handleInputChange = (index, event) => {
        const updatedFields = subcategories.map((field, i) => 
            i === index ? { subCategoryName: event.target.value } : field
        );
        setSubcategories(updatedFields);
    };
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
                                    <h3 className='h5 mb-0 mt-2'>Add Subcategories</h3>
                                    {subcategories.map((setSubcategory, index) => (
                                        <div key={index} className="col-md-12" style={{ position: 'relative' }}>
                                             <input
                                                className="form-control"
                                                type="text"
                                                value={setSubcategory.subCategoryName}
                                                onChange={(e) => handleInputChange(index, e)}
                                                placeholder={`Subcategory ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeInputField(index)}
                                                style={{
                                                    marginLeft: '10px',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    fontSize: 20,
                                                    position: 'absolute',
                                                    top: -12,
                                                    right: 2
                                                }}
                                            >
                                                <i class="fa-solid fa-circle-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="col-12">
                                        <button type="button" style={{width: '100%'}} className='btn btn-primary' onClick={addInputField}>
                                            Add More Subcategory
                                        </button>
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
