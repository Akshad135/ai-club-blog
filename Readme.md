# BlogArena

## Task Round Web Team AIC

### This project is about building a basic blogging website with Googl Auth

### Tech Stack used:

<ul>
<li> React JS </li>
<li> MongoDb (on Atlas) </li>
<li> Google Auth </li>

### Steps to run the site

<ol>
<li> Clone and download the repo </li>
<li> Downloading Dependencies</li>
    <ul>
        <li>Front-end </li>
        Head over to `client` directory and install the node modules using `npm install`.<br>
        (This should also install the react-scripts, incase it doesn't install it manually) <br>
        <li>Back-end </li>
        Head over to `server` directory and install the node modules using `npm install`.
    </ul>
<li>Adding the tokens (create `.env` with following ids) </li>
    <ul>    
        <li>GOOGLE_CLIENT_ID="YourClientID"</li>
        <li>GOOGLE_CLIENT_SECRET="YourSecret"</li>
        <li>MongoDB="YourConnectionString"</li> 
    </ul>
<li> Running the scripts </li>
    <ul>
        <li>Front-end </li>
        Now head over to `client -> src` directory and run the cmd `npm start` to load the front-end.
        <li>Back-end </li>
            Now head over to `server` directory and run the cmd `node app.js` to load the front-end (in a new terminal).
    </ul>
</ol>
