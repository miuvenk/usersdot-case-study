import React, { useState } from 'react';
import { Modal } from 'antd';
import utils from '../utils/utils';

const UserDetailModal = ({userDetail, isModalOpen, handleOk, handleCancel}) => {
    
    return (
      <>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <h1>User Details</h1>
          <p><b>Name Surname:</b> {userDetail.name + ' ' + userDetail.surname}</p>
          <p><b>Email:</b> {userDetail.email}</p>
          <p><b>Phone:</b> {userDetail.phone}</p>
          <p><b>Age:</b> {userDetail.age}</p>
          <p><b>Country:</b> {userDetail.country}</p>
          <p><b>District:</b> {userDetail.district}</p>
          <p><b>Role:</b> {userDetail.role}</p>
          <p><b>Created At:</b> {utils.formatDate(userDetail.createdAt)}</p>
          <p><b>Updated At:</b> {utils.formatDate(userDetail.updatedAt)}</p>
        </Modal>
      </>
    );
}

export default UserDetailModal