import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast,ToastContainer } from "react-toastify";
import { useLocation, useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function UpdateBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookDetails = location.state?.bookDetails;


  const [bookname, setbookname] = useState(bookDetails.BookName);
  const [authorname, setAuthorname] = useState(bookDetails.AuthorName);
  const [bookcategory, setBookCategory] = useState(bookDetails.BookCategory);
  const [language, setLanguage] = useState(bookDetails.Language);
  const [description, setDescription] = useState(bookDetails.Description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/editbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BookID: bookDetails.BookID,
          BookName: bookname,
          AuthorName: authorname,
          BookCategory: bookcategory,
          Language: language,
          Description: description,
        }),
      });

      if (response.ok){
        toast.success('Book Update successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'bg-green-800 bg-opacity-50 text-white text-sm',
        });

        setTimeout(() => {
          navigate(`/book-description/${bookDetails.BookID}`);
        }, 3000);
      } else{
        toast.error('Failed to Update book. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-800 bg-opacity-50 text-white text-sm',
          progress: undefined,
        });

        console.error("Failed to update the book");
      }
    } catch (err){
      console.error("Error:", err);
    }
  }

  return (
    <div className="flex justify-items-center flex-col ">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <form className="my-8 px-36 mt-16" onSubmit={handleUpdate}>
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Update Book
          </h1>
        </div>
        <div className="grid mx-48 space-y-4">
          <div>
            <label className="block mb-1 font-bold">Book Title :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="BookName"
              value={bookname}
              onChange={(e) => setbookname(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Author Name :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="AuthorName"
              value={authorname}
              onChange={(e) => setAuthorname(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold ">Book Category :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="BookCategory"
              value={bookcategory}
              onChange={(e) => setBookCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Language :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-1 font-bold">Book Description :</label>
            <textarea
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              name="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-x-4">
            <button className="bg-amber-500 text-white hover:bg-amber-600 hover:text-white rounded px-4 py-1">
              Update Book
            </button>
            
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateBook
