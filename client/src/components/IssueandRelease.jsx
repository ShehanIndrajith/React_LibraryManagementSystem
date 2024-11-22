import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Select from "react-select";
import { toast,ToastContainer } from "react-toastify";
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

function IssueandRelease() {
  const [options, setOptions] = useState([]);
  const [bookoptions, setBookOptions] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dueDate, setDueDate] = useState("");

  // Fetch member names from the API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/membernames"
        );
        const memberOptions = response.data.map((member) => ({
          value: member.MemberID,
          label: member.Name,
        }));
        setOptions(memberOptions);
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/booknames");
        const bookOptions = response.data.map((book) => ({
          value: book.BookID,
          label: book.BookName,
        }));
        setBookOptions(bookOptions);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBook || !selectedMember || !dueDate) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const formData = {
      BookID: selectedBook.value,
      BookName: selectedBook.label,
      MemberID: selectedMember.value,
      MemberName: selectedMember.label,
      DueDate: dueDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookissue",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success('Book Issue successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-green-800 bg-opacity-50 text-white text-sm',
      });
      
      setSelectedMember('');
      setSelectedBook('');
      setDueDate('');


    } catch (error) {
      console.error("Error issuing book:", error.message);
      toast.error('Failed to Issue book.', {
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

  const handleBookChange = (selectedOption) => {
    setSelectedBook(selectedOption);
    console.log("Selected Book:", selectedOption);
  };

  const handleMemberChange = (selectedOption) => {
    setSelectedMember(selectedOption);
    console.log("Selected Member:", selectedOption);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  return (
    <div className="flex justify-items-center flex-col">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <div className="my-8 px-36 mt-16">
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Issue Book
          </h1>
        </div>
        <div className="flex w-full justify-center px-64">
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label htmlFor="book" className="block text-md font-medium">
                Book Name
              </label>
              <Select
                id="book"
                options={bookoptions}
                value={selectedBook}
                onChange={handleBookChange}
                placeholder="Choose a Book"
                className="react-select-container rounded border border-solid border-black focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none"
                classNamePrefix="react-select"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="members" className="block text-md font-medium">
                Member Name
              </label>
              <Select
                id="members"
                options={options}
                value={selectedMember}
                onChange={handleMemberChange}
                placeholder="Choose a member"
                className="react-select-container rounded border border-solid border-black focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none"
                classNamePrefix="react-select"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="block text-md ">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-amber-500 rounded px-8 py-1 text-black font-bold hover:bg-amber-600"
              >
                Issue
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default IssueandRelease;
