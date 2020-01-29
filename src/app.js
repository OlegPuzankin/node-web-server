const express = require('express')
const path = require('path')

const app = express();


const publicDirPath=path.join(__dirname, '../public');

const viewsPath=path.join(__dirname, '../templates')
console.log(viewsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Oleg Pzzz'
    })
})

app.get('/help', (req, res)=>{
       
    res.render('help', {
        title: 'Help page',
        helpText: 'some text will be here'
    })
})


app.get('/about', (req, res)=>{
    
    res.render('about', {
        title: 'About page'
    })
})

app.listen(3000, ()=>console.log('server is up'));


