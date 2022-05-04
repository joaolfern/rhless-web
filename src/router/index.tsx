import UnauthLayout from 'layout/UnauthLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

function index() {
  return (
    <Routes>
      <Route path='/*' element={
        <UnauthLayout />
      }/>
      <Route path='auth' element={<UnauthLayout />} />
    </Routes>
  )
}

export default index