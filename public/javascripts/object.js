$(() => {
    fetch('./api/object?channel=' + window.btoa('#craffelmat'), {
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
        json.forEach(showObject);
    });

    function showObject(item, index) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s mb-1');
        card.setAttribute('id', 'card_' + item.handle);
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.setAttribute('id', 'header_' + item.handle);
        header.textContent = item.handle + ' - ' + item.value;
        card.appendChild(header);
    }

});

