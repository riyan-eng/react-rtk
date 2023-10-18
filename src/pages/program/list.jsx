import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListProgram } from '../../feature/program/programSlice'
import { Table, Pagination, Input, Select, Space } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import '../../assets/css/data_table.css'
import { Link } from 'react-router-dom';

const { Search } = Input;

const List = () => {
    const dispatch = useDispatch();
    const programSelector = useSelector(state => state.program);
    const { isLoading, total, data } = programSelector.list
    const [pageState, setPageState] = useState(1)
    const [limitState, setLimitState] = useState(10)
    const [searchState, setSearchState] = useState('')

    const getData = () => {
        dispatch(getListProgram({
            page: pageState,
            limit: limitState,
            search: searchState,
        }))
    }

    useEffect(() => {
        getData()
    }, [pageState, limitState, searchState])

    const onShowSizeChange = (current, pageSize) => {
        setPageState(current)
        setLimitState(pageSize)
        getData()
    };

    const onPage = (page, pageSize) => {
        setPageState(page)
        setLimitState(pageSize)
        getData()
    }

    const onSearch = (e) => {
        setSearchState(e)
        setPageState(1)
        setLimitState(10)
        getData()
    };

    return (
        <>
            <div className='header'>
                <h1>Pegawai</h1>
                <div className='sub-header'>
                    <Space>
                        <Search placeholder="Cari" allowClear onSearch={onSearch} />
                        {/* <Create /> */}
                    </Space>
                </div>
            </div>
            {/* <Detail/> */}
            <Table
                size='small'
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={isLoading}
            />
            <div className='pagination'>
                <Pagination
                    current={pageState}
                    onShowSizeChange={onShowSizeChange}
                    onChange={onPage}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    total={total}
                    showQuickJumper
                    showSizeChanger
                />

            </div>
        </>
    )
}

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
    },
    {
        title: 'Aksi',
        // dataIndex: 'id',
        key: 'aksi',
        render: (_, record) => (
            <Space>
                <Link to={`/program/${record.id}/kegiatan`}><InfoCircleOutlined /></Link>
            </Space>
        )
    },
]

export default List