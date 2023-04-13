const calculateTime = (releaseDate) => {

    var d1 = new Date(releaseDate)

    //current date
    var d2 = new Date();

    var diff = d2.getTime() - d1.getTime();

    var daydiff = diff / (1000 * 60 * 60 * 24);
    let result = ''
    // check for year difference
    if (daydiff > 365) {
        result = Math.round(daydiff / 365)
        const final_string = result > 1 ? 'years ago' : 'year ago'
        result += ' ' + final_string
    }
    // check for month difference
    else if (daydiff > 30 || daydiff > 31) {
        let num = 30
        if (daydiff > 31) {
            num = 31
        }
        result = Math.round(daydiff / num)
        const final_string = result > 1 ? 'months ago' : 'month ago'
        result += ' ' + final_string
    }
    // check for day difference
    else {
        daydiff = Math.round(daydiff)
        const final_string = daydiff > 1 ? 'days ago' : 'day ago'
        result = daydiff + ' ' + final_string
    }
    return result
}

export default calculateTime