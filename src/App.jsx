import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './feature/counter/counterSlice'
import { getAllPokemon } from './feature/pokemon/pokemonSlice'

import { Button, DatePicker, Space, version, Table, Tag, Pagination } from "antd";
import { getListPost } from './feature/post/postSlice'

function App() {
  const dispatch = useDispatch();
  const counterSelector = useSelector(state => state.counter)
  const pokemonSelector = useSelector(state => state.pokemon)
  const postSelector = useSelector(state => state.post)
  // console.log(postSelector.listPost.data);


  function tambah() {
    dispatch(increment())
  }

  function kurang() {
    dispatch(decrement())
  }

  useEffect(() => {
    dispatch(getAllPokemon());
    dispatch(getListPost({
      page: 1,
      limit: 10
    }))
  }, [])

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
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
      <h1>Vite + React</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={postSelector.listPost.data}
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        onShowSizeChange={onShowSizeChange}
        onChange={onPage}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${postSelector.listPost.total} items`}
        total={postSelector.listPost.total}
      />
      <div className="card">
        <button onClick={kurang}>Kurang</button>
        <button onClick={tambah}>
          count is {counterSelector.value}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {
        pokemonSelector.allPokemon.isLoading ? "Loading" : pokemonSelector.allPokemon.result.map((res, index) =>
          <li key={index}>{res.name} <a href={res.url}>link</a></li>
        )
      }
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

export default App
