import React, { ReactNode } from 'react'
import { Menu } from '@headlessui/react'

interface IProps {
  options: {
    label: string
    onClick: () => void
  }[]
  children: ReactNode
}

function Dropdown ({ options, children }: IProps) {
  return (
    <Menu>
      <Menu.Button>
        {children}
      </Menu.Button>
      <Menu.Items className='p-3 bg-white border-2 border-black rounded'>
        {options.map(({ label, onClick }) => (
          <Menu.Item key={label}>
            {({ active }: { active: boolean }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                onClick={onClick}
              >
                {label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

export default Dropdown
