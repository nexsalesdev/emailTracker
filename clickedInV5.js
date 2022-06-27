function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

function getDateTime() {
    var date = new Date();
    return (date.getUTCFullYear() +"-"+ (date.getUTCMonth()+1) +"-"+ date.getUTCDate() +" "+ date.getUTCHours() +":"+ date.getUTCMinutes() +":"+ date.getUTCSeconds());
}


function bindEvents(){
    document.addEventListener('mousemove',sendDate);
    document.addEventListener('touchmove',sendDate);
    document.addEventListener('click',sendDate);
};

function removeEvents(){
    document.removeEventListener('mousemove',sendDate);
    document.removeEventListener('touchmove',sendDate);
    document.removeEventListener('click',sendDate);
    console.error('Binding removed');
};

var myCounter = 0;
var sendDate = function(){
    try{
        if (window.location.search != '' && myCounter < 1){
            myCounter++;
            var data = getQueryParams(window.location.search);
            data["created_at"] = getDateTime();
            //data["isFrame"] = ((window.self === window.top) ? 'Main window' : 'Frame window');
            data["isFrame"] = 'MouseTrigerCode v5'
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                console.log(this.responseText);
                }
            });

            //Getting Flow Url
            var FlowScript = document.querySelectorAll('#mycustTagScript')[0];
            var FlowUrl = FlowScript.getAttribute('data-li');
            
            xhr.open("POST",FlowUrl);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            console.log('Sent');
        }else{
            console.error('No query params found');
        }
        removeEvents();
    }catch(error) {
        console.error('Could not not send request', error);
    }
}

try{
    bindEvents();
}catch(error) {
    console.error('Could not not send request', error);
}