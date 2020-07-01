import {
    vPassengersButton,
    arrPassengersTypes,
    objUserSelections
} from './index.js';

import {
    deleteClassTypesContainer
} from "./dropDownClass";

let vPassengerTypesContainer = document.getElementById("passengerTypesContainer");

export function passengersCreateStrucutre() {

    //===== display passengers placeholder
    // console.log(vPassengerTypesContainer.className);
    let vPassengerTypesContainerClass = vPassengerTypesContainer.className;
    if (vPassengerTypesContainerClass == "passengerTypesContainerHide") {
        vPassengerTypesContainer.classList.remove("passengerTypesContainerHide");
        vPassengerTypesContainer.classList.add("passengerTypesContainerDisplay");
        deleteClassTypesContainer();
        passengersCreateItems();
    } else {
        deletePassengerTypesContainer();
    }
}


function passengersCreateItems() {

    let vPassengerTypesDivComplete = document.createElement("div");
    let vPassengerTypesDivButtonsConfirm = document.createElement("button");

    arrPassengersTypes.forEach(function (element, index) {
        // console.log(element);

        let vPassengerTypesDivPlaceholder = document.createElement("div");
        let vPassengerTypesDivText = document.createElement("div");
        let vPassengerTypesDivButtons = document.createElement("div");
        let vPassengerTypesDivButtonsPlus = document.createElement("button");
        let vPassengerTypesDivButtonsMinus = document.createElement("button");
        let vPassengerTypesDivButtonsInput = document.createElement("input");
        let vPassengerTypesDivButtonsIcon = document.createElement("i");

        vPassengerTypesContainer.appendChild(vPassengerTypesDivPlaceholder);
        vPassengerTypesDivPlaceholder.setAttribute("id", "PassengerTypesDivPlaceholder" + index);
        vPassengerTypesDivPlaceholder.classList.add("PassengerTypesDivPlaceholder");

        document.getElementById("PassengerTypesDivPlaceholder" + index).appendChild(vPassengerTypesDivText);
        vPassengerTypesDivText.setAttribute("id", "PassengerTypesDivText" + index);
        vPassengerTypesDivText.classList.add("PassengerTypesDivText");
        document.getElementById("PassengerTypesDivText" + index).textContent = element;

        document.getElementById("PassengerTypesDivPlaceholder" + index).appendChild(vPassengerTypesDivButtons);
        vPassengerTypesDivButtons.setAttribute("id", "PassengerTypesDivButtons" + index);
        vPassengerTypesDivButtons.classList.add("PassengerTypesDivButtons");

        document.getElementById("PassengerTypesDivButtons" + index).appendChild(vPassengerTypesDivButtonsMinus);
        vPassengerTypesDivButtonsMinus.setAttribute("id", "PassengerTypesDivButtonsMinus" + index);
        vPassengerTypesDivButtonsMinus.classList.add("PassengerTypesButtons");
        vPassengerTypesDivButtonsMinus.classList.add("PassengerTypesButtonsMinus");
        document.getElementById("PassengerTypesDivButtonsMinus" + index).textContent = "-";
        document.getElementById("PassengerTypesDivButtonsMinus" + index).addEventListener("click", function () {
            if (document.getElementById("PassengerTypesDivButtonsInput" + index).value > 0) {
                document.getElementById("PassengerTypesDivButtonsInput" + index).value -= 1;
                objUserSelections.passengers[element] = document.getElementById("PassengerTypesDivButtonsInput" + index).value
            }
        })

        document.getElementById("PassengerTypesDivButtons" + index).appendChild(vPassengerTypesDivButtonsInput);
        vPassengerTypesDivButtonsInput.setAttribute("id", "PassengerTypesDivButtonsInput" + index);
        vPassengerTypesDivButtonsInput.classList.add("PassengerTypesDivButtonsInput");
        vPassengerTypesDivButtonsInput.setAttribute("maxlength", 1);
        vPassengerTypesDivButtonsInput.setAttribute("autocomplete", "off");
        vPassengerTypesDivButtonsInput.classList.add("PassengerTypesInputClass");

        document.getElementById("PassengerTypesDivButtonsInput" + index).value = objUserSelections.passengers[element];
        document.getElementById("PassengerTypesDivButtonsInput" + index).addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            objUserSelections.passengers[element] = this.value
            countPassengers()
        })

        document.getElementById("PassengerTypesDivButtons" + index).appendChild(vPassengerTypesDivButtonsPlus);
        vPassengerTypesDivButtonsPlus.setAttribute("id", "PassengerTypesDivButtonsPlus" + index);
        vPassengerTypesDivButtonsPlus.classList.add("PassengerTypesButtons");
        vPassengerTypesDivButtonsPlus.classList.add("PassengerTypesDivButtonsPlus");
        document.getElementById("PassengerTypesDivButtonsPlus" + index).textContent = "+";
        document.getElementById("PassengerTypesDivButtonsPlus" + index).addEventListener("click", function () {
            if (document.getElementById("PassengerTypesDivButtonsInput" + index).value >= 9) {} else {
                document.getElementById("PassengerTypesDivButtonsInput" + index).value++;
                objUserSelections.passengers[element] = parseInt(document.getElementById("PassengerTypesDivButtonsInput" + index).value)
                countPassengers()
            }
        })
    })

    vPassengerTypesContainer.appendChild(vPassengerTypesDivComplete);
    vPassengerTypesDivComplete.setAttribute("id", "PassengerTypesDivComplete");
    document.getElementById("PassengerTypesDivComplete").appendChild(vPassengerTypesDivButtonsConfirm);
    vPassengerTypesDivButtonsConfirm.setAttribute("id", "PassengerTypesDivButtonsConfirm");
    document.getElementById("PassengerTypesDivButtonsConfirm").textContent = "Confirm";
    document.getElementById("PassengerTypesDivButtonsConfirm").addEventListener("click", function () {
        createPassangerSelectionInfo();
        deletePassengerTypesContainer();
        countPassengers();
    })
};

export function deletePassengerTypesContainer() {
    vPassengerTypesContainer.classList.remove("passengerTypesContainerDisplay");
    vPassengerTypesContainer.classList.add("passengerTypesContainerHide");
    vPassengerTypesContainer.querySelectorAll('*').forEach(n => n.remove());
}

function createPassangerSelectionInfo() {
    let vPassangerSelectionInfo = "";
    arrPassengersTypes.forEach(function (element, index) {
        if (objUserSelections.passengers[element] > 0) {
            vPassangerSelectionInfo = vPassangerSelectionInfo + element + ': ' + objUserSelections.passengers[element] + ' ';
        }
    });
    vPassengersButton.textContent = vPassangerSelectionInfo;
}

function countPassengers() {
    let vPassNum = 0;
    arrPassengersTypes.forEach(function (element, index) {
        vPassNum = parseInt(objUserSelections.passengers[element]) + parseInt(vPassNum);
        //  console.log(vPassNum);
        //  console.log(objUserSelections.passengers[element]);
    });
    objUserSelections.passengersNumber = vPassNum;
    // console.log(objUserSelections.passengersNumber);
    //  console.log(objUserSelections);
}

export default {
    passengersCreateStrucutre,
    deletePassengerTypesContainer
};