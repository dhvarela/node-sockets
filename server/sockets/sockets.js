const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (client, callback) => {

        let next = ticketControl.next();
        callback(next);

    });

    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
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

        // notify modifications to last 4
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        });


    });
});