const http = require('http');
const path = require('path');
const os = require('os');
const express = require('express');
const socketio = require('socket.io');

const fetchbtc = require('./fetchbtc');
const fetcheth = require('./fetchETH');
const fetchdoge = require('./fetchDOGE');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3001;


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
	console.log('Client connected');

	setInterval( async () => {
        socket.emit('btc-prices', await fetchbtc.pushUpdates().catch(err => { console.log(err) }));
    }, 5000);

    setInterval( async () => {
        socket.emit('eth-prices', await fetcheth.pushUpdates().catch(err => { console.log(err) }));
    }, 5000);

    setInterval( async () => {
        socket.emit('doge-prices', await fetchdoge.pushUpdates().catch(err => { console.log(err) }));
    }, 5000);
    

})

server.listen(PORT, () => console.log(`CryptoLive server running on port ${PORT}`));