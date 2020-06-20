import {
    arrTravelClasses,
    vClassButton,
    objUserSelections
} from './index.js';

import {
    deletePassengerTypesContainer
} from "./dropDownPassengers";

var vClassTypesContainer = document.getElementById("classTypesContainer");

export function classCreateStrucutre() {

    //===== display class placeholder
    let vClassTypesContainerClass = vClassTypesContainer.className;
    if (vClassTypesContainerClass == "classTypesContainerHide") {
        vClassTypesContainer.classList.remove("classTypesContainerHide");
        vClassTypesContainer.classList.add("classTypesContainerDisplay");
        deletePassengerTypesContainer();
        classCreateItems();
    } else {
        deleteClassTypesContainer();
    }

}

function classCreateItems() {


    arrTravelClasses.forEach(function (element, index) {
        console.log(element);
        let vClassTypesDivButtons = document.createElement("ul");
        let vClassTypesButtons = document.createElement("li");

        vClassTypesContainer.appendChild(vClassTypesDivButtons);
        vClassTypesDivButtons.setAttribute("id", "ClassTypesDivButtons" + index);
        vClassTypesDivButtons.classList.add("ClassTypesDivButtons");

        document.getElementById("ClassTypesDivButtons" + index).appendChild(vClassTypesButtons);
        vClassTypesButtons.setAttribute("id", "ClassTypesButtons" + index);
        let vClassButtonId = document.getElementById("ClassTypesButtons" + index);
        vClassButtonId.textContent = element.className;
        vClassButtonId.classList.add("classTypeButton");

        vClassButtonId.addEventListener("click", function () {
            objUserSelections.classType = element.className
            objUserSelections.classId = element.classId
            console.log(objUserSelections);
            vClassButton.textContent = objUserSelections.classType;
            deleteClassTypesContainer();
        })
        if (vClassButton.textContent == vClassButtonId.textContent) {
            vClassButtonId.classList.add("classTypeButtonSelected")
        } else {
            vClassButtonId.addEventListener("mouseenter", function () {
                vClassButtonId.classList.add("classTypeButtonProposition")
            })
            vClassButtonId.addEventListener("mouseleave", function () {
                vClassButtonId.classList.remove("classTypeButtonProposition")
            })

        }


    })


};


export function deleteClassTypesContainer() {
    vClassTypesContainer.classList.remove("classTypesContainerDisplay");
    vClassTypesContainer.classList.add("classTypesContainerHide");
    vClassTypesContainer.querySelectorAll('*').forEach(n => n.remove());
}

export default {
    classCreateStrucutre,
    deleteClassTypesContainer
};