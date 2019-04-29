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

    client.on('attendTicket', (data, callback) => {

        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop is required'
            });
        }

        let serveTicket = ticketControl.serveTicket(data.desktop);

        callback(serveTicket);

        // TODO notify modifications to last 4
    });
});