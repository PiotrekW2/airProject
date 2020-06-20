import {
    vInputFrom,
    vInputTo,
    vTakeOffDate,
    vLandingDate,
    vTodayDate,
    vDateFormat,
    moment,
    vInitialTakeOffDate,
    vInitialLandingDate,
    objUserSelections
} from './index.js';


import {
    weekdays
} from 'moment';

import {
    deleteClassTypesContainer
} from "./dropDownClass";

import {
    deletePassengerTypesContainer
} from "./dropDownPassengers";


var vCalendarContainer = document.getElementById("calendarContainer");

export function calendar(vStartDate) {
    //   console.log(objUserSelections);

    //===== display class placeholder
    let vCalendarContainerClass = vCalendarContainer.className;
    if (vCalendarContainerClass == "calendarContainerHide") {
        //===== display calendar placeholder
        vCalendarContainer.classList.remove("calendarContainerHide");
        vCalendarContainer.classList.add("calendarContainerDisplay");

        //   console.log("aaaaaa" + vStartDate);
        let vTablePlaceholder = document.getElementById("tableCalendarPlaceHolder");
        let vCalendarMainDiv = document.createElement("div");

        vCalendarMainDiv.remove();

        let vNumberOfCalendars = document.getElementById("tableCalendarPlaceHolder").childElementCount;
        if (vNumberOfCalendars < 1) {
            vTablePlaceholder.appendChild(vCalendarMainDiv);
            //vCalendarTable.setAttribute("id", "CalendarTable")
            vCalendarMainDiv.setAttribute("id", "CalendarMainDiv")
        }

        //===== hide calendar placeholder
        document.getElementById("closeCalendar").addEventListener("click", function () {
            vCalendarContainer.classList.remove("calendarContainerDisplay");
            vCalendarContainer.classList.add("calendarContainerHide");
            vCalendarMainDiv.remove();
        })

        for (let d = 0; d <= 1; d++) {
            //       console.log("div iter" + d);
            //=== add div
            let vCalendarDiv = document.createElement("div");
            let vCalendarMainDiv = document.getElementById("CalendarMainDiv");
            // console.log("main" + vCalendarMainDiv1);
            vCalendarMainDiv.appendChild(vCalendarDiv);
            vCalendarDiv.setAttribute("id", "CalendarDiv" + d);
            vCalendarDiv.classList.add("CalendarDivClass");




            //=== add month year headers for table
            let vCalendarDivMthHeader = document.createElement("div");
            vCalendarDiv.appendChild(vCalendarDivMthHeader);
            vCalendarDivMthHeader.setAttribute("id", "MonthHeader" + d);
            vCalendarDivMthHeader.classList.add("MonthHeader");



            let vCalendarNavIcon = document.createElement("i");
            let vCalendarMonthName = document.createElement("p");
            vCalendarDivMthHeader.appendChild(vCalendarNavIcon);
            vCalendarDivMthHeader.appendChild(vCalendarMonthName);
            vCalendarMonthName.setAttribute("id", "CalendarMonthName" + d);

            if (d == 0) {
                vCalendarNavIcon.setAttribute("id", "PrevMonthIcon");
                vCalendarNavIcon.classList.add("fa", "fa-chevron-left");
            } else {
                vCalendarNavIcon.setAttribute("id", "NextMonthIcon");
                vCalendarNavIcon.classList.add("fa", "fa-chevron-right");
            }
        }

        let vInitialSelectionCounter = 0
        var vClikCounter = 0;
        deleteClassTypesContainer();
        deletePassengerTypesContainer();
        calendarContent(vStartDate, vClikCounter, 0);

    } else {
        deleteCalendarContainer();
    }

}

// create calendar content
export function calendarContent(vStartDate, vClikCounter, arrowCounter) {

    for (let d = 0; d <= 1; d++) {
        //       console.log("div iter" + d);

        // === adjust date for two months
        let vStartDateLoop = moment(vStartDate).add(d, "months").startOf("month").format(vDateFormat);

        let vMonthName = moment(vStartDateLoop).format("MMMM");
        let vYearName = moment(vStartDateLoop).format("YYYY");
        let vMonthHeader = vMonthName + " " + vYearName;
        let vCalendarDivMthHeader = document.getElementById("CalendarMonthName" + d)
        vCalendarDivMthHeader.textContent = vMonthHeader;

        //=== add table
        let vCalendarDiv = document.getElementById("CalendarDiv" + d);
        let vCalendarTable = document.createElement("table");
        vCalendarTable.setAttribute("id", "CalendarTable" + d);

        vCalendarDiv.appendChild(vCalendarTable);

        vCalendarTable.classList.add("CalendarTable");

        // == set start date depends on table

        //      console.log("bbbb" + vStartDateLoop)
        let vNumberDaysInMth = moment(vStartDateLoop).daysInMonth(); //c
        let vBaseWeekDay = parseInt(moment(vStartDateLoop).startOf("month").format("E")); //c
        let vNumnerOfRows = Math.ceil((vNumberDaysInMth + vBaseWeekDay) / 7) + 1;
        //      console.log("base week day " + vBaseWeekDay);
        //      console.log("number of rows " + vNumnerOfRows);
        let vRowCounter = 0;
        let vCellCounter = 1;

        //======= loop per row in table
        for (let r = 1; r <= vNumnerOfRows; r++) {
            let vCalendarRow = document.createElement("tr");
            vCalendarTable.appendChild(vCalendarRow);

            // loop per cell in row
            for (let c = 1; c <= 7; c++) {
                // create table headers
                if (vRowCounter == 0) {
                    let vDayValue = moment.weekdaysShort(c);
                    let vCellValue = document.createTextNode(vDayValue);
                    let vCell = document.createElement("th");
                    vCell.appendChild(vCellValue);
                    vCalendarRow.appendChild(vCell);
                } else {
                    //create table content
                    if (vCellCounter >= vBaseWeekDay && vCellCounter < vBaseWeekDay + vNumberDaysInMth) {
                        let vDayValue = vCellCounter - vBaseWeekDay + 1;
                        let vCellValue = document.createTextNode(vDayValue);
                        let vCell = document.createElement("th");
                        vCell.appendChild(vCellValue);
                        vCalendarRow.appendChild(vCell);
                        vCell.setAttribute("id", "calendarCells");

                        //add a hidden content with date
                        let vDateCellValue = moment(vStartDateLoop).add(vDayValue - 1, "days").format(vDateFormat);
                        vCell.setAttribute("aria-label", vDateCellValue);

                        //=== initial selection
                        // == dates greater than initial selection
                        if (moment(vInitialTakeOffDate).format(vDateFormat) <= vDateCellValue) {
                            vCell.classList.add("cellCalendar");

                            // === initial selection of first date 
                            if (document.getElementById("takeOffDate").value == vDateCellValue) {
                                vCell.classList.add("cellCalendarInitialSelected");
                                // vCell.setAttribute("id", "cellCalendarSelected");
                            }
                            //=== initial selection of secound date
                            if (document.getElementById("landingDate").value == vDateCellValue) {
                                vCell.classList.add("cellCalendarInitialSelected");
                                // vCell.setAttribute("id", "cellCalendarSelected");
                            }
                            // come class set for periods between selection
                            if (vDateCellValue > document.getElementById("takeOffDate").value &&
                                vDateCellValue < document.getElementById("landingDate").value) {
                                vCell.classList.add("cellCalendarBetweenDates");

                            }
                            // === cell action

                            vCell.addEventListener("click", function () {

                                var t = "";
                                if (vClikCounter == 0) {
                                    t = moment(vInitialTakeOffDate).format(vDateFormat);
                                    //  t = 0;
                                } else {
                                    t = moment(document.getElementById("takeOffDate").value).format(vDateFormat);
                                    //  t = 1;
                                }
                                console.log("out" + vClikCounter);
                                // vClikCounter += 1;

                                //=== condition to unable selection of period before first date selection
                                // t = moment(document.getElementById("takeOffDate").value).format(vDateFormat);
                                console.log("T" + t);

                                let m = this.getAttribute("aria-label");
                                console.log("M" + m);
                                if (m > t) {
                                    vClikCounter += 1;
                                    console.log("vClikCounter: " + vClikCounter);
                                    cellsClasses(this, vClikCounter);
                                }
                                //20200606 added not working 
                                else if (!objUserSelections.firstSelectionDone && m < t) {
                                    vClikCounter += 1;
                                    console.log("vClikCounterNew: " + vClikCounter);
                                    cellsClasses(this, vClikCounter);
                                }
                                //  return vClikCounter
                                // if (vClikCounter !== 0) {
                                //     vCell.addEventListener("mouseover", cellMouseOver);
                                // }
                            })

                            //function abc() {

                            vCell.addEventListener("mouseover", function () {
                                if (vClikCounter !== 0) {
                                    cellMouseOver(this)
                                }
                            });
                            //}


                        }

                    } else {
                        let vDayValue = "";
                        let vCellValue = document.createTextNode(vDayValue);
                        let vCell = document.createElement("th");
                        vCell.appendChild(vCellValue);
                        vCalendarRow.appendChild(vCell);
                    }
                    vCellCounter += 1;
                }

            }
            vRowCounter += 1;

        }
        // document.getElementById("CalendarTable" + d).addEventListener("mouseout", function () {
        //     let vCalendarCells = document.querySelectorAll("#calendarCells");
        //     for (let i = 0; i < vCalendarCells.length; i++) {
        //         vCalendarCells[i].classList.remove("cellCalendarBetweenDates")
        //     }
        // })

        console.log("arrowCounter" + arrowCounter);
        console.log("vClikCounter" + vClikCounter);

    }
}


export default {
    calendar,
    calendarContent
};


let vChcekSth = 0;

function cellsClasses(vClickedCell, iter) {

    console.log(vClickedCell.getAttribute("aria-label"));
    console.log("iter: " + iter);

    //=========remove initial selection 
    function clearCellsClass() {
        let vCalendarCells = document.querySelectorAll("#calendarCells");
        for (let i = 0; i < vCalendarCells.length; i++) {
            vCalendarCells[i].classList.remove("cellCalendarInitialSelected")
            vCalendarCells[i].classList.remove("cellCalendarBetweenDates")

            let cellDate = vCalendarCells[i].getAttribute("aria-label")
            if (cellDate < vFirstSelectedDate) {
                vCalendarCells[i].classList.remove("cellCalendar");
                //   console.log(cellDate);
            }
        }
    }
    //Round-trip flight
    let vFirstSelectedDate = vClickedCell.getAttribute("aria-label");
    if (document.getElementById("whatWayCheckBox1").checked) {
        if (iter == 1) {
            clearCellsClass()

            vClickedCell.classList.add("cellCalendarSelected");
            document.getElementById("takeOffDate").value = vFirstSelectedDate;
            document.getElementById("landingDate").value = "";

            objUserSelections.firstSelectedDate = vFirstSelectedDate;
            objUserSelections.firstSelectionDone = true;
            console.log(objUserSelections);

            // document.getElementById("CalendarTable" + d).addEventListener("mouseout", function () {
            //     let vCalendarCells = document.querySelectorAll("#calendarCells");
            //     for (let i = 0; i < vCalendarCells.length; i++) {
            //         vCalendarCells[i].classList.remove("cellCalendarBetweenDates")
            //     }
            // })
            // let vCalendarSelections = document.querySelectorAll("#CalendarTable0 .cellCalendarSelected").length +
            //     document.querySelectorAll("#CalendarTable1 .cellCalendarSelected").length
            // console.log("vCalendarSelections" + vCalendarSelections);



            //  cellMouseOver()
        } else if (iter == 2) {
            vClickedCell.classList.add("cellCalendarSelected");
            document.getElementById("landingDate").value = vFirstSelectedDate;

            vCalendarContainer.classList.remove("calendarContainerDisplay");
            vCalendarContainer.classList.add("calendarContainerHide");
            document.getElementById("CalendarMainDiv").remove();

        }





    } else if (document.getElementById("whatWayCheckBox2").checked) {
        clearCellsClass()
        vClickedCell.classList.add("cellCalendarSelected");

        document.getElementById("takeOffDate").value = vClickedCell.getAttribute("aria-label");

        vCalendarContainer.classList.remove("calendarContainerDisplay");
        vCalendarContainer.classList.add("calendarContainerHide");
        document.getElementById("CalendarMainDiv").remove();

    }
}




function cellMouseOver(vClickedCell) {
    let vMouseOverDate = vClickedCell.getAttribute("aria-label");
    let vCalendarCells = document.querySelectorAll("#calendarCells");
    //    console.log("aaaaa");

    for (let i = 0; i < vCalendarCells.length; i++) {
        vCalendarCells[i].classList.remove("cellCalendarBetweenDates")

        let vTmpDate = vCalendarCells[i].getAttribute("aria-label");

        //    console.log("vTmpDate" + vTmpDate);
        //   console.log("vFirstSelectedDate" + vFirstSelectedDate);
        //    console.log("vMouseOverDate" + vMouseOverDate);

        if (vTmpDate > document.getElementById("takeOffDate").value && vTmpDate < vMouseOverDate) {
            vCalendarCells[i].classList.add("cellCalendarBetweenDates");
            //  console.log("vTmpDate" + vTmpDate);
        }
    }


}

export function deleteCalendarContainer() {
    vCalendarContainer.classList.remove("calendarContainerDisplay");
    vCalendarContainer.classList.add("calendarContainerHide");
    vCalendarContainer.querySelectorAll('*').forEach(n => n.remove());
}