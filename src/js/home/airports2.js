var vJsonbinUrl = "https://api.jsonbin.io/b/5eecd60197cb753b4d13de20";
var airports = {};


//function fetchGetData() {
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
        console.log("dataa:" + data);
        airports = data;


    });
//};

console.log(airports);
export {
    airports
}