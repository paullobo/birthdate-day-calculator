window.addEventListener('DOMContentLoaded', (event) => {

    // Data Initialzation
    let birthdays = [];
    let year;
    let birthdaysGrouped = {
        "sun": [],
        "mon": [],
        "tue": [],
        "wed": [],
        "thu": [],
        "fri": [],
        "sat": []
    };
   
    const createBlock = (size,person) => {
        // Creates a single person block 
        let blockEle = document.createElement("div");
        blockEle.classList.add('block-square');
        blockEle.style.width = `${size}px`;
        blockEle.style.height = `${size}px`;
        blockEle.style.background = getRandomColor();
        blockEle.innerHTML = getInitials(person.name);
        return blockEle;
    }

    const createEmptyBlock = (size) => {
        // Creates a block for no birthdays 
        let blockEle = document.createElement("div");
        blockEle.classList.add('block-square');
        blockEle.style.width = `${size}px`;
        blockEle.style.height = `${size}px`;
        let imgEle = document.createElement("img");
        imgEle.classList.add('noBirthday-img')
        imgEle.src = './assets/images/unhappy-face.png';
        blockEle.appendChild(imgEle);
        return blockEle;
    }

    const populateUI = () => {
        // Analyzes the birthdays on each day
        // Computes the dimension and scales accordingly to fit squares
        for (day in birthdaysGrouped) {

            let cardId = `card-${day}`;
            let cardWidth = getCardWidth(cardId);
            let dayBirthdays = birthdaysGrouped[day];  
            let birthdaysCount = dayBirthdays.length;

            // Dimendion calculation
            let squaresPerRow = getSquaresPerRow(birthdaysCount)
            let squareDimension = cardWidth / squaresPerRow;

            // Rendering UI
            birthdaysGrouped[day].forEach(person => {
                let personSquare = createBlock(squareDimension,person);
                document.getElementById(cardId).appendChild(personSquare);
            })
            if (squaresPerRow === 0) {
                // In case if no birthdays
                let personSquare = createEmptyBlock(cardWidth);
                document.getElementById(cardId).appendChild(personSquare);
                document.getElementById(`desc-${day}`).innerHTML=`No birthday`
            }else{
                document.getElementById(`desc-${day}`).innerHTML=`${birthdaysCount} birthday${birthdaysCount!==1?'s':''}`
            }
        }
    }

    const verifyPersonObject = (person) => {
        // validates the internals of the required object
        if (!("name" in person)) {
            return ("Persons name is missing");
        } else if (!("birthday" in person)) {
            return ("Birthday not provided");
        } else if (!isValidDate(person["birthday"])) {
            console.log('---->',person["birthday"])
            return ("Please provide birthdate in mm/dd/yyyy format");
        }else{
            return;
        }
    }

    const resetData = () => {
        // Re-Initialize Data 
        // reset UI
        let cards = document.getElementsByClassName('card-body');
        for(let c of cards){
            c.innerHTML = '';
        }
        //reset data
        for (key in birthdaysGrouped) {
            birthdaysGrouped[key] = [];
        }
    }

    const normalizeInput = (e) => {
        // Format the input data for use

        e.preventDefault();
        // CleanUp UI and old data
        resetData();
        
        try {
            // Fetch Raw data
            birthdays = document.getElementById('input-area').value;
            year = document.getElementById('year-input').value;

            // Resolves string Objects other than JSON
            birthdays = JSON.stringify(eval("(" + birthdays + ")"));

            // Parse string to JSON
            birthdays = JSON.parse(birthdays);

            // Check for single Object
            if (!Array.isArray(birthdays)) {
                birthdays = [birthdays];
            }

            // Iteration of Objects in the Array
            for (let i = 0; i < birthdays.length; i++) {
                let msg = verifyPersonObject(birthdays[i]);
                if (msg) {
                    // Notify User about error and reload
                    alert(msg);
                    window.location.reload();
                }
            }
        } catch (e) {
            console.log('ERROR in Normalizing data::::',e)
            // If anything goes wrong in normalizing, it must be some data issue
            // Alert User
            alert("Data is invalid (Please check if its in valid JSON format)");
            // Refresh page
            window.location.reload();
        }

        // Sort birthday by youngest to oldest
        let sortedBirthdays = birthdays.sort(sorterFunction);

        // Seperate by day
        sortedBirthdays.forEach((person) => {
            // Check if Birthyear is given otherwise set to this year
            let birthYear = person.birthday.split("/");
            birthYear[2] = birthYear[2] ? birthYear[2] : year;
            birthYear = birthYear.join('/');
            // Group according to day
            birthdaysGrouped[getDayOfWeek(birthYear)].push(person);
        });

        // Rendering
        populateUI();
    }

    // Listens to on submit event of form
    document.getElementById("birthday-cal-form").onsubmit = normalizeInput;
    // Focuses the input on page load
    document.getElementById("input-area").focus();
});