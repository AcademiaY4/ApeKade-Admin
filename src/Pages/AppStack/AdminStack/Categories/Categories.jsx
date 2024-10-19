import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import CategorySwal from '../../../../Utils/Swal/CategorySwal'
import { Link, useNavigate } from 'react-router-dom'
import Toaster from '../../../../Utils/Toaster/Toaster';
import CategoryService from '../../../../Services/InventoryService/CategoryService'

export default function Categories() {
    const navigation = useNavigate()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigateToAddCategory = () => {
        navigation('/app/admin/categories/addCategory')
    }
    const navigateToEditCategory = (id) => {
        navigation(`/app/admin/categories/editCategory/${id}`)
    }
    const handleDeleteCategory = async (id) => {
        CategorySwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Deleting Category')
            try {
                const result = await CategoryService.deleteCategory(id);
                if (result) {
                    Toaster.justToast('success', "Category Deleted", () => { });
                }
            } catch (error) {
                alert(error)
                // ResponseHandler.handleResponse(error);
            } finally {
                fetchAllUsers();
                Toaster.dismissLoadingToast()
            }
        });
    };
    const fetchAllCategories = async () => {
        try {
            setLoading(true)
            const result = await CategoryService.getAllCategories()
            if (result.data.Status) {
                setCategories(result.data.Data)
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
    const filteredCategories = categories.filter(category =>
        (
            category.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    useEffect(() => {
        fetchAllCategories()
    }, [])
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
                                                <th/>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCategories.length > 0 ? (
                                                filteredCategories.map((category) => (
                                                    <tr key={category.Id}>
                                                        <td>{ category.CategoryName }</td>
                                                        <td>{ category.NoOfProducts }</td>
                                                        <td>
                                                            <span
                                                                className={
                                                                    `badge 
                                                                    ${category.Status === "Activated"? "bg-light-primary text-dark-primary"  : "bg-light-danger text-dark-danger"} 
                                                                    `
                                                                }>
                                                                {category.Status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {category.SubCategories[0] ? category.SubCategories[0].SubCategoryName : ""}
                                                            {category.SubCategories[1] ? `, ${category.SubCategories[1].SubCategoryName}` : ""}
                                                            {category.SubCategories.length > 2  ? `, ...` : ""}
                                                        </td>
                                                        <td/>
                                                        <td>
                                                            <button className="btn btn-primary me-3" >
                                                                More
                                                            </button>
                                                            <button className="btn btn-warning me-3" onClick={() => { navigateToEditCategory(category.Id) }}>
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger" onClick={() => { handleDeleteCategory(category.Id) }}>
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
