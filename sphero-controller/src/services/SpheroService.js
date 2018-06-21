export default class SpheroService {
  constructor(ip, appService){
    const maxSpeed = 100;
    this.id = this.guid();
    this.appService = appService;
    let self = this
    this.commands= {
      move: (extras) => `${self.id}:[= ${ parseInt(extras.left * maxSpeed)}, ${parseInt(extras.right * maxSpeed)}]`,
      start: (extras) => `winner:${extras}`
    }
    // this.socket = new WebSocket('ws://192.168.43.137:38301')
    // this.socket.onmessage = function(msg){
    //   console.log(msg.data)
    // }
  }

  guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  configSocket(ip){
    this.socket = new WebSocket(`ws://${ip}:38301`);
    let self = this;
    this.socket.onopen = function(){
      console.log("connected")
      self.sendCommand('start', self.id)
    }
    this.socket.onmessage = function(msg){
      self.appService.sendLastRequest()
    }
  }

  sendCommand(command, extras){
    this.socket.send(`${this.commands[command](extras)}`)
  }

  // METHOD FOR CHANGE WINNER IN SERVER
  // invitation(){
  // }
}