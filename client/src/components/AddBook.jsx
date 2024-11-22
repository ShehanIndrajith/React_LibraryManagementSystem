import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
  const [formData, setFormData] = useState({
    BookName: "",
    AuthorName: "",
    BookCategory: "",
    Language: "",
    ImagePath: null,
    Description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ImagePath") {
      setFormData((prevData) => ({
        ...prevData,
        ImagePath: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send form data and file to the backend
    const form = new FormData();
    form.append("BookName", formData.BookName);
    form.append("AuthorName", formData.AuthorName);
    form.append("BookCategory", formData.BookCategory);
    form.append("Language", formData.Language);
    form.append("ImagePath", formData.ImagePath);
    form.append("Description", formData.Description);

    try {
      // Post data to the server
      const response = await axios.post(
        'http://localhost:5000/api/books',
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Book added successfully:", response.data);
      // Optionally, reset form after successful submission
      setFormData({
        BookName: "",
        AuthorName: "",
        BookCategory: "",
        Language: "",
        ImagePath: null,
        Description: "",
      });

      toast.success('Book added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-green-800 bg-opacity-50 text-white text-sm',
      });

    } catch (err) {
      console.error("Error adding book:", err);

      toast.error('Failed to add book. Please try again.', {
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

  return (
    <div className="flex justify-items-center flex-col ">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <form className="my-8 px-36 mt-16" onSubmit={handleSubmit}>
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Add Book
          </h1>
        </div>
        <div className="grid mx-48 space-y-4">
          <div>
            <label className="block mb-1 font-bold">Book Title :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="BookName"
              value={formData.BookName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Author Name :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="AuthorName"
              value={formData.AuthorName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold ">Book Category :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="BookCategory"
              value={formData.BookCategory}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Language :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="text"
              name="Language"
              value={formData.Language}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Upload Book Image :</label>
            <input
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              type="file"
              name="ImagePath"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">Book Description :</label>
            <textarea
              className="w-full m-0 -mr-0.5 block min-w-0 flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,191,0)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-gray-800 dark:focus:border-primary"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4">
            <button className="bg-amber-500 text-white hover:bg-amber-600 hover:text-white rounded px-4 py-1">
              Add Book
            </button>
            <button
              className="border border-black text-black hover:bg-black hover:text-white rounded px-8 py-1"
              onClick={() =>
                setFormData({
                  BookName: "",
                  AuthorName: "",
                  BookCategory: "",
                  Language: "",
                  ImagePath: null,
                  Description: "",
                })
              }
            >
              Clear
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddBook;
