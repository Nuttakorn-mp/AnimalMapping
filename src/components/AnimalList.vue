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
      <span class="table-header-name" style="left: 700px">Bone</span>
      <span class="table-header-name" style="left: 870px">Image</span>
      <span class="table-header-name" style="left: 1150px">Clear Tag</span>
      <div class="element-name">

        <div class="result-search">
          <div v-for="item in filteredAndSorted" :key="item.englishName">
            <br />

            <span @click="goToPage(item.englishName, item._id)">{{
              item.englishName
            }}</span>

            <!-- 31-34 ถ้ามี check status เปิดได้ -->

            <span v-if="item.bone == true" class="boneCheck">&#10003;</span>
            <span v-if="item.bone == false" class="boneCheck">&#10006;</span>
            <span v-if="item.completeImage == true" class="imgCheck">&#10003;</span>
            <span v-if="item.completeImage == false" class="imgCheck">&#10006;</span>


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
      //http://202.28.24.50:3000/
      //http://localhost:3000/animal/bone/web/

      // Real IP DB         : "http://202.28.24.50:3000/animal/bone/web/" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
      // P pond DB On Local : "http://localhost:3000/animal/bone/web/"  --- ใช้อันนี้ทดสอบไปก่อน
      // My DB              : "http://localhost:4000/getAnimalName/" --อันนี้ที่ทำเอง
      apiLink:"",
      apiCommand_GetAllAnimalName:"",
      apicommand_GetAnimal_by_id:"",
      apiCommand_PUT_AnimalData:"",
      searchInput: "",
      newline: "\n",
      project499:false,

      //list สำหรับสร้างข้อมูลที่ต้องลบ (ใส่ frag =3)
      delList:[{
        // animalID : null,
        boneId : null,
        data: [],
      }
      ],
      animalGet: [],//เอาไว้เรียงลำดับชื่อก่อนการแสดงผล
      aaa:[],// เอาไว้เก็บข้อมูลชั่วคราวที่ดึงจาก API
    };
  },
  computed: {
    //เรียงลำดับชื่อ และแสดงผล
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
    //delete ข้อมูลจับคู่ที่เคยทำไว้ทั้งหมด
    deleteTrack(data) {
      console.log("delete tag call")
      // console.log(data)
      console.log(data.data.length)
      if (data.data.length >0) {
        // this.delList = data
        this.delList[0].animalId = data.animal._id
        this.delList[0].boneId = data.animal.boneId
        this.delList[0].data = data.data
        for (let i = 0; i < data.data.length; i++) {
          for (let j = 0; j < data.data[i].coordinator.length; j++) {
            //this.delList[0].data[i].coordinator[j].flag = 3 //frag 3== delete, frag 2 == edit, frag 1== add
            this.delList[0].data[i].coordinator[j].flag = 3
          } // end nest for
        }// end out for

        //call put api here
        console.log(this.delList[0])

        if(this.project499){//true ==> ใช้ api ของ 499
          // axios.put(this.apiLink+this.apiCommand_GetAllAnimalName+"/"+this.delList[0].animalId,this.delList[0]).then(window.alert("Delete Complete!"))
        }
        else{//false ==> ใช้ api ของสัตวแพทย์
          axios.put(this.apiLink+this.apiCommand_PUT_AnimalData,this.delList[0]).then(window.alert("Delete Complete!")) // for real use
        }
        
        


        
      }
      else{
        console.log("Nothing to delete")
      }
    },

    //ดึงข้อมูล animal ที่ต้องการลบข้อมูล จากนั้นเรียก deletetrack
    async getToDel(id){
      let _this = this
      axios.get(this.apiLink+this.apicommand_GetAnimal_by_id+"/"+id).then(Response => {
      // axios.get(this.apiLink+this.apiCommand_GetAllAnimalName+"/"+id).then(Response => {
        _this.deleteTrack(Response.data)
        })
    },

    //ส่งผู้ใช้ไปหน้าถัดไปโดยเรียก async get                 **เรียก async แบบตรงๆไม่ได้เลยต้องใช้ function ธรรมดาเรียกอีกชั้นนึง
    goToPage(englishName, _id) {
      // console.log("U click");
      let _this= this
      _this.get_real_use(_id, englishName)
    },

    
    /* ดึงข้อมูล animal ที่ผู้ใช้คลิก จากนั้น
    1. เช็ค bone
    2. เช็ค completeImage
    ถ้ามีทั้งคู่ ก็ผ่านไปหน้าถัดไป
    ถ้าไม่มีก็แสดง alert window ว่าไม่มีและอยู่หน้าเดิม */
    async get_real_use(_id, englishName){
      // "http://localhost:4000/getAnimalName/"+_id
      // console.log(this.apiLink+this.apicommand_GetAnimal_by_id+"/"+_id)

      var get = await axios.get(this.apiLink+this.apicommand_GetAnimal_by_id+"/"+_id).then(Response => Response.data)

      this.aaa = await get
      // console.log("get is ")
      // console.log(await get)
      // console.log("animalID : "+_id)

      try {//get boneId
        // var bone = await get.bone
        // var boneL = await Object.values(get.bone).length
        // var boneId = null
        var boneId = await get.animal.boneId
        // console.log("boneId : "+boneId)
        
      } catch (error) {//get conplete_Image
        console.log("boneId : "+boneId)
      }

      try {
        var comImg = await get.animal.completeImagePath
        var comImgL = await comImg.length

        if(comImgL == 0){console.log("Image : No image")}
        
      } catch (error) {
        console.log("Image : "+comImg)
      }

        if ( //มีข้อมูลกระดูก +มี complete image path
          // await bone &&
          // await boneL > 0 &&
          await typeof boneId !== 'undefined' &&
          // await comImg &&
          await typeof comImg !== 'undefined' &&
          await comImgL > 0
        ) {
          console.log(englishName+" pass condition");
          // console.log(await get)
          // this.aaa = await get

          this.$router.push({
          name: "add-data",
          params: { animalName: englishName, animalID: _id,pullData: get,project499:this.project499},
        });

        }
      

      console.log("\n")
    }
  },
  created(){//กำหนด apiLink และ apiCommand ตรงนี้
    //ถ้าใช้ api ของ499 ให้เปิดเป็น true ==> ถ้าไม่ใช่ ก็ปิดบรรทัดที่ 234 เพราะ false init
    this.project499=true;

    if(this.project499){//true ==> api 499
      // this.apiLink = "http://192.168.1.106:4000";
      this.apiLink ="http://localhost:4000";
      this.apiCommand_GetAllAnimalName = "/getAnimalName";
      this.apicommand_GetAnimal_by_id = "/getAnimalName";
      this.apiCommand_PUT_AnimalData = "/getAnimalName";
    }
    else{//false ==> api optional config
      this.apiLink ="http://localhost:3000"
      this.apiCommand_GetAllAnimalName="/animal/get-all-animal-name"
      this.apicommand_GetAnimal_by_id="/animal/bone/web"
      this.apiCommand_PUT_AnimalData="/animal/update-tag"
    }
    


    



      // http://192.168.1.106:4000/getAnimalName
      axios.get(this.apiLink+this.apiCommand_GetAllAnimalName).then(Response => {
      this.animalGet = Response.data
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
