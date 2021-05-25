$(() => {
    fetch('./api/object', {
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
        showObject(json, "Gegenstände")
    });

    function showObject(items, title) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = "Schatzkiste";
        card.appendChild(header);

        for (var item of Object.values(items)) {
            let row =  document.createElement("div");
            row.setAttribute('class', 'row p-2')
            
            let index = document.createElement("div");
            index.setAttribute('class', 'col-2')
            index.textContent = item.handle;
            row.appendChild(index);

            let name = document.createElement("div");
            name.setAttribute('class', 'col-8')
            name.textContent = item.value;
            row.appendChild(name);

            let value = document.createElement("div");
            value.setAttribute('class', 'col-2 text-right')
            value.textContent = item.gold + " Gold";
            row.appendChild(value);

            card.appendChild(row);
        }
    }
});

