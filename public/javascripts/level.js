$(() => {
    fetch('./api/level', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        showLevel(json, 'Level');
    });

    function showLevel(levels, title) {
        let container = document.getElementById("container");
        let index = 0;

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = title;
        card.appendChild(header);

        let body = document.createElement("div");
        body.setAttribute('class', 'card-body');
        card.appendChild(body);

        for (var level of Object.values(levels)) {
            
            let row =  document.createElement("div");
            if(index % 2 == 0)
                row.setAttribute('class', 'row p-2')
            else row.setAttribute('class', 'row p-2 bg-light')
            ++index;
            
            let description = document.createElement("div");
            description.setAttribute('class', 'col-2')
            description.textContent = "Level " + level.handle;
            row.appendChild(description);

            let description2 = document.createElement("div");
            description2.setAttribute('class', 'col-10')
            description2.textContent = level.experienceMin.toLocaleString('de') + " Erfahrung";
            row.appendChild(description2);

            body.appendChild(row);
        }
    }
});

