import { ISelect } from 'components/Select/Select'
import React from 'react'

interface IRadioGroup {
  resources: ISelect[]
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  forwardedRef?: React.Ref<HTMLInputElement>
}

function RadioGroup ({ resources, inputProps, forwardedRef }: IRadioGroup) {
  return (
    <div className='flex flex-wrap gap-6'>
      {resources.map(({ label, value }) => (
        <label key={label} className='flex items-center justify-center gap-1 cursor-pointer select-none'>
          <input
            value={value}
            type='radio'
            ref={forwardedRef}
            {...inputProps}
          />
          {label}
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
