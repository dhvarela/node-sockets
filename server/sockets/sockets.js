const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (client, callback) => {

        let next = ticketControl.next();
        callback(next);

    });

    client.emit('currentState', {
        current: ticketControl.getLastTicket()
    });

});