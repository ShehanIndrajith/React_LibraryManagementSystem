import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { toast,ToastContainer } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";

function Home() {
  const [BookCount , setBookCount] = useState(0);
  const [MembersCount, setMembersCount] = useState(0);
  const [BookIssueCount, setBookIssueCount] = useState(0);
  const [IssuedBooks, setIssuedBooks] = useState([]);
  const [selectedIssueID, setSelectedIssueID] = useState(null);


    const fetchBookCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookscount');
        if (response.ok){
          const data = await response.json();
          setBookCount(data.count);
        }else {
          console.error('Error fetching Book Count');
        }
      } catch (err){
        console.error('Error:', err);
      }
    };

    const fetchMembersCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/memberscount')
        if (response.ok){
          const data = await response.json();
          setMembersCount(data.count);
        } else {
          console.error('Error fetching Book Count');
        }
      }
      catch (err){
        console.error('Error:', err);
      }
    };

    const fetchBookIssueCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookissuecount')
        if (response.ok){
          const data = await response.json();
          setBookIssueCount(data.count);
        } else {
          console.error('Error fetching Book Issue Count');
        }
        
      } catch (err){
        console.error('Error:', err);
      }
    };

    const fetchIssuedBooks = async () =>{
      try {
        const response = await fetch('http://localhost:5000/api/bookissue');
        if (response.ok){
          const data = await response.json();
          setIssuedBooks(data);
        } else {
          console.error('Error fetching members');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    useEffect (() => {
      fetchBookCount();
    fetchMembersCount();
    fetchBookIssueCount();
    fetchIssuedBooks();
    },([]));
    


  const handleCheckboxChange = (issueID) => {
    setSelectedIssueID(issueID === selectedIssueID ? null : issueID);
  };

  const handleRelease = async ()=> {
    if (!selectedIssueID){
      alert('Please select a book to release');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/bookissue/${selectedIssueID}`, {method: 'DELETE',});
      if (response.ok){
        if (response.ok){
          toast.success('Book Received successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-green-800 bg-opacity-50 text-white text-sm',
          });
        setIssuedBooks((prev) => prev.filter((issuedbook) => issuedbook.IssueID !== selectedIssueID));
        fetchBookIssueCount();
        setSelectedIssueID(null);}
      } else {
        toast.error('Failed to Received book. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-800 bg-opacity-50 text-white text-sm',
          progress: undefined,
        });
      }

    }
    catch (err){
      console.error('Error:', err);
    }
    
  }


  return (
    <div className="flex justify-items-center flex-col ">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <div className="px-36 mt-24">
        <div className="flex flex-row w-full space-x-8">
          <div className="flex flex-1 items-center justify-center rounded-lg drop-shadow-md hover:drop-shadow-xl bg-amber-400 p-10">
            <label className="text-4xl mr-4">No of Books: </label>
            <span className="text-4xl">{BookCount}</span>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg drop-shadow-md hover:drop-shadow-xl bg-amber-400 p-10">
            <label className="text-4xl mr-4">No of Members: </label>
            <span className="text-4xl">{MembersCount}</span>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg drop-shadow-md hover:drop-shadow-xl bg-amber-400 p-10">
            <label className="text-4xl mr-4">Issued Books: </label>
            <span className="text-4xl">{BookIssueCount}</span>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex justify-center">
            <h1 className="border-b-4 border-amber-500 text-4xl mb-4 pb-2">
              Issued Book List
            </h1>
          </div>
          <div>
            <div className="flex flex-row items-center">
              <div className="flex flex-row w-full">
                <div className='flex h-8'>
                  <button className={`bg-amber-500 rounded px-6 h-full ${
                !selectedIssueID ? "cursor-not-allowed bg-slate-500" : ""}`} onClick={handleRelease} disabled={!selectedIssueID}>Release</button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-8 mb-8">
            <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Select
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Book ID
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Book Title
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Member Name
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Issued Date
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {IssuedBooks.map((issuedbook) => (
                  <tr key={issuedbook.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-4 py-2">
                    <Checkbox checked={selectedIssueID === issuedbook.IssueID}
    onChange={() => handleCheckboxChange(issuedbook.IssueID)}/>
                  </td>
                  <td className="px-4 py-2">{issuedbook.BookID}</td>
                  <td className="px-4 py-2">
                    {issuedbook.BookTitle}
                  </td>
                  <td className="px-4 py-2">{issuedbook.MemberName}</td>
                  <td className="px-4 py-2">{new Date(issuedbook.IssuedDate).toLocaleDateString('en-US')}</td>
                  <td className="px-4 py-2">{new Date(issuedbook.DueDate).toLocaleDateString('en-US')}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
