<template>
<div class="start-screen" @click="tapToStartAction()">
    <svg class ="tap-to-start-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
        <defs>
            <path id="a" d="M0 0h24v24H0V0z"/>
        </defs>
        <clipPath id="b">
            <use xlink:href="#a" overflow="visible"/>
        </clipPath>
        <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" clip-path="url(#b)"/>
    </svg>
    <div class="tap-to-start">tap to start</div>
</div>
</template>
<script>
export default {
    data() {

    },
    methods:{
        tapToStartAction: function(){
            this.$emit('started', true)
        }
    }
}
</script>
<style lang="scss" scoped>
.start-screen{
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #FFF, $alpha: .5);
    transition: all 100ms ease-out;
    .tap-to-start-icon{
        fill: #52154EAA;
        width: 50%; 
        height:50%;
        -webkit-animation: pulsate 2000ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        -webkit-animation-iteration-count: infinite; 
    }
    .tap-to-start{
        color:#5F5B6B;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-size: 2.5em;
    }
}
@-webkit-keyframes pulsate {
    0% { 
        opacity: .7;
    }
    50% { 
        opacity: 1;        
    }
    100% { 
        opacity: .7;
    }
}
</style>