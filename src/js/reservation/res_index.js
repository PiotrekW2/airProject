import style from "./../../css/res_index.scss";
import A320 from '!!raw-loader!./../../img/svg/A320_2.txt';
import EMB_175 from '!!raw-loader!./../../img/svg/EMB_175.txt';
import loginPage from "./res_login";

var objUserSelections = JSON.parse(localStorage.getItem('userSelection'));
var vJsonbinUrl = "https://api.jsonbin.io/b/5ee9192f0e966a7aa36acdbf";
var vToIataConnection = objUserSelections.connections.toIataConnection;
var vFromIataConnection = objUserSelections.connections.fromIataConnection;
var vClassId = objUserSelections.classId;
var arrOcupiedSeats = [];
var arrSelectedSeats = [];
var vPassengersNumber = objUserSelections.passengersNumber;
var objConnections = {};

export {
    objConnections,
    vJsonbinUrl
}

//fetch with secret-key - working GET method
export function fetchGetData() {
    fetch(vJsonbinUrl, {
            method: 'GET',
            withCredentials: true,
            headers: {
                "secret-key": "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO",
                'Content-Type': 'application/json'
            }
        })

        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            // console.log(data);
            objConnections = data;
            myTestFunction(data)
        });
    // console.log(objUserSelections);
};

export function myTestFunction() {
    //  console.log(objConnections);
    //  console.log(objUserSelections);
    let vConnectionsNumber = objConnections.connections.length;
    for (let i = 0; i < vConnectionsNumber; i++) {
        //        console.log(i);
        let vConnectionIataName = objConnections.connections[i].iataNames;
        //        console.log(vConnectionIataName);
        if (vConnectionIataName == vToIataConnection) {
            let vPlaneType = objConnections.connections[i].plane.type;
            objUserSelections.planeType = objConnections.connections[i].plane.type;
            objConnections.connections[i].plane.occupiedSeats.forEach(function (element, index) {
                objUserSelections.arrOcupiedSeats.push(element);
            });
            //   console.log(objUserSelections);
            renderSvgPlane(vPlaneType);
            planeSeats();
            connectionDescription();
        }
    }
};

fetchGetData();

export function renderSvgPlane(vPlaneType) {

    var vtestSvg = document.createElement("p");
    document.getElementById("svgContainer").appendChild(vtestSvg);
    switch (vPlaneType) {
        case "A320":
            vtestSvg.innerHTML = A320;
            break;
        case "EMB_175":
            vtestSvg.innerHTML = EMB_175;
            break;
        case "244":
            vtestSvg.innerHTML = 244;
            break;
        default:
            //   console.log("cannot load svg for plane: " + vPlaneType);
    }
};

function planeSeats() {
    let vCounter = 0;
    let testSpan = document.createElement("text");
    for (let i = 1; i <= 3; i++) { //classes loop
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
                    if (vCounter < vPassengersNumber) { //passanger number check
                        selectedSeat(element)
                    }
                    vCounter = vCounter++

                    element.addEventListener("click", function () {
                        selectedSeat(element)
                    }, false);
                };
                //   console.log(element.id); 
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

    //   console.log(element.id);
    //   console.log(arrSelectedSeats)
    document.getElementById("res-from-info6").textContent = arrSelectedSeats.join(', ');
    document.getElementById("res-to-info6").textContent = arrSelectedSeats.join(', ');
}


function connectionDescription() {
    //   console.log(objUserSelections.passengers);
    var typePassengers = "";
    let vSignBetween = "";
    Object.keys(objUserSelections.passengers).forEach(function (key, index) {
        //      console.log(objUserSelections.passengers[key]);
        if (objUserSelections.passengers[key] != 0) {
            if (index == 0) {
                let vSignBetween = ""
            } else {
                vSignBetween = "; "
            };
            typePassengers = objUserSelections.passengers[key] + " " + key + vSignBetween + typePassengers
        }
    });

    if (objUserSelections.way == 1) {
        document.getElementById("res-descContainerFrom").classList.remove("res-descContainerFromHidden");
        document.getElementById("res-descContainerFrom").classList.add("res-descContainerFrom");
    } else {
        (objUserSelections.way == 2)
        document.getElementById("res-descContainerFrom").classList.remove("res-descContainerFromHidden");
        document.getElementById("res-descContainerFrom").classList.add("res-descContainerFrom");
        document.getElementById("res-descContainerTo").classList.remove("res-descContainerToHidden");
        document.getElementById("res-descContainerTo").classList.add("res-descContainerTo");
    };

    document.getElementById("res-from-info1").textContent = objUserSelections.connections.fromAirport;
    document.getElementById("res-from-info2").textContent = objUserSelections.connections.toAirport;
    document.getElementById("res-from-info3").textContent = objUserSelections.firstSelectedDate;
    document.getElementById("res-from-info4").textContent = typePassengers;
    document.getElementById("res-from-info5").textContent = objUserSelections.classType;
    document.getElementById("res-from-info6").textContent = arrSelectedSeats.join(', ');

    document.getElementById("res-to-info1").textContent = objUserSelections.connections.toAirport;
    document.getElementById("res-to-info2").textContent = objUserSelections.connections.fromAirport;
    document.getElementById("res-to-info3").textContent = objUserSelections.returnSelectedDate;
    document.getElementById("res-to-info4").textContent = typePassengers;
    document.getElementById("res-to-info5").textContent = objUserSelections.classType;
    document.getElementById("res-to-info6").textContent = arrSelectedSeats.join(', ');
    // console.log("test: " + arrSelectedSeats[1]);
}

document.getElementById("resConfirmationButton").addEventListener("click", function () {

    document.getElementById("loginWrapper").classList.remove("login-wrapper-hidden");
    document.getElementById("loginWrapper").classList.add("login-wrapper");
    document.getElementById("page-cover").classList.remove("page-cover-hidden");
    document.getElementById("page-cover").classList.add("page-cover");
    updateObjConnections();
    loginPage()
})


function updateObjConnections() {
    let vConnectionsNumber = objConnections.connections.length;
    for (let i = 0; i < vConnectionsNumber; i++) {
        let vConnectionIataName = objConnections.connections[i].iataNames;
        if (vConnectionIataName == vToIataConnection) { //if iata connection is equal to selected
            arrSelectedSeats.forEach(function (element, index) { //push selected seats to correct arrConnection
                objConnections.connections[i].plane.occupiedSeats.push(element);
            });
        }
    }
}