const fs = require('fs');

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
        } else {
            this.reboot();
        }
    }

    next() {

        this.last += 1;
        this.recordFile();

        return `Ticket ${ this.last }`;

    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    reboot() {

        this.last = 0;

        console.log('System reboot');
        this.recordFile();

    }

    recordFile() {

        let jsonData = {
            "last": this.last,
            "today": this.today
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}


module.exports = {
    TicketControl
}