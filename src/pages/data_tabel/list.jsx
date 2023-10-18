import React, { useEffect } from 'react'
import { Table, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getListPost } from '../../feature/post/postSlice'
import '../../assets/css/pagination.css'

const List = () => {
    const postSelector = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListPost({
            page: 1,
            limit: 10
        }))
    }, [])

    const onShowSizeChange = (current, pageSize) => {
        dispatch(getListPost({
            page: current,
            limit: pageSize
        }))
    };

    const onPage = (page, pageSize) => {
        dispatch(getListPost({
            page: page,
            limit: pageSize
        }))
    }

    return (
        <>
            <h1>Data Tabel</h1>
            <Table

                size='small'
                columns={columns}
                dataSource={postSelector.listPost.data}
                pagination={false}
                loading={postSelector.listPost.isLoading}
            />
            <div className='pagination'>
                <Pagination
                    onShowSizeChange={onShowSizeChange}
                    onChange={onPage}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${postSelector.listPost.total} items`}
                    total={postSelector.listPost.total}
                    showQuickJumper
                />
            </div>
        </>
    )
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Trips',
        dataIndex: 'trips',
        key: 'trips',
    }
]

export default List