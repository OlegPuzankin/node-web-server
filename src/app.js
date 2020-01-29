const express = require('express')
const path = require('path')

const app = express();
console.log(__dirname);
console.log(__filename);


const publicDirPath=path.join(__dirname, '../public');
console.log(publicDirPath);

app.use(express.static(publicDirPath))


// app.get('/help', (req, res)=>{
//     res.send('help.html')
// })

// app.get('/help', (req, res)=>{
//     console.log('send response');
    
//     res.send({
//         about: 'about page wt'
//     })
// })


app.listen(3000, ()=>console.log('server is up'));


