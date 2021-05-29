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
        let header = document.getElementById("header");
        header.innerText = json;
    });

    fetch('./api/twitch/url', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        let twitch = document.getElementById("twitch");
        twitch.href = json.url;

        let name = document.getElementById("name");
        name.innerText = json.userName;

        let image = document.getElementById("image");
        image.src = json.userImage;
    });
});

