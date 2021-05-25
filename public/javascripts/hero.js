$(() => {

    $(".dropdown-menu").on('click', 'a', function(element){
        fetch('./api/hero/' + element.currentTarget.id, {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            showHero(json[0]);
        });
     });

    fetch('./api/hero', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        showHeroes(json);
    });

    function showHero(hero) {
        let container = document.getElementById("hero");

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s mt-2');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = hero.name;
        card.appendChild(header);

        console.log(hero.loot_inventories);
        for (var inventory of hero.loot_inventories) {
            let row =  document.createElement("div");
            row.setAttribute('class', 'row p-2')
             
            let description = document.createElement("div");
            description.setAttribute('class', 'col-sm')
            description.textContent = inventory.quantity + "x";
            row.appendChild(description);

            let description2 = document.createElement("div");
            description2.setAttribute('class', 'col-sm')
            description2.textContent = inventory.loot_object.value;
            row.appendChild(description2);

            card.appendChild(row);
        }
    }

    function showHeroes(heroes) {
        let list = document.getElementById("list");
        if(list){
            for (var hero of Object.values(heroes)) {
                let element = document.createElement("a");
                element.setAttribute('class', 'dropdown-item');
                element.setAttribute('id', hero.handle);
                element.href = '#';
                element.innerText = hero.name;
                element.val = hero.handle;
                list.appendChild(element);
            }
        }
    }
});

