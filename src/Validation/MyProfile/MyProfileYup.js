import * as yup from 'yup';
import Provinces from '../../Utils/Constants/Provinces';
import Districts from '../../Utils/Constants/Districts';

const roleTypes = ['ADMIN', 'USER', 'VENDOR', 'CSR']; // Roles from your Role enum
const statusTypes = ['PENDING', 'ACTIVE', 'DEACTIVATED']; // Status enum
const provinceTypes = Provinces;
const districtTypes = Districts;

class MyProfile {
    updateUserPersonal = yup.object({
        // firstname
        FirstName: yup.string().required(),
        LastName: yup.string(),
        Telephone: yup.string().required().matches(/^\d{9}$/, 'Telephone must be exactly 9 digits'),
        Age: yup.number().required().min(14, 'Age must be between 14 and 100').max(100, 'Age must be between 14 and 100'),
        Role: yup.string().required().oneOf(roleTypes),
        // country
        Province: yup.string().required().oneOf(provinceTypes),
        District: yup.string().required().oneOf(districtTypes),
        City: yup.string().required(),
        ZipCode: yup.string().optional().nullable(),
        Company: yup.string().optional().nullable(),
    });

    changePassword = yup.object({
        // OldPassword: yup.string().required('old password is required'),
        NewPassword: yup.string()
            .min(8, 'Must be at least 8 characters long')
            .required('New password is required'),
        ConfirmPassword: yup.string()
            .oneOf([yup.ref('NewPassword')], 'Passwords must match')
            .required('Please confirm your new password'),
    })
}
export default new MyProfile()