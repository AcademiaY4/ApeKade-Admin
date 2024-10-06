import * as yup from 'yup';
import Provinces from '../../Utils/Constants/Provinces';
import Districts from '../../Utils/Constants/Districts';

const roleTypes = ['ADMIN', 'USER', 'VENDOR', 'CSR']; // Roles from your Role enum
const statusTypes = ['PENDING', 'ACTIVE', 'DEACTIVATED']; // Status enum
const provinceTypes = Provinces;
const districtTypes = Districts;

class UserMYup {
    // Validation schema for adding a new user
    addUser = yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string(),
        telephone: yup.string().matches(/^\+94\d{9}$/, 'Telephone must be in the format +94XXXXXXXXX').required(),
        age: yup.number().min(14, 'Age must be between 14 and 100').max(100, 'Age must be between 14 and 100').required(),
        email: yup.string().email('Must be a valid email').required('Email is required'),
        passwordHash: yup.string().required('Password is required'),
        role: yup.string().oneOf(roleTypes).required('Role is required'),
        isApproved: yup.boolean().required(),
        status: yup.string().oneOf(statusTypes).required('Status is required'),
        province: yup.string().oneOf(provinceTypes).required('Province is required'),
        district: yup.string().oneOf(districtTypes).required('District is required'),
        city: yup.string().required('City is required'),
        zipCode: yup.string(),
        company: yup.string(),
    });

    // Validation schema for updating a user starts here
    updateUser = yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        telephone: yup.string().matches(/^\+94\d{9}$/, 'Telephone must be in the format +94XXXXXXXXX'),
        age: yup.number().min(14, 'Age must be between 14 and 100').max(100, 'Age must be between 14 and 100'),
        email: yup.string().email('Must be a valid email'),
        passwordHash: yup.string(),
        role: yup.string().oneOf(roleTypes),
        isApproved: yup.boolean(),
        status: yup.string().oneOf(statusTypes),
        province: yup.string().oneOf(provinceTypes),
        district: yup.string().oneOf(districtTypes),
        city: yup.string(),
        zipCode: yup.string(),
        company: yup.string(),
    });

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

    // Validation schema for deleting a user
    dltUser = yup.object({
        id: yup.string().required('User ID is required'),
    });

    // Validation schema for getting a user
    getUser = yup.object({
        id: yup.string().required('User ID is required'),
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

export default new UserMYup();
