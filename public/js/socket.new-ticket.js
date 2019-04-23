var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('server conection');
})

socket.on('disconnect', function() {
    console.log('server connection lost');
});

socket.on('currentState', function(resp) {
    console.log(resp);
    label.text(resp.current);
});

$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });

});