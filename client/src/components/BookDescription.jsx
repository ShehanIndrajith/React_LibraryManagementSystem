import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bookimage from "../assets/images.jpg";  // You can update this with dynamic image fetching if needed
import "../index.css";

function BookDescription() {
  const { bookId } = useParams();  // Get the BookID from the URL
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`);  // Use the bookId in the API request
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBookDetails(data);  // Set the fetched book details
        } else {
          console.error("Error fetching book details");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchBookDetails();
  }, [bookId]);  // Re-fetch when the bookId changes

  // If book details haven't loaded yet, display a loading message
  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  const updateBookDetails = (bookDetails) => {
    navigate(`/update-book/${bookDetails.BookID}`,{ state: { bookDetails } });
  };

  return (
    <div className="bg-svg-top-center h-screen py-28 bg-cover">
      <div className="flex flex-col px-36">
        <div className="flex flex-row w-full">
          <div className="h-full w-80 shadow-xl">
            <img className="size-full" src={`/${bookDetails.ImagePath}`} alt={bookDetails.BookName} />
          </div>
          <div className="flex flex-col w-full py-24 ml-16">
            <div className="flex items-start w-full">
              <label className="text-3xl font-bold">
                {bookDetails.BookName}  {/* Display the book name dynamically */}
              </label>
            </div>
            <div className="mt-6 space-y-2">
              <label className="block">Category: {bookDetails.BookCategory}</label>
              <label className="block">Author Name: {bookDetails.AuthorName}</label>
              <label className="block">Language: {bookDetails.Language}</label>
              <div className="mt-6 pt-6">
                <button className="bg-amber-500 text-white py-2 px-12 rounded-3xl text-lg font-bold hover:bg-amber-600"
                onClick={() => updateBookDetails(bookDetails)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Book Description</h1>
          <p className="mt-2">
            {bookDetails.Description}  {/* Display the description dynamically */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDescription;
