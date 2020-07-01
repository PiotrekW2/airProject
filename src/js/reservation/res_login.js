var vLognnButton = document.getElementById("loginConfirm");
var vLoginWrapper = document.getElementById("loginWrapper");
var vCleseWrapper = document.getElementById("loginClose");
var vJsonbinUrlLogin = "https://api.jsonbin.io/b/5ef6734d97cb753b4d187d97";
var arrUserCredentials = [];

import {
    objConnections,
    vJsonbinUrl
} from "./res_index";

export default function loginPage() {
    fetch(vJsonbinUrlLogin, {
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
            //   console.log(Object.keys(data).length);
            //   console.log(data[1]);
            loginElements(data);
        });
};

export function loginElements(objUsersCredentials) {
    vLognnButton.addEventListener("click", check)
    var userNumber = Object.keys(objUsersCredentials).length;

    function check() {
        var vEmailCheck = 0;
        for (let i = 0; i < userNumber; i++) {

            var inputEmail = objUsersCredentials[i].email.toLowerCase();
            var inputPassword = objUsersCredentials[i].password;
            var email = document.getElementById("email").value.toLowerCase();
            var password = document.getElementById("password").value;

            //   console.log(inputEmail);
            //   console.log(email);

            if (inputEmail == email) {
                document.getElementById("email").classList.remove("wrongLogin");
                var vEmailCheck = 1;
                if (inputPassword == password) {
                    //    console.log("ok");
                    fetchUpdateData();
                    vLoginWrapper.classList.add("login-wrapper-hidden");
                    vLoginWrapper.classList.remove("login-wrapper");
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("password").classList.remove("wrongLogin");
                    break;
                } else {
                    //   console.log("incorect password");
                    document.getElementById("password").value = "";
                    document.getElementById("password").classList.add("wrongLogin");
                    break;
                }
            }
        }
        if (vEmailCheck == 0) {
            //    console.log("incorect email");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("email").classList.add("wrongLogin");
        }
    }

    vCleseWrapper.addEventListener("click", closeLogin);

    function closeLogin() {
        vLoginWrapper.classList.add("login-wrapper-hidden");
        vLoginWrapper.classList.remove("login-wrapper");
        document.getElementById("page-cover").classList.remove("page-cover");
        document.getElementById("page-cover").classList.add("page-cover-hidden");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password").classList.remove("wrongLogin");
    }
}

export function fetchUpdateData() {
    //   console.log(JSON.stringify(objConnections));
    fetch("https://api.jsonbin.io/b/5ee9192f0e966a7aa36acdbf", {
            method: 'PUT',
            body: JSON.stringify(objConnections),
            withCredentials: true,
            headers: {
                "secret-key": "$2b$10$Z.2i1QG1gyswhgidql5pQui6I9YqmCHkS9tLfhtK9ZWIaWDHQJuQO",
                'Content-Type': 'application/json',
                "versioning": false
            }
        })
        .then((resp) => resp.json()) // Transform the data into json

    logOut();

};

function logOut() {
    document.getElementById("logoutWrapper").classList.remove("logout-wrapper-hidden");
    document.getElementById("logoutWrapper").classList.add("logout-wrapper");
    logoutCountDown();
}

function logoutCountDown() {
    let vSeconds = 15;
    let vCountdownText = document.getElementById("logoutCountdown").textContent;
    setInterval(function () {

        //vSeconds = vSeconds < 10 ? "0" + vSeconds : vSeconds;
        document.getElementById("logoutCountdown").textContent = vCountdownText + vSeconds + "s";

        if (--vSeconds <= 0) {
            localStorage.removeItem("userSelection");
            document.getElementById("logoutWrapper").classList.remove("logout-wrapper");
            document.getElementById("logoutWrapper").classList.add("logout-wrapper-hidden");
            document.getElementById("page-cover").classList.remove("page-cover");
            document.getElementById("page-cover").classList.add("page-cover-hidden");
            window.document.location = './../index.html'
        }
    }, 1000);
}