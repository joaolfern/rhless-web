import React from 'react'

export type ISelect = {
  value: string
  label: string
}

export type ITypedSelect<value, label> = {
  value: value
  label: label
}

function Select () {
  return (
    <div>Select</div>
  )
}

export default Select
