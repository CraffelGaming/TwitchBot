$(() => {
    getHeros();

    $(".dropdown-menu").on('click', 'a', function(element){
        getHero(element.currentTarget.id)
    });

    function getHeros(){
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
    }

    function getHero(heroName){
        fetch('./api/hero/' + heroName, {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            getLevel(json);
        });
    }

    function getLevel(hero){
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
            showHero(hero, json);
        });
    }
    function showHero(hero, level) {
        let container = document.getElementById("hero");

        document.getElementById("information").classList.remove("d-none");
        document.getElementById("gold").innerText = hero.gold;
        document.getElementById("level").innerText = level.handle;
        document.getElementById("experience").innerText = hero.experience;
        document.getElementById("name").innerText = hero.name;
        document.getElementById("goldMultipler").innerText = hero.goldMultipler + 'x';
        document.getElementById("stealMultipler").innerText = hero.stealMultipler + 'x';
        document.getElementById("defenceMultipler").innerText = hero.defenceMultipler + 'x';

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
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

            container.appendChild(row);
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

                if(getCookie('userName') == hero.name)
                    getHero(hero.handle);
            }
        }
    }
});

