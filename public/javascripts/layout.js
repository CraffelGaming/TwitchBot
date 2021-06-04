$(() => {
    var url = './api/channel/select';
    var method = 'get';

    if(getCookie('channelName')){
        url += '?channel=' + window.btoa(getCookie('channelName'));
        method = 'post';
    }

    setChannel(url, method);

    function getURL(){
        fetch('./api/twitch', {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            let twitch = document.getElementById("twitch");
            twitch.href = json.url;
    
            if(!json.userName) {
                document.getElementById("account").classList.add("d-none");
                document.getElementById("activate").removeEventListener("click", activateAccount, true);
            } else {
                if(getCookie('allowCookies'))
                    setCookie('userName', json.userName, 7); 
                document.getElementById("account").classList.remove("d-none");
                document.getElementById("userName").value = json.userName;

                document.getElementById("activate").addEventListener("click", activateAccount);
            }
        });
    }

    function activateAccount(){
        fetch('./api/channel/', {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            document.getElementById("activate").classList.add('btn-secondary');
            document.getElementById("activate").classList.remove('btn-success');
        });
    }

    function setChannel(url, method){
        fetch(url, {
            method: method,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(async function (json) {
            let header = document.getElementById("header");
            header.value = json;

            if(getCookie('allowCookies'))
                setCookie('channelName', json, 7);
            getURL();
        });
    }

    cookieConsent();
    
    function cookieConsent() {
        if (!getCookie('allowCookies')) {
            $('.toast').toast('show')
        } else document.getElementById("toastBody").classList.add("d-none");
    }

    document.getElementById("btnDeny").addEventListener("click", function() {
        eraseCookie('allowCookies')
        $('.toast').toast('hide')
      });

    document.getElementById("btnAccept").addEventListener("click", function() {
        setCookie('allowCookies','1',7);
        $('.toast').toast('hide');
    });
});