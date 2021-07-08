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
             
            if(getCookie('userName') == hero.name){
                let switch_group = document.createElement("div");
                switch_group.setAttribute('class', 'col-1 form-check form-switch');
                
                let switches = document.createElement("input");
                switches.setAttribute('class', 'form-check-input');
                switches.setAttribute('type', 'checkbox');

                let switch_label = document.createElement("label");
                switch_label.setAttribute('class', 'form-check-label');
                switch_label.setAttribute('type', 'checkbox');

                switch_group.appendChild(switches);
                switch_group.appendChild(switch_label);
                row.appendChild(switch_group);

                let amount = document.createElement("input");
                amount.setAttribute('class', 'col-1');
                amount.setAttribute('type', 'number');
                amount.setAttribute('value', inventory.quantity);
                amount.setAttribute('min', 1);
                amount.setAttribute('max', inventory.quantity);
                amount.setAttribute('step', 1);
                row.appendChild(amount);
            }

            let quantity = document.createElement("div");
            quantity.setAttribute('class', 'col-1');
            quantity.textContent = inventory.quantity + "x";
            row.appendChild(quantity);

            let object = document.createElement("div");
            object.setAttribute('class', 'col-6')
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
                let a = document.createElement("a");
                a.setAttribute('class', 'dropdown-item');
                a.setAttribute('id', hero.handle);
                a.href = '#';

                a.innerText = hero.name;
                a.val = hero.handle;

                list.appendChild(document.createElement("li"));
                list.appendChild(a);

                if(getCookie('userName') == hero.name)
                    getHero(hero.handle);
            }
        }
    }
});

