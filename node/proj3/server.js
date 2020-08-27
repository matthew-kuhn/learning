var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
const { stringify } = require("querystring")

var port = 2020
var dburl = 'mongodb+srv://user:user@cluster0.nni22.mongodb.net/LearnNode?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages', (req ,res) => {
    Message.find({},(err, messages)=>{
        res.send(messages)
    })
})

app.post('/messages', (req ,res) => {
    var message = new Message(req.body)

    message.save((err)=>{
        if(err)
            sendStatus(500)

        Message.findOne({message:'badword'}, (err, censored)=>{
            if(censored){
                console.log(`Censored words found: ${censored}`)
                Message.deleteOne({_id:censored.id}, (err)=>{
                    console.log('Bad word removed')
                })
            }
        })
        io.emit('message', req.body)
        res.sendStatus(200)            
    })

   
})

io.on('connection', (socket) => {
    console.log('user connected')
})

mongoose.connect(dburl, {useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
    console.log('mongoDB connection', err)
})

var server = http.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

