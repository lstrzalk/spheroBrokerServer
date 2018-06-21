
export default class SpheroService {
    constructor(){
    }
    sendFirstRequest = function(){
        return this.makeRequest('GET', '/spheroController/config');

    }

    makeRequest = function(method, url){
        return new Promise(function(resolve, reject){
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    resolve(xhr.response)
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                      });
                }
            }   
            xhr.onerror = function () {
                reject({
                  status: this.status,
                  statusText: xhr.statusText
                });
            };
            xhr.send()

        })
    }

    sendLastRequest = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/game/end', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({result: 0, group: this.group, nick: this.nick, age: this.age}));
        xhr.onreadystatechange = function() {
           if (xhr.readyState == XMLHttpRequest.DONE) {
              window.location.replace(xhr.responseText);
           }
        }
    }
  }