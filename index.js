//Requirements/Imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const videoRoutes = require('./routes/videos');

// Retrieves the port number/client url from the environment variables
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Enables CORS for the client URL
app.use(cors({origin: CLIENT_URL}));

// Allows the server to parse JSON request bodies
app.use(express.json());

// Serves static files from the public folder
app.use(express.static('public'));

// Sets up the video routes
app.use('/videos', videoRoutes);

app.listen(PORT, () => { // Starts the server on the specified port
    console.log(`🚀 Server listening on ${PORT}`);
});
