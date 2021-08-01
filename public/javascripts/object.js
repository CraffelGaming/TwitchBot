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
        showObject(json, "Gegenstände")
    });

    function showObject(items, title) {
        let container = document.getElementById("container");
        let index = 0;

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = "Schatzkiste";
        card.appendChild(header);

        let body = document.createElement("div");
        body.setAttribute('class', 'card-body');
        card.appendChild(body);

        for (var item of Object.values(items)) {
            let row =  document.createElement("div");

            if(index % 2 == 0)
                row.setAttribute('class', 'row p-2')
            else row.setAttribute('class', 'row p-2 bg-light')
            ++index;
            
            let image = document.createElement("img");
            image.setAttribute('class', 'col-1 img-fluid')
            image.src = imagePath(item.handle);
            image.width = 25;
            image.height = 25;
            row.appendChild(image);

            let handle = document.createElement("div");
            handle.setAttribute('class', 'col-2')
            handle.textContent = item.handle;
            row.appendChild(handle);

            let name = document.createElement("div");
            name.setAttribute('class', 'col-sm')
            name.textContent = item.value;
            row.appendChild(name);

            let value = document.createElement("div");
            value.setAttribute('class', 'col-sm-auto')
            value.textContent = item.gold + " Gold";
            row.appendChild(value);

            body.appendChild(row);
        }
    }

    function imagePath(handle){
        return '/images/objects/' + handle  + '.png';
    }
});

