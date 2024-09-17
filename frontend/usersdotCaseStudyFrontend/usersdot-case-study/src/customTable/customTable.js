import React, { useState } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
const { Search } = Input;

const CustomTable = ({
    columns, 
    dataSource, 
    setDataSource, 
    tableParams, 
    setTableParams, 
    loading,
    setSearchValue,
    showAddUser
  }) => {


  const onSearch = (value, _e) => {
    setSearchValue(value)
  };


  return (
    <div
      style={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        margin: '20px',
        padding: '10px'
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div style={{
          width:'400px',
          margin: '10px 0px',
          }}>
          <Search 
            placeholder="search" 
            onSearch={onSearch}
            enterButton 
          />
        </div>
        <div>
          <Button type='primary' onClick={showAddUser}>Add New User</Button>
        </div>
      </div>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey={(record) => record.id}
        pagination={{
          total: tableParams.pagination.total,
          onChange: (page, pageSize) => {
            setTableParams({
              pagination: {
                page: page,
                pageSize: pageSize,
                total: tableParams.pagination.total,
              },
            });
          },
          defaultPageSize:10,
          showSizeChanger:true,
          pageSizeOptions:['10', '20', '30']
        }}
        loading={loading}
        bordered
      />
    </div>
  )
}

export default CustomTable