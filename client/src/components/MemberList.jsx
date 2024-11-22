// MemberList.jsx

import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/members');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          console.error('Error fetching members');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (memberID) => {
    const confirm = window.confirm("Are you sure you want to delete this Member?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/members/${memberID}`, {
        method: 'DELETE',
      });
      if (response.ok){
        setMembers((prevList) => prevList.filter((member) => member.MemberID !== memberID));
        console.log("Member deleted successfully");
      } else {
        console.log("Member not found");
      }
    } catch (err){
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex justify-items-center flex-col">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <div className="my-8 px-36 mt-16">
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Members
          </h1>
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-6">
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">Member ID</th>
                <th scope="col" className="px-4 py-2">Member Name</th>
                <th className="px-4 py-2">Contact No</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Membership Type</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-4 py-2">{member.MemberID}</td>
                  <td className="px-4 py-2">{member.Name}</td>
                  <td className="px-4 py-2">{member.contactNo}</td>
                  <td className="px-4 py-2">{member.Adrress}</td>
                  <td className="px-4 py-2">{member.membershipType}</td>
                  <td className='space-x-2'>
                    <button className=' border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded px-4 py-1'
                    onClick={() => handleDelete(member.MemberID)} >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberList;
