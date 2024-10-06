import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import UserM from '../../../../Services/Admin/UserMService'
import UserMService from '../../../../Services/Admin/UserMService'
import PreLoader from '../../../../Components/PreLoader/PreLoader'
import DateFormatter from '../../../../Utils/Constants/DateFormatter'
import { useNavigate, useNavigation } from 'react-router-dom'
import CusSwal from '../../../../Utils/Swal/CusSwal'
import PdfGenerator from '../../../../Utils/Pdfs/PdfGenerator'
import userHeader from '../../../../Utils/Pdfs/UserMHeader'
import Toaster from '../../../../Utils/Toaster/Toaster'

export default function Customers() {
    const navigation = useNavigate()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState()
    const [searchTerm, setSearchTerm] = useState('');

    const navigateToAddUser = () => {
        navigation('/app/admin/customers/addCustomer')
    }
    const navigateToViewUser = (id) => {
        navigation(`/app/admin/customers/editCustomer/${id}`)
    }
    const handleDeleteUser = async (id) => {
        CusSwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Deleting User')
            try {
                const result = await UserMService.deleteUser(id);
                if (result) {
                    Toaster.justToast('success', "User Deleted", () => { });
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
    const fetchAllUsers = async () => {
        try {
            setLoading(true)
            const result = await UserMService.getAllUsers()
            if (result.data.status) {
                setTotalUsers(result.data.data.totalUsers)
                setUsers(result.data.data.users)
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    // generate pdf
    const generatePdf = () => {
        Toaster.loadingToast('Generating Pdf')
        try {
            PdfGenerator.generatePdf(users, "Users List", userHeader)
            Toaster.justToast('success', 'Creating The Pdf For You', () => { })
        } catch (error) {
            Toaster.justToast('error', 'genration failed', () => { })
        } finally {
            Toaster.dismissLoadingToast()
        }
    }
    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    // Filter users based on the search term
    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telephone.includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchAllUsers()
    }, [])
    return (
        <main className="main-content-wrapper">
            <div className="container">
                <BreadCrumb page={'Users'} icon={'fa-user'} />
                {loading ? (
                    <PreLoader />
                ) : (
                    <div className="row">
                        <div className="col-xl-12 col-12 mb-5">
                            <div className="card h-100 card">
                                <div className="p-6">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="col-md-4 col-12">
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
                                        <div className="d-flex justify-content-around align-items-center gap-3">
                                            <button className='btn btn-danger' onClick={() => { generatePdf() }}>Export PDF</button>
                                            <button className='btn btn-dark' onClick={() => { navigateToAddUser() }}>Add Users</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Telephone</th>
                                                    <th>Status</th>
                                                    <th>Role</th>
                                                    <th>Joined</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.length > 0 ? (
                                                    filteredUsers.map((user) => (
                                                        <tr key={user.id}>
                                                            <td>{`${user.firstName} ${user.lastName || ''}`}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.telephone || '-'}</td>
                                                            <td>
                                                                <span className={`badge ${user.status === 'ACTIVE' ? 'bg-light-primary text-dark-primary' : 'bg-danger text-light'}`}>
                                                                    {user.status}
                                                                </span>
                                                            </td>
                                                            <td className='text-lowercase'>{user.role}</td>
                                                            <td>{DateFormatter.formatDate(user.dateCreated)}</td>
                                                            <td className='d-flex justify-content-between align-items-center gap-5'>
                                                                <a style={{ cursor: 'pointer' }} onClick={() => { navigateToViewUser(user.id) }} className="text-dark">
                                                                    <i className="fa-solid fa-eye" />
                                                                </a>
                                                                {/* <a style={{ cursor: 'pointer' }} className="text-warning" >
                                                                    <i className="fa-solid fa-pencil" />
                                                                </a> */}
                                                                <a style={{ cursor: 'pointer' }} onClick={() => { handleDeleteUser(user.id) }} className="text-danger">
                                                                    <i className="fa-solid fa-trash" />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">No users found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Paginator total={filteredUsers.length} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>

    )
}
