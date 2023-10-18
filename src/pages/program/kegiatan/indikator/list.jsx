import React, { useEffect, useState } from 'react'
import { getDetailKegiatan } from '../../../../feature/kegiatan/kegiatanSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DownOutlined, UploadOutlined, ExclamationCircleFilled, UpCircleTwoTone, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, message, Upload, Modal, Input, Table, Pagination } from 'antd';
import { read, utils, writeFile } from 'xlsx';
import { getListIndikatorKinerja, importIndikatorKinerja } from '../../../../feature/indikator_kinerja/indikatorKinerjaSlice';
import { Link } from 'react-router-dom';
import Detail from './detail';
import Update from './update';

const { Search } = Input;

const List = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const kegiatanSelector = useSelector(state => state.kegiatan.detail)
    const importIndikatorKinerjaSelector = useSelector(state => state.indikatorKinerja.import)
    const listIndikatorKinerjaSelector = useSelector(state => state.indikatorKinerja.list)
    const [pres, setPres] = useState([]);
    const [fileE, setFileE] = useState(null)
    const [pageState, setPageState] = useState(1)
    const [limitState, setLimitState] = useState(10)
    const [searchState, setSearchState] = useState('')

    const getKegiatan = () => {
        dispatch(getDetailKegiatan({
            id: params.id_kegiatan
        }))
    }

    const getData = () => {
        dispatch(getListIndikatorKinerja({
            id_sub_kegiatan: params.id_kegiatan,
            page: pageState,
            limit: limitState,
            search: searchState,
        }))
    }

    useEffect(() => {
        getKegiatan()
        getData()
    }, [pageState, limitState, searchState])

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setFileE(null);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleUpload = () => {
        let payload = []
        pres.map((item) => {
            payload.push({
                nama: item["Nama"],
                satuan_target_capaian: item["Satuan Target Capaian"],
                target_anggaran: item["Target Anggaran"],
                target_capaian: item["Target Capaian"]
            })
        })
        dispatch(importIndikatorKinerja({
            data: payload,
            id_sub_kegiatan: params.id_kegiatan
        }))
        handleOk()
        getData()
    };

    const props = {
        onRemove: () => {
            setFileE(null)
        },
        beforeUpload: (file) => {
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            if (!isXlsx) {
                message.error("Hanya diperbolehkan menggunakan format .xlsx")
                setFileE(null)
                return false
            }
            setFileE(file)
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (e) => {
                const data = e.target.result
                const workbook = read(data, { type: "binary" })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const parseData = utils.sheet_to_json(sheet)
                setPres(parseData)
            }
            return false;
        },
        // fileE
    };

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
            title: 'Target Capaian',
            dataIndex: 'target_capaian',
            key: 'target_capaian',
        },
        {
            title: 'Satuan Target Capaian',
            dataIndex: 'satuan_target_capaian',
            key: 'satuan_target_capaian',
        },
        {
            title: 'Target Anggaran',
            dataIndex: 'target_anggaran',
            key: 'target_anggaran',
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space>
                    <Detail data={record}/>
                    <Update data={record}/>
                    {/* <Link to={`/program/${params.id_program}/kegiatan/${record.id}/indikator`}><EditOutlined /></Link> */}
                </Space>
            )
        },
    ]

    return (
        <>
            <div className='header'>
                <h1>{kegiatanSelector.data.nama}</h1>
                <div className='sub-header'>
                    <Space>
                        <Search placeholder="Cari" allowClear onSearch={onSearch}/>
                        {/* <Create /> */}
                        
                        <Button type="primary" onClick={showModal} icon={<UploadOutlined />}>
                            Import
                        </Button>
                    </Space>
                </div>
            </div>

            <Modal
                open={open}
                title="Import data"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit"
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileE === null}
                        loading={importIndikatorKinerjaSelector.isLoading}
                        style={{
                            marginTop: 16,
                        }}
                    >
                        {importIndikatorKinerjaSelector.isLoading ? 'Uploading' : 'Start Upload'}
                    </Button>,
                ]}
            >
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Modal>

            <Table
                size='small'
                columns={columns}
                dataSource={listIndikatorKinerjaSelector.data}
                pagination={false}
                loading={listIndikatorKinerjaSelector.isLoading}
            />
            <div className='pagination'>
                <Pagination
                    current={pageState}
                    onShowSizeChange={onShowSizeChange}
                    onChange={onPage}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${listIndikatorKinerjaSelector.total} items`}
                    total={listIndikatorKinerjaSelector.total}
                    showQuickJumper
                    showSizeChanger
                />
            </div>
        </>
    )
}

export default List