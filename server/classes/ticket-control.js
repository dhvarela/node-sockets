const fs = require('fs');

class Ticket {

    constructor(num, desktop) {

        this.num = num;
        this.desktop = desktop;

    }

}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.theLast4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.theLast4 = data.theLast4;
        } else {
            this.reboot();
        }
    }

    next() {

        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.recordFile();

        return `Ticket ${ this.last }`;

    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    serveTicket(desktop) {

        if (this.tickets.length === 0) {
            return 'No tickets';
        }

        let numTicket = this.tickets[0].num;
        this.tickets.shift();

        let serveTicket = new Ticket(numTicket, desktop);

        this.theLast4.unshift(serveTicket);

        if (this.theLast4.length > 4) {
            this.theLast4.splice(-1, 1); //clear the last element
        }

        console.log('The last 4');
        console.log(this.theLast4);

        this.recordFile();

        return serveTicket;

    }

    reboot() {

        this.last = 0;
        this.tickets = [];
        this.theLast4 = [];

        console.log('System reboot');
        this.recordFile();

    }

    recordFile() {

        let jsonData = {
            "last": this.last,
            "today": this.today,
            tickets: this.tickets,
            theLast4: this.theLast4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}


module.exports = {
    TicketControl
}