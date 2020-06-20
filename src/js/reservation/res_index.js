//import A320 from "!!file-loader!./../../img/svg/A320.svg"
import style from "./../../css/res_index.scss";
import A320 from '!!raw-loader!./../../img/svg/A320_2.txt';



var objUserSelections = JSON.parse(localStorage.getItem('userSelection'));

console.log(objUserSelections);

var vJsonbinUrl = "https://api.jsonbin.io/b/5ee9192f0e966a7aa36acdbf";
var vIataConnection = objUserSelections.connections.iataConnection;
var vClassId = objUserSelections.classId;
var arrOcupiedSeats = [];
var arrSelectedSeats = [];
var vPassengersNumber = objUserSelections.passengersNumber;

console.log(vPassengersNumber);




//fetch with secret-key - working GET method
export function fetchGetData() {
    fetch(vJsonbinUrl, {
            method: 'GET',
            withCredentials: true,
            // credentials: 'include',
            headers: {
                "secret-key": "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO",
                'Content-Type': 'application/json'
            }
        })

        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            // console.log(data);
            myTestFunction(data)
        });
    // console.log(objUserSelections);
    // .then(myTestFunction(data))
};
// fetch method PUT====================================================

export function myTestFunction(arrConnections) {
    console.log(arrConnections);
    console.log(objUserSelections);
    let vConnectionsNumber = arrConnections.connections.length;
    for (let i = 0; i < vConnectionsNumber; i++) {
        //        console.log(i);
        let vConnectionIataName = arrConnections.connections[i].iataNames;
        //        console.log(vConnectionIataName);
        if (vConnectionIataName == vIataConnection) {
            let vPlaneType = arrConnections.connections[i].plane.type;
            objUserSelections.planeType = arrConnections.connections[i].plane.type;
            //let arrOcupiedSeats = arrConnections.connections[i].plane.occupiedSeats;
            arrConnections.connections[i].plane.occupiedSeats.forEach(function (element, index) {
                objUserSelections.arrOcupiedSeats.push(element);
            });
            console.log(objUserSelections);
            renderSvgPlane(vPlaneType);
            planeSeats();
        }
    }

};

fetchGetData();

// export default {
//     fetchGetData,
//     tesst1
// };


var formData = '{"Sample2": "Hello World333333"}';

//console.log(formData);
export function fetchUpdateData() {
    fetch(vJsonbinUrl, {
            method: 'PUT',
            body: formData,
            withCredentials: true,
            // credentials: 'include',
            headers: {
                "secret-key": "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO",
                // 'Authorization': bearer,
                // 'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
                'Content-Type': 'application/json',
                "versioning": false
            }
        })
        .then((resp) => resp.json()) // Transform the data into json
};

// fetch("https://api.jsonbin.io/b/5ee8b8f2ccc9877ac37cb832", {
//         method: 'PUT',
//         body: formData,
//         withCredentials: true,
//         // credentials: 'include',
//         headers: {
//             "secret-key": "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO",
//             // 'Authorization': bearer,
//             // 'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
//             'Content-Type': 'application/json',
//             "versioning": false
//         }
//     })
//     .then((resp) => resp.json()) // Transform the data into json
// //.then(function (data) {
// //    console.log(data);
// // })
// ;


//create jsonbin bin
// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//     if (req.readyState == XMLHttpRequest.DONE) {
//         console.log(req.responseText);
//     }
// };

// req.open("POST", "https://api.jsonbin.io/b", true);
// req.setRequestHeader("Content-Type", "application/json");
// req.setRequestHeader("secret-key", "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO");
// req.setRequestHeader("private", false);         //only for public bins
// req.send('{"Sample": "Hello World"}');

//read data - there is some delay in reading data
// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//     if (req.readyState == XMLHttpRequest.DONE) {
//         console.log(req.responseText);
//     }
// };

// req.open("GET", "https://api.jsonbin.io/b/5ee8b8f2ccc9877ac37cb832", true);
// req.setRequestHeader("secret-key", "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO");
// req.send();

//update data
// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//     if (req.readyState == XMLHttpRequest.DONE) {
//         console.log(req.responseText);
//     }
// };

// req.open("PUT", "https://api.jsonbin.io/b/5ee8c01c0e966a7aa36a96e2", true);
// req.setRequestHeader("Content-Type", "application/json");
// req.setRequestHeader("secret-key", "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO");
// req.setRequestHeader("versioning", false);
// req.send('{"Sample2": "Hello World2222"}');



//let vTestP = document.createElement("p");
// document.getElementById("seatsResPlane").appendChild(vTestP);
// vTestP.innerHTML = "ewerwerwerwerwer weeewrewer werw ";
// console.log(vTestP);


// Using default hashed prefix (__[hash:base64:7]__)
//var svg1 = require('./../../img/svg/A320.svg');
//console.log(svg1);

//console.log(A320);

export function renderSvgPlane(vPlaneType) {

    var vtestSvg = document.createElement("p");
    document.getElementById("svgContainer").appendChild(vtestSvg);
    // if (vPlaneType == "A320") {
    //     vtestSvg.innerHTML = A320;
    // }
    switch (vPlaneType) {
        case "A320":
            vtestSvg.innerHTML = A320;
            break;
        case "747":
            vtestSvg.innerHTML = 747;
            break;
        case "244":
            vtestSvg.innerHTML = 244;
            break;
        default:
            console.log("cannot load svg for plane: " + vPlaneType);
    }


};


function planeSeats() {

    let vCounter = 0;
    let testSpan = document.createElement("text");
    for (let i = 1; i <= 3; i++) {
        if (i == vClassId) {
            var arrSeats = document.getElementById("class" + i);
            var myRects = Array.from(arrSeats.querySelectorAll("rect"));
            myRects.forEach(function (element, index) {
                //if (element.id == 'a1') {
                if (objUserSelections.arrOcupiedSeats.includes(element.id)) {
                    element.classList.add("occupiedSeat");
                } else {
                    element.classList.add("availableSeat");
                    //------initial seats selection
                    if (vCounter < vPassengersNumber) {
                        selectedSeat(element)
                    }
                    vCounter = vCounter++

                    element.addEventListener("click", function () {
                        selectedSeat(element)
                    }, false);
                    // add some tooltip
                    // document.getElementById(element.id).
                    // element.appendChild(testSpan);
                    // testSpan.classList.add("testSpan");
                    // testSpan.textContent = element.id;

                };
                console.log(element.id); //wartość id - pozwala na porównanie z potencjalnym json
                // console.log(element)
            })

        } else {
            var arrSeats = document.getElementById("class" + i);
            var myRects = Array.from(arrSeats.querySelectorAll("rect"));
            myRects.forEach(function (element, index) {

                element.classList.add("unavailableSeats");
            })
        }

    }



}


function selectedSeat(element) {
    // if (document.querySelectorAll(".selecteSeat").length < 3) {
    //     element.classList.toggle("selecteSeat");

    // } else {
    //     element.classList.remove("selecteSeat");
    // }


    if (arrSelectedSeats.includes(element.id)) {
        element.classList.remove("selecteSeat");
        arrSelectedSeats.forEach(function (takenSeats, index) {
            if (arrSelectedSeats[index] == element.id) {
                arrSelectedSeats.splice(index, 1);

            }
        })
    } else {
        if (arrSelectedSeats.length < vPassengersNumber) {
            arrSelectedSeats.push(element.id);
            element.classList.add("selecteSeat");
        }
    };

    console.log(element.id);
    console.log(arrSelectedSeats)

}