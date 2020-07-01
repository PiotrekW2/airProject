import style from "./../../css/index.scss";
import checkInput from "./airportSearching"; //add script for searching airports
import switchAirpots from "./switchAirports";
import {
    airports
} from './airports2';

import {
    objConnections
} from "./connections";

import {
    calendar,
    calendarContent
} from "./calendar";

import {
    passengersCreateStrucutre
} from "./dropDownPassengers";

import {
    classCreateStrucutre
} from "./dropDownClass";

let vInputFrom = document.getElementById("inputFrom");
let vInputTo = document.getElementById("inputTo");
let vTakeOffDate = document.getElementById("takeOffDate");
let vLandingDate = document.getElementById("landingDate");
let vSwitchButton = document.getElementById("imgIconAirportSwitch");
let vGoButton = document.getElementById("goFurther");
var vErrorButton = document.getElementById("errorPopupContainer");
let vTodayDate = new Date();
let vDateFormat = "YYYY-MM-DD";
var moment = require('moment');
let vInitialTakeOffDate = moment(vTodayDate).add(1, "days").format(vDateFormat);
let vInitialLandingDate = moment(vTodayDate).add(8, "days").format(vDateFormat);
var vPassengersButton = document.getElementById("passengerTypesButId");
var vClassButton = document.getElementById("classTypesButId");
var vInitialClassType = "Economy Class";
var vInitialClassId = 3;
var vInitialPassengerNumber = "";
var htmpPage = location.pathname.split("/").slice(-1);
var objUserSelections = {
    connectionExist: false,
    firstSelectedDate: vInitialTakeOffDate,
    firstSelectionDone: false,
    returnSelectedDate: vInitialLandingDate,
    way: 2,
    classType: vInitialClassType,
    classId: vInitialClassId,
    planeType: "",
    arrOcupiedSeats: [],
    connections: {
        fromAirport: "",
        toAirport: "",
        fromIata: "",
        toIata: "",
        toIataConnection: "",
        fromIataConnection: "",
    },
    passengers: {},
    passengersNumber: 0
};

objUserSelections.firstSelectedDate = vInitialTakeOffDate;
objUserSelections.classType = vInitialClassType;

export {
    vInputFrom,
    vInputTo,
    vTakeOffDate,
    vLandingDate,
    vTodayDate,
    vDateFormat,
    moment,
    vInitialTakeOffDate,
    vInitialLandingDate,
    objUserSelections,
    arrTravelClasses,
    arrPassengersTypes,
    vClassButton,
    vPassengersButton
}

var arrTravelClasses = [{
    className: "Economy Class",
    classId: 3
}, {
    className: "Premium Class",
    classId: 2
}, {
    className: "Business Class",
    classId: 1
}];
var arrPassengersTypes = ["Infants", "Children", "Adults"].reverse();

arrPassengersTypes.forEach(function (element, index) {
    if (element == "Adults") {
        objUserSelections.passengers[element] = 1;
        objUserSelections.passengersNumber = 1;
    } else {
        objUserSelections.passengers[element] = 0;
    }
});

//set up initial class name to be visible on the page in button name
vClassButton.textContent = objUserSelections.classType;

//set up initial passenger name to be visible on the page in the button name
arrPassengersTypes.forEach(function (element, index) {
    if (objUserSelections.passengers[element] > 0) {
        vInitialPassengerNumber = element + ': ' + objUserSelections.passengers[element] + ' ';
    }
    return vInitialPassengerNumber
});
vPassengersButton.textContent = vInitialPassengerNumber;

//console.log(objUserSelections);

//=========== add event for passenders number selection
vPassengersButton.addEventListener("click", function () {
    passengersCreateStrucutre()
}, false);

//=========== add event for class type selection
vClassButton.addEventListener("click", function () {
    classCreateStrucutre()
}, false);

//===========add initial take off date as a today +1
vTakeOffDate.setAttribute("value", vInitialTakeOffDate);
vLandingDate.setAttribute("value", vInitialLandingDate);

//===========add events for both inputs
vInputFrom.addEventListener("input", function () {
    //    console.log(airports);
    checkInput("From")

}, false);

vInputTo.addEventListener("input", function () {
    checkInput("To")
}, false);

//==========add event to GO button==== maybe not needed
vGoButton.addEventListener("click", function () {
    objUserSelections.connections.fromAirport = vInputFrom.value;
    objUserSelections.connections.toAirport = vInputTo.value;
    assignIata();
    checkAirports();
    if (objUserSelections.connectionExist) {
        if (document.getElementById("containerSecondLevel").className == "containerSecondLevelHide") {

            document.getElementById("containerSecondLevel").classList.remove("containerSecondLevelHide");
            document.getElementById("containerSecondLevel").classList.add("containerSecondLevelDisplay");
        } else {
            document.getElementById("containerSecondLevel").classList.remove("containerSecondLevelDisplay");
            document.getElementById("containerSecondLevel").classList.add("containerSecondLevelHide");
        }
    } else {
        errorWrongConnection()
    }
    //   console.log(objUserSelections);
})

function errorWrongConnection() {
    vErrorButton.classList.remove("error-PopupContainerHidden");
    vErrorButton.classList.add("error-PopupContainer");
    document.getElementById("errorPopupMessage").textContent =
        "sorry, connection: " + objUserSelections.connections.fromAirport + " - " + objUserSelections.connections.toAirport + " is not available."
    //    console.log(objUserSelections);
}

vErrorButton.addEventListener("click", function () {
    vErrorButton.classList.remove("error-PopupContainer");
    vErrorButton.classList.add("error-PopupContainerHidden");
    document.getElementById("errorPopupMessage").textContent = "";
})

//==========add event to update obejct with selection when user type airport name
vInputFrom.addEventListener("blur", function () {
    objUserSelections.connections.fromAirport = vInputFrom.value;
    //   console.log(vInputFrom.value);
    //   console.log(objUserSelections);
})
vInputTo.addEventListener("blur", function () {
    objUserSelections.connections.toAirport = vInputTo.value;
})

//==========add event for airpots switch button
vSwitchButton.addEventListener("click", switchAirpots);


//==========add event for date input field
vTakeOffDate.addEventListener("click", function () {
    objUserSelections.firstSelectionDone = false;
    //calendar(vStartDate)
    let vDir = 0;
    createCalendar(vDir);

    // We can call function form inside this funcion???!!!
    document.getElementById("NextMonthIcon").addEventListener("click", function () {

        // document.getElementById("CalendarTable0").remove();
        // document.getElementById("CalendarTable1").remove();
        let vDir = 1;
        createCalendar(vDir);
    });

    document.getElementById("PrevMonthIcon").addEventListener("click", function () {
        let vDir = -1;
        createCalendar(vDir);
    });
})

var vCounter = 0;
var vCounter2 = 0;

function createCalendar(vDir) {
    console.log("aaaa");
    if (vDir == 0) {
        vCounter = 0
        let vStartDate = moment(document.getElementById("takeOffDate").value).add(vCounter, "months").startOf("month").format(vDateFormat);
        calendar(vStartDate);
    } else {
        vCounter = vCounter + vDir;
        vCounter2 += 1;
        //       console.log("vCounter2 06:" + vCounter2);

        let vStartDate = moment(document.getElementById("takeOffDate").value).add(vCounter, "months").startOf("month").format(vDateFormat);
        numberOfCalendarSelections();
        document.getElementById("CalendarTable0").remove();
        document.getElementById("CalendarTable1").remove();
        calendarContent(vStartDate, vCalendarSelections, vCounter2);
    }
}

// ==== round-trip, one way checkboxes
document.getElementById("whatWayCheckBox1").addEventListener("click", function () {
    document.getElementById("whatWayCheckBox2").checked = false;
    document.getElementById("whatWayCheckBox1").checked = true;
    document.getElementById("landingDate").disabled = false;
    objUserSelections.way = 2;
})

document.getElementById("whatWayCheckBox2").addEventListener("click", function () {
    document.getElementById("whatWayCheckBox1").checked = false;
    document.getElementById("whatWayCheckBox2").checked = true;
    document.getElementById("landingDate").disabled = true;
    objUserSelections.way = 1;
})

var vCalendarSelections = 0;

function numberOfCalendarSelections() {
    //   console.log(objUserSelections);
    if (objUserSelections.firstSelectionDone) {
        vCalendarSelections = 1;
    } else {
        vCalendarSelections = 0;
    }
    //   console.log("vCalendarSelections" + vCalendarSelections)
    return vCalendarSelections
}

document.getElementById("result").addEventListener("click", function () {
    assignIata();
    checkAirports()
    //console.log(objUserSelections);
    if (objUserSelections.connectionExist) {
        localStorage.setItem('userSelection', JSON.stringify(objUserSelections));
        window.document.location = './../seatsReservation.html'
        //console.log(localStorage.getItem('userSelection'));
    } else {
        errorWrongConnection();
    }
});

function assignIata() {
    objUserSelections.connections.fromIata = "";
    objUserSelections.connections.toIata = "";
    airports.forEach(function (element, index) {
        if (airports[index].name == objUserSelections.connections.fromAirport) {
            objUserSelections.connections.fromIata = airports[index].iata;
        }
    })
    airports.forEach(function (element, index) {
        if (airports[index].name == objUserSelections.connections.toAirport) {
            objUserSelections.connections.toIata = airports[index].iata;
        }
    })
    objUserSelections.connections.toIataConnection = objUserSelections.connections.fromIata + "_" + objUserSelections.connections.toIata
    objUserSelections.connections.fromIataConnection = objUserSelections.connections.toIata + "_" + objUserSelections.connections.fromIata
}

function checkAirports() {
    let vConnectionsNumber = objConnections.connections.length;
    objUserSelections.connectionExist = false;
    for (let i = 0; i < vConnectionsNumber; i++) {
        //        console.log(i);
        let vConnectionIataName = objConnections.connections[i].iataNames;
        //       console.log(vConnectionIataName);
        //       console.log(objUserSelections.connections.toIataConnection)
        if (vConnectionIataName == objUserSelections.connections.toIataConnection) {
            objUserSelections.connectionExist = true;
            break
        };
    }
}