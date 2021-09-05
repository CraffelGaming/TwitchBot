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
        showTopGold(json, 'Top 10 - Reichtum');
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
        showTopExperience(json, 'Top 10 - Erfahrung');
    });

    function showTopGold(heroes, title) {
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

        for (var hero of Object.values(heroes)) {
            let row =  document.createElement("div");
            if(index % 2 == 0)
                row.setAttribute('class', 'row p-2')
            else row.setAttribute('class', 'row p-2 bg-light')
            ++index;
             
            let description = document.createElement("div");
            description.setAttribute('class', 'col-sm')
            description.textContent = hero.name;
            row.appendChild(description);

            let description2 = document.createElement("div");
            description2.setAttribute('class', 'col-sm-auto')
            description2.textContent = hero.gold.toLocaleString('de') + " Gold";
            row.appendChild(description2);

            body.appendChild(row);
        }
    }

    function showTopExperience(heroes, title) {
        let container = document.getElementById("container");
        let index = 0;

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s mt-2');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = title;
        card.appendChild(header);

        let body = document.createElement("div");
        body.setAttribute('class', 'card-body');
        card.appendChild(body);

        for (var hero of Object.values(heroes)) {
            let row =  document.createElement("div");
            if(index % 2 == 0)
                row.setAttribute('class', 'row p-2')
            else row.setAttribute('class', 'row p-2 bg-light')
            ++index;
             
            let heroName = document.createElement("div");
            heroName.setAttribute('class', 'col-sm')
            heroName.textContent = hero.name;
            row.appendChild(heroName);

            getLevel(hero, row)

            let experience = document.createElement("div");
            experience.setAttribute('class', 'col-sm')
            experience.textContent = hero.experience.toLocaleString('de') + " EXP";
            row.appendChild(experience);

            body.appendChild(row);
        }

        function getLevel(hero, row){
            fetch('./api/level/' + hero.experience, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(async function (res) {
                if (res.status == 200) {
                    return res.json();
                }
            }).then(async function (json) {
                let level = document.createElement("div");
                level.setAttribute('class', 'col-sm')
                level.textContent = "Level " + json.handle;
                row.appendChild(level);
            });
        }
    }
});