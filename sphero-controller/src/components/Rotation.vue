<template>
<div class="rotation-container">
    <!-- v-on:click -->
    <tap-to-start ref="start" @started="started"></tap-to-start>
    <svg ref="parent" id="controller-rotation">
        <circle ref="oc" id="outer-circle-rotation" ></circle>
        <circle ref="ic" id="inner-circle-rotation" ></circle>
    </svg>
</div>
</template>
<script>
import TapToStart from './TapToStart'
export default {
    data () {
        return {
            direction: 0,
            frontBack: 0,
            leftRight: 0,
            xPercentage: 0,
            yPercentage: 0,
            startDirection: 0,
            startFrontBack: 0,
            startLeftRight: 0,
            maxDegree: 15,
            svg: null,
            outerCircle: null,
            innerCircle: null
        }
    },
    mounted(){
        window.addEventListener("deviceorientation", this.deviceorientationHandler, false);        
    },
    methods: {
        started: function(start){
            this.tapToStartAction()
        },
        tapToStartAction: function(){
            this.initialize()
            this.$refs.start.$el.addEventListener('transitionend', () => {    
                this.$refs.parent.addEventListener('transitionend', () => {
                    this.svg = new Svg(this.$refs.parent);
                    this.outerCircle = new Circle(this.svg.widthCenter(), this.svg.heightCenter(), this.svg.determineScreenOrientation()*0.7, 'outer-circle-rotation', this.svg, null, this.$refs.oc, this);
                    this.innerCircle = new Circle(this.svg.widthCenter(), this.svg.heightCenter(), this.svg.determineScreenOrientation()*0.3, 'inner-circle-rotation', this.svg, this.outerCircle, this.$refs.ic, this);
                }) 
                this.$refs.start.$el.style.display="none"    
                this.$refs.parent.style.width="100%"
                this.$refs.parent.style.height="100%"
            })
            this.$refs.start.$el.style.visibility= "hidden" 
        }, 
        deviceorientationHandler: function(event){
            this.direction = event.alpha
            this.frontBack = event.beta
            this.leftRight = event.gamma
            if(this.startFrontBack && this.startLeftRight){
                let xPercentage = (this.leftRight - this.startLeftRight) /  this.maxDegree
                let yPercentage = (this.frontBack - this.startFrontBack) / this.maxDegree
                this.xPercentage = xPercentage
                this.yPercentage = yPercentage
                this.innerCircle.updateCoordsPercentage(xPercentage, yPercentage)
            }
        },
        initialize: function(event){
            this.startDirection = this.direction
            this.startFrontBack = this.frontBack
            this.startLeftRight = this.leftRight
        },
        sendVelocity: function(left, right) {
            this.$emit('move-robot', {left, right} )
        }
    },
    name: 'Rotation',
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
        this.originalCx = cx;
        this.originalCy = cy;
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
        circle.id = this.id;
        return circle;
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

    updateCoordsPercentage(cx, cy){
        let x = this.parent.cx + this.parent.r * cx
        let y = this.parent.cy + this.parent.r * cy
        let dist = this.getDistance(x, y);
        let cos = this.getCos(x, y, this.svg.widthCenter(), this.svg.heightCenter())
        let sin = this.getSin(x, y, this.svg.widthCenter(), this.svg.heightCenter())
        if(dist <= this.parent.r){
            window.requestAnimationFrame(this.makeStepForward(x, y));
        } else {
            let maxR = this.parent.r;
            window.requestAnimationFrame(this.makeStepForward(cos*maxR + this.svg.widthCenter(), sin * maxR + this.svg.heightCenter()));
        }
        let ratio = dist/this.parent.r
        if(cos > 0) {
            this.component.sendVelocity((-1)*Math.sign(sin)*ratio, (-1)*sin * ratio)
        } else {
            this.component.sendVelocity((-1)*sin * ratio, (-1)*Math.sign(sin)*ratio)
        }
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
            font-size: 2.5em;
        }
    }
    #controller-rotation{
        // z-index: 2;
        width: 0;
        height: 0;
        transition: all 100ms ease-out;
        #outer-circle-rotation{
            fill: #5F5B6B;
            fill-opacity: .3;
            stroke: #5F5B6B;
            stroke-width: 3;            
        }
        #inner-circle-rotation{
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
