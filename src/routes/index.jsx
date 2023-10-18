import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Root from "../pages/root";
import Error from "../pages/error";
import Dashboard from "../pages/dashboard";
import ListDataTabel from "../pages/data_tabel/list";
import CreatePegawai from "../pages/pegawai/create";
import ListPegawai from "../pages/pegawai/list";
import RequireAuth from "../pages/require_auth";
import ListProgram from "../pages/program/list";
import ListKegiatan from "../pages/program/kegiatan/list";
import ListIndikator from "../pages/program/kegiatan/indikator/list";

const router = createBrowserRouter([
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    }, 
    {
        path: "/",
        element: <RequireAuth><Root /></RequireAuth>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "pegawai",
                element:<ListPegawai />
            },
            {
                path: "program",
                element:<ListProgram />,
               
            },
            {
                path: 'program/:id_program/kegiatan',
                element: <ListKegiatan/>
            },
            {
                path: 'program/:id_program/kegiatan/:id_kegiatan/indikator',
                element: <ListIndikator/>
            },
            {
                path:'data_tabel',
                element:<ListDataTabel/>
            }
        ]
    }
])

export default router;