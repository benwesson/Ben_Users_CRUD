const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user.model.js')
const userRoute = require("./routes/user.route.js")
const app = express()
const ejs = require('ejs')

app.set('view engine', 'ejs')
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/users',userRoute)


app.get('/',async(req,res) => {
  
    let result = await User.find({})

    let userList =[]
    let idList = []
    let firstNames =[]
    let lastNames =[]
    let genders=[]
    result.forEach(user => {
        //convert to string to eddit
        let myString = String(user)
        //Split into array by comma
        let myArray = myString.split(",")
        //get rid of date info
        myArray.splice(4,2)
        //get rid of ver
        myArray.splice(-1,1)
        //back to string
        let firstSplit= String(myArray)
        //split into array by :
        let newArray = firstSplit.split(":")
        //get rid of id text
        newArray.splice(0,1)
        //back to string
        let finalString = String(newArray)
        //Split by comma
        let finalArray = finalString.split(",")
        //get rid of first_name text
        finalArray.splice(1,1)
        //get rid of last_name text
        finalArray.splice(2,1)
        //get rid of gender text
        finalArray.splice(3,1)
        
        userList.push(finalArray)
        idList.push(finalArray[0])
        firstNames.push(finalArray[1])
        lastNames.push(finalArray[2])
        genders.push(finalArray[3])
        

    })

    

    // const dataList = []
    // for(item in result){
    //     dataList.push({item})
    // }

    //let myTest = res.status(200).json(result)
    //let myTest = result.json()
    //res.status(200).json(result);
    res.render('index',{
        
       id : idList,
       fName: firstNames,
       lName: lastNames,
       gender: genders
       

       
       
    })
    
});


mongoose.connect('mongodb+srv://benjaminjwesson:xrvVB02qfm27pJIk@backenddb.5k1b6gv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

  })
  .catch(() => console.log('Not Connected!'))