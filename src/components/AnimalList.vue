<template>
  <div class="blank">
    <p class="header-name">Modify Data</p>
    <p class="header-name" style="left: 80px; top: -5px">
      <img src="../assets/original.png" style="width: 269px" />
    </p>
    <div class="table">
      <div class="search">
        <input type="text" v-model="searchInput" placeholder="Search..." class="box-search" />
        <!-- <span class="search-header">search</span> -->
        <span class="icon">
            <img src="../assets/icon/magnify.svg" alt="">
        </span>
      </div>
      <span class="table-header-name" style="left: 200px">Name</span>
      <!-- <span class="table-header-name" style="left: 700px">Bone</span>
      <span class="table-header-name" style="left: 825px">complete Image</span> -->
      <span class="table-header-name" style="left: 1150px">Clear Tag</span>
      <div class="element-name">
        <!-- <button class="view" @click="goToView()">View</button> -->

        <div class="result-search">
          <div v-for="item in filteredAndSorted" :key="item.englishName">
            <!-- <router-link :to="{name:'add-data', params:{animalName:item.englishName, animalID:item._id} }" >
              <span>{{item.englishName}}</span>
              </router-link> -->
            <br />

            <span @click="goToPage(item.englishName, item._id)">{{
              item.englishName
            }}</span>

            <!-- <span v-if="item.bone == true" class="boneCheck">&#10003;</span>
            <span v-if="item.bone == false" class="boneCheck">&#10006;</span>
            <span v-if="item.completeImage == true" class="imgCheck">&#10003;</span>
            <span v-if="item.completeImage == false" class="imgCheck">&#10006;</span> -->

            <!-- <span v-if="item.englishName == 'Domestic Dog'">
            <span class="_id">{{ item._id }}</span></span> -->
            <!-- <span class="date">time</span> -->
            <button class="delete-Button">
              <img
                src="../assets/delete.png"
                style="width: 35px; hight: 35px"
                @click="getToDel(item._id)"
              />
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="test">{{this.animalNameGet}} <div>----{{this.animalGet}}</div></div> -->
    </div>
  </div>
</template>
<script>
// ------------------------------------------------------------------------------------------------------------------------------------
import Vue from "vue/dist/vue.esm";
import Router from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(Router);
Vue.use(VueAxios, axios);
export default {
  name: "AnimalList",
  components: {},
  props: {},
  data: () => {
    return {
      searchInput: "",
      newline: "\n",
      animalList: [{ title: "Tiger", date: "11/10/63" }], //****************************
      delList:[{
        // animalID : null,
        boneId : null,
        data: [],
      }
      ],
      // animalNameGet: null,
      animalGet: 
      [ //Get ข้อมูลจาก API มาใส่ในนี้
        // {
        //   _id: "6038af2bff0829223c34adaa",
        //   thaiName: "ชิมแพนซี",
        //   englishName: "Chimpanzee",
        // },
        // {
        //   _id: "6038b0ecff0829223c34adab",
        //   thaiName: "สุนัขบ้าน",
        //   englishName: "Domestic Dog",
        // },
        // {
        //   _id: "6038b212ff0829223c34adac",
        //   thaiName: "ลิงแสม",
        //   englishName: "Crab-eating Macaque",
        // },
        // {
        //   _id: "6038b2d8ff0829223c34adad",
        //   thaiName: "จิงโจ้แดง",
        //   englishName: "Red Kangaroo",
        // },
        // {
        //   _id: "6038b34eff0829223c34adae",
        //   thaiName: "วัลลาบี",
        //   englishName: "Wallaby",
        // },
        // {
        //   _id: "6038b4b2ff0829223c34adaf",
        //   thaiName: "แพะบ้าน",
        //   englishName: "Domestic Goat",
        // },
        // {
        //   _id: "6038b7f0ff0829223c34adb0",
        //   thaiName: "กระบือปลัก",
        //   englishName: "Swamp Buffalo",
        // },
      ],
      GetFromId: 
      { //ข้อมูลกรณียังไม่เคย tag , มี Complete Image,  มี Bone 
        completeImageLink: [
          "http://localhost:3000/img/animals/img-1616171184793.jpg",
          "http://localhost:3000/img/animals/img-1616171184842.jpg",
          "http://localhost:3000/img/animals/img-1616171184878.jpg",
          "http://localhost:3000/img/animals/img-1616171184913.jpg",
          "http://localhost:3000/img/animals/img-1616171184934.jpg",
          "http://localhost:3000/img/animals/img-1616171184966.jpg",
          "http://localhost:3000/img/animals/img-1616171185001.jpg",
          "http://localhost:3000/img/animals/img-1616171185026.jpg",
          "http://localhost:3000/img/animals/img-1616171185077.jpg",
          "http://localhost:3000/img/animals/img-1616171185096.jpg",
          "http://localhost:3000/img/animals/img-1616171185132.jpg",
          "http://localhost:3000/img/animals/img-1616171185154.jpg",
          "http://localhost:3000/img/animals/img-1616171185199.jpg",
          "http://localhost:3000/img/animals/img-1616171185230.jpg",
          "http://localhost:3000/img/animals/img-1616171185249.jpg",
          "http://localhost:3000/img/animals/img-1616171185276.jpg",
        ],
        _id: "6038b34eff0829223c34adae",
        bone2DPath: [],
        picturePath: [],
        thaiName: "วัลลาบี",
        englishName: "Wallaby",
        scienceName: "Macropus rufogriseus",
        technicalTerm: "Macropus rufogriseus",
        description:
          "สัตว์เลี้ยงลูกด้วยน้ำนมที่มีหน้าท้องในเพศเมีย เป็นสัตว์พื้นเมืองในทวีปออสเตรเลีย และเกาะนิวกินี ลักษณะคล้ายจิงโจ้ที่มีขนาดเล็กแต่มีข้อแตกต่าง เช่น เท้าที่มีความยาวมากกว่า และขาที่สั้นกว่า สีขนจะมีสีสว่างและมีสีสันมากกว่า นอกจากนี้ฟันกรามของวัลลาบีจะมี ลักษณะที่เป็นแถวแบนและมีการสลัดฟันกรามน้อยเนื่องจากวัลลาบีไม่ใช้ฟันในการตัดอาหารมากเท่าจิงโจ้  อาหารหลักคือ หญ้า ใบไม้ ผลไม้ และสามารถดื่มน้ำทะเลได้อีกด้วย มักอาศัยในบริเวณที่มีหินและอยู่ใกล้เเหล่งน้ำ เข้าสู่ฤดูผสมพันธุ์ช่วงมกราคม-กุมภาพันธ์ ตั้งท้องประมาณ 28 วัน เมื่อคลอดลูกวัลลาบีจะปีนเข้าไปในหน้าท้องแม่ น้ำหนักเมื่อโตเต็มที่อยู่ที่ 20 กิโลกรัม สูงประมาณ 104 เซนติเมตร",
        taxonomy: "60366bb55eb22332cc9c8045",
        animalTypeId: "603677925eb22332cc9c8056",
        __v: 0,
        complete: true,
        completeImagePath: [
          "img-1616171184793.jpg", //1
          "img-1616171184842.jpg",
          "img-1616171184878.jpg",
          "img-1616171184913.jpg",
          "img-1616171184934.jpg", //5
          "img-1616171184966.jpg",
          "img-1616171185001.jpg",
          "img-1616171185026.jpg",
          "img-1616171185077.jpg",
          "img-1616171185096.jpg", //10
          "img-1616171185132.jpg",
          "img-1616171185154.jpg",
          "img-1616171185199.jpg",
          "img-1616171185230.jpg",
          "img-1616171185249.jpg", //15
          "img-1616171185276.jpg",
        ],
        bone: {
          _id: "6040e71c46fdea04372083ac",
          axial: {
            vertebralColumn: {
              cervicalVertebrae: true,
              toracicVertebrae: true,
              ribsCage: true,
              sternum: true,
              lumbarVertebrae: true,
              sarcum: true,
              coccygeal: true,
            },
            skull: true,
            mandible: true,
          },
          appendicular: {
            forelimb: {
              scapular: true,
              clavicle: true,
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
          no: "14",
          species: "Wallaby",
          __v: 0,
        },
        data: [],
        platform: "Web",
      },

      GetFromIdTest: { //ข้อมูลกรณีที่เคย Tag แล้ว 
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
                lineStartX: 333,
                lineStartY: 444,
                lineToX: 555,
                lineToY: 666,
                description: "test position",
              },
              {
                _id: "604cd2bf2b31791099ec8281",
                title: "mandible1",
                positionX: 1,
                positionY: 1,
                lineStartX: 1,
                lineStartY: 1,
                lineToX: 1,
                lineToY: 1,
                description: "test add new position",
              },
              {
                _id: "604cd2bf2b31791099ec8280",
                title: "skull",
                positionX: 2002,
                positionY: 2002,
                lineStartX: 2002,
                lineStartY: 2002,
                lineToX: 2002,
                lineToY: 2002,
                description: "test Update position มั้ง",
              },
              {
                _id: "604f815b61b3b4065a042b1a",
                title: "mandible1",
                positionX: 1001,
                positionY: 1001,
                lineStartX: 1001,
                lineStartY: 1001,
                lineToX: 1001,
                lineToY: 1001,
                description: "test add new position มั้ง",
              },
            ],
          },
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
                lineStartX: 333,
                lineStartY: 444,
                lineToX: 555,
                lineToY: 666,
                description: "test position",
              },
            ],
          },
        ],
        __v: 0,
        platform: "Web",
      },
      aaa:[],
    };
  },
  computed: {
    filteredAndSorted() {
      // function to compare names
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      return this.animalGet
        .filter((user) => {
          /* console.log(user.name.toLowerCase().includes(this.search.toLowerCase())); */
          // console.log(user.name.toLowerCase())
          // console.log(this.search.toLowerCase())
          return user.englishName
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        })
        .sort(compare);
    },
    
  },
  methods: {
    goToView(){
      this.$router.push({
        name: "views",
        // params: { animalID: this.id,},
      });
    },
    deleteTrack(data) {
      /* *****************************  delete track data here   *********************************** */
      console.log("delete track call")
      // console.log(data)
      console.log(data.data.length)
      if (data.data.length >0) {
        // this.delList = data
        this.delList[0].animalId = data.animal._id
        this.delList[0].boneId = data.animal.boneId
        this.delList[0].data = data.data
        for (let i = 0; i < data.data.length; i++) {
          for (let j = 0; j < data.data[i].coordinator.length; j++) {
            this.delList[0].data[i].coordinator[j].flag = 3
          } // end nest for
        }// end out for

        //call put api here

        //http://202.28.24.50:3000/
        // Real IP DB         : "http://202.28.24.50:3000/animal/update-tag" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
        // P pond DB On Local : "http://localhost:3000/animal/update-tag"  --- ใช้อันนี้ทดสอบไปก่อน
        // My DB              : "http://localhost:4000/getAnimalName/" --อันนี้ที่ทำเอง
        //192.168.1.106

        // axios.put("http://202.28.24.50:3000/animal/update-tag",this.delList[0]).then(window.alert("Delete Complete!"))
        // console.log("animalId : "+this.delList[0].animalId);
        // console.log("boneId : "+this.delList[0].boneId);

        axios.put("http://192.168.1.106:4000/getAnimalName/"+this.delList[0].animalId,this.delList[0]).then(window.alert("Delete Complete!"))
        // axios.put("http://localhost:4000/getAnimalName/"+this.delList[0].animalId,this.delList[0]).then(window.alert("Delete Complete!"))
      }
      else{
        console.log("Nothing to delete")
      }
      

      // window.alert("Delete Complete!");
    },
    async getToDel(id){
      let _this = this
      //http://202.28.24.50:3000/
      //http://localhost:3000/animal/bone/web/

      // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
      // P pond DB On Local : "http://localhost:3000/animal/bone/web/"  --- ใช้อันนี้ทดสอบไปก่อน
      // My DB              : "http://localhost:4000/getAnimalName/" --อันนี้ที่ทำเอง
      axios.get("http://192.168.1.106:4000/getAnimalName/"+id).then(Response => {
        // console.log("this response is ")
        // console.log(Response.data)
        // this.delList = Response.data
        _this.deleteTrack(Response.data)
        })
      // axios.get("http://localhost:4000/getAnimalName/"+id).then(Response => {
      //   _this.deleteTrack(Response.data)
      //   })
    },
    goToPage(englishName, _id) {
      console.log("U click");
      let _this= this
      _this.get(_id, englishName)
    },
    async get(_id, englishName){
      //http://202.28.24.50:3000/
      //http://localhost:3000/animal/bone/web/
      //192.168.1.106

      // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
      // P pond DB On Local : "http://localhost:3000/animal/bone/web/"  --- ใช้อันนี้ทดสอบไปก่อน
      // My DB              : "http://localhost:4000/getAnimalName/" --อันนี้ที่ทำเอง
      var get = await axios.get("http://192.168.1.106:4000/getAnimalName/"+_id).then(Response => Response.data)
      // var get = await axios.get("http://localhost:4000/getAnimalName/"+_id).then(Response => Response.data)
      this.aaa = await get
      console.log("get is ")
      console.log(await get)

      try {
        var bone = await get.bone
        var boneL = await Object.values(get.bone).length
        
      } catch (error) {
        console.log("don't have bone!")
        // console.log(error)
        window.alert("please insert bone!");
      }

      try {
        var comImg = await get.animal.completeImagePath
        var comImgL = await get.animal.completeImagePath.length
      } catch (error) {
        console.log("don't have completeImagePath!")
        // console.log(error)
        window.alert("please insert completeImage!");
      }

      
      console.log("----------------")
      console.log(bone)
      console.log("bone length is "+boneL)
      console.log(comImg)
      console.log("completeImgPath is "+comImgL)
      console.log("------------------")
      // console.log(this.aaa)



      // this.aaa = await get
      // console.log(await this.aaa._id)
      // console.log(await this.aaa)

        if ( //มีข้อมูลกระดูก +มี complete image path
          await bone &&
          await boneL > 0 &&
          await comImg &&
          await comImgL > 0
        ) {
          console.log(englishName+" pass condition");
          // console.log(await get)
          // this.aaa = await get
          this.$router.push({
          name: "add-data",
          params: { animalName: englishName, animalID: _id,pullData: get},
        });
        } else if ( //ไม่มีข้อมูลกระดูก
          await bone &&
          await boneL == 0
        ) {
          console.log("please insert bone data!");
        } else if(
          await comImgL == 0
          ){ //ไม่มี complete img path
          console.log("please insert completeImage data!");
          window.alert("please insert completeImage!");
        }
      
      

      console.log(this.aaa)
    }
  },
  created(){
    //http://202.28.24.50:3000/
    //http://localhost:3000/animal/get-all-animal-name

    // Real IP DB         : "http://202.28.24.50:3000/animal/get-all-animal-name" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
    // P pond DB On Local : "http://localhost:3000/animal/get-all-animal-name"  --- ใช้อันนี้ทดสอบไปก่อน
    // My DB              : "http://localhost:4000/getAnimalName" --อันนี้ที่ทำเอง
    // axios.get("http://localhost:4000/getAnimalName").then(Response => {
    //   this.animalGet = Response.data
    //   console.log(this.animalGet)
    //   })


      // http://192.168.1.106:4000/getAnimalName
      axios.get("http://192.168.1.106:4000/getAnimalName").then(Response => {
      this.animalGet = Response.data
      console.log(this.animalGet)
      })
  }
};
// ------------------------------------------------------------------------------------------------------------------------------------
</script>
<style scoped>
.table {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 1330px;
  height: 600px;
  /* border: 1px solid black; */
}
.blank {
  display: flex;
  height: 100%;
  /* width: 100%; */
  /* height: 700px; */
  background-color: white;
  /* background-color: lightseagreen; */
}
.header-name {
  position: absolute;
  left: 670px;
  /* top: 9px; */
  font-size: xx-large;
  font: bold;
}
.search-header {
  font-size: x-large;
  /* position: absolute; */
  /* top: 5px; */
  /* left: 10px; */
  position: absolute;
  font-size: xx-large;
  font: bold;
  height: 40.84px;
}
.search {
  position: absolute;
  top: 8px;
  left: 345px;
  width: 500px;
  height: 50px;
  /* border: 1px solid black; */
}
.box-search {
  /* border: 1px solid black; */
  position: absolute;
  width: 405px;
  height: 35px;
  font-size: large;
  padding-left: 10px;
  border-radius: 5px;
  left: 100px;
  /* top: 9px; */
  /* background-color: rgb(196, 196, 196, 0.5); */
  border: 1px solid #eaeaea;
  box-shadow: 0 0.5rem 1.2rem rgb(0 0 0 / 10%);
}
.table-header-name {
  width: auto;
  height: auto;
  position: absolute;
  /* left: 10px; */
  top: 80px;
  font-size: x-large;
  font-weight: bold;
}
.element-name {
  position: absolute;
  font-size: x-large;
  top: 70px;
}
.delete-Button {
  /* padding-top: 10px; */
  /* top: -7px; */
  /* left: 825px; */
  left: 1025px;
  position: absolute;
  background-color: unset;
  border: unset;
}
.result-search {
  /* padding-top: 7px; */
  position: absolute;
  top: 55px;
  left: 155px;
  width: 950px;
  height: auto;
  /* border: 1px solid black; */
}
.date {
  position: absolute;
  left: 730px;
}
._id {
  position: absolute;
  left: 450px;
}
.boneCheck{
  left: 565px;
  position: absolute;
  background-color: unset;
  border: unset;
}
.imgCheck{
  left: 735px;
  position: absolute;
  background-color: unset;
  border: unset;
}
.test{
  position: absolute;
  top: 600px;
}
.view {
  width: auto;
  height: auto;
  position: absolute;
  left: 1300px;
  top: 8px;
  font-size: x-large;
  font-weight: bold;
}
.icon{
  position: absolute;
  right: -8px;
  top: 8px;
}
mouse-in :hover{
  background-color: rgb(206, 206, 206);
  opacity: .66;
}
</style>
