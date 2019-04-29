var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is mandatory');
}

var desktop = searchParams.get('desktop');
var label = $('small');

$('h1').text('Desktop ' + desktop);

$('button').on('click', function() {

    socket.emit('attendTicket', { desktop: desktop }, function(resp) {

        if (resp == 'No tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        $("h4 small").text("ticket " + resp.num);

    });

});