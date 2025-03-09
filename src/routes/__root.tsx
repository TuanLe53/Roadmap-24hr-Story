import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className='m-auto w-1/2 h-screen flex flex-col items-center'>
        <Link className='text-center text-3xl text-red-500 font-bold underline' to='/'>Stories</Link>
        <Outlet />
      </div>
    </React.Fragment>
  )
}
