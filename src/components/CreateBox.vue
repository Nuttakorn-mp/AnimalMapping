<template>
  <div>
    <!-- ------------------------------------------------------------------------------------------------------------------------- -->
    <div class="blank">
      <!-- <button class="test" style="left: 80px; top: -5px ">1111</button> -->
      <p class="header-name" style="left: 80px; top: -5px">
        <img src="../assets/original.png" style="width: 269px" />
      </p>
      <!-- <p class="header-name">Add Data</p> -->
      <p class="animal-name">{{ $route.params.animalName }}</p>
      <!-- <p>{{$route.params.animalID}}</p> -->
      <p class="data-map-header">Data Mapping</p>
      <div class="main-box" id="main-box">
        <div id="click-box" class="click-box">
          <div class="img-box">
            <!-- <p> {{imgSrc(this.$data.indexImg)}}</p> -->
            <!-- "${{this.$data.imageList[this.$data.indexImg]}}" -->

            <!-- <img :src="imgSrc(this.$data.indexImg)" class="pic-size" /> -->
            <img :src="imgLoad()" class="pic-size" />
            <!-- <img src="../assets/tiger/resize.jpg" class="pic-size"> -->
          </div>
        </div>
        <div
          id="drawLine"
          class="drawLine-box"
          @click="addDragBox(axis(getMousePos()))"
        ></div>

        <button class="prev" @click="prevImg()">&#10094;</button>
        <button class="next" @click="nextImg()">&#10095;</button>
      </div>
      <div class="data-box">
        <span class="search-in-box">search</span>
        <!-- <input type="text" v-model="search" placeholder="Search title.."/> -->
        <input
          type="text"
          v-model="search"
          class="box-search"
          placeholder="Search title.."
        />

        <!-- <div class="data-in-box">
          <h3>Drag</h3>
          <div
            class="test-drag"
            v-for="item in createList"
            :key="item.title"
            draggable
            @dragstart="startDrag($event, item)"
          >
            {{ item.title}}
          </div> -->
        <div class="data-in-box">
          <!-- <h3>Drag</h3> -->
          <div
            class="data-drag"
            v-for="item in filteredAndSorted"
            :key="item.title"
            draggable
            @dragstart="startDrag($event, item)"
          >
            {{ item.title }}
          </div>
          <!-- <h3>Can Drag1</h3>
          <div>
            <draggable class="list-group" :list="list1" group="people">
              <div
                class="list-group-item"
                v-for="element in list1"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
          <h3>Draggable 2</h3>
          <div>
            <draggable class="list-group" :list="list2" group="people">
              <div
                class="list-group-item"
                v-for="element in list2"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div> -->
        </div>
      </div>
      <div class="showNumberOfImage">
        <!-- {{ this.indexImg + 1 }}/{{ this.imageList.length }} -->
        {{ this.indexImg + 1 }}/{{ this.imgLength }}
      </div>
      <!-- <textarea class="description" placeholder="Add Description Here" v-model="description.descriptionMain"></textarea> -->
      <button class="save" @click="save()">Save</button>
      <button class="discard" @click="discard()">Discard</button>
    </div>
  </div>
</template>



<script>
import Vue from "vue/dist/vue.esm";
// import Vue from "vue/dist/vue.js";
import draggable from "vuedraggable";
import Router from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
// import WriteJson from "write-json-file";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(Router);
Vue.use(VueSimpleAlert);
Vue.use(VueAxios, axios);

export default {
  name: "CreateBox",
  components: {},
  props: {},
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
      //เก็บก่อน จะเทสสร้างboj

      // const app = new Vue({
      // template:
      // `<div>
      //   {{message}}
      // </div>`,
      // data:{
      //   message: 'AAA',
      // }
      //   template:
      //   `<div class="drag-box">hope</div>`,
      //   })
      // const stat = document.getElementById('boxT');
      // let vueContainer = document.createElement('div')
      // stat.appendChild(vueContainer);
      // app.$mount(vueContainer);

      // return this.$data.x
      // return [this.$data.x,this.$data.y]
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

        // console.log(this.addList.length)
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
          //     template: `<div>
          // <draggable :style="dragCreate" :list="createList" group="people">
          //   <div
          //       v-for="(element, index) in createList"
          //       :key="element.name"
          //     >
          //       {{ element.name }}
          //     </div>
          // </draggable>
          // </div>`,
          template: `
          <div id="${event.x}${Math.ceil(event.y)}${
            this.indexImg
          }" v-show="show" :style="dragCreate" @drop="onDrop($event);" @dragover.prevent @dragenter.prevent >
            {{this.createList[0].title}}
            <button :style="deleteIcon"><img src=${require("../assets/icon/x-mark.png")} alt="" :style="deleteImg" @click="destroy()"></button>
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
            deleteImg: {
              position: "absolute",
              top: "1px",
              right: "2px",
              height: "15px",
              width: "15px",
              "bcakground-color": "unset",
              // "text-align": "left",
              "z-index": 3,
            },
            deleteIcon: {
              "background-color": "white",
              border: "unset",
              "min-width": "25px",
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
            destroy() {
              console.log("element id :" + this.$el.id + " is remove");
              // console.log(this.$el.id)
              // console.log(this.$root)
              // console.log(this)
              // console.log(document.getElementById("click-box"))
              this.$el.parentNode.removeChild(this.$el);
              var line = document.getElementById(this.$el.id + "L").__vue__;
              line.$el.parentNode.removeChild(line.$el);
              // console.log(this.id)
            },
          },
          components: { draggable },
        });

        // const stat = document.getElementById("box2");
        const stat = document.getElementById("click-box");
        console.log("stat :");
        console.log(stat);
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
    addBox(event) {
      //not use; U can Edit!!!
      const app = new Vue({
        template: `<span id="box4" :style="boxCreate">add box<br></span>`,
        data: {
          boxCreate: {
            width: "auto",
            height: "auto",
            border: "1px solid black",
            "background-color": "whitesmoke",
            position: "absolute",
            top: event.y + "px",
            left: event.x + "px",
          },
        },
      });
      return app;
    },
    boxes() {
      const app = new Vue({ template: "<div>I'm mounted</div>" });
      const stat = document.getElementById("createbox");
      let vueContainer = document.createElement("div");
      stat.appendChild(vueContainer);
      app.$mount(vueContainer);
    },
    save() {
      let _this = this;
      this.createJson = [];

      this.picTagCount = -1;
      this.postList = [];

      // console.log("dataget current is ")
      // console.log(this.dataGet[0])
      // this.createJson.push({descriptionMain: this.description.descriptionMain})
      for (let i = 0; i < this.addList.length; i++) {
        const element = this.addList[i];
        // console.log(element.id)
        // console.log(document.getElementById(element.id).__vue__.createList[0])
        var check = document.getElementById(element.id);
        // console.log("check is "+check)
        if (check !== null) {
          var id = check.__vue__.id;
          var title = check.__vue__.createList[0].title;
          var trackPosition = check.__vue__.axis;

          var line = document.getElementById(element.id + "L");
          var start = line.__vue__.start;
          var to = line.__vue__.to;
          // console.log(line.__vue__.start)
          // console.log(line.__vue__.to)
          // console.log("id is : "+id+", name is : "+name)
          // console.log("pic is : "+element.pic)
          this.createJson.push({
            pic: element.pic,
            id: id,
            title: title,
            positionX: trackPosition.x,
            positionY: trackPosition.y,
            lineStartX: start.x,
            lineStartY: start.y,
            lineToX: to.x,
            LineToY: to.y,
          });
          // console.log("createJson is")
          // var test = document.getElementById(id);
          // console.log(test.__vue__.axis)

          // console.log(check.__vue__.axis)

          if (element.pic > this.picTagCount) {
            this.picTagCount += 1;
          }
        } // end IF
      } // end Loop
      // this.$router.replace("/modify-data");
      // console.log("create list is")
      // console.log(this.createJson);
      // console.log("can u see me?");

      //------------------------------------------------------------------------------------
      if (
        this.dataGet[0].data.length == 0 ||
        this.dataGet[0].data.length == null
      ) {
        console.log("start post");

        //check data ที่ get มา ว่าเคย Tag รึยัง? (dataGet is null)
        // 1. ถ้ายังให้ใช้คำสั่งตั้งแต่บรรทัดที่      ถึง
        // 2. ถ้าเคยแล้วให้ใช้คำสั่งตั้งแต่บรรทัดที่  ถึง
        this.postList.push({
          animalId: this.dataGet[0].animal._id,
          boneId: this.dataGet[0].bone._id,
          data: [],
        });
        for (let i = -1; i < this.picTagCount; i++) {
          this.postList[0].data.push({
            // id:__
            imageName: i + 1,
            coordinator: [],
          });
        }

        for (let i = 0; i < this.createJson.length; i++) {
          // if (this.createJson[i].pic) {

          // }
          var pic = this.createJson[i].pic;
          this.postList[0].data[pic].coordinator.push({
            title: this.createJson[i].title,
            positionX: this.createJson[i].positionX,
            positionY: this.createJson[i].positionY,
            lineStartX: this.createJson[i].lineStartX,
            lineStartY: this.createJson[i].lineStartY,
            lineToX: this.createJson[i].lineToX,
            lineToY: this.createJson[i].LineToY,
            description: "-",
          });
          this.postList[0].data[pic].imageName =
            this.dataGet[0].animal.completeImagePath[pic];
        }
        console.log("post is ");
        console.log(this.postList[0]);
        // console.log(this.dataGet[0])

        // call API POST //
        //------------------------------------------------------------------------------------
        _this.postAPI(this.postList[0]);

        //------------------------------------------------------------------------------------
      } else {
        //กรณีข้อมูลที่ get มาจาก API เคย Tag แล้ว (dataGet != null OR dataGet.length > 0)
        this.putList = [];
        // if (this.firstPut.length > this.createJson.length) {
        //จน ข้อมูลเก่า > ข้อมูลใหม่ แปลว่ามีการลบออก
        // for (let i = 0; i < this.dataGet.length; i++) {
        // const element = array[i];
        // }

        // console.log("case 1");

        // for (let i = 0; i < this.dataGet[0].data.length; i++) {
        //     // console.log("i is "+i)
        //     // console.log("data[i] length is "+this.dataGet[0].data[i].coordinator.length)
        //     // Object.keys(this.dataGet[0].data[i]).length  นับ length ใน obj
        //     for (let j = 0; j < this.dataGet[0].data[i].coordinator.length; j++) {
        //       // console.log("j is "+ j)
        //       var idIndataGet =
        //         this.dataGet[0].data[i].coordinator[j].lineStartX +
        //         this.dataGet[0].data[i].coordinator[j].lineStartY + "P"+i;
        //       // console.log("id is "+idIndataGet)
        //       var checkIndataGet = document.getElementById(idIndataGet);
        //       // console.log("check by id is "+ checkIndataGet)
        //       if (checkIndataGet !== null) {
        //         console.log("flag change!")
        //         // console.log(this.dataGet[0].data[i].coordinator[j])
        //         this.dataGet[0].data[i].coordinator[j].flag = 2;
        //         this.dataGet[0].data[i].coordinator[j].title =
        //           checkIndataGet.__vue__.createList[0].title;
        //       } else {
        //         console.log("flag remove!")
        //         // console.log(this.dataGet[0].data[i].coordinator[j])
        //         this.dataGet[0].data[i].coordinator[j].flag = 3;
        //       }
        //     }
        //     console.log("case 2 : checked!")

        //   }

        // }

        // else {
        // if (this.firstPut.length <= this.createJson.length) {
        //จน ข้อมูลเก่า <= ข้อมูลใหม่
        console.log("start case 2!");
        console.log("dataGet have pic tag is "+this.dataGet[0].data.length)
        // console.log("but "+this.dataGet.length)
        for (let i = 0; i < this.dataGet[0].data.length; i++) {
          console.log("i is "+i)
          console.log(this.dataGet[0].data[i])
          console.log("dataGet.data[i].coordinator.length")
          console.log(this.dataGet[0].data[i].coordinator.length)
          console.log(this.dataGet[0].data[i].coordinator)
          console.log(Object.keys(this.dataGet[0].data[i].coordinator).length)

          // console.log("data[i] length is "+this.dataGet[0].data[i].coordinator.length)
          // Object.keys(this.dataGet[0].data[i]).length  นับ length ใน obj
          for (let j = 0; j < this.dataGet[0].data[i].coordinator.length; j++) {
            console.log("i is "+i)
            console.log("j is "+ j)

            //`${event.x}${Math.ceil(event.y)}${this.indexImg}`
            // console.log(this.dataGet[0].data[i].coordinator[j])

            var idIndataGet =
              `${this.dataGet[0].data[i].coordinator[j].lineStartX}${Math.ceil(this.dataGet[0].data[i].coordinator[j].lineStartY)}${this.dataGet[0].animal.completeImagePath.indexOf(this.dataGet[0].data[i].imageName)}`;
            // console.log("id is "+idIndataGet)
            
            var checkIndataGet = document.getElementById(idIndataGet);
            // console.log("check by id is "+ checkIndataGet)
            if (checkIndataGet !== null) {
              console.log("flag change!");
              // console.log(this.dataGet[0].data[i].coordinator[j])
              this.dataGet[0].data[i].coordinator[j].flag = 2;
              this.dataGet[0].data[i].coordinator[j].title =
                checkIndataGet.__vue__.createList[0].title;
              console.log("result is :");
              console.log(this.dataGet[0].data[i].coordinator[j]);


            } 
            else {
              console.log("flag remove!");
              // console.log(this.dataGet[0].data[i].coordinator[j])
              this.dataGet[0].data[i].coordinator[j].flag = 3;
            }
          } 
        }
        console.log("case 2 : data&flag checked!");
        console.log(this.dataGet[0].data)





        // เอา ใหม่(ที่มากกว่า) - เก่า(ที่น้อยกว่า)
        // this.diff = this.createJson.filter(
        //   x => this.firstPut.includes(x)
        // );
        this.diff = this.createJson.filter(this.comparer(this.firstPut));
        //.filter(x => !arr2.includes(x))
        // this.diff=[]
        // console.log("after update flag is ")
        // console.log(this.dataGet[0])
        // console.log("create is "+ this.createJson.length)
        // console.log(this.createJson)
        // console.log("firstPut is " + this.firstPut.length)
        // console.log(this.firstPut)
        // console.log("diff is " + this.diff.length)
        // console.log(this.diff)

        // console.log("start Add After update!")
        // console.log(this.dataGet[0])
        // console.log("diff.length is "+this.diff.length)
        for (let i = 0; i < this.diff.length; i++) {
          var picIndiff = this.diff[i].pic;
          // console.log("pic in diff is "+picIndiff)
          // console.log(this.dataGet[0])
          console.log("picIndiff is " + picIndiff); // index of pic => ex.pic=2 that mean pic3
          console.log(
            "this.dataGet[0].data.length is " + this.dataGet[0].data.length
          );
          if (picIndiff >= this.dataGet[0].data.length) {
            console.log("picIndiff > current update List");
            // console.log("detect new tag add")
            //   // console.log("start add post list")
            //   this.postList.push({
            //     animalId: this.dataGet[0].animal._id,
            //     boneId: this.dataGet[0].bone._id,
            //     data: [],
            //   });
            // console.log("dataget length "+ this.dataGet[0].data.length-1)
            // console.log("diff length "+ this.diff.length)
            for (let i = this.dataGet[0].data.length - 1; i < picIndiff; i++) {
              // var picIndexAdd = this.diff[i].pic;
              this.dataGet[0].data.push({
                // id:__
                imageName: this.dataGet[0].animal.completeImagePath[i],
                coordinator: [],
              });
            }

            //   for (let i = 0; i < this.diff.length; i++) {
            //     // var picIndiff = this.diff[i].pic;
            //     this.postList[0].data[i].coordinator.push({
            //       title: this.diff[i].title,
            //       positionX: this.diff[i].positionX,
            //       positionY: this.diff[i].positionY,
            //       lineStartX: this.diff[i].lineStartX,
            //       lineStartY: this.diff[i].lineStartY,
            //       lineToX: this.diff[i].lineToX,
            //       lineToY: this.diff[i].LineToY,
            //       description: "-",
            //     });

            //   }

            // console.log("add dataGet list")
          }
          console.log(this.dataGet[0]);
          // else{
          this.dataGet[0].data[picIndiff].coordinator.push({
            title: this.diff[i].title,
            positionX: this.diff[i].positionX,
            positionY: this.diff[i].positionY,
            lineStartX: this.diff[i].lineStartX,
            lineStartY: this.diff[i].lineStartY,
            lineToX: this.diff[i].lineToX,
            lineToY: this.diff[i].LineToY,
            description: "-",
            flag: 1,
          });
          console.log("push");
          // }
          // var id=this.dataGet[0].data[i]
          // var check=document.getElementById(_____);
        }

        // เพิ่มputlist ก่อนเรียก API
        this.putList.push({
          animalId: this.dataGet[0].animal._id,
          boneId: this.dataGet[0].animal.boneId,
          data: this.dataGet[0].data,
        });
        for (let i = 0; i < this.putList[0].data.length; i++) {
          // console.log("i is "+i)
          this.putList[0].data[i].imageName =
            this.dataGet[0].animal.completeImagePath[i];
          // this.putList[0].data[i].imageURL = this.dataGet[0].animal.completeImageLink[i]
        }

        // }

        // else {
        //   //จน ข้อมูลใหม่ = เก่า
        //   console.log("case 3");
        //   // this.dataGet.length = this.createJson.length
        //   //
        // }
        console.log("----- array dataGet update (prepare Put) -----");
        console.log(this.dataGet[0]);
        console.log("putList is");
        console.log(this.putList[0]); //ยังไม่ได้ช้อมูลที่ว่าลบข้อมูลตัวไหนออก flag
        // console.log(this.createJson[0].pic)
        console.log("----------------------");
        //call API PUT
        _this.putAPI(this.putList[0]);
        console.log();
      }
      window.alert("Complete!");
    },
    discard() {
      this.$router.replace("/modify-data");
    },
    getMousePos(event) {
      //Compatible // IE: event || window.event;
      var e = event || window.event;
      // page scroll displacement: chrome is document.body.scrollLeft, IE is document.documentElement.scrollLeft
      var scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
      // browser window coordinates: e.clientX
      // Firefox Support Properties pageX, and pageY properties, these two attributes have already taken into account the page scrolls
      var x = e.pageX || e.clientX + scrollX;
      var y = e.pageY || e.clientY + scrollY;
      // alert('x: ' + x + '\ny: ' + y);
      // console.log("X:" + x + " Y:" + y);
      this.$data.x = x;
      this.$data.y = y - 670;
      // console.log(this.$data.x);
      // console.log(this.$data.y);
      return { x: x, y: y };
    },
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemTitle", item.title);
    },
    onDrop(evt) {
      const itemTitle = evt.dataTransfer.getData("itemTitle");
      const item = this.createList.find((item) => item.title == itemTitle);
      // item.list = list
      // console.log("itemID :"+itemID)
      // console.log("item.title :"+item.title)
      // console.log("item.list :"+item.list)

      console.log(this.posAndBox[0].title);
      this.exampleList.pop(`${this.posAndBox[0].title}`);
      this.posAndBox[0] = { id: item.id, title: itemTitle };
      this.exampleList.push({ id: item.id, title: itemTitle });
      // console.log(itemTitle)
    },
    imgSrc(event) {// not use(this first veresion)
      
      return require("../assets/tiger/" + this.$data.imageList[event] + ".jpg");
    },
    imgLoad() {
      // console.log("this.$data.indexImg :"+this.$data.indexImg)
      // console.log('img load is run')
      // console.log("**********************")
      // console.log(this.imgLoadList)
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
    defaultDraw(event) {
      var a = document.getElementById("c").getBoundingClientRect();
      // var scrollX =
      //   document.documentElement.scrollLeft || document.body.scrollLeft;
      // var scrollY =
      //   document.documentElement.scrollTop || document.body.scrollTop;

      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      ctx.beginPath();

      var sumX = event.x - Math.ceil(a.left);
      // console.log("x is :"+event.x)
      // console.log("a.left is :"+Math.ceil(a.left))
      // console.log("sub is :"+sumX)

      console.log();
      var sumY = event.y - Math.ceil(a.top);
      // var x = a.top - scrollX;
      // var y = a.left - scrollY;

      // ctx.rect(20, 20, 150, 100);
      // ctx.stroke();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.moveTo(sumX / 2.67, sumY / 3);

      // ctx.lineTo(sumX/2.67,10);
      // ctx.lineTo(10, sumY/3);

      ctx.lineTo(sumX / 2.67 + 25, sumY / 3 - 10);
      ctx.closePath();
      ctx.stroke();
      this.vueCanvas = ctx;
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
        xDistance =Math.abs(this.x-(xCal+15+document.getElementById(`${this.x}${Math.ceil(this.y)}${this.indexImg}`).__vue__._data.createList[0].title.length*8.5));
        yDistance =Math.abs(this.y-(yCal+25) );
        // console.log((Math.atan2(yDistance,xDistance)*180/Math.PI)); //deg
        // console.log("----------------------------");
        deg = (Math.atan2(yDistance,xDistance)*180/Math.PI)+180;
        if (yCal>=this.y) {deg = 180-(Math.atan2(yDistance,xDistance)*180/Math.PI);}
        // console.log(deg);
        // console.log(xDistance);
        // console.log(yDistance);
        // console.log(Math.pow(xDistance,2)   +  Math.pow(yDistance,2)   );
        testsum = (Math.pow(xDistance,2)   +  Math.pow(yDistance,2));
        
        // xDragto = this.x - 55;
        xDragto = xCal;
        // yDragto = this.y - 51.4;
        yDragto= yCal;
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
        xDistance =Math.abs(this.x-(xCal+15+document.getElementById(`${this.x}${Math.ceil(this.y)}${this.indexImg}`).__vue__._data.createList[0].title.length*8.5));
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
    store() {// เอาไว้ใช้ลอง เขียนอะไรใหม่ๆก่อนใช้จริง
      
      console.log("sssssssssssssssssss")
      console.log(this.$route.params.pullData);
      // console.log(a.length)
      // console.log((13 - a.length) * 8);
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
      console.log("load tag!")
      // console.log(this.dataGet[0].data.length)
      for (let i = 0; i < this.dataGet[0].data.length; i++) {
        //วนตาม จน รูป
        for (let j = 0; j < this.dataGet[0].data[i].coordinator.length; j++) {
          //วนตาม จน tag
          console.log("i is "+i)
          console.log("j is "+j)
          console.log(this.dataGet[0].data[i].coordinator[j])

          // var load={x:this.dataGet[0].data[i].coordinator[j].lineStartX, y:this.dataGet[0].data[i].coordinator[j].lineStartY}
          // this.x=load.x
          // this.y=load.y

          console.log("imageName is ")
          console.log(this.dataGet[0].data[i].imageName)
          console.log("index of ")
          console.log(this.dataGet[0].animal.completeImagePath.indexOf(this.dataGet[0].data[i].imageName))
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
        if (this.firstPut[k].pic > 0) {
          // console.log("k is "+k);
          this.indexImg = this.firstPut[k].pic;
          // console.log(this.indexImg);
          _this.addDragBox(load, this.firstPut[k].title);
          // _this.drawLine();
          // console.log("id "+this.firstPut[k].id)
          document.getElementById(this.firstPut[k].id).__vue__.show = false;
          document.getElementById(
            this.addList[k].id + "L"
          ).__vue__.show = false;
          this.indexImg = 0;
        } else {
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
      // console.log("---------")
      // console.log("start map page")
      // this.dataGet[0].data = this.animaldata.data
      this.dataGet[0] = this.animaldata;
      // this.indexImg = 0;
      // console.log("-------------")
      // console.log(this.dataGet[0])
      // _this.loadTag();
      setTimeout(()=>_this.loadTag(),200);
      // console.log("create map data");

      if(this.animalName != "Arapaima"){
        // console.log(this.dataGet[0].bone)
        // console.log(Object.values( this.dataGet[0].bone.appendicular).length)
        // console.log(this.dataGet[0].bone.appendicular.forelimb)
        for (let iii in this.dataGet[0].bone.appendicular.forelimb) {
          // console.log(`${iii}: ${this.dataGet[0].bone.appendicular.forelimb[iii]}`)
          if (`${this.dataGet[0].bone.appendicular.forelimb[iii]}` == "true") {
            // console.log(`${iii}`)
            this.createList.push({ title: iii });
          }
          // console.log(`this.dataGet[0].bone.appendicular.forelimb.${iii}`)
        }

        for (let iii in this.dataGet[0].bone.appendicular.hindlimb) {
          if (`${this.dataGet[0].bone.appendicular.hindlimb[iii]}` == "true") {
            // console.log(`${iii}`)
            this.createList.push({ title: iii });
          }
        }

        if (this.dataGet[0].bone.axial.mandible == true) {
          this.createList.push({ title: "mandible" });
          // console.log("mandible add")
        }

        if (this.dataGet[0].bone.axial.skull == true) {
          this.createList.push({ title: "skull" });
          // console.log("skull add")
        }

        for (let iii in this.dataGet[0].bone.axial.vertebralColumn) {
          if (`${this.dataGet[0].bone.axial.vertebralColumn[iii]}` == "true") {
            // console.log(`${iii} add`)
            this.createList.push({ title: iii });
          }
        }
        // console.log(this.createList)
        this.createList = [
          ...new Map(this.createList.map((item) => [item.title, item])).values(),
        ]; //[item.title, item]
    }

      else{
        this.createList = [
          {title:"skull"},
          {title:"operculum"},
          {title:"maxilla"},
          {title:"dentary"},
          {title:"pectoralGridle"},
          {title:"pelvicGridle"},
          {title:"pectoralFin"},
          {title:"vertebra"},
          {title:"vertebralSpine"},
          {title:"ribs"},
          {title:"posteriorDorsalFin"},
          {title:"caudalFin"},
          {title:"analFin"},
        ];
      }

      // console.log("End create map data");
      // console.log(this.createList);
      // console.log("create list")
      // console.log(this.createList)

      // console.log(Object.values(this.dataGet[0].bone.axial).length)
    },
    comparer(otherArray) {
      return function (current) {
        return (
          otherArray.filter(function (other) {
            return other.value == current.value && other.id == current.id;
          }).length == 0
        );
      };
    },
    async postAPI(data) {
      axios.put(this.apiLink+"/"+"getAnimalName"+"/"+data.animalId, data).then(
      // axios.put("http://localhost:4000/getAnimalName/"+data.animalId, data).then(
        console.log("post complete"),
        console.log(data),
        this.$router.replace("/modify-data")
      );
    },
    async putAPI(data) {
      axios.put(this.apiLink+"/"+"getAnimalName"+"/"+data.animalId, data).then(
      // axios.put("http://localhost:4000/getAnimalName/"+data.animalId, data).then(
        console.log("put complete"),
        console.log(data),
        this.$router.replace("/modify-data")
      );
    },
  },
  data: () => {
    return {
      // Real IP DB         : "http://202.28.24.50:3000/animal/update-tag" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
      // P pond DB On Local : "http://localhost:3000/animal/update-tag"  --- ใช้อันนี้ทดสอบไปก่อน
      // My DB              : "http://localhost:4000/getAnimalName/"+data.animalId --อันนี้ที่ทำเอง
      // http://192.168.1.106:4000 ==>  current use
      apiLink:"",
      id: null,
      apiCall: null,
      firstPut: [],
      dataGet: null,
      loadStart: 1,
      diff: null,
      picTagCount: -1,
      postList: [],
      putList: [],
      createJson: [],
      deleteList: [],
      animaldata: [],
      imgLoadList: [],
      imgLength: null,
      animalName:'',
      dup: [],

      search: "",
      description: [{ descriptionMain: "" }], //****************************
      disable: true,
      moved: false,
      show: true,
      showXY: false,
      x: 100,
      y: 200,
      textColor: "blue",
      bgColor: "black",
      height: 100,
      addList: [],
      filters: [],
      posAndBox: [{ id: 0, title: "Null", list: 0 }],
      exampleList: [{ id: 0, title: "exampleList", list: 0 }],
      createList: [
        //****************************
        // { title: "Skull" },
        // { title: "Tail" },
        // { title: "Front Leg" },
        // { title: "test" },
      ],
      indexImg: 0,
      imageList: [
        //****************************
        // "001",
        "reduce",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "016",
        "017",
      ],
      millisecond:0,
    };
  },
  computed: {
    // animaldata : this.$route.params.animalData,
    // cssVars() {
    //   return {
    //     "--bg-color": this.bgColor,
    //     "--height": this.height + "px",
    //     "--text-color": this.textColor,
    //   };
    // },
    // boxh() {
    //   return {
    //     "--x": this.x + "px",
    //     "--y": this.y + "px",
    //   };
    // },
    filteredAndSorted() {
      // function to compare names
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      return this.createList
        .filter((user) => {
          /* console.log(user.name.toLowerCase().includes(this.search.toLowerCase())); */
          // console.log(user.name.toLowerCase())
          // console.log(this.search.toLowerCase())
          return user.title.toLowerCase().includes(this.search.toLowerCase());
        })
        .sort(compare);
    },
  },
  created() {
    //fetch data from api here
    this.apiLink ="http://192.168.1.106:4000";
    this.dataGet = [
      {
        _id: "604c6037cfc890051804f6d8",
        animal: {
          _id: "6048e482c9eb27085c2bd571",
          completeImagePath: [
            "img-1615392107089.jpg",
            "img-1615392107092.png",
            "img-1615392107096.png",
          ],
          partType: ["6048e55ec9eb27085c2bd572", "6048e57dc9eb27085c2bd573"],
          thaiName: "สุนัขทดสอบ สอง",
          englishName: "Dog Tesing 2",
          scienceName: "Dog Tesing 2",
          technicalTerm: "Dog Tesing 2",
          description: "ทดสอบระบบ",
          taxonomy: null,
          animalTypeId: "6033be30149207022c774778",
          partId: null,
          __v: 0,
          complete: true,
          boneId: "6040e71c46fdea043720839f",
        },
        bone: {
          _id: "6040e71c46fdea043720839f",
          axial: {
            vertebralColumn: {
              cervicalVertebrae: true,
              toracicVertebrae: true,
              ribsCage: true,
              sternum: true,
              lumbarVertebrae: true,
              sarcum: true,
              coccygeal: false,
            },
            skull: true,
            mandible: true,
          },
          appendicular: {
            forelimb: {
              scapular: true,
              clavicle: false,
              humerus: true,
              radias: true,
              ulnar: true,
              carpus: true,
              metacapus: true,
              phalangs: true,
              sesamoid: false,
            },
            hindlimb: {
              pelvic: true,
              femur: true,
              patella: false,
              fabella: false,
              tibia: true,
              fibular: true,
              tarsus: true,
              metatarsus: true,
              phalangs: true,
              sesamoid: false,
            },
          },
          no: "1",
          species: "Domestic Dog",
          __v: 0,
        },
        data: [
          {
            imageURL: "http://localhost:3000/img/animals/img-1615392107089.jpg",
            _id: "604cd2bf2b31791099ec827e",
            imageName: "img-1615392107089.jpg",
            coordinator: [
              {
                _id: "604c6037cfc890051804f6db",
                title: "mandible",
                positionX: 111,
                positionY: 222,
                lineStartX: 500,
                lineStartY: 200,
                lineToX: 555,
                lineToY: 666,
                description: "test position",
                // flag:0,
              },
            ],
          }, //end data tag 1
          {
            imageURL: "http://localhost:3000/img/animals/img-1615392107092.png",
            _id: "604cd2bf2b31791099ec8282",
            imageName: "img-1615392107092.png",
            coordinator: [
              {
                _id: "604c6037cfc890051804f6dd",
                title: "skull",
                positionX: 111,
                positionY: 222,
                lineStartX: 500,
                lineStartY: 100,
                lineToX: 555,
                lineToY: 666,
                description: "test position",
                // flag:0,
              },
            ],
          }, //end data tag 2
        ],
        __v: 0,
        platform: "Web",
      },
    ];
    this.id = this.$route.params.animalID;
    this.animalName = this.$route.params.animalName;

    //เสริมล่าสุด
    this.animaldata = this.$route.params.pullData;
    this.imgLoadList = this.animaldata.animal.completeImageLink;
    this.imgLength = this.animaldata.animal.completeImageLink.length;
    this.initData();

    /*

    axios
      .get("http://localhost:4000/getAnimalName/" + this.id)
      .then((Response) => {
        this.animaldata = Response.data;
        this.imgLoadList = this.animaldata.animal.completeImageLink;
        this.imgLength = this.animaldata.animal.completeImageLink.length;
        this.initData();
      });
    // axios.get("http://localhost:3000/animal/get-all-animal-name").then(Response => this.animalGet = Response.data)

    */



    
  },
};
</script>


<style module>
.baz {
  color: red;
  width: 100px;
  height: 100px;
  background-color: whitesmoke;
  border: 1px solid black;
  position: relative;
  left: 100px;
  top: 200px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-window {
  /* padding-left: 100px; */
  width: 800px;
  height: 600px;
  border: 1px solid black;
  background-color: darkcyan;
  /* background-image: url("../assets/90790.png"); */
  background-image: url("../assets/dog.jpg");
  background-size: 700px; /*x-axis*/
  background-position: center;
  background-repeat: no-repeat;
}
.img-size {
  width: 800px;
  height: 600px;
  border: 1px solid black;
  background-color: rgb(166, 247, 243);
}
.auto {
  position: relative;
  top: 50px;
  left: 50px;
  /* padding: center; */
  width: 600px;
  height: 400px;
  border: 1px solid red;
}
.drag-box {
  width: 50px;
  height: 25px;
  background-color: whitesmoke;
  border: 1px solid black;
  text-align: center;
  position: relative;
  top: var(--y);
  /* top: var(--x); */
  left: var(--x);
  /* padding-left: 100px; */
  /* position: right; */
}
.show-drop {
  width: 100px;
  height: 100px;
  background-color: whitesmoke;
  border: 1px solid black;
  position: relative;
  left: 250px;
  top: 200px;
  /* text-align: right; */
  padding-left: 10px;
}
.test-drop {
  width: 100px;
  height: 100px;
  background-color: whitesmoke;
  border: 1px solid black;
  position: relative;
  left: 100px;
  top: 100px;
}
.data-drag {
  /* width: 100px;
  height: 100px; */
  /* background-color: whitesmoke; */
  /* border: 1px solid black; */
  font-size: 19px;
  position: relative;
  left: 60px;
  /* top: 200px; */
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
.data-box {
  width: 250px;
  height: 520px;
  position: absolute;
  top: 160px;
  left: 1225px;
  /* opacity: 0.3; */
  /* border: 1.5px solid black; */
  /* border-radius: 20px; */
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
.data-map-header {
  position: absolute;
  left: 1255px;
  top: 60px;
  font-size: xx-large;
  font: bold;
}
.data-in-box {
  position: absolute;
  left: 30px;
  top: 40px;
  /* border: 1px solid black; */
}
.add-list {
  font-size: x-large;
  position: absolute;
  top: 40px;
  left: 40px;
}
.del-list {
  font-size: x-large;
  position: absolute;
  top: 40px;
  left: 150px;
}
.search-in-box {
  font-size: x-large;
  position: absolute;
  top: 5px;
  left: 10px;
}
.box-search {
  border: 1px solid black;
  position: absolute;
  width: 160px;
  height: 20px;
  top: 10px;
  left: 80px;
}
.save {
  background-color: #c8c9d2;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  position: absolute;
  top: 650px;
  left: 800px;
  font-size: x-large;
}
.discard {
  background-color: #ffffffc2;
  position: absolute;
  top: 650px;
  left: 500px;
  width: 200px;
  height: 50px;
  font-size: x-large;
}
.showNumberOfImage {
  position: absolute;
  top: 600px;
  left: 725px;
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
.searchCSS {
  width: 250px;
  height: 55px;
  position: absolute;
  top: 115px;
  left: 1225px;
  /* border: 1.5px solid red; */
  border-radius: 10px;
  background-color: rgb(212, 211, 211);
}
.description {
  padding-top: 10px;
  padding-left: 10px;
  width: 940px;
  height: 180px;
  position: absolute;
  top: 590px;
  left: 280px;
  border: 1.5px solid black;
  text-align-last: left;
  font-size: 20px;
  border-radius: 10px;
  /* font-weight: bold; */
  /* text-align: ; */
  /* background-color: violet; */
}
/* .test{
  position: relative;
} */
/*-------------------------------------------------------------------------------------------------- */
</style>
