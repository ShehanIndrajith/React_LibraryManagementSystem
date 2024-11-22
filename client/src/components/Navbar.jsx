import React from 'react'
import { Link } from 'react-router-dom';
//backdrop-blur-xl
function Navbar() {
  return (
    <nav className='bg-amber-500 shadow-lg px-36 py-4 flex flex-row items-center justify-between'>
        <div className="flex flex-shrink-0 items-center">
            <h1 className='text-2xl font-bold'>Library</h1>

        </div>
        <div className="mx-8 flex space-x-8 items-center justify-center gap-4">
          <Link to="/home" className='text-base'>Home</Link> {/* Updated to Link */}
          <Link to="/add-book" className='text-base'>Add Book</Link> {/* You can add corresponding routes for these */}
          <Link to="/add-member" className='text-base'>Add Member</Link>
          <Link to="/member-list" className='text-base'>Member List</Link>
          <Link to="/book-list" className='text-base'>Book List</Link> 
          <Link to="/book-issue" className='text-base'>Book Issue</Link>
          <Link to="/" className='text-base font-bold'>Log out</Link>
            
        </div>

    </nav>
  )
}

export default Navbar
