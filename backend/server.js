// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
// Define allowed origins
const allowedOrigins = ['http://localhost:5000']; 

// Middleware
app.use(cors({ origin: function (origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}
}));
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kishoremyna',
  database: 'DessertDB'
});

connection.connect(function(err){
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define API endpoints
// Route to add recipe to favorites
app.post('/add-to-favorites', (req, res) => {
  // Extract userId and recipeId from the request body
  const { userId, recipeId } = req.body;

  // Validate userId and recipeId
  if (!userId || !recipeId) {
    return res.status(400).json({ error: 'UserId and RecipeId are required' });
  }

  // Insert the userId and recipeId into the favorites table in the database
  const query = 'INSERT INTO favorites (UserID, RecipeID) VALUES (?, ?)';
  connection.query(query, [userId, recipeId], (error, results) => {
    if (error) {
      console.error('Error adding recipe to favorites:', error);
      return res.status(500).json({ error: 'Error adding recipe to favorites' });
    }
    console.log('Recipe added to favorites:', results);
    res.status(200).json({ message: 'Recipe added to favorites' });
  });
});


// Define a route to handle POST requests to the /register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store user data in the database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
        return;
      }
      res.status(200).json({ message: 'Registration successful' });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

// Login endpoint
// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  connection.query('SELECT UserID, Username, Password FROM users WHERE Username = ?', [username], async (error, results) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    
    try {
      // Compare the entered password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.Password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Fetch recipe ID for the logged user from your database
      connection.query('SELECT RecipeID FROM favorites WHERE UserID = ?', [user.UserID], async (error, results) => {
        if (error) {
          console.error('Error fetching user recipes:', error);
          return res.status(500).json({ error: 'Error fetching user recipes' });
        }

        const recipeIDs = results.map(recipe => recipe.RecipeID);
        
        // Send user details and recipe IDs in the response
        res.status(200).json({ 
          message: 'Login successful', 
          user: { id: user.UserID, username: user.Username }, 
          recipes: recipeIDs 
        });
      });
      
    } catch (bcryptError) {
      console.error('Error comparing passwords:', bcryptError);
      res.status(500).json({ error: 'Error comparing passwords' });
    }
  });
});

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }
//   connection.query('SELECT UserID, Username, Password FROM users WHERE Username = ?', [username], async (error, results) => {
//     if (error) {
//       console.error('Error fetching user data:', error);
//       return res.status(500).json({ error: 'Error fetching user data' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];
//     console.log('Retrieved user:', user);
    
//     try {
//       console.log(user.UserID);
//       console.log('Password type:', typeof user.Password);
//       if (typeof user.Password !== 'string') {
//         console.error('Stored password is not a string');
//         console.log('User object:', user);
//         return res.status(500).json({ error: 'Stored password is not a string' });
//       }

//       // Compare the entered password with the hashed password from the database
//       const passwordMatch = await bcrypt.compare(password, user.Password);
//       if (!passwordMatch) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }
      
//       // Passwords match, send a success response with user data
//       res.status(200).json({ message: 'Login successful', user: { id: user.UserID, username: user.Username } });
//       //res.redirect('/recipes');
//     } catch (bcryptError) {
//       console.error('Error comparing passwords:', bcryptError);
//       res.status(500).json({ error: 'Error comparing passwords' });
//     }
//   });
// });


app.get('/recipes', (req, res) => {
  connection.query('SELECT * FROM recipes', (error, results) => {
    if (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Error fetching recipes' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
