const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000
const connectToDB  = require('./config/db')
const rootRouter = require('./routes/root-router')
const expressEJSLayouts = require('express-ejs-layouts');
const app  = express();

connectToDB();

app.use(express.urlencoded({extended : false}))

app.use(expressEJSLayouts)

app.set('view engine' , 'ejs')

app.set("views" , path.join(__dirname, 'views'))

app.set('layout extractStyles' , true)
app.set("layout extractScripts", true)

app.set(express.static(path.join(__dirname, 'assets')))

app.use("/" , rootRouter)

app.listen(port , (err)=>{
    if(err){
        console.log(`Error Occured: ${err.message}`)
        return;
    }

    console.log(`App listening on ${port}`)
})