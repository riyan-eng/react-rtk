import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table, Pagination, Input, Select, Space } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { getDetailProgram } from '../../../feature/program/programSlice'
import { getListKegiatan } from '../../../feature/kegiatan/kegiatanSlice'
import { Link } from 'react-router-dom';
const { Search } = Input;

const List = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const programSelector = useSelector(state => state.program.detail)
    const kegiatanSelector = useSelector(state => state.kegiatan);
    const { isLoading, total, data } = kegiatanSelector.list

    const [pageState, setPageState] = useState(1)
    const [limitState, setLimitState] = useState(10)
    const [searchState, setSearchState] = useState('')

    const getProgram = () => {
        dispatch(getDetailProgram({
            id: params.id_program
        }))
    }
    const getData = () => {
        dispatch(getListKegiatan({
            id_program: params.id_program,
            page: pageState,
            limit: limitState,
            search: searchState,
        }))
    }

    useEffect(() => {
        getProgram()
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
            title: 'Kode Rekening',
            dataIndex: 'kode_rekening',
            key: 'kode_rekening',
        },
        {
            title: 'Alokasi Anggaran',
            dataIndex: 'alokasi_anggaran',
            key: 'alokasi_anggaran',
        },
        {
            title: 'PPTK',
            dataIndex: 'pptk',
            key: 'pptk',
        },
        {
            title: 'RKA',
            dataIndex: 'rka',
            key: 'rka',
        },
        {
            title: 'LPJ',
            dataIndex: 'lpj',
            key: 'lpj',
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space>
                    <Link to={`/program/${params.id_program}/kegiatan/${record.id}/indikator`}><InfoCircleOutlined /></Link>
                </Space>
            )
        },
    ]

    return (
        <>
            <div className='header'>
                <h1>{programSelector.data.nama}</h1>
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



export default List