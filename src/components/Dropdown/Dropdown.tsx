import { Menu } from '@headlessui/react'
import React, { ReactNode } from 'react'

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
      <Menu.Items>
        {options.map(({ label, onClick }) => (
          <Menu.Item key={label}>
            {({ active }) => (
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
