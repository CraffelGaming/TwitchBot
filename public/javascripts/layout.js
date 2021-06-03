$(() => {
    fetch('./api/channel/select', {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(async function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(async function (json) {
        let header = document.getElementById("header");
        header.innerText = json;
    });

    fetch('./api/twitch/url', {
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
            document.getElementById("userName").classList.add("d-none");
            document.getElementById("userNameLabel").classList.add("d-none");
        } else {
            document.getElementById("userName").innerText = json.userName;
            document.getElementById("userName").classList.remove("d-none");
            document.getElementById("userNameLabel").classList.remove("d-none");
        }

        if(!json.userImage){
            document.getElementById("image").classList.add("d-none");
            document.getElementById("imageLabel").classList.add("d-none");
        } else {
            document.getElementById("image").classList.remove("d-none");
            document.getElementById("imageLabel").classList.remove("d-none");
            document.getElementById("image").src = json.userImage;
        }
    });
    
    cookieConsent();
    
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
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

