import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate} from 'react-router-dom';
import WatchList from './components/WatchList.tsx';
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import Auth from './components/Auth.tsx';
import { RecoilRoot } from 'recoil';
import Regsiter from './components/Regsiter.tsx';
import IndividualWatchList from './components/IndividualWatchList.tsx';
import CreateWatchList from './components/CreateWatchList.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/auth' element={<Auth />} >

        <Route path='login' element={<Login />} />

        <Route path='register' element={<Regsiter />} />

      </Route>

      <Route path='/' element={<App />} >

        <Route path='' element={<Home />} />        

        <Route path='watch-list' element={<WatchList />} />

        <Route path='create-watch-list' element={<CreateWatchList />} />

        <Route path='watch-list/:type' element={<IndividualWatchList />} />

       

      </Route>

    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
)
