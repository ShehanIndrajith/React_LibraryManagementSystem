const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/members", async (req, res) => {
  const { Name, contactNo, Adrress, membershipType } = req.body; // Note the capitalization of properties
  try {
    const newmember = await pool.query(
      'INSERT INTO public."MemberTable"("Name", "contactNo", "Adrress", "membershipType") VALUES ($1, $2, $3, $4) RETURNING *',
      [Name, contactNo, Adrress, membershipType]
    );
    res.json(newmember.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to get all members
app.get("/api/members", async (req, res) => {
  try {
    const members = await pool.query('SELECT * FROM public."MemberTable"');
    res.json(members.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

// Set up multer to handle image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save the image in the 'client/src/Bookimages' folder
    cb(null, path.join(__dirname, "../client/src/Bookimages"));
  },
  filename: (req, file, cb) => {
    // Keep the original image name
    cb(null, file.originalname);
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
});

// Route to handle adding a book with image upload
app.post("/api/books", upload.single("ImagePath"), async (req, res) => {
  const { BookName, AuthorName, BookCategory, Language, Description } =
    req.body;
  const ImagePath = `src/Bookimages/${req.file.originalname}`;
  try {
    const addbook = await pool.query(
      'INSERT INTO public."BookTable"("BookName", "AuthorName", "BookCategory", "Language", "ImagePath", "Description") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [BookName, AuthorName, BookCategory, Language, ImagePath, Description]
    );
    res.json(addbook.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const books = await pool.query('SELECT * FROM public."BookTable"');
    res.json(books.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/bookissue", async (req, res) => {
  try {
    const bookissues = await pool.query('SELECT * FROM public."BookIssued"');
    res.json(bookissues.rows);
  } catch (err){
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/bookscount", async (req, res) => {
  try {
    const bookscount = await pool.query(
      'SELECT COUNT(*) AS row_count FROM public."BookTable"'
    );
    const count = bookscount.rows[0].row_count;
    res.json({ count });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/memberscount", async (req, res) => {
  try {
    const memberscount = await pool.query(
      'SELECT COUNT(*) AS row_count FROM public."MemberTable"'
    );
    const count = memberscount.rows[0].row_count;
    res.json({ count });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/bookissuecount", async(req,res) =>{
  try {
    const bookissuecount = await pool.query('SELECT COUNT(*) AS row_count FROM public."BookIssued"');
    const count = bookissuecount.rows[0].row_count;
    res.json({ count });
  } catch (err){
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await pool.query('DELETE FROM public."BookTable" WHERE "BookID" = $1', [
      bookId,
    ]);
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    // Corrected query to specify what columns to select
    const result = await pool.query(
      'SELECT * FROM public."BookTable" WHERE "BookID" = $1',
      [bookId]
    );

    // If book is found, send the data
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Return the first matching book object
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/members/:id", async (req, res) => {
  const memberId = req.params.id;
  try {
    await pool.query('DELETE FROM public."MemberTable" WHERE "MemberID" = $1', [
      memberId,
    ]);
    res.status(200).send({ message: "Member deleted successfully" });
  } catch (err) {
    console.error("Error deleting Member:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/bookissue", async (req, res) => {
  const { BookID, BookName, MemberID, MemberName, DueDate } = req.body;
  try {
    const newIssue = await pool.query(
      'INSERT INTO public."BookIssued" ("BookID", "BookTitle", "MemberID", "MemberName", "DueDate") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [BookID, BookName, MemberID, MemberName, DueDate]
    );
    res.json(newIssue.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/bookissue/:id", async (req, res) => {
  const issueid = req.params.id; // Extracting the Issue ID from request parameters
  try {
    const result = await pool.query(
      'DELETE FROM public."BookIssued" WHERE "IssueID" = $1',
      [issueid]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Book Released successfully" });
    } else {
      res.status(404).send({ message: "No book found with the provided ID" });
    }
  } catch (err) {
    console.error("Error querying book Issue:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/membernames", async (req, res) => {
  try {
    const membernames = await pool.query(
      'SELECT "MemberID", "Name" FROM public."MemberTable"'
    );
    res.status(200).json(membernames.rows); // Return the data with a 200 status code
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Server Error"); // Proper error message
  }
});

app.get("/api/booknames", async (req,res) =>{
  try{
    const booknames = await pool.query('SELECT "BookID","BookName" FROM public."BookTable"');
    res.status(200).json(booknames.rows);
  } catch(err){
    console.error("Error getting booknames: ", err.message);
    res.status(500).send("Server Error");
  }
});


app.post("/api/editbook", async (req, res) => {
  const { BookID, BookName, AuthorName, BookCategory, Language, Description } =
    req.body;

  // Ensure req.file exists to avoid errors
  //const ImagePath = req.file ? `src/Bookimages/${req.file.originalname}` : null;

  //"ImagePath" = COALESCE($5, "ImagePath"),

  try {
    const queryText = `
      UPDATE public."BookTable"
      SET 
        "BookName" = $1,
        "AuthorName" = $2,
        "BookCategory" = $3,
        "Language" = $4,
        "Description" = $5
      WHERE "BookID" = $6
      RETURNING *;
`;

    const values = [
      BookName,
      AuthorName,
      BookCategory,
      Language,
      Description,
      BookID,
    ];

    const updatedBook = await pool.query(queryText, values);

    if (updatedBook.rows.length === 0) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.json(updatedBook.rows[0]);
    }
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post ('/api/login', async (req, res) => {
  const {UserID, Password} = req.body;
  try {
    // Hash the password with a salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newuser = await pool.query('INSERT INTO public."Login" ("UserID" , "Password") VALUES ($1, $2) RETURNING *',
      [UserID, hashedPassword]
    );
    res.json(newuser.rows[0]);
  }
  catch (err){
    console.error("Error creating user:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/login/validate", async (req, res) => {
  const { UserID, Password } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM public."Login" WHERE "UserID" = $1',
      [UserID]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedPassword = user.rows[0].Password;
    const isPasswordValid = await bcrypt.compare(Password, storedPassword);

    if (isPasswordValid) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error("Error validating user:", err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
