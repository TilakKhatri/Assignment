import React from 'react'

function Header({title}) {
  return (
      <div className='text-center text-4xl text-green-800 font-bold my-4'>
          <h1>{title}</h1>
    </div>
  )
}

export default Header;