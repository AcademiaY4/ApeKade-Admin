import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb';
import CategoryService from '../../../../../Services/InventoryService/CategoryService';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate(); // To navigate after updating the category
    const [subcategories, setSubcategories] = useState([{ subCategoryName: '', Status: 'Activated' }]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        Id: '',
        CategoryName: '',
        Status: 'Activated'
    });

    const addInputField = () => {
        setSubcategories([...subcategories, { subCategoryName: '', Status: 'Activated' }]);
    };

    const removeInputField = (index) => {
        const updatedFields = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedFields);
    };

    const handleInputChange = (index, event) => {
        const updatedFields = subcategories.map((field, i) =>
            i === index ? { ...field, subCategoryName: event.target.value } : field
        );
        setSubcategories(updatedFields);
    };

    const handleStatusChange = (index, event) => {
        const updatedFields = subcategories.map((field, i) =>
            i === index ? { ...field, Status: event.target.value } : field
        );
        setSubcategories(updatedFields);
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const result = await CategoryService.getCategoryById(id);
            if (result.data.Status) {
                const fetchedCategory = result.data.Data;
                setCategory({
                    Id: fetchedCategory.Id,
                    CategoryName: fetchedCategory.CategoryName,
                    Status: fetchedCategory.Status,
                });
                setSubcategories(fetchedCategory.SubCategories);
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCategory = {
            Id: category.Id,
            CategoryName: category.CategoryName,
            Status: category.Status,
            SubCategories: subcategories,
        };

        try {
            const response = await CategoryService.updateCategory(id, updatedCategory);
            if (response.data.Status) {
                alert('Category updated successfully');
                navigate('/categories'); // Navigate back to the category list page
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [id]);

    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Edit Category'} icon={'fa-sitemap'} />
                <div className="row">
                    <div className="col-md-7 col-12 mb-5">
                        <div className="card p-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row row-gap-4">
                                    <div className="col-md-12">
                                        <input type="text" disabled className="form-control" placeholder="Category ID" value={category.Id} aria-label="Category ID" />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="CategoryName"
                                            value={category.CategoryName}
                                            onChange={handleCategoryChange}
                                            placeholder="Category Name"
                                            aria-label="Category Name"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <select
                                            className="form-select"
                                            name="Status"
                                            value={category.Status}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="Activated">Activate</option>
                                            <option value="Deactivated">Deactivate</option>
                                        </select>
                                    </div>
                                    <h3 className="h5 mb-0 mt-2">Update Subcategories</h3>
                                    {subcategories.map((subCategory, index) => (
                                        <div key={index} className="row row-gap-4">
                                            <div className="col-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={subCategory.subCategoryName}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    placeholder={`Subcategory ${index + 1}`}
                                                />
                                            </div>
                                            <div className="col-4" style={{ position: 'relative' }}>
                                                <select
                                                    className="form-select"
                                                    value={subCategory.Status}
                                                    onChange={(e) => handleStatusChange(index, e)}
                                                >
                                                    <option value="Activated">Activate</option>
                                                    <option value="Deactivated">Deactivate</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => removeInputField(index)}
                                                    style={{
                                                        marginLeft: '10px',
                                                        border: 'none',
                                                        backgroundColor: 'transparent',
                                                        fontSize: 20,
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: -20,
                                                    }}
                                                >
                                                    <i className="fa-solid fa-circle-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-12">
                                        <button type="button" style={{ width: '100%' }} className="btn btn-primary" onClick={addInputField}>
                                            Add More Subcategory
                                        </button>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button type="submit" className="btn btn-primary">
                                            Update Category
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 offset-1 col-12 d-none d-md-block card">
                        <img src="/assets/images/banner/catBanner.png" className="rounded img-fluid" alt="banner" />
                    </div>
                </div>
            </div>
        </main>
    );
}
