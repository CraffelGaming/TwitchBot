$(() => {
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

    function showHeroes(heroes) {
        for (var hero of Object.values(heroes)) {

        }
    }
});

