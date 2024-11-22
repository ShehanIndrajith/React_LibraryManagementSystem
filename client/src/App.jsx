import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addbook from './components/AddBook.jsx'
import AddMember from './components/AddMember.jsx'
import MemberList from './components/MemberList.jsx'
import Login from './components/login.jsx'
import Booklist from './components/Booklist.jsx'
import Home from './components/Home.jsx'
import IssueandRelease from './components/IssueandRelease.jsx'
import BookDescription from './components/BookDescription.jsx'
import UpdateBook from './components/UpdateBook.jsx'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-book" element={<Addbook />} />
        <Route path="/book-list" element={<Booklist />} />
        <Route path="/book-issue" element={<IssueandRelease />} />
        <Route path="/book-description/:bookId" element={<BookDescription/>} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/member-list" element={<MemberList />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        
      </Routes>
    </Router>
    
  )
}

export default App