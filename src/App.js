import { useState } from "react";
import "./styles.css";

export default function App() {
  var [date, setDate] = useState("");
  var [output, setOutput] = useState("");
  var [outputTwo, setOutputTwo] = useState("");
  function buttonClickHandler() {
    if (date === "") {
      setOutput("Please Enter a Valid Date");
    } else {
      var dateSplit = date.split("-");
      var dateObject = {
        day: +dateSplit[2],
        month: +dateSplit[1],
        year: +dateSplit[0]
      };
      if (checkPalindromeOnAllFormats(dateObject)) {
        setOutput("Congrats your birthday is a palindrome!!🥳🥳");
        setOutputTwo("");
      } else {
        var previousPalindromeDate = getPreviousPalindromeDate(dateObject);
        var nextPalindromeDate = getNextPalindromeDate(dateObject);
        if (nextPalindromeDate[1] < previousPalindromeDate[1]) {
          var day = nextPalindromeDate[1] === 1 ? "day" : "days";
          var nxtdate = convertDateToString(nextPalindromeDate[0]);
          setOutput("Your birthday is not a palindrome.🙂🙂");
          setOutputTwo(
            "The nearest palindrome date is " +
              (nxtdate.day + "-" + nxtdate.month + "-" + nxtdate.year) +
              ", " +
              nextPalindromeDate[1] +
              " " +
              day +
              " later."
          );
        } else if (nextPalindromeDate[1] > previousPalindromeDate[1]) {
          var dayPrev = previousPalindromeDate[1] === 1 ? "day" : "days";
          var prevdate = convertDateToString(previousPalindromeDate[0]);
          setOutput("Your birthday is not a palindrome.🙂🙂");
          setOutputTwo(
            "The nearest palindrome date was " +
              (prevdate.day + "-" + prevdate.month + "-" + prevdate.year) +
              ", " +
              previousPalindromeDate[1] +
              " " +
              dayPrev +
              " ago."
          );
        }
      }
    }
  }

  function reverseString(string) {
    var stringSplit = string.split("");
    var stringReverse = stringSplit.reverse();
    var reversedString = stringReverse.join("");
    return reversedString;
  }

  function isPalindrome(string) {
    var reverse = reverseString(string);
    if (reverse === string) {
      return true;
    }
    return false;
  }

  function convertDateToString(date) {
    var dateString = { day: "", month: "", year: "" };

    if (date.day < 10) {
      dateString.day = "0" + date.day;
    } else dateString.day = date.day.toString();

    if (date.month < 10) {
      dateString.month = "0" + date.month;
    } else dateString.month = date.month.toString();

    dateString.year = date.year.toString();
    return dateString;
  }

  function allDateFormats(date) {
    var dateString = convertDateToString(date);
    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

  function checkPalindromeOnAllFormats(date) {
    var allFormats = allDateFormats(date);

    var flag = false;
    for (var i = 0; i < allFormats.length; i++) {
      if (isPalindrome(allFormats[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  function isLeap(year) {
    if (year % 100 === 0) {
      return false;
    }
    if (year % 400 === 0) {
      return true;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }

  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeap(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }

  function getNextPalindromeDate(date) {
    var count = 0;
    date = getNextDate(date);
    while (1) {
      count++;
      if (checkPalindromeOnAllFormats(date)) {
        break;
      }
      date = getNextDate(date);
    }
    return [date, count];
  }

  function getPreviousDate(date) {
    var day = date.day + -1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
      if (isLeap(year)) {
        if (day < 1) {
          day = 29;
          month--;
        }
      } else {
        if (day < 1) {
          day = 28;
          month--;
        }
      }
    } else {
      if (day < 1) {
        day = daysInMonth[month - 1];
        month--;
      }
    }

    if (month < 1) {
      month = 12;
      year--;
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }
  function getPreviousPalindromeDate(date) {
    var count = 0;
    date = getPreviousDate(date);
    while (1) {
      count++;
      if (checkPalindromeOnAllFormats(date)) {
        break;
      }
      date = getPreviousDate(date);
    }
    return [date, count];
  }

  return (
    <div className="App">
      <br />
      <h1>Palindrome Birthday</h1>
      <input
        type="date"
        onChange={(event) => setDate(event.target.value)}
      ></input>
      <button onClick={buttonClickHandler}>Check</button>
      <p>{output}</p>
      <p>{outputTwo}</p>
    </div>
  );
}
