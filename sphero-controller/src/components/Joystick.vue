<template>
<div class="rotation-container">
    <!-- v-on:click -->
    <tap-to-start ref="start" @started="started"></tap-to-start>
    <svg ref="parent" id="controller">
        <circle ref="oc" id="outer-circle" ></circle>
        <circle ref="ic" id="inner-circle" ></circle>
    </svg>
    </div>
</template>
<script>
import TapToStart from './TapToStart'
export default {
    data () {
        return {
            model: null,
            svg: null,
            innerCircle: null,
            outerCircle: null
        }
    },
    mounted() {
    },
    methods:{
        changeColor: function(colorIndex){
            this.pickedColor=colorIndex;
            this.setBackgroundColor()
            this.socket.sendCommand("colors", this.pickedColor)
        },
        started: function(start){
            this.initialize()
        },
        initialize: function(){
            this.$refs.start.$el.addEventListener('transitionend', () => {    
                this.$refs.parent.addEventListener('transitionend', () => {
                this.svg = new Svg(this.$refs.parent)
                this.outerCircle = new Circle(this.svg.widthCenter(), this.svg.heightCenter(), this.svg.determineScreenOrientation()*0.7, 'outer-circle', this.svg, null, this.$refs.oc, this);
                this.innerCircle = new Circle(this.svg.widthCenter(), this.svg.heightCenter(), this.svg.determineScreenOrientation()*0.3, 'inner-circle', this.svg, this.outerCircle, this.$refs.ic, this);
                this.svg.appendNewEventListener("mousemove", this.innerCircle.circleMouseMove, this.innerCircle);
                this.svg.appendNewEventListener("mouseup", this.innerCircle.mouseMoveEnd, this.innerCircle);
            })
            this.$refs.start.$el.style.display="none"    
                this.$refs.parent.style.width="100%"
                this.$refs.parent.style.height="100%"
            })
            this.$refs.start.$el.style.visibility= "hidden" 
        },
        sendVelocity: function(left, right) {
            this.$emit('move-robot', {left, right} )
        }
    },
    name: 'Joystick',
    components: {
        TapToStart
    }
}



class Svg{
    constructor(instance){
        this.instance = instance
    }
    appendNewEventListener(e, callback, binding){
        this.instance.addEventListener(e, callback.bind(binding), false);
    }
    svgWidth(){
        return this.instance.clientWidth;
    }
    svgHeight(){
        return this.instance.clientHeight;
    }
    addElement(element){
        this.instance.appendChild(element);
    }
    heightCenter(){
        return this.svgHeight()/2;
    }
    widthCenter(){
        return this.svgWidth()/2;
    }

    determineScreenOrientation(){
        return this.svgWidth() > this.svgHeight() ? this.heightCenter() : this.widthCenter();
    }
}
class Circle{
    constructor(cx, cy, r, id, svg, parent, instance, component){
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.id = id;
        this.svg = svg;
        this.parent = parent;
        this.offset = window.innerHeight - this.svg.svgHeight();
        this.instance = this.createCircle(instance);
        this.component = component;
    }
    createCircle(instance){
        let circle = instance;
        circle.setAttributeNS(null, "cx", this.cx);
        circle.setAttributeNS(null, "cy", this.cy);
        circle.setAttributeNS(null, "r", this.r);
        if(this.parent){
            this.appendNewEventListener("touchmove", this.circleTouch, circle);
            this.appendNewEventListener("touchend", this.circleTouchEnd, circle);
            this.appendNewEventListener("mousedown", this.circleMouseMoveStart, circle);
            this.appendNewEventListener("mouseup", this.mouseMoveEnd, circle);
            this.appendNewEventListener("mousemove", this.circleMouseMove, circle);
        }
        circle.id = this.id;
        return circle;
    }
    appendNewEventListener(e, callback, circle){
        circle.addEventListener(e, callback.bind(this), false);
    }
    circleMouseClickOrTouched(x, y){
        let dist = this.getDistance(x, y);
        let cos = this.getCos(x, y, this.svg.widthCenter(), this.svg.heightCenter())
        let sin = this.getSin(x, y, this.svg.widthCenter(), this.svg.heightCenter())
        if(dist <= this.parent.r){
            window.requestAnimationFrame(this.makeStepForward(x, y));
        } else {
            dist = this.parent.r
            let maxR = this.parent.r;
            x = cos * maxR + this.svg.widthCenter()
            y = sin * maxR + this.svg.heightCenter()
            window.requestAnimationFrame(this.makeStepForward(cos*maxR + this.svg.widthCenter(), sin * maxR + this.svg.heightCenter()));
        }
        let ratio = dist/this.parent.r
        if(cos > 0) {
            this.component.sendVelocity((-1)*Math.sign(sin)*ratio, (-1)*sin * ratio)
        } else {
            this.component.sendVelocity((-1)*sin * ratio, (-1)*Math.sign(sin)*ratio)
        }
    }
    circleTouch(e){
        this.circleMouseClickOrTouched(e.touches[0].clientX, e.touches[0].clientY - this.offset);
    }
    circleMouseMove(e){
        if(this.enableCircleMove){
            this.circleMouseClickOrTouched(e.x, e.y);            
        }
    }
    circleTouchEnd(e){
        let dist = this.getDistance(this.cx, this.cy);
        while(dist > 0){
            window.requestAnimationFrame(this.makeStepBack(dist));
            dist -= 0.1;
        }
        dist = 0;
        window.requestAnimationFrame(this.makeStepBack(dist));
        this.component.sendVelocity(0, 0)
    }

    mouseMoveEnd(e){
        if(this.enableCircleMove){
            this.circleTouchEnd(e);
            this.enableCircleMove = false;
        }
    }

    circleMouseMoveStart(e){
        this.enableCircleMove = true;
    }
    getDistance(cx, cy){
        let diffX = this.svg.widthCenter() - cx;
        let diffY = this.svg.heightCenter() - cy;
        let distSquare = Math.pow(diffX, 2) + Math.pow(diffY, 2);
        return Math.sqrt( distSquare );
    }
    getCos(x1, y1, x2, y2 ){
        return Math.cos(Math.atan2(y1 - y2, x1 - x2));
    }
    getSin(x1, y1, x2, y2 ){
        return Math.sin(Math.atan2(y1 - y2, x1 - x2));
    }

    makeStepForward(x, y) {
        return function(){
            this.updateCoords(x,y)
        }.bind(this);
    }

    makeStepBack(dist) {
        return function(){
            this.updateCoords((dist * this.getCos(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.widthCenter(),
            (dist * this.getSin(this.cx, this.cy, this.svg.widthCenter(), this.svg.heightCenter())) + this.svg.heightCenter());
        }.bind(this);
    }
    setAttr(attr, value){
        this.instance.setAttributeNS(null, attr, value);
    }
    updateCx(cx){
        this.cx = cx;
        this.setAttr("cx", this.cx);
    }
    updateCy(cy){
        this.cy = cy;
        this.setAttr("cy", this.cy);        
    }
    setR(r){
        this.r = r;
    }
    updateCoords(cx, cy){
        this.updateCx(cx);
        this.updateCy(cy);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.rotation-container{
    width: 100%;
    height: 100%;
    .start-screen{
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        height: 100%;
        // z-index: 3;
        // background-color: #FFFFFF88;
        background-color: rgba($color: #FFF, $alpha: .5);
        transition: all 100ms ease-out;
        // display: none;
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
            font-size: 2.4em;
            height: 3em;
        }
    }
    #controller{
        // z-index: 2;
        width: 0;
        height: 0;
        transition: all 100ms ease-out;
        #outer-circle{
            fill: #5F5B6B;
            fill-opacity: .3;
            stroke: #5F5B6B;
            stroke-width: 3;            
        }
        #inner-circle{
            fill: #52154E;
            fill-opacity: .3;
            stroke: #52154E;
            stroke-width: 2;
        }
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
