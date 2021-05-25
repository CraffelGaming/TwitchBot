$(() => {
    fetch('./api/statistic/gold', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        console.log('a: ' + res.status);
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        console.log(json);
        showTopGold(json, 'Helden - Reichtum');
    });

    fetch('./api/statistic/experience', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        console.log('a: ' + res.status);
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        console.log(json);
        showTopExperience(json, 'Helden - Erfahrung');
    });

    function showTopGold(heroes, title) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = title;
        card.appendChild(header);

        for (var hero of Object.values(heroes)) {
            let row =  document.createElement("div");
            row.setAttribute('class', 'row p-2')
             
            let description = document.createElement("div");
            description.setAttribute('class', 'col-sm')
            description.textContent = hero.name;
            row.appendChild(description);

            let description2 = document.createElement("div");
            description2.setAttribute('class', 'col-sm')
            description2.textContent = hero.gold + " Gold";
            row.appendChild(description2);

            card.appendChild(row);
        }
    }

    function showTopExperience(heroes, title) {
        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s mt-2');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = title;
        card.appendChild(header);

        for (var hero of Object.values(heroes)) {
            let row =  document.createElement("div");
            row.setAttribute('class', 'row p-2')
             
            let description = document.createElement("div");
            description.setAttribute('class', 'col-sm')
            description.textContent = hero.name;
            row.appendChild(description);

            let description2 = document.createElement("div");
            description2.setAttribute('class', 'col-sm')
            description2.textContent = hero.experience + " EXP";
            row.appendChild(description2);

            card.appendChild(row);
        }
    }
});

