var socket = io();

socket.on('connect', function() {

    console.log('server conection');

})

socket.on('disconnect', function() {
    console.log('server connection lost');
});

// send info
socket.emit('sendMessage', {
    user: 'Alex',
    message: 'Hi world'
}, function(resp) {
    console.log('Callback fired: ', resp);
});


// listen info
socket.on('welcomeMessage', function(data) {
    console.log('Server: ', data);
});