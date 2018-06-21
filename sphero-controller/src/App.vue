<template>
  <v-app >
    <v-toolbar :dark="true" tabs>
      <v-toolbar-title>Sphero Controller</v-toolbar-title>
      <v-tabs v-model="model" slot="extension" grow>
        <v-tab :href="'#joystick'">Joystick</v-tab>
        <v-tab :href="'#rotation'">Rotation</v-tab>
        <!-- <v-tab :href="'#colors'">Colors</v-tab> -->
        <v-tab :href="'#actions'">Actions</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items :class="'tabs'" v-model="model">
      <v-tab-item :class="'tab'" :id="'joystick'">
        <joystick @move-robot="moveRobot"></joystick>
      </v-tab-item>
      <v-tab-item :class="'tab'" :id="'rotation'">
        <rotation @move-robot="moveRobot"></rotation>
      </v-tab-item>
      <!-- <v-tab-item :class="'tab'" :id="'colors'">
        <colors></colors>
      </v-tab-item> -->
      <v-tab-item :class="'tab'" :id="'actions'">
        <actions @move-robot="moveRobot"></actions>
      </v-tab-item>
    </v-tabs-items>

    <v-footer :fixed="true" :dark="true" app>
      <span>&copy; 2018</span>
      <v-spacer></v-spacer>
      <span>Łukasz Strzałka</span>
    </v-footer>
    <socket-service></socket-service>    
  </v-app>
</template>

<script>
import Rotation from './components/Rotation'
import Joystick from './components/Joystick'
import Colors from './components/Colors'
import Actions from './components/Actions'
import AppService from './services/AppService'
import SpheroService from './services/SpheroService'

export default {
  data () {
    return {
      model: null,
      serverApp: new AppService(),
      spheroService: new SpheroService(),
      setWinner: false
    }
  },
  mounted() {
    let self = this
    this.serverApp.sendFirstRequest().then(function(res){
        let data = JSON.parse(res)
        console.log(data)
        self.serverApp.group = res.group
        self.serverApp.nick = res.nick
        self.serverApp.age = res.age
        self.spheroService.configSocket(data.ip)
      })
  },
  methods: {
    moveRobot: function(xy){
      this.spheroService.sendCommand('move', xy)
    },
    changeComponent: function(){
      console.log("change")
    }
  },
  name: 'App',
  components: {
    Rotation,
    Joystick,
    Colors,
    Actions
  }
}
</script>

<style lang="scss" scoped>
  .tabs{
    height: 100%;
    width: 100%;
    .tab{
      height: 100%;
      width: 100%;
    }
  }
</style>
