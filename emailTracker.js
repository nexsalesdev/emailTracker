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

try{
    if (window.location.search != ''){
        var data = getQueryParams(window.location.search);
        data["created_at"] = getDateTime();
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
            console.log(this.responseText);
            }
        });
        xhr.open("POST", "https://prod-27.centralindia.logic.azure.com:443/workflows/bbcce5d5118a41819d30c483a7d271b6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RjMcAmNZELvRuFORWlby9g0oADwxmklVxmb6kNm6mhQ");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else{
        console.error('No query params found');
    }
}catch(error) {
    console.error('Could not not send request', error);
}