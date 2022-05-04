import React from 'react'
import { Link as RouterLink, To } from 'react-router-dom'

export type ILink = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  to: To;
}

function Link({ ...rest }: ILink) {
  return (
    <RouterLink
      className='underline text-link'
      {...rest}
    />
  )
}

export default Link