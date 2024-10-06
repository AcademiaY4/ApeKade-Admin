import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb';
import { useFormik } from 'formik';
import Toaster from '../../../../../Utils/Toaster/Toaster';
import PreLoader from '../../../../../Components/PreLoader/PreLoader';
import UserMYup from '../../../../../Validation/Admin/UserMYup';
import UserMService from '../../../../../Services/Admin/UserMService';
import provinceTypes from '../../../../../Utils/Constants/Province';
import roleTypes from '../../../../../Utils/Constants/Role';
import districtTypes from '../../../../../Utils/Constants/District';
import { useNavigate } from 'react-router-dom';

export default function AddCustomers() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const roles = roleTypes
    // const provinceTypes = DistrictNprovince
    const province = provinceTypes
    const district = districtTypes
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            Email: '',
            FirstName: '',
            LastName: '',
            Telephone: '',
            Age: '',
            Role: '',
            Company: '',
            Province: '',
            District: '',
            City: '',
            ZipCode: '',
            NewPassword: '',
            ConfirmPassword: '',
        },
        validationSchema: UserMYup.createNewUser,
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Adding User...');
            try {
                // Create a new user
                const result = await UserMService.createNewUser(values);
                if (result.data.Code === 200) {
                    Toaster.justToast('success', result.data.Message, () => {
                        // Navigate to the customers list or any desired location
                        navigate("/app/admin/customers")
                    });
                }
            } catch (error) {
                console.error(error);
                Toaster.justToast('error', error.response?.data?.Message || 'An error occurred', () => { });
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
            }
        }
    });

    return (
        <main className="main-content-wrapper pb-3 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Add New User'} icon={'fa-user'} />
                {
                    loading ? (
                        <PreLoader />
                    ) : (
                        <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="col-12 mb-5">
                                        <div className="card p-5">
                                            <h3 className='h5'>Personal Information</h3>
                                            <div className="row row-gap-4">
                                                <div className="col-md-6">
                                                    <input
                                                        type="email"
                                                        className={`form-control ${errors.Email && touched.Email ? 'is-invalid' : ''}`}
                                                        placeholder="email"
                                                        name="Email"
                                                        value={values.Email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">{errors.Email}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.FirstName && touched.FirstName ? 'is-invalid' : ''}`}
                                                        placeholder="First name"
                                                        name="FirstName"
                                                        value={values.FirstName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">{errors.FirstName}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.LastName && touched.LastName ? 'is-invalid' : ''}`}
                                                        placeholder="Last name"
                                                        name="LastName"
                                                        value={values.LastName}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.LastName}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-text">+94</div>
                                                        <input
                                                            type="text"
                                                            maxLength={9}
                                                            className={`form-control ${errors.Telephone && touched.Telephone ? 'is-invalid' : ''}`}
                                                            placeholder="Telephone"
                                                            name="Telephone"
                                                            value={values.Telephone}
                                                            onChange={handleChange}
                                                        />
                                                        <div className="invalid-feedback">{errors.Telephone}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.Age && touched.Age ? 'is-invalid' : ''}`}
                                                        placeholder="Age"
                                                        name="Age"
                                                        value={values.Age}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.Age}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className={`form-control ${errors.Role && touched.Role ? 'is-invalid' : ''}`}
                                                        name="Role"
                                                        value={values.Role}
                                                        onChange={handleChange}
                                                    >
                                                        {roleTypes.map((role, index) => (
                                                            <option key={index} value={role.value}>{role.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">{errors.Role}</div>
                                                </div>
                                            </div>
                                            <h3 className='h5 mt-5'>Address Information</h3>
                                            <div className="row row-gap-4">
                                                <div className="col-6">
                                                    <input disabled value={'Sri Lanka'} className="form-control" />
                                                </div>
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.Company && touched.Company ? 'is-invalid' : ''}`}
                                                        placeholder="Company"
                                                        name="Company"
                                                        value={values.Company}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.Company}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className={`form-control ${errors.Province && touched.Province ? 'is-invalid' : ''}`}
                                                        name="Province"
                                                        onChange={handleChange}
                                                        value={values.Province}
                                                    >
                                                        {province.map((province, index) => (
                                                            <option key={index} value={province.value}>{province.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">{errors.Province}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className={`form-select ${errors.District && touched.District ? 'is-invalid' : ''}`}
                                                        name="District"
                                                        value={values.District}
                                                        onChange={handleChange}
                                                    >
                                                        {district.map((district, index) => (
                                                            <option key={index} value={district.value}>{district.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">{errors.District}</div>
                                                </div>
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.City && touched.City ? 'is-invalid' : ''}`}
                                                        placeholder="City"
                                                        name="City"
                                                        value={values.City}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.City}</div>
                                                </div>
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.ZipCode && touched.ZipCode ? 'is-invalid' : ''}`}
                                                        placeholder="Zip Code"
                                                        name="ZipCode"
                                                        value={values.ZipCode}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.ZipCode}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-12 mb-5">
                                        <div className="card p-4">
                                            <h3 className='h5'>Add User Password</h3>
                                            <div className="row row-gap-4">
                                                <div className="col-md-12">
                                                    <input
                                                        type="password"
                                                        className={`form-control ${errors.NewPassword && touched.NewPassword ? 'is-invalid' : ''}`}
                                                        placeholder="Enter New Password"
                                                        name="NewPassword"
                                                        value={values.NewPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.NewPassword}</div>
                                                </div>
                                                <div className="col-md-12">
                                                    <input
                                                        type="password"
                                                        className={`form-control ${errors.ConfirmPassword && touched.ConfirmPassword ? 'is-invalid' : ''}`}
                                                        placeholder="Enter Confirm Password"
                                                        name="ConfirmPassword"
                                                        value={values.ConfirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">{errors.ConfirmPassword}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button disabled={loading} className='btn btn-primary'>Create New User</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    )
                }
            </div>
        </main>
    );
}
