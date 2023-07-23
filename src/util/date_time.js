exports.getDateTime = () => {
    let timeStamp = new Date();
    let hrs = timeStamp.getHours();
    let mins = timeStamp.getMinutes();
    let secs = timeStamp.getSeconds();
    let day = timeStamp.getDate();
    let month = timeStamp.getMonth();
    let year = timeStamp.getFullYear();
    let weakday = timeStamp.getDay();

    if(hrs < 10){
        hrs = "0"+hrs;
    }

    if(mins < 10){
        mins = "0"+mins;
    }

    if(secs < 10){
        secs = "0"+secs;
    }

    if(day < 10){
        day = "0"+day;
    }

    if(month < 10){
        month = "0"+month;
    }
    const date = year+"-"+month+"-"+day;
    const time = hrs+":"+mins+":"+secs;

    return [date, time, weakday];
}