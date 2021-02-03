export var utils = {

    dateFormatter : dateFormat,
    durationFormatter : durationFormat
}

/**
 * 
 * @param {int} time milliseconds since Jan 1 1970
 */
function dateFormat(time) {
    var dateNow = Date.now();
    time = dateNow - time;

    let format = "";
    const seconds = time/1000;
    const hours = Math.floor(seconds/3600);
    const days = Math.floor(hours/24);

    if (days >= 365) {
        const years = Math.floor(days/365);
        if (years == 1) format = `Fyrir ${years} ári síðan`;
        else format = `Fyrir ${years} árum síðan`;
    }
    else if (days >= 30) {
        const months = Math.floor(days/30);
        if (months == 1) format = `Fyrir ${months} mánuði síðan`;
        else format = `Fyrir ${months} mánuðum síðan`;
    }
    else if (days >= 7) {
        const weeks = Math.floor(days/7);
        if(weeks == 1) format = `Fyrir ${weeks} viku síðan`;
        else format = `Fyrir ${weeks} vikum síðan`;
    }
    else if (days >= 1) {
        if (days == 1) format = `Fyrir ${days} degi síðan`;
        else format = `Fyrir ${days} dögum síðan`;
    }
    else {
        if (hours == 1) format = `Fyrir ${hours} klukkutíma síðan`;
        else format = `Fyrir ${hours} klukkutímum síðan`;
    }

    return format;
}

/**
 * 
 * @param {*} time duration of video
 */
function durationFormat(time) {
    
    let minutes = Math.round(time/60);
    let seconds = Math.round(minutes/60);

    if(minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    let format = `${minutes}:${seconds}`;

    return format;
}

