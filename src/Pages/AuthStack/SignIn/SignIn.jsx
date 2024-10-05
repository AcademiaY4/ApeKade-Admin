import React, { useState } from 'react'
import LocalStore from '../../../Store/LocalStore'
import { useFormik } from 'formik'
import AuthYup from '../../../Validation/Auth/AuthYup'
import AuthService from '../../../Services/Auth/AuthService'
import { useAuth } from '../../../Context/AuthContext'
import ResponseHandler from '../../../Services/ResponseHandler'
import { useNavigate } from 'react-router-dom'
import Toaster from '../../../Utils/Toaster/Toaster'

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const authContext = useAuth()
    const navigate = useNavigate();
    const initValues = {
        email: '',
        password: '',
        role: 'ADMIN'
    };
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initValues,
        validationSchema: AuthYup.loginSchema,
        onSubmit: async (values) => {
            setLoading(true)
            Toaster.loadingToast("Validating Credentials .......")
            try {
                const result = await AuthService.authLogin(values)
                
                if (result.data.Code === 200) {
                    const { access_token, user,role } = result.data.Data;
                    authContext.login({ access_token, user,role })
                    
                    Toaster.justToast('success', result.data.Message, () => {
                        if (role === "ADMIN")
                            navigate('/app/admin/dashboard')
                        if (role === "CSR")
                            navigate('/app/csr/dashboard')
                        // if (role === "BUYER")
                        //     navigate('/app/buyer/dashboard')
                        if (role === "VENDOR")
                            navigate('/app/vendor/dashboard')
                    })
                    // Toaster.dismissLoadingToast()
                }
            } catch (error) {
                if(!error.response.data.Status && error.response.data.Code===404){
                    Toaster.justToast('error',error.response.data.Message,()=>{})
                }
                if(!error.response.data.Status && error.response.data.Code===403){
                    Toaster.justToast('error','invalid credetials',()=>{})
                }
            } finally {
                setLoading(false)
                Toaster.dismissLoadingToast()
            }
        }
    })

    return (
        <section className="vh-100">
            <div className="container h-100 px-6 p-md-0 d-flex flex-column justify-content-center align-items-center">
                {/* row */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-md-5">
                        <div className="mb-lg-9 mb-5 d-flex flex-column align-items-center">
                            <img className='w-65 mb-5' src="../assets/images/logo/freshcart-logo.png" alt="eCommerce HTML Template" />
                            <p className='fw-bolder'>Admin Login</p>
                        </div>
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="row g-3">
                                {/* row */}
                                <div className="col-8">
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${(errors.email && touched.email) ? 'is-invalid' : ''}`}
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>
                                {/* Role Select Field */}
                                <div className="col-4">
                                    <select
                                        name="role"
                                        className={`form-control ${(errors.role && touched.role) ? 'is-invalid' : ''}`}
                                        value={values.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select Role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="CSR">CSR</option>
                                        <option value="VENDOR">Vendor</option>
                                        {/* Add more roles if needed */}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.role}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${(errors.password && touched.password) ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mb-4 mt-1">
                                    <div>
                                        <a href="">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                {/* btn */}
                                <div className="col-12 d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </div>
                                {/* link */}
                                <p className='text-capitalize text-center'>
                                    All rights reserved
                                    <span className='text-success'> APEKADE!!</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
