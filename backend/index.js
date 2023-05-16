const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const port = 8000 || env.PORT;

app.use(express.json());
app.use(cors());
const postController = require('./post');




app.use('/api/posts',postController)

app.listen(port,() => {
    console.log(`server running...http://localhost:${port}`);
})
