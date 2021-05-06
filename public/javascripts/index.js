$(() => {
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
        json.forEach(showChannel);
    });

    function showChannel(item, index) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s');
        card.setAttribute('id', 'card_' + item.displayName);
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.setAttribute('id', 'header_' + item.displayName);
        header.textContent = item.displayName;
        card.appendChild(header);

        let description = document.createElement("div");
        description.setAttribute('class', 'card-body')
        description.setAttribute('id', 'name_' + item.displayName);
        description.textContent = item.displayName;
        card.appendChild(description);

        let button_group = document.createElement("div");
        button_group.setAttribute('class', 'btn-group')
        button_group.setAttribute('id', 'button_group_' + item.displayName);
        card.appendChild(button_group);

        let button = document.createElement("div");
        button.setAttribute('class', 'btn btn-secondary')
        button.setAttribute('id', 'button_' + item.displayName);
        button.textContent = "Verwenden";
        button.addEventListener("click", function () {
            editClick(item.displayName);
        });

        button_group.appendChild(button);
    }

});

