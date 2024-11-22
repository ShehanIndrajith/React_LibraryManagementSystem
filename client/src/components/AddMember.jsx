import React, { useState } from 'react';
import Navbar from "./Navbar";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMember() {
  const [membershipType, setMembershipType] = useState("");
  const [Name, setMemberName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [Adrress, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, contactNo, Adrress, membershipType }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Member added:', data);

        // Clear the form fields after successful submission
        setMemberName('');
        setContactNo('');
        setAddress('');
        setMembershipType('');

        toast.success('Member added successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'bg-green-800 bg-opacity-50 text-white text-sm',
        });
      } else {
        console.log('Error adding member');
        toast.error('Failed to Member. Please try again.', {
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
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to Member. Please try again.', {
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
  };

  const handleChange = (event) => {
    setMembershipType(event.target.value);
  };

  return (
    <div className="flex justify-items-center flex-col">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <form className="my-8 px-36 mt-16" onSubmit={handleSubmit}>
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Register Member
          </h1>
        </div>
        <div className="grid mx-48 space-y-4">
          <div>
            <label className="block mb-1 font-bold">Name :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              value={Name}
              onChange={(e) => setMemberName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Contact No :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Address :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              value={Adrress}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Membership Type :</label>
            <select
              id="membershipType"
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              value={membershipType}
              onChange={handleChange}
              required
            >
              <option value="">Select Membership Type</option>
              <option value="monthly">Monthly</option>
              <option value="halfYear">Half Yearly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <div className="space-x-4">
            <button className="bg-amber-500 text-white hover:bg-amber-600 hover:text-white rounded px-4 py-1">
              Register
            </button>
            <button type="button" className="border border-black text-black hover:bg-black hover:text-white rounded px-8 py-1" onClick={() => {
              setMemberName('');
              setContactNo('');
              setAddress('');
              setMembershipType('');
            }}>
              Clear
            </button>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default AddMember;
