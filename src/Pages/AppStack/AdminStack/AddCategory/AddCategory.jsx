import React, { useState } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import { useFormik } from 'formik';
import Toaster from '../../../../Utils/Toaster/Toaster';
import CategoryService from '../../../../Services/InventoryService/CategoryService';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([{ SubCategoryName: '' }]);
    const addInputField = () => {
        setSubcategories([...subcategories, { SubCategoryName: '' }]);
    };

    // Handler to remove an input field
    const removeInputField = (index) => {
        const updatedFields = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedFields);
    };

    // Handler to update the value of an input field
    const handleInputChange = (index, event) => {
        const updatedFields = subcategories.map((field, i) => 
            i === index ? { SubCategoryName: event.target.value } : field
        );
        setSubcategories(updatedFields);
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            CategoryName: '',
            Status: '',
            SubCategories: [],
        },
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Adding Category...');
            const updatedSubcategories = subcategories.map(subcategory => ({
                ...subcategory,
                Status: values.Status
            }));
            values.SubCategories = updatedSubcategories;
            console.log("Submitting values:", values);
            try {
                const result = await CategoryService.createCategory(values);
                console.log("Result:", result);
                if (result.data.Code === 201) {
                    Toaster.justToast('success', result.data.Message, () => {
                        navigate("/app/admin/categories")
                    });
                }
            } catch (error) {
                console.error(error);
                console.log(error)
                Toaster.justToast('error', error.response?.data?.Message || 'An error occurred', () => { });
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
            }
        }
    })
    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Add Category'} icon={'fa-sitemap'} />
                {/* row */}
                <div className="row">
                    <div className="col-md-7 col-12 mb-5">
                        <div className="card p-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row row-gap-4">
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Category Name"
                                            aria-label="Category Name"
                                            name='CategoryName'
                                            value={values.CategoryName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <select
                                            className="form-select"
                                            name='Status'
                                            value={values.Status}
                                            onChange={handleChange}
                                        >
                                            <option selected>Select Status</option>
                                            <option value="Activated">Activate</option>
                                            <option value="Deactivated">Deactivate</option>
                                        </select>
                                    </div>
                                    <h3 className='h5 mb-0 mt-2'>Add Subcategories</h3>
                                    {subcategories.map((setSubcategory, index) => (
                                        <div key={index} className="col-md-12" style={{ position: 'relative' }}>
                                             <input
                                                className="form-control"
                                                type="text"
                                                value={setSubcategory.SubCategoryName}
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
                                        <button className='btn btn-primary' disabled={loading}>Add Category</button>
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
