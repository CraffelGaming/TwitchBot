$(() => {

    getCommands();
    getSay();

    function getCommands() {
        fetch('./api/module', {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            for (var module of Object.values(json)) {
                getCommand(module); 
            }

            let say = document.getElementById("containerSay");

            let h1  = document.createElement("div");
            h1.setAttribute('class', 'mb-2');
            h1.innerHTML = "<b> Alle folgenden Befehle besitzen folgende Funktionen <b/>";
            say.appendChild(h1);

            let h2  = document.createElement("div");
            h2.setAttribute('class', 'mb-2');
            h2.innerHTML = "!<modulname>intervall:zahl um den Interval festzulegen (Beispiel: !testinterval:10 setzt den Interval für das Modul test auf 10 Minuten).";
            say.appendChild(h2);

            let h3  = document.createElement("div");
            h3.setAttribute('class', 'mb-2');
            h3.innerHTML = "!<modulname>start und !<modulname>start um das Modul zu starten bzw. beenden (Beispiel: !teststart startet Modul test).";
            say.appendChild(h3);

            let h4  = document.createElement("div");
            h4.setAttribute('class', 'mb-2');
            h4.innerHTML = "!<modulname>text um den Test des Moduls zu ändern (Beispiel: !test:Hallo setzt den Text für das Modul test auf Hallo).";
            say.appendChild(h4);

            let h5  = document.createElement("div");
            h5.setAttribute('class', 'mb-2');
            h5.innerHTML = "<br/>";
            say.appendChild(h5);
        });
    }

    function getCommand(module) {
        fetch('./api/command/' + module.name, {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            if(json.length > 0){  
                showCommand(module, json)
            }
        });
    }

    function showCommand(module, commands){
        let container = document.getElementById("container");

        let accordion = document.createElement("div");
        accordion.setAttribute('class', 'accordion-item');
        container.appendChild(accordion);

        let header = document.createElement("h2");
        header.setAttribute('class', 'accordion-header ');
        header.id = 'panelsStayOpen-heading' + module.name;
        accordion.appendChild(header);

        let button = document.createElement("button");
        button.setAttribute('class', 'accordion-button bg-light');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', '#' + 'panelsStayOpen-collapse' + module.name);
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-controls', 'panelsStayOpen-collapse' + module.name);
        button.innerHTML = module.displayName;
        header.appendChild(button);

        let panel = document.createElement("div");
        panel.setAttribute('class', 'accordion-collapse.collapse show');
        panel.setAttribute('aria-labelledby', 'panelsStayOpen-heading' + module.name);
        panel.id = 'panelsStayOpen-collapse' + module.name;
        accordion.appendChild(panel);

        let body = document.createElement("div");
        body.setAttribute('class', 'accordion-body');
        panel.appendChild(body);

        let description  = document.createElement("div");
        description.setAttribute('class', 'mb-2');
        description.innerHTML = "<b>" + module.description + "</b>";
        body.appendChild(description);

        for (var command of Object.values(commands)) {

            let row  = document.createElement("div");
            row.setAttribute('class', 'row');
            body.appendChild(row);

            let column1  = document.createElement("div");
            column1.setAttribute('class', 'col-md-2 col-sm-4');
            column1.innerHTML = "<b>" + command.command + "</b>";
            row.appendChild(column1);

            let column2  = document.createElement("div");
            column2.setAttribute('class', 'col-md-10 col-sm-8');
            column2.textContent = command.description;
            row.appendChild(column2);
        }
    }

    function getSay() {
        fetch('./api/command/dynamic/say', {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            for (var say of Object.values(json)) {
                showSay(say); 
            }
        });
    }

    function showSay(say){
        let container = document.getElementById("containerSay");

        let group = document.createElement("div");
        group.setAttribute('class', 'input-group mb-1');
        container.appendChild(group);

        let span = document.createElement("span");
        span.setAttribute('class', 'input-group-text');
        span.textContent = say.command;
        group.appendChild(span);

        let input = document.createElement("input");
        input.setAttribute('class', 'form-control bg-light');
        input.setAttribute('type', 'text');
        input.setAttribute('disabled', 'disabled');
        input.value = say.text;
        group.appendChild(input);

        let a = document.createElement("span");
        a.setAttribute('class', 'input-group-text');

        if(say.minutes > 0)
            a.textContent = say.minutes + " Minuten";
        else a.textContent = "manuell";
        group.appendChild(a);

        let groupCheck = document.createElement("div");
        groupCheck.setAttribute('class', 'input-group-text');
        group.appendChild(groupCheck);

        let check = document.createElement("input");
        check.setAttribute('class', 'form-check-input.mt-0 checked');
        check.setAttribute('type', 'checkbox');
        input.setAttribute('readonly', 'readonly');

        if(say.isActive)
            check.setAttribute('checked', 'checked');

        groupCheck.appendChild(check);

        console.log(say);
    }
});

