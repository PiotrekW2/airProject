import {
    airports
} from './airports2';

import {
    objUserSelections
} from './index.js';

export default function checkInput(vFromTo) {

    let vAirpotInputField = document.getElementById("input" + vFromTo);
    let vInputValue = vAirpotInputField.value;
    let vTableAirport = document.getElementById("TableImput" + vFromTo);
    let vContainerAirport = document.getElementById("directoryTableContainer" + vFromTo);
    let vTableRows = "";
    let pattern = new RegExp(vInputValue, "gi");
    let vColumnNoToTransfer = 0;

    //=====Remove table when click somewhere else - on body
    document.getElementById("body").addEventListener("click", function () {
        vTableAirport.innerHTML = "";
        vContainerAirport.classList.remove("directoryTableContainer");
        vContainerAirport.classList.add("directoryTableContainerHidden");
    });
    //===============================
    airports.forEach(checkAirpots);

    //============================= console.log(Object.keys(airports[1])[1]);
    function checkAirpots(element, index, array) {

        if (vInputValue.length > 1) {

            //====make table visible
            vContainerAirport.classList.remove("directoryTableContainerHidden");
            vContainerAirport.classList.add("directoryTableContainer");

            if (pattern.test(element.name) || pattern.test(element.iata) || pattern.test(element.country)) {

                let vSchearchName = element.name.toLowerCase().search(vInputValue.toLowerCase());
                let vSchearchIata = element.iata.toLowerCase().search(vInputValue.toLowerCase());
                let vSchearchCountry = element.country.toLowerCase().search(vInputValue.toLowerCase());
                let vInputLength = vInputValue.length;

                let vNameReplace = `${ element.name.slice(vSchearchName, vSchearchName + vInputLength)}`;
                let vIataReplace = `${ element.iata.slice(vSchearchIata, vSchearchIata + vInputLength)}`;
                let vCountryReplace = `${ element.country.slice(vSchearchCountry, vSchearchCountry + vInputLength)}`;

                vTableRows += `<tr> 
                <td> ${element.name.replace(pattern, '<b>'+vNameReplace+'</b>')} </td> 
                <td> ${element.iata.replace(pattern, '<b>'+vIataReplace+'</b>')} </td> 
                <td> ${element.country.replace(pattern, '<b>'+vCountryReplace+'</b>')} </td> 
                </tr>`
            }
        }
    }

    vTableAirport.innerHTML = vTableRows;

    //===============Add onClick to all table rows

    let vTableLength = vTableAirport.rows.length;

    for (let i = 0; i < vTableLength; i++) {
        //=======loop for all rows
        vTableAirport.rows[i].addEventListener("click", function () {

            vAirpotInputField.value = vTableAirport.rows[i].cells[vColumnNoToTransfer].innerText;
            let vConnectionName = vFromTo.toLowerCase() + "Airport";
            objUserSelections.connections[vConnectionName] = vTableAirport.rows[i].cells[vColumnNoToTransfer].innerText;
            vTableAirport.innerHTML = "";
            vContainerAirport.classList.remove("directoryTableContainer");
            vContainerAirport.classList.add("directoryTableContainerHidden");
        });
    }
}