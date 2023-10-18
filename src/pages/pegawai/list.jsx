import React, { useEffect, useState } from 'react'
import { Table, Pagination, Input, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getListPegawai } from '../../feature/pegawai/pegawaiSlice'
import '../../assets/css/pagination.css'
import Detail from '../../components/pegawai/detail'
import Create from '../../components/pegawai/create'
import '../../assets/css/data_table.css'

const { Search } = Input;

const List = () => {
    const dispatch = useDispatch();
    const pegawaiSelector = useSelector(state => state.pegawai);
    const { isLoading, total, data } = pegawaiSelector.listPegawai

    const [pageState, setPageState] = useState(1)
    const [limitState, setLimitState] = useState(10)
    const [searchState, setSearchState] = useState('')
    const [statusPegawaiState, setStatusPegawaiState] = useState('')

    const getData = () => {
        dispatch(getListPegawai({
            page: pageState,
            limit: limitState,
            kode_status_pegawai: statusPegawaiState,
            search: searchState,
        }))
    }

    useEffect(() => {
        getData()
    }, [pageState, limitState, statusPegawaiState, searchState])

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

    const handleFilter = (value) => {
        if (!value) { value = '' }
        setStatusPegawaiState(value)
        setPageState(1)
        setLimitState(10)
        getData()
    };

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
                        <Select
                            onChange={handleFilter}
                            placeholder="Pilih status"
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={[
                                {
                                    value: 'PNS',
                                    label: 'PNS',
                                },
                                {
                                    value: 'Non PNS',
                                    label: 'Non PNS',
                                },
                            ]}
                        />
                        <Search placeholder="Cari" allowClear onSearch={onSearch} />
                        <Create />
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
        title: 'Nomor Identitas',
        dataIndex: 'nomor_identitas',
        key: 'nomor_identitas',
    },
    {
        title: 'Status',
        dataIndex: 'status_pegawai',
        key: 'status_pegawai',
    },
    {
        title: 'Golongan & Pangkat',
        dataIndex: 'golongan_pangkat',
        key: 'golongan_pangkat',
    },
    {
        title: 'Eselon',
        dataIndex: 'eselon',
        key: 'eselon',
    },
    // {
    //     title: 'Jabatan Struktural',
    //     dataIndex: 'jabatan_struktural',
    //     key: 'jabatan_struktural',
    // },
    {
        title: 'Jabatan Fungsional',
        dataIndex: 'jabatan_fungsional',
        key: 'jabatan_fungsional',
    },

    {
        title: 'Aksi',
        dataIndex: '',
        key: '',
    },
]

export default List