$(() => {

    $(".dropdown-menu").on('click', 'a', function(element){
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
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
        
        document.getElementById("information").classList.remove("d-none");
        document.getElementById("gold").innerText = hero.gold;
        document.getElementById("experience").innerText = hero.experience;
        document.getElementById("name").innerText = hero.name;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        let card = document.createElement("div");
        card.setAttribute('class', 'card custom-card-s mt-2');
        container.appendChild(card);

        let header = document.createElement("h4");
        header.setAttribute('class', 'card-header');
        header.textContent = "Gegenstände";
        card.appendChild(header);

        console.log(hero.loot_inventories);
        for (var inventory of hero.loot_inventories) {
            let row =  document.createElement("div");
            row.setAttribute('class', 'row p-2')
             
            let quantity = document.createElement("div");
            quantity.setAttribute('class', 'col-1')
            quantity.textContent = inventory.quantity + "x";
            row.appendChild(quantity);

            let object = document.createElement("div");
            object.setAttribute('class', 'col-8')
            object.textContent = inventory.loot_object.value;
            row.appendChild(object);

            let value = document.createElement("div");
            value.setAttribute('class', 'col-3 text-right')
            value.textContent = (inventory.loot_object.gold * inventory.quantity) + " Gold";
            row.appendChild(value);

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

