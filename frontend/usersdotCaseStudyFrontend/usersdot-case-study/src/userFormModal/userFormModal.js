import React, { useState } from 'react'
import { Modal, Input, Select } from 'antd';
import { EnvironmentOutlined, KeyOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import utils from '../utils/utils';

const UserFormModal = ({ userDetail, newUser, setNewUser, modalType, isModalOpen, handleOk, handleCancel, errorMessage }) => {

    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h2>User {modalType === 'add' ? ' Add' : ' Edit'}</h2>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        margin: '10px 0px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Name:</b>
                        <Input
                            placeholder="Name"
                            prefix={<UserOutlined />}
                            defaultValue={userDetail?.name}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'name': e.target.value,
                                })
                            }
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Surname:</b>
                        <Input
                            placeholder="Surname"
                            prefix={<UserOutlined />}
                            defaultValue={userDetail?.surname}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'surname': e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        margin: '10px 0px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Email:</b>
                        <Input
                            placeholder="Email"
                            prefix={<MailOutlined />}
                            defaultValue={userDetail?.email}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'email': e.target.value,
                                })
                            }
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Password:</b>
                        <Input
                            placeholder="Password"
                            prefix={<KeyOutlined />}
                            defaultValue={userDetail?.password}
                            type='password'
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'password': e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        margin: '10px 0px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Phone:</b>
                        <Input
                            placeholder="Phone"
                            prefix={<PhoneOutlined />}
                            defaultValue={userDetail?.phone}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'phone': e.target.value,
                                })
                            }
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Age:</b>
                        <Input
                            placeholder="Age"
                            prefix={<UserOutlined />}
                            defaultValue={userDetail?.age}
                            type='number'
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'age': parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>


                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        margin: '10px 0px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>Country:</b>
                        <Input
                            placeholder="Country"
                            prefix={<EnvironmentOutlined />}
                            defaultValue={userDetail?.country}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'country': e.target.value,
                                })
                            }
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <b>District:</b>
                        <Input
                            placeholder="District"
                            prefix={<EnvironmentOutlined />}
                            defaultValue={userDetail?.district}
                            onChange={(e) => 
                                setNewUser({
                                ...newUser,
                                'district': e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width:'85%'
                }}>
                    <b>Role:</b>
                    <Select
                        defaultValue={userDetail?.role}
                        onChange={(value) => 
                            setNewUser({
                            ...newUser,
                            'role': value,
                            })
                        }
                        options={[
                            { value: 'user', label: 'User' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'superAdmin', label: 'SuperAdmin' },
                        ]}
                        />
                </div>

                <div>
                    <p style={{ color: 'red' }}>
                        {errorMessage.join(', ')}
                    </p>
                </div>

            </Modal>
        </>
    );
}

export default UserFormModal