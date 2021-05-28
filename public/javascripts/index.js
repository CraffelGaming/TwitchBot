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
            console.log(json);
            json.forEach(getModules);
        });
    }

    function getModules(channel){
        console.log(channel.name);
        fetch('./api/module?channel=' + window.btoa(channel.name), {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            showChannel(channel, json)
        });
    }

    function showChannel(channel, modules) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s  mb-2');
        card.setAttribute('id', 'card_' + channel.displayName);
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.setAttribute('id', 'header_' + channel.displayName);
        header.textContent = channel.displayName;
        card.appendChild(header);

        for (var module of Object.values(modules)) {
            let description = document.createElement("div");
            description.setAttribute('class', 'p-2')
            description.setAttribute('id', 'name_' + module.name);
            description.textContent = module.name;
            card.appendChild(description);
        }

        let button_group = document.createElement("div");
        button_group.setAttribute('class', 'btn-group')
        button_group.setAttribute('id', 'button_group_' + channel.displayName);
        card.appendChild(button_group);

        let button = document.createElement("div");
        button.setAttribute('class', 'btn btn-secondary')
        button.setAttribute('id', 'button_' + channel.displayName);
        button.textContent = "Verwenden";
        button.addEventListener("click", function () {
            selectClick(channel);
        });

        button_group.appendChild(button);
    }

    function selectClick(channel){
        fetch('./api/channel/select?channel=' + window.btoa(channel.name), {
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
            header.innerText = json;
        });
    }
});

