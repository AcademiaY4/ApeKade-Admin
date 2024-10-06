import { useFormik } from 'formik';
import React from 'react'
import UserMYup from '../../../../../Validation/Admin/UserMYup';
import Toaster from '../../../../../Utils/Toaster/Toaster';
import UserMService from '../../../../../Services/Admin/UserMService';

export default function ChangePwd({ userId , loading, userValues, fetchEmployeeDetails, setLoading }) {
    const { setValues, values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            NewPassword: '',
            ConfirmPassword: '',
        },
        validationSchema: UserMYup.changePassword,
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Updating Password...');
            try {
                const result = await UserMService.changePasswordWithoutCheck(userId, values);
                if (result.data.Code === 200) {
                    Toaster.justToast('success', result.data.Message, () => {
                        // navigate('/app/admin/customers');
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
    return (
        <>
            <div className="col-12 mb-5">
                <div className="card p-4">
                    <h3 className='h5'>Change Password</h3>
                    <form className='needs-validation' noValidate onSubmit={handleSubmit}>
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
                                <div className="invalid-feedback">
                                    {errors.NewPassword}
                                </div>
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
                                <div className="invalid-feedback">
                                    {errors.ConfirmPassword}
                                </div>
                            </div>
                            <div className="col-12 text-end">
                                <button disabled={loading} className='btn btn-primary'>Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
