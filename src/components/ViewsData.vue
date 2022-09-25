<template>
  <div class="blank">
    <!-- <div id="aaa" ref="bbb">aaaaaa</div> -->

    <p class="header-name" style="left: 80px; top: -5px"> <img src="../assets/original.png" style="width: 269px" /> </p>
    <p class="animal-name">{{ $route.params.animalName }}</p>

    <div class="main-box" id="main-box">

      <div class="click-box" id="click-box" ref="click">
        <div class="img-box">
          <img :src="imgLoad()" class="pic-size" />
        </div>
      </div>

      <div id="drawLine" class="drawLine-box" ></div>

      <button class="prev" @click="prevImg()">&#10094;</button>
      <button class="next" @click="nextImg()">&#10095;</button>

      <div class="showNumberOfImage">{{ this.indexImg + 1 }}/{{ this.imgLength }}</div>
    </div>
    
    
    <div class="descriptionBox">
      <p>Thai Name : {{ this.animaldata.animal.thaiName}}</p>
      <p class="englishName">English Name : {{this.animaldata.animal.englishName}}</p>
      <p>Science Name : {{this.animaldata.animal.scienceName}}</p>
      <p class="technicalTerm">Technical Term : {{this.animaldata.animal.technicalTerm}}</p>
      <p>Description : {{this.animaldata.animal.description}}</p>
    </div>
    

    <!-- <p class="description">description : {{this.animaldata.animal.description}}</p> -->
  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm";
import draggable from "vuedraggable";
import Router from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(Router);
Vue.use(VueSimpleAlert);
Vue.use(VueAxios, axios);

// window.onload = function() {
//    setTimeout(loadAfterTime, 2000)
// }; 
// function loadAfterTime(){
//   console.log("Load after delay 2s")
//   // this.element = document.getElementById("click-box")
//   // console.log("element : ",this.element)
//   // this.loadTag()

// }

export default {
  name: "viewdata",
  components: {
  },
  data: () => {
    return {
      id: null,
      firstPut: [],
      dataGet: [],
      animaldata: [],
      imgLoadList: [],
      imgLength: null,
      animalName:'',
      thaiName:'',
      englishName:'',
      scienceName:'',
      technicalTerm:'',
      des:'',
      dup: [],
      description: [{ descriptionMain: "" }],
      show: true,
      x: 100,
      y: 200,
      height: 100,
      addList: [],
      createList: [],
      indexImg: 0,
      element:'',
      millisecond:0,
    };
  },
  methods: {
    axis(event) {
      const x = event.x;
      const y = event.y;
      // console.log(e.screenX)
      var a = document.getElementById("click-box").getBoundingClientRect();
      // var a = document.getElementById("box2").getBoundingClientRect();
      // console.log(a.left);
      // console.log(a.top);
      var scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
      //เอาค่าจากViewport(นับจากหน้าจอ)มา - position ของ element แม่มัน แล้วมาลบกับค่าเลื่อนscroll เม้าเพื่อเวลาเลื่อน แม้กด ก็จะไม่เพี้ยน
      this.$data.x = x - a.left - scrollX;
      this.$data.y = y - a.top - scrollY;
      // console.log(this.$data.x);
      // console.log(this.$data.y);
      // console.log("a.left = " + a.left);
      // console.log("a.top = " + a.top);
      return { x: x - a.left - scrollX, y: y - a.top - scrollY };
      // this.$data.posAndBox.push({x:((x - a.left-scrollX)),y:((y - a.top-scrollY)-20),map:''})
      
    },
    // <p style="margin-bottom: 0px;margin-top: 0px;">Draggable 0</p>
    addDragBox(event, titleDefault = "drop data here") {
      // var idCheckDup = `${event.x}${Math.ceil(event.y)}P${this.indexImg}`;
      // if (document.getElementById(idCheckDup) == null) {
        var xCal = "";
        var yCal = "";
        var Q = "";
        if (this.x >= 390 && this.y <= 210) {
          //Q2
          // console.log("Q2")
          xCal = event.x + 62;
          yCal = event.y - 50;
          Q = 2;
          // console.log("x: "+xCal)
          // console.log("Y: "+yCal)
        }
        if (this.x < 390 && this.y <= 210) {
          //Q1
          // console.log("Q1")
          // (13 - this.createList[0].title.length) * 8;
          // - 62 - 125;
          xCal = event.x - 62 - 117 + (13 - titleDefault.length) * 8;
          xCal -=15;
          yCal = event.y - 50 - 25;
          Q = 1;
          // console.log("x: "+xCal)
          // console.log("Y: "+yCal)
        } else if (this.x >= 390 && this.y > 210) {
          //Q3
          // console.log("Q3")
          xCal = event.x + 60;
          yCal = event.y + 48;
          Q = 3;
          // console.log("x: "+xCal)
          // console.log("Y: "+yCal)
        } else if (this.x < 390 && this.y > 210) {
          //Q4
          // console.log("Q4")
          // - 62 - 125;
          xCal = event.x - 62 - 117 + (13 - titleDefault.length) * 8;
          yCal = event.y + 50;
          Q = 4;
          // console.log("x: "+xCal)
          // console.log("Y: "+yCal)
        }

        console.log("addList count : "+this.addList.length)
        console.log("check dup");
        for (let i = 0; i < this.addList.length; i++) {
          // console.log(this.addList[i]);
          // console.log(this.addList.length);
          if (document.getElementById(this.addList[i].id)!=null) {
            if(Math.abs(this.addList[i].y - event.y) < 71 && Math.abs(this.addList[i].x - event.x) < 10){ // ตรง71 คือ รัศมีรอบๆจุดที่กด
              console.log("<");
              if (this.addList[i].y> event.y) {yCal = yCal-(25);}
              else{yCal = yCal+(25);}
            }

          }
        }

        const app = new Vue({
          template: `
          <div id="${event.x}${Math.ceil(event.y)}${
            this.indexImg
          }" v-show="show" :style="dragCreate" @drop="onDrop($event);" @dragover.prevent @dragenter.prevent >
            {{this.createList[0].title}}
            <button :style="deleteIcon"></button>
          </div>
          `,
          data: {
            Q: Q,
            id: `${event.x}${Math.ceil(event.y)}${this.indexImg}`,
            axis: { x: xCal, y: yCal },
            refAxis: { x: xCal, y: yCal },
            createList: [{ id: 0, title: titleDefault }],
            dragCreate: {
              "min-width": "25px",
              "min-height": "15px",
              // width: "25px",
              // height: "auto",
              // border: "1px solid green",
              "background-color": "whitesmoke",
              position: "absolute",
              top: yCal + "px",
              left: xCal + "px",
              border: "2.5px solid red",
              "padding-left": "10px",
              "z-index": 3,
            },
            deleteIcon: {
              "background-color": "white",
              border: "unset",
              // "min-width": "25px",
              // "position": "absolute",
              // "z-index": 2,
            },
            show: true,
            function() {
              return this.createList[0].title;
            },
          },
          methods: {
            onDrop(evt) {
              const itemTitle = evt.dataTransfer.getData("itemTitle");
              this.createList[0] = { title: itemTitle };

              if (this.Q == 1 || this.Q == 4) {
                var yNew = (13 - this.createList[0].title.length) * 8;
                if (this.createList[0].title.length > 13) {
                  yNew = yNew + (this.createList[0].title.length - 13) * 5;
                }
                // if (this.createList[0].title.length>13 && this.Q==4) {
                //   yNew = yNew + (this.createList[0].title.length - 13 )*5
                // }
                this.axis.x = yNew + this.refAxis.x;
                this.dragCreate.left = String(yNew + this.refAxis.x) + "px";
              }
              // console.log(yNew)
              // console.log(this.axis.x )

              // console.log(this.createList[0].title.length);
              app.$mount();
            },
          },
          components: { draggable },
        });

        // const stat = document.getElementById("box2");
        // console.log(document.getElementById("main-box"));
        const stat = document.getElementById('click-box');
        if(stat == null){
          console.log("------------------------")
          console.log("stat is Null !!!!")
          // console.log(stat)
          // console.log(document.getElementById("click"))
          console.log("------------------------")
        }
        // console.log("stat : ");
        // console.log(stat);
        let vueContainer = document.createElement("span");
        stat.appendChild(vueContainer);
        app.$mount(vueContainer);

        /**************************************************************************/
        // this.$nextTick(console.log("nextTick2 is run "));
        this.addList.push({
          id: `${event.x}${Math.ceil(event.y)}${this.indexImg}`,
          x: event.x,
          y: event.y,
          name: titleDefault,
          pic: this.indexImg,
        });

        let _this = this;
        _this.drawLine(xCal,yCal);
      // } //END IF CHECK DUP ID
      // else {
      //   console.log("Duplicate Id!!!!");
      // }

      // console.log("element is")
      // var check = document.getElementById(`${event.x + Math.ceil(event.y)}P${this.indexImg}`);
      // console.log(check.__vue__.axis)
      // console.log("load addlist")
      // console.log(this.addList)
      // console.log(event.y)
      // console.log(event.x)
      /**************************************************************************/
    },
    imgLoad() {
      // console.log("this.$data.indexImg :"+this.$data.indexImg)
      // console.log('img load is run')
      // console.log(document.getElementById('click-box'))
      return this.imgLoadList[this.$data.indexImg];
      // return `http://localhost:3000/img/animals/img-1616772200490.jpeg`
    },
    nextImg() {
      this.$data.indexImg = (this.$data.indexImg + 1) % this.imgLength; //17; //เดี๋ยวรอนับจนรูปแล้วเอามา mod
      // console.log("value index is " + this.$data.indexImg);
      if(this.animalName =="Arapaima"){
        console.log("name : ",this.animalName)
        console.log("set milisecond")
        this.millisecond = 100;
      }
      else{
        this.millisecond = 0;
      }
      
      setTimeout(() => {
      // console.log("aaaaaaa"),
      // console.log("bbb")
      

      for (let i = 0; i < this.addList.length; i++) {
        //hide ก่อนแล้วค่อยเปลี่ยนรูป this.addList[i].pic == this.indexImg &&
        if (
          this.addList[i].pic == this.indexImg &&
          document.getElementById(this.addList[i].id) != null
        ) {
          document.getElementById(this.addList[i].id).__vue__.show = true;
          // console.log(document.getElementById(this.addList[i].id+"-Line"))
          document.getElementById(this.addList[i].id + "L").__vue__.show = true;
          // console.log(this.addList[i].id+"-Line is True")
        } else if (
          this.addList[i].pic != this.indexImg &&
          document.getElementById(this.addList[i].id) != null
        ) {
          document.getElementById(this.addList[i].id).__vue__.show = false;
          document.getElementById(
            this.addList[i].id + "L"
          ).__vue__.show = false;
        }
      }

      }, this.millisecond);
      /*
      for (let i = 0; i < this.addList.length; i++) {
        const element = this.addList[i];
        // console.log(element.id)
        // console.log(document.getElementById(element.id).__vue__.createList[0])
        this.addList[i].name = document.getElementById(
          element.id
        ).__vue__.createList[0].title;
        // document.getElementById(element.id).__vue__.show=false
      }
      console.log(this.addList);*/
    },
    prevImg() {
      if (this.$data.indexImg == 0) {
        this.$data.indexImg = this.$data.indexImg + (this.imgLength - 1); //16; //เดี๋ยวรอนับจนทั้งหมดแล้วมาบวกกับ -1
      } else {
        this.$data.indexImg = this.$data.indexImg - 1; //เดี๋ยวรอนับจนรูปแล้วเอามา mod
      }
      // console.log("value index is " + this.$data.indexImg);
      if(this.animalName =="Arapaima"){
        console.log("name : ",this.animalName)
        console.log("set milisecond")
        this.millisecond = 100;
      }
      else{
        this.millisecond = 0;
      }
      
      setTimeout(() => {

      for (let i = 0; i < this.addList.length; i++) {
        if (
          this.addList[i].pic == this.indexImg &&
          document.getElementById(this.addList[i].id) != null
        ) {
          document.getElementById(this.addList[i].id).__vue__.show = true;
          document.getElementById(this.addList[i].id + "L").__vue__.show = true;
        } else if (
          this.addList[i].pic != this.indexImg &&
          document.getElementById(this.addList[i].id) != null
        ) {
          document.getElementById(this.addList[i].id).__vue__.show = false;
          document.getElementById(
            this.addList[i].id + "L"
          ).__vue__.show = false;
        }
        // {
        //   document.getElementById(this.addList[i].id).__vue__.show = false;
        //   document.getElementById(this.addList[i].id+"-Line").__vue__.show = false;
        // }
      }


      }, this.millisecond);
      // console.log("value index is " + this.$data.indexImg);

      // for (let i = 0; i < this.addList.length; i++) {
      //   const element = this.addList[i];
      //   // console.log(element.id)
      //   // console.log(document.getElementById(element.id).__vue__.createList[0])
      //   this.addList[i].name=document.getElementById(element.id).__vue__.createList[0].title
      // }
      // console.log(this.addList)
    },
    drawLine(xCal,yCal) {
      // console.log(xCal);
      // console.log(yCal);
      // console.log("x is "+Math.abs(this.x-xCal));
      // console.log("y is "+Math.abs(this.y-yCal));
      // console.log("sum is "+Math.sqrt(Math.pow(Math.abs(this.x-xCal),2)   +  Math.pow(Math.abs(this.y-yCal),2))              );
      // console.log("deg is "+ Math.atan2(Math.abs(this.y-yCal),Math.abs(this.x-xCal) ) *180 / Math.PI    );
      var testsum = Math.pow(62, 2) + Math.pow(50, 2);
      var deg = "";
      var xDragto = "";
      var yDragto = "";
      var xDistance="";
      var yDistance="";

      if (this.x >= 390 && this.y <= 210) {
        //Q2
        // console.log("Q2")
        // deg=-(20/Math.sqrt(testsum))*100
        // deg = -25;
        deg = (Math.atan2(Math.abs(this.y-yCal),Math.abs(this.x-xCal) ) *180 / Math.PI);
        if (yCal<this.y) { deg = deg*(-1);}
        // xDragto = this.x + 62;
        xDragto = xCal;
        // yDragto = this.y - 31;
        yDragto = yCal;
        testsum = Math.pow(Math.abs(this.x-xCal),2)   +  Math.pow(Math.abs(this.y-yCal),2);
        
      } else if (this.x < 390 && this.y <= 210) {
        //Q1
        // console.log("Q1")
        // deg = -135;
        // console.log(xCal);
        // console.log(yCal);
        console.log(`${this.x}${Math.ceil(this.y)}${this.indexImg}`);

        //xDistance = this.x - (xCal+15+(letter*8.5) ) => 15 is mean size of delete button
        xDistance =Math.abs(this.x-(xCal+5+document.getElementById(`${this.x}${Math.ceil(this.y)}${this.indexImg}`).__vue__._data.createList[0].title.length*8.5));
        yDistance =Math.abs(this.y-(yCal+25) );
        // console.log((Math.atan2(yDistance,xDistance)*180/Math.PI)); //deg
        // console.log("----------------------------");
        deg = (Math.atan2(yDistance,xDistance)*180/Math.PI)+180;
        if (yCal>=this.y) {deg = 180-(Math.atan2(yDistance,xDistance)*180/Math.PI);}
        // console.log(deg);
        //console.log(this.x+" - "+(xCal+15+document.getElementById(`${this.x}${Math.ceil(this.y)}${this.indexImg}`).__vue__._data.createList[0].title.length*8.5)+" = "+xDistance);
        //console.log(yDistance);
        // console.log(Math.pow(xDistance,2)   +  Math.pow(yDistance,2)   );
        testsum = (Math.pow(xDistance,2)   +  Math.pow(yDistance,2));
        
        // xDragto = this.x - 55;
        xDragto = xCal;
        // console.log("XDragto : " + xDragto)
        // yDragto = this.y - 51.4;
        yDragto= yCal;
        // console.log("YDragto : " + yDragto)
      } else if (this.x >= 390 && this.y > 210) {
        //Q3
        // console.log("Q3")
        // deg = 37;
        deg = Math.atan2(Math.abs(this.y-yCal),Math.abs(this.x-xCal) ) *180 / Math.PI;
        // xDragto = this.x + 60;
        xDragto = xCal;
        // yDragto = this.y + 48;
        // console.log(dragto);
        yDragto = yCal;
        testsum = Math.pow(Math.abs(this.x-xCal),2)   +  Math.pow(Math.abs(this.y-yCal),2);
        
      } else if (this.x < 390 && this.y > 210) {
        //Q4
        // console.log("Q4")
        // deg = 135;
        xDistance =Math.abs(this.x-(xCal+5+document.getElementById(`${this.x}${Math.ceil(this.y)}${this.indexImg}`).__vue__._data.createList[0].title.length*8.5));
        yDistance =Math.abs(this.y-yCal );
        deg= (180-Math.atan2(yDistance,xDistance)*180/Math.PI);
        if (yCal<=this.y) {deg = 180+(Math.atan2(yDistance,xDistance)*180/Math.PI);}
        testsum = (Math.pow(xDistance,2)   +  Math.pow(yDistance,2));
        
        //xDragto = this.x + 53;//  +53
        xDragto = xCal;
        //yDragto = this.y - 52;//  -52
        yDragto = yCal;
      }

      // console.log("width is "+Math.sqrt(testsum))
      // var deg=20/Math.sqrt(testsum)
      // console.log(deg)
      // console.log(Math.asin(deg)*100)
      //`${event.x}${Math.ceil(event.y)}P${this.indexImg}`
      const app = new Vue({
        template: `
        <div id=${this.x}${Math.ceil(this.y)}${
          this.indexImg
        }L v-show="show" :style="drawLine">
        </div>
        `,
        data: {
          to: { x: xDragto, y: yDragto },
          start: { x: this.x, y: this.y },
          drawLine: {
            position: "absolute",
            "min-width": "25px",
            width: Math.sqrt(testsum) + "px",
            "border-top": "1px solid red",
            // "width":"40px",
            transform: `rotate(${deg}deg)`,
            "transform-origin": "0% 0%",
            top: this.y + "px",
            left: this.x + "px",
            "z-index": 3,
          },
          show: true,
        },
      });
      const stat = document.getElementById("drawLine");
      let vueContainer = document.createElement("div");
      stat.appendChild(vueContainer);
      app.$mount(vueContainer);

      // this.$nextTick(console.log("add Line is run "));
    },
    loadTag() {
      //First time load tag
      let _this = this;
      this.x = 0;
      this.y = 0;

      // var testload = {x:500, y:200}
      // this.x=testload.x
      // this.y=testload.y
      // _this.addDragBox(testload)
      // _this.drawLine()

      // this.indexImg
      // console.log(document.getElementById("main-box"));
      console.log("load tag!")
      // console.log(this.dataGet)
      for (let i = 0; i < this.dataGet[0].data.length; i++) {
        //วนตาม จน รูป
        for (let j = 0; j < this.dataGet[0].data[i].coordinator.length; j++) {
          //วนตาม จน tag
          // console.log("i is "+i)
          // console.log("j is "+j)
          // console.log(this.dataGet[0].data[i].coordinator[j])

          // var load={x:this.dataGet[0].data[i].coordinator[j].lineStartX, y:this.dataGet[0].data[i].coordinator[j].lineStartY}
          // this.x=load.x
          // this.y=load.y

          // console.log("imageName is ")
          // console.log(this.dataGet[0].data[i].imageName)
          // console.log("index of ")
          // console.log(this.dataGet[0].animal.completeImagePath.indexOf(this.dataGet[0].data[i].imageName))
          this.firstPut.push({
            pic: this.dataGet[0].animal.completeImagePath.indexOf(this.dataGet[0].data[i].imageName), 
            //`${event.x}${Math.ceil(event.y)}${this.indexImg}`
            id:
              `${this.dataGet[0].data[i].coordinator[j].lineStartX}${Math.ceil(this.dataGet[0].data[i].coordinator[j].lineStartY)}${this.dataGet[0].animal.completeImagePath.indexOf(this.dataGet[0].data[i].imageName)}`,
            title: this.dataGet[0].data[i].coordinator[j].title,
            positionX: this.dataGet[0].data[i].coordinator[j].positionX,
            positionY: this.dataGet[0].data[i].coordinator[j].positionY,
            lineStartX: this.dataGet[0].data[i].coordinator[j].lineStartX,
            lineStartY: this.dataGet[0].data[i].coordinator[j].lineStartY,
            lineToX: this.dataGet[0].data[i].coordinator[j].lineToX,
            lineToY: this.dataGet[0].data[i].coordinator[j].lineToY,
          });
          //  pic: element.pic,
          //   id: id,
          //   title: title,
          //   positionX: trackPosition.x,
          //   positionY: trackPosition.y,
          //   lineStartX: start.x,
          //   lineStartY: start.y,
          //   lineToX: to.x,
          //   LineToY: to.y,
        }
      }
      console.log("firstput")
      console.log(this.firstPut)
      // console.log(this.firstPut.length)
      for (let k = 0; k < this.firstPut.length; k++) {
        var load = {
          x: this.firstPut[k].lineStartX,
          y: this.firstPut[k].lineStartY,
        };
        this.x = load.x;
        this.y = load.y;
        console.log("--------firstput--------")
        // console.log(this.firstPut[k]);
        if (this.firstPut[k].pic > 0) {
          // console.log("k is "+k);
          this.indexImg = this.firstPut[k].pic;
          // console.log(this.indexImg);
          console.log("condition 1");
          _this.addDragBox(load, this.firstPut[k].title);
          // _this.drawLine();
          // console.log("id "+this.firstPut[k].id)
          document.getElementById(this.firstPut[k].id).__vue__.show = false;
          document.getElementById(
            this.addList[k].id + "L"
          ).__vue__.show = false;
          this.indexImg = 0;
          
        } else {
          console.log("condition 2");
          _this.addDragBox(load, this.firstPut[k].title);
          // _this.drawLine();
        }
        // console.log("createJson is")
        // var test = document.getElementById(id);
        // console.log(test.__vue__.axis)
        // console.log("axis")
        // var change = document.getElementById(this.firstPut[k].id)
        // console.log(change.__vue__)
      }
      // console.log("End load tag");
      // console.log("load tag firstput is")
      // console.log(this.firstPut)

      // for (let i = 0; i < this.dataGet[0].data[this.indexImg].coordinator.length; i++) {
      //   var load={x:this.dataGet[0].data[this.indexImg].coordinator[i].lineStartX, y:this.dataGet[0].data[this.indexImg].coordinator[i].lineStartY}
      //   this.x=load.x
      //   this.y=load.y
      //   _this.addDragBox(load, this.dataGet[0].data[this.indexImg].coordinator[i].title)
      //   _this.drawLine()

      //   this.addList.push({
      //   id: load.x + Math.ceil(load.y),
      //   x: load.x,
      //   y: load.y,
      //   name: this.dataGet[0].data[this.indexImg].coordinator[i].title,
      //   pic: this.indexImg,
      // });

      // }
    },
    initData() {
      let _this = this;
      this.dataGet[0] = this.animaldata;
      console.log("init data time out 200")
      // console.log("---------")
      // this.dataGet[0] = this.animaldata;

      setTimeout(()=>_this.loadTag(),200);
      // _this.loadTag();
    },
  },
  beforeCreate(){
    console.log("--------------- before create ---------------")
    this.dataGet=[];
    this.thaiName = this.$route.params.thaiName;
    this.animalName = this.$route.params.animalName;
    this.id = this.$route.params.animalID;
    this.englishName = this.$route.params.englishName;
    console.log(this.thaiName);
    console.log(document.readyState)
    /*
    axios
      //http://202.28.24.50:3000/ 
      //http://localhost:3000/animal/bone/web/

      // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/"
      // P pond DB On Local : "http://localhost:3000/animal/bone/web/"
      // My DB              : "http://localhost:4000/getAnimalName/"
      .get("http://localhost:4000/getAnimalName/" + this.id)
      .then((Response) => {
        this.animaldata = Response.data;
        console.log("current get is")
        console.log(this.animaldata)
        this.imgLoadList = this.animaldata.animal.completeImageLink;
        this.imgLength = this.animaldata.animal.completeImageLink.length;
        // this.scienceName = this.animaldata.animal.scienceName;
        // this.technicalTerm = this.animaldata.animaldata.technicalTerm;
        // this.dataGet[0].animal.completeImageLink
        // console.log(this.animaldata.animal.thaiName);
        // this.initData();
      })
      .then(
        console.log("--------------- complete before create ---------------")
        );
        */
  },
  mounted(){
    // this.loadTag()
    // console.log(document.getElementById("click-box"))
  },
  // watch(){},
  created() {
    //fetch data from api here
    // this.ben="546355";
    
    console.log("---------------- create --------------")
    this.dataGet=[];
    this.thaiName = this.$route.params.thaiName;
    this.animalName = this.$route.params.animalName;
    this.id = this.$route.params.animalID;
    this.englishName = this.$route.params.englishName;
    // console.log(this.thaiName);
    axios
    //   //http://202.28.24.50:3000/ 
    //   //http://localhost:3000/animal/bone/web/

    //   // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/"
    //   // P pond DB On Local : "http://localhost:3000/animal/bone/web/"
    //   // My DB              : "http://localhost:4000/getAnimalName/"
      .get("http://localhost:4000/getAnimalName/" + this.id)
      .then((Response) => {
        this.animaldata = Response.data;
        console.log("create current get is")
    //     console.log(this.animaldata)
        this.imgLoadList = this.animaldata.animal.completeImageLink;
        this.imgLength = this.animaldata.animal.completeImageLink.length;
        // this.scienceName = this.animaldata.animal.scienceName;
        // this.technicalTerm = this.animaldata.animaldata.technicalTerm;
        // this.dataGet[0].animal.completeImageLink
        // console.log(this.animaldata.animal.thaiName);

        // this.initData();

        // this.dataGet[0] = this.animaldata;

        // console.log(this.dataGet[0]);
        // console.log(document.getElementById('click-box'))
        this.initData();
        // this.loadTag();
      });
      
    // this.dataGet = [];
    // this.id = this.$route.params.animalID;
    // this.animalName = this.$route.params.animalName;
    // axios
    //   //http://202.28.24.50:3000/ 
    //   //http://localhost:3000/animal/bone/web/

    //   // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/"
    //   // P pond DB On Local : "http://localhost:3000/animal/bone/web/"
    //   // My DB              : "http://localhost:4000/getAnimalName/"
    //   .get("http://localhost:4000/getAnimalName/" + this.id)
    //   .then((Response) => {
    //     this.animaldata = Response.data;
    //     console.log("current get is")
    //     console.log(this.animaldata)
    //     this.imgLoadList = this.animaldata.animal.completeImageLink;
    //     this.imgLength = this.animaldata.animal.completeImageLink.length;
    //     // this.dataGet[0].animal.completeImageLink
    //     // console.log(this.animaldata.animal.thaiName);
        // this.initData();
    //     // console.log(this.animaldata.animal);
    //     // console.log("current dataget is")
    //     // console.log(this.dataGet)
    //   });
    // axios.get("http://localhost:3000/animal/get-all-animal-name").then(Response => this.animalGet = Response.data)
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto {
  position: relative;
  top: 50px;
  left: 50px;
  /* padding: center; */
  width: 600px;
  height: 400px;
  border: 1px solid red;
}
/*-------------------------------------------------------------------------------------------------- */
.blank {
  width: 100%;
  height: 700px;
  background-color: white;
}
.click-box {
  position: absolute;
  top: 35px;
  left: 75px;
  width: 800px;
  height: 450px;
  background-color: black;
  border: 1px solid blue;
  /* z-index: 1; */
}
.main-box {
  position: absolute;
  left: 270px;
  top: 106px;
  width: 950px;
  height: 520px;
  /* border: 1px solid black; */
  /* background-color: rgb(166, 247, 243); */
}
.img-box {
  position: absolute;
  top: 25px;
  left: 100px;
  align-self: center;
  /* padding: center; */
  width: 600px;
  height: 400px;
  /* border: 1px solid red; */
}
.pic-size {
  /*width: inherit;*/
  height: inherit;
  /* width: 400px; */
  /* width: 60%; */
  margin: auto;
  display: block;
}
.header-name {
  position: absolute;
  left: 670px;
  top: 0px;
  font-size: xx-large;
  font: bold;
}
.prev {
  position: absolute;
  top: 220px;
  font-size: 50px;
  border: 0px;
  background-color: unset;
}
.next {
  position: absolute;
  top: 220px;
  right: 0px;
  font-size: 50px;
  border: 0px;
  background-color: unset;
}
.animal-name {
  position: relative;
  left: -20px;
  text-align: center;
  top: 60px;
  font-size: xx-large;
  font: bold;
  color: black;
  z-index: 2;
}
.showNumberOfImage {
  position: absolute;
  top: 500px;
  left: 450px;
  font-size: x-large;
}
.drawLine-box {
  position: absolute;
  top: 35px;
  left: 75px;
  width: 800px;
  height: 450px;
  background-color: unset;
  border: 1px solid blue;
  z-index: 2;
}
.drawLine {
  position: absolute;
  border-top: 1px solid red;
  width: 40px;
  transform: rotate(45deg);
  transform-origin: 0% 0%;
  top: 494px;
  left: 133px;
}
.descriptionBox {
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 910px;
  /* height: 180px; */
  position: absolute;
  top: 640px;
  left: 280px;
  border: 1.5px solid black;
  text-align-last: left;
  font-size: 20px;
  border-radius: 10px;
  /* font-weight: bold; */
  /* text-align: ; */
  /* background-color: violet; */
}
.englishName{
  position: absolute;
  left: 500px;
  top: 8px;
}
.technicalTerm{
  position: absolute;
  left: 500px;
  top: 50px;
}
</style>
