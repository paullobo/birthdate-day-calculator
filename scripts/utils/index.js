// Utility Function for Birthday Cal

const sorterFunction = (a, b) => {
    // handle sorting of birthdays by comparing dates
    var aa = a.birthday.split('/').reverse().join(),
        bb = b.birthday.split('/').reverse().join();
    return aa > bb ? -1 : (aa < bb ? 1 : 0);
}

// Gets realtime card width
const getCardWidth = (id) => document.querySelector(`#${id}`).clientWidth;

const getSquaresPerRow = (count) =>{
    // Calculates based on total count, no of squares in each row
    const squaredCount = Math.sqrt(count);
    return (squaredCount % 1 === 0) ? Math.floor(squaredCount) : Math.floor(squaredCount) + 1;
}

const getRandomColor = () => {
    // Picks a random color for square from the color array set
    const colorsArray = ["#ff9ff3","#40407a","#feca57","#0652DD","#48dbfb","#1dd1a1","#2c2c54","#f368e0","#5f27cd","#7d5fff","#ff3838","#32ff7e","#7d5fff","#ffcccc","#ff4757","#ff6348"];
    return colorsArray[Math.floor((Math.random() * colorsArray.length))];
}

const isValidDate = (dateString) => {
    // Checks if date is of valid format and useable
    return !isNaN(Date.parse(dateString)) ? true : false;
}

const getInitials = (name) => {
    // Converts name to Initials of 2 characters
    let nameArr = name.trim().split(" ");
    return nameArr[0][0] + nameArr[nameArr.length - 1][0];
}

const getDayOfWeek = (date) => {
    // Returns day of the week based on date
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayOfWeek];
}