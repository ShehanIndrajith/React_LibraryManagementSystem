import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Booklist() {
  const [booklist, setBooklist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbooklist = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (response.ok) {
          const data = await response.json();
          setBooklist(data);
        } else {
          console.error("Error fetching Booklist");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchbooklist();
  }, []);

  const handleDelete = async (bookId) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooklist((prevList) => prevList.filter((book) => book.BookID !== bookId));
        console.log("Book deleted successfully");
      } else {
        console.error("Error deleting book");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const goToBookDescription = (bookId) => {
    navigate(`/book-description/${bookId}`);
  };

  return (
    <div className="flex justify-items-center flex-col">
      <div className="fixed w-full z-50 mb-8">
        <Navbar />
      </div>
      <div className="my-8 px-36 mt-16">
        <div className="justify-items-center my-4">
          <h1 className="border-b-4 border-amber-500 text-4xl pb-2">
            Book List
          </h1>
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-6">
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Book ID
                </th>
                <th scope="col" className="px-4 py-2">
                  Book Title
                </th>
                <th className="px-4 py-2">Author Name</th>
                <th className="px-4 py-2">Book Category</th>
                <th className="px-4 py-2">Language</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {booklist.map((books) => (
                <tr
                  key={books.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{books.BookID}</td>
                  <td className="px-4 py-2">{books.BookName}</td>
                  <td className="px-4 py-2">{books.AuthorName}</td>
                  <td className="px-4 py-2">{books.BookCategory}</td>
                  <td className="px-4 py-2">{books.Language}</td>
                  <td className="space-x-2">
                    <button
                      className="bg-amber-500 text-white hover:bg-amber-600 hover:text-white rounded px-4 py-1"
                      onClick={() => goToBookDescription(books.BookID)}
                    >
                      View
                    </button>
                    <button className=" border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded px-4 py-1" onClick={() => handleDelete(books.BookID)}>
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

export default Booklist;
