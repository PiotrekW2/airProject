var vJsonbinUrl = "https://api.jsonbin.io/b/5ee9192f0e966a7aa36acdbf";
var objConnections = {};

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
        objConnections = data;
    });

export {
    objConnections
}