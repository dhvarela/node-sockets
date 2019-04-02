const { io } = require('../server');

io.on('connection', (client) => {

    console.log('user has connected');

    client.emit('welcomeMessage', {
        user: 'admin',
        message: 'Welcome to the darkness side'
    });

    client.on('disconnect', () => {
        console.log('user disconnected');
    });

    // listen client
    client.on('sendMessage', (data, callback) => {

        console.log(data);

        client.broadcast.emit('welcomeMessage', data);

        /*
        if (data.user) {
            callback({
                response: 'Everything is allright'
            });
        } else {
            callback({
                response: 'Bad news :('
            });
        }
        */

    })
});