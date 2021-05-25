$(() => {
    fetch('./api/channel/select', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        console.log(json);

        let header = document.getElementById("header");
        header.innerText = json;
    });
});

