import AuthLayout from 'layout/AuthLayout'
import UnauthLayout from 'layout/UnauthLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

function index () {
  return (
    <Routes>
      <Route path='/*' element={
        <UnauthLayout />
      }/>
      <Route path='auth/*' element={<AuthLayout />} />
    </Routes>
  )
}

export default index
