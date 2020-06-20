fetch("resInfo.json")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        console.log(data);
    });