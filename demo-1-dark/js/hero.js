// Logic for hero tag

document.addEventListener('DOMContentLoaded', init)

function init() {
    const tag = document.querySelector('.hero__tag');

    // Use arrayOfTags to include whatever you want in the hero tag animation
    const arrayOfTags = ['web-developer', 'graphic-designer', 'problem-solver'];
    let appendedString = '';
    const characterDelay = 300;
    const initialDelay = 1300;
    let i = 0;

    // This is to show console.log() when cycling through strings. Set to false by default to avoid cluttering the console
    const showLogs = false;

    setTimeout(() => {
        tag.textContent = '';
        cycleArray(arrayOfTags)
    }, initialDelay)

    function cycleArray(arrayOfStrings) {
        // Loop through array, calling cycleString for each index
        if (i < arrayOfStrings.length) {
            cycleString(arrayOfStrings[i])
                .then(cycleStringResolve => {
                    if (showLogs) {
                        console.log(cycleStringResolve);
                    }
                    // Increment i then call function again
                    i++;
                    cycleArray(arrayOfStrings)
                })
        } else {
            // Restart from index of 0 when end of array is reached
            i = 0;
            cycleString(arrayOfStrings[i])
                .then(cycleStringResolve => {
                    if (showLogs) {
                        console.log(cycleStringResolve);
                    }
                    i++;
                    cycleArray(arrayOfStrings)
                })
        }
    }

    // Return a promise that writes a string then removes it
    function cycleString(string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Write the given string
                writeString(string)
                    .then(writeResolve => {
                        if (showLogs) {
                            console.log(writeResolve)
                        }
                        // Then remove the string
                        return removeString();
                    })
                    .then(removeResolve => {
                        if (showLogs) {
                            console.log(removeResolve);
                        }
                        resolve('string written and removed successfully');
                    })
            }, characterDelay)
        })
    }

    // Return a promise that writes a string with a delay between each character
    function writeString(string) {
        return new Promise((resolve, reject) => {
            // Split the string to loop through it
            string.split("").forEach((character, index) => {
                setTimeout(() => {
                    // Add the character to appendedString
                    appendCharacter(character, index)
                    // If all characters have been added, resolve
                    if (appendedString === string) {
                        resolve('wrote the string')
                    }
                }, (characterDelay * index))
            })
        })
    }

    // Return a promise that removes a string with a delay between each character
    function removeString() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Split the already created string to loop through it
                appendedString.split("").forEach((character, index) => {
                    setTimeout(() => {
                        // Remove the end character
                        removeCharacter()
                        // If all characters have been removed, resolve
                        if (appendedString === "") {
                            resolve('string removed');
                        }
                        // Delay is shorter for removal
                    }, (characterDelay * index) / 3)
                })
            }, characterDelay * 3)
        })
    }

    // Take in a character and add it to appendedString
    function appendCharacter(character) {
        appendedString += character;
        tag.textContent = appendedString;
    }

    // Remove the last character in appendedString
    function removeCharacter() {
        let splitString = appendedString.split("");

        splitString.pop();

        appendedString = splitString.join("");
        tag.textContent = appendedString;
    }
}