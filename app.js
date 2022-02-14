var input = document.querySelector(".input-date")
var checkBtn = document.querySelector(".check-btn");
var output = document.querySelector('.output');

checkBtn.addEventListener('click', clickHandler);


function clickHandler(e) {
    var data = input.value;

    if (data !== '') {
        var arr = data.split('-');
        var yyyy = arr[0];
        var mm = arr[1];
        var dd = arr[2];

        var dob = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };
        var dateString = converter(dob);
        var checkedData = checkPallindromForAllDateFormats(dateString);
        var isPallindrome = false;

        for (var i = 0; i < checkedData.length; i++) {
            if (checkedData[i]) {
                isPallindrome = true;
                break;
            }
        }

        if (!isPallindrome) {
            const [ctr1, nextD] = nextPallindrom(dob);
            const [ctr2, prevD] = prevPallindrom(dob);

            if (ctr1 > ctr2) {
                output.innerText = "Ohh! missed by " + ctr2 + " days. Nearest pallindrome is " + prevD.day + '-' + prevD.month + '-' + prevD.year;

            } else {
                output.innerText = "Ohh! missed by " + ctr1 + " days. Nearest pallindrome is " + nextD.day + '-' + nextD.month + '-' + nextD.year;
            }
        } else {
            output.innerText = "yehhh! Your Birthdate is pallindrome";
        }

    }
}


function reverseString(string) {
    var str = string.split('');
    var reverseStr = str.reverse();
    var reverseJoinStr = reverseStr.join('');
    return reverseJoinStr;
}

function isPallindrome(input) {
    var dateArray = reverseString(input);
    return input === dateArray;
}


function converter(dateToConvert) {
    var dateConverter = {
        day: '',
        month: '',
        year: ''
    };

    if (dateToConvert.day < 10) {
        dateConverter.day = '0' + dateToConvert.day;
    } else {
        dateConverter.day = dateToConvert.day.toString();
    }
    if (dateToConvert.month < 10) {
        dateConverter.month = '0' + dateToConvert.month;
    } else {
        dateConverter.month = dateToConvert.month.toString();
    }
    dateConverter.year = dateToConvert.year.toString();

    return dateConverter;
}

function allFomatOfDates(date) {
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yymmdd = date.year.slice(-2) + date.month + date.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPallindromForAllDateFormats(allDates) {
    var listOfDate = allFomatOfDates(allDates);
    var listOfDateArr = [];

    for (var i = 0; i < listOfDate.length; i++) {
        var result = isPallindrome(listOfDate[i]);
        listOfDateArr.push(result);

    }
    return listOfDateArr;
}

function isLeapYear(year) {
    if (year % 4 === 0)
        return true;

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return true;

    return false;
}

function checkNextDate(lastDate) {
    var day = lastDate.day + 1;
    var month = lastDate.month;
    var year = lastDate.year;

    const daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function nextPallindrom(date) {
    var nextDate = checkNextDate(date);
    var count = 0;

    while (1) {
        count++;
        var dateInString = converter(nextDate);
        var dateInStringList = checkPallindromForAllDateFormats(dateInString);

        for (var i = 0; i < dateInStringList.length; i++) {
            if (dateInStringList[i]) {
                return [count, dateInString];
            }
        }
        nextDate = checkNextDate(nextDate);
    }

}

function checkPrevDate(lastDate) {
    var day = lastDate.day - 1;
    var month = lastDate.month;
    var year = lastDate.year;

    const daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];
    if (day === 0) {
        month--;
    
        if (month === 0) {
          month = 12;
          day = 31;
          year--;
        }
        else if (month === 2) {
          if (isLeapYear(year)) {
            day = 29;
          }
          else {
            day = 28;
          }
        }
        else {
          day = daysInMonth[month - 1];
        }
      }
    return {
        day: day,
        month: month,
        year: year
    };
}

function prevPallindrom(date) {
    var prevDate = checkPrevDate(date);
    var count = 0;

    while (1) {
        count++;
        var dateInString = converter(prevDate);
        var dateInStringList = checkPallindromForAllDateFormats(dateInString);

        for (var i = 0; i < dateInStringList.length; i++) {
            if (dateInStringList[i]) {
                return [count, dateInString];
            }
        }
        prevDate = checkPrevDate(prevDate);
    }

}