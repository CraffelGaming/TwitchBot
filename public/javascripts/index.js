$(() => {
    getChannel();

    function getChannel(){
        fetch('./api/channel', {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            json.forEach(showChannel);
        });
    }

    function showChannel(channel) {
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-control');
        input.setAttribute('aria-label', 'Large');
        input.setAttribute('readonly', '');
        input.value = channel.displayName;

        let button = document.createElement("button");
        button.setAttribute('class', 'btn btn-outline-secondary');
        button.setAttribute('type', 'button');
        button.innerText = 'Auswählen'
        button.addEventListener("click", function () {
            selectClick(channel.name);
        });

        let innerGroup = document.createElement("div");
        innerGroup.setAttribute('class', 'input-group-append');
        innerGroup.appendChild(button)

        let group = document.createElement("div");
        group.setAttribute('class', 'input-group mb-3');
        group.appendChild(input);
        group.appendChild(innerGroup);

        let container = document.getElementById("container");
        container.appendChild(group);
    }

    function selectClick(channelName){
        fetch('./api/channel/select?channel=' + window.btoa(channelName), {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            let header = document.getElementById("header");
            header.value = json;
            console.log(json);
            if(getCookie('allowCookies'))
                setCookie('channelName', json, 7);
        });
    }
});

