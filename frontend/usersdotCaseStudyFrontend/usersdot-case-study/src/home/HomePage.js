import React, { useEffect, useState } from 'react'
import CustomTable from '../customTable/customTable'
import userService from '../services/UserService'
import { EditOutlined, MoreOutlined } from '@ant-design/icons'
import UserDetailModal from '../userDetailModal/userDetailModal'
import UserFormModal from '../userFormModal/userFormModal'

const HomePage = () => {

    const [searchInput, setSearchInput] = useState('')
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({})
    const [fetchUsers, setFetchUsers] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
          page: 1,
          pageSize: 10,
        },
    }); 
    const [loading, setLoading] = useState(false);

    const [userDetail, setUserDetail] = useState({})
    const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
    
    const showUserDetail = async (userId) => {
        getUserDetailById(userId)
        setIsUserDetailModalOpen(true)
    }
    const handleUserDetailOk = () => {
      setIsUserDetailModalOpen(false);
    };
    const handleUserDetailCancel = () => {
      setIsUserDetailModalOpen(false);
    };


    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    
    const showEditUser = async (userId) => {
        await getUserDetailById(userId)
        setIsEditUserModalOpen(true)
    }
    const handleEditUserOk = async () => {
        const error = await updateNewUser(newUser, userDetail.id); 

        if (error.length === 0) { 
            setIsEditUserModalOpen(false);
        }
    };
    const handleEditUserCancel = () => {
      setIsEditUserModalOpen(false);
    };

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    
    const showAddUser = async () => {
        setNewUser({})
        setUserDetail({})
        setIsAddUserModalOpen(true)
    }
    const handleAddUserOk = async () => {
        const error = await saveNewUser(newUser); 

        if (error.length === 0) { 
            setIsAddUserModalOpen(false);
        }
    };
    const handleAddUserCancel = () => {
        setNewUser({})
        setErrorMessage([])
        setIsAddUserModalOpen(false);
    };

    useEffect(() => {
        getAllUsers()
    }, [searchInput, fetchUsers])

    const columns = [
        {
            title: 'Name Surname',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <>{record.name} {record.surname}</>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Country-District',
            dataIndex: 'country',
            key: 'country',
            render: (name, record) => (
                <>{record.country} - {record.district}</>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Detail',
            dataIndex: '',
            key: 'x',
            align: 'center',
            render: (text, record) => (
                <MoreOutlined
                    onClick={() => showUserDetail(record.id)}
                    style={{ fontSize: '20px'}}
                />
            )
          },
          {
            title: 'Edit',
            dataIndex: '',
            key: 'x',
            align: 'center',
            render: (text, record) => (
                <EditOutlined
                    onClick={() => showEditUser(record.id)}
                    style={{ fontSize: '20px'}}
                />
            )
          },
    ];

    const getAllUsers = async () => {
        try {
            const params = '?page=' + tableParams.pagination.page + '&pageSize=' + tableParams.pagination.pageSize + '&search=' + searchInput
            userService.getAllUsers(params).then(response => {
                setLoading(true)
                setUsers(response.users)
                setTableParams({
                    pagination: {
                      page: response.page,
                      pageSize: response.pageSize,
                      total: response.total,
                    },
                });
                setLoading(false)
            }).catch(error =>
                console.log(error)
            )
        } catch (error) {
            console.log(error)
        }
    }

    const getUserDetailById = async (userId) => {
        try {
            const params = userId.toString()
            await userService.getUserById(params).then(response => {
                setUserDetail(response)
                const { id, createdAt, updatedAt, ...userWithoutDates } = response;
                setNewUser(userWithoutDates)
            }).catch(error =>
                console.log(error)
            )
        } catch (error) {
            console.log(error)
        }
    }

    const saveNewUser = async (newUser) => {
        try {
            const response = await userService.saveUser(newUser);
            setFetchUsers((previousValue) => !previousValue);
            setNewUser({});
            return ""; 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred"; 
            setErrorMessage(errorMessage);
            return errorMessage; 
        }
    }

    const updateNewUser = async (newUser, userId) => {
        try {
            const response = await userService.updateUser(newUser, userId); 
            setFetchUsers((previousValue) => !previousValue);
            setNewUser({});
            return ""; 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred"; 
            setErrorMessage(errorMessage);
            return errorMessage; 
        }
    }

    return (
        <div>
            <CustomTable
                columns={columns}
                dataSource={users}
                setDataSource={setUsers}
                tableParams={tableParams}
                setTableParams={setTableParams}
                loading={loading}
                setSearchValue={setSearchInput}
                showAddUser={showAddUser}

            />

            {
                isUserDetailModalOpen &&
                <UserDetailModal
                    userDetail = {userDetail}
                    isModalOpen = {isUserDetailModalOpen}
                    handleOk = {handleUserDetailOk}
                    handleCancel = {handleUserDetailCancel}
                />
            }

            {
                isEditUserModalOpen &&
                <UserFormModal
                    userDetail = {userDetail}
                    newUser={newUser}
                    setNewUser={setNewUser}
                    modalType={'edit'}
                    isModalOpen = {isEditUserModalOpen}
                    handleOk = {handleEditUserOk}
                    handleCancel = {handleEditUserCancel}
                    errorMessage={errorMessage}
                />
            }

            {
                isAddUserModalOpen &&
                <UserFormModal
                    userDetail = {userDetail}
                    newUser={newUser}
                    setNewUser={setNewUser}
                    modalType={'add'}
                    isModalOpen = {isAddUserModalOpen}
                    handleOk = {handleAddUserOk}
                    handleCancel = {handleAddUserCancel}
                    errorMessage={errorMessage}
                />
            }
        </div>
    )
}

export default HomePage