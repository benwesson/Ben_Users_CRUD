const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user.model.js')
const userRoute = require("./routes/user.route.js")
const cors = require('cors')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//routes
app.use('/api/users',userRoute)

app.get('/',async(req,res) => {
    const users = await User.find({})
    res.status(200).json(users)  
    
});


mongoose.connect('mongodb+srv://benjaminjwesson:xrvVB02qfm27pJIk@backenddb.5k1b6gv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

  })
  .catch(() => console.log('Not Connected!'))