const date = require('date-and-time');

export default function formatDate(dateToFormat, hours = true) {
    let pattern = 'ddd at HH:mm on DD-MMM-YYYY';

    if (!hours) {
        pattern = 'ddd, DD MMM YYYY'
    }

    return date.format(new Date(dateToFormat), date.compile(pattern));
}