import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import UserMService from '../../../../../Services/Admin/UserMService';
import roleTypes from '../../../../../Utils/Constants/Role';
import PreLoader from '../../../../../Components/PreLoader/PreLoader';
import DistrictNprovince from '../../../../../Utils/Constants/DistrictNprovince';
import UserMYup from '../../../../../Validation/Admin/UserMYup';
import Toaster from '../../../../../Utils/Toaster/Toaster';
import CusSwal from '../../../../../Utils/Swal/CusSwal';
import ChangePwd from './ChangePwd';
import provinceTypes from '../../../../../Utils/Constants/Province';
import districtTypes from '../../../../../Utils/Constants/District';

export default function EditCustomers() {
    const roles = roleTypes
    // const provinceTypes = DistrictNprovince
    const province = provinceTypes
    const district = districtTypes

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({});
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [isActivated, setIsActivated] = useState(false);

    const { setValues, values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: UserMYup.updateUserPersonal,
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Updating Employee...');
            try {
                const result = await UserMService.updateUser(id, values);
                if (result.data.Code === 200) {
                    Toaster.justToast('success', result.data.Message, () => {
                        navigate('/app/admin/customers');
                    });
                }
            } catch (error) {
                console.error(error);
                if (!error.response.data.Status) {
                    Toaster.justToast('error', error.response.data.Data.error, () => {

                    });
                }
                // Handle error response
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
                console.log('values:', values);
            }
        }
    })

    // Function to handle account activation
    const handleAccountActivation = () => {
        CusSwal.okConfiramation(async () => {
            setLoading(true);
            Toaster.loadingToast('Updating Account Status...');
            try {
                const result = await UserMService.activateUser(id); // Update status based on current state
                if (result.data.Code === 200) {
                    setIsActivated(false); // Toggle activation status
                    Toaster.justToast('success', result.data.Message, () => {
                        fetchEmployeeDetails()
                    });
                }
            } catch (error) {
                console.error(error);
                Toaster.justToast('error', error.response.data.Message, () => { });
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
            }
        })
    };

    // Function to handle account deactivation
    const handleAccountDeactivation = () => {
        CusSwal.okConfiramation(async () => {
            setLoading(true);
            Toaster.loadingToast('Updating Account Status...');
            try {
                const result = await UserMService.deactivateUser(id);
                if (result.data.Code === 200) {
                    setIsActivated(true); // Toggle activation status
                    Toaster.justToast('success', result.data.Message, () => {
                        fetchEmployeeDetails()
                    });
                }
            } catch (error) {
                console.error(error);
                Toaster.justToast('error', error.response.data.Message);
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
            }
        })
    };

    const fetchEmployeeDetails = async () => {
        try {
            setLoading(true)
            const response = await UserMService.getUserById(id);
            if (response.data.Code === 200) {
                const user = response.data.Data.user;
                console.log(user)
                setInitialValues(user)
                setValues(user);
                setIsActivated(user.IsApproved);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);
    return (
        <main className="main-content-wrapper pb-3 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Edit User'} icon={'fa-user'} />
                {/* row */}
                {
                    loading ? (
                        <PreLoader />
                    ) : (<>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="col-12 mb-5">
                                    <div className="card p-5">
                                        <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                                            <h3 className='h5'>Personal Information</h3>
                                            <div className="row row-gap-4">
                                                <div className="col-md-6">
                                                    <input
                                                        className="form-control"
                                                        value={id} // Assuming ID is to be displayed and not changed
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.FirstName && touched.FirstName ? 'is-invalid' : ''}`}
                                                        placeholder="First name"
                                                        aria-label="First name"
                                                        name="FirstName"
                                                        value={values.FirstName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.FirstName}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.LastName && touched.LastName ? 'is-invalid' : ''}`}
                                                        placeholder="Last name"
                                                        aria-label="Last name"
                                                        name="LastName"
                                                        value={values.LastName}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.LastName}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 ">
                                                    <div className="input-group">
                                                        <div class="input-group-text">+94</div>
                                                        <input
                                                            type="text"
                                                            maxLength={9}
                                                            className={`form-control ${errors.Telephone && touched.Telephone ? 'is-invalid' : ''}`}
                                                            placeholder="Telephone"
                                                            aria-label="Telephone"
                                                            name="Telephone"
                                                            value={values.Telephone}
                                                            onChange={handleChange}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.Telephone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.Age && touched.Age ? 'is-invalid' : ''}`}
                                                        placeholder="Age"
                                                        aria-label="Age"
                                                        name="Age"
                                                        value={values.Age}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.Age}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className={`form-control ${errors.Role && touched.Role ? 'is-invalid' : ''}`}
                                                        name="Role"
                                                        value={values.Role}
                                                        onChange={handleChange}
                                                    >
                                                        {roles.map((role, index) => (
                                                            <option key={index} value={role.value}>{role.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        {errors.Role}
                                                    </div>
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
                                                    <div className="invalid-feedback">
                                                        {errors.Company}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className={`form-control ${errors.Province && touched.Province ? 'is-invalid' : ''}`}
                                                        name="Province"
                                                        onChange={handleChange}
                                                        value={values.District}>
                                                        {province.map((province, index) => (
                                                            <option key={index} value={province.value}>{province.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        {errors.Province}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        name="District"
                                                        value={values.District}
                                                        onChange={handleChange}
                                                    >
                                                        {
                                                            district.map((district, index) => (
                                                                <option key={index} value={district.value}>{district.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        {errors.District}
                                                    </div>
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
                                                    <div className="invalid-feedback">
                                                        {errors.City}
                                                    </div>
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
                                                    <div className="invalid-feedback">
                                                        {errors.ZipCode}
                                                    </div>
                                                </div>
                                                <div className="col-12 text-end">
                                                    <button disabled={loading} className='btn btn-primary'>Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <ChangePwd userId={id} loading={loading} setLoading={setLoading} fetchEmployeeDetails={fetchEmployeeDetails} userValues={values} />
                                <div className="col-12">
                                    <div className="card p-4">
                                        <h3 className='h5 text-danger'>Account Actions</h3>
                                        <div className="row row-gap-4">
                                            <div className="col-md-12 text-center">
                                                <button
                                                    disabled={loading}
                                                    className={`btn w-100 ${isActivated ? 'btn-outline-danger' : 'btn-success'}`}
                                                    onClick={isActivated ? handleAccountDeactivation : handleAccountActivation}
                                                >
                                                    {isActivated ? 'Deactivate Account' : 'Activate Account'}
                                                </button>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <button disabled={loading} className="btn btn-danger w-100">Delete Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </main>
    )
}
