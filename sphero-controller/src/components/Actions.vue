<template>
<div class="center">
    <v-btn color="error" @click="sendVelocity(0,0)">STOP</v-btn>
</div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    mounted() {
    },
    methods:{
        sendVelocity: function(left, right) {
            this.$emit('move-robot', {left, right} )
        }
    },
    name: 'Actions',
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.center{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
}
</style>
