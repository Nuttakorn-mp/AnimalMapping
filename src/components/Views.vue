<template>
  <!-- <div class="blank">
      <p class="header-name" style="left: 80px; top: -5px">
        <img src="../assets/original.png" style="width: 269px" />
      </p>
      <p class="animal-name">{{ $route.params.animalName }}</p>
      <p class="data-map-header">Data Mapping</p>
      <div class="main-box" id="main-box">
        <div id="click-box" class="click-box">
          <div class="img-box">
            <img :src="imgLoad()" class="pic-size" />
          </div>
        </div>
        <div
          id="drawLine"
          class="drawLine-box"
          @click="addDragBox(axis(getMousePos()))"
        ></div>

        <button class="prev" @click="prevImg()">&#10094;</button>
        <button class="next" @click="nextImg()">&#10095;</button>
      <div class="showNumberOfImage">
        {{ this.indexImg + 1 }}/{{ this.imgLength }}
      </div>
    </div>
  </div> -->





  
    <div class="blank">
    <p class="header-name">View Data</p>
    <p class="header-name" style="left: 80px; top: -5px">
      <img src="../assets/original.png" style="width: 269px" />
    </p>
      <div class="table">
        <div class="search">
          <input type="text" v-model="searchInput" placeholder="Search..." class="box-search" />
          <!-- <span class="search-header">icon</span> -->
          <span class="icon">
            <img src="../assets/icon/magnify.svg" alt="">
          </span>
          
          
        </div>
        <!-- <span class="table-header-name" style="left: 200px">Name</span> -->
        <!-- <span class="table-header-name" style="left: 700px">Bone</span>
        <span class="table-header-name" style="left: 825px">complete Image</span> -->
        <div class="element-name">
          <button class="modify" @click="goToModify()">Modify</button>

          <div class="result-search">
            <ScrollView orientation="vertical" scrollBarIndicatorVisible=false>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
            <div>a</div>
          </ScrollView>
            
            <div v-for="item in filteredAndSorted" :key="item.englishName">
                <mouse-in>
                  <article class="in-article-card" @click="goToPage(item.englishName, item._id, item.thaiName)">
                    {{item.englishName}}
                  </article>
                </mouse-in>
                <div class="data"></div>
                <!-- <span v-if="item.bone == true" class="boneCheck">&#10003;</span>
                <span v-if="item.bone == false" class="boneCheck">&#10006;</span>
                <span v-if="item.completeImage == true" class="imgCheck">&#10003;</span>
                <span v-if="item.completeImage == false" class="imgCheck">&#10006;</span> -->
            </div>
            
          </div>
        </div>
        <!-- <div class="test">{{this.animalNameGet}} <div>----{{this.animalGet}}</div></div> -->
      </div>
    </div>
</template>

<script>
import Vue from "vue/dist/vue.esm";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);


import ScrollView from 'vue-scrollview';

Vue.use(ScrollView);

export default {
  name: "views",
  components:{
  },
  data: () => {
    return {
      searchInput: "",
      newline: "\n",
      animalList: [],
      bonefilter:[],
      completeImgfilter:[],
      templist:[],
      // delList:[{
      //   animalID : null,
      //   boneId : null,
      //   data: [],
      // }
      // ],
      // animalNameGet: null,
      animalGet: [],
      // aaa:[],
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

      return this.completeImgfilter  //this.animalGet
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
    check(){
      // let _this=this;
      this.templist = this.animalGet;
      // console.log(this.templist.length);

      for (let i = 0; i < parseInt(this.templist.length); i++) {
        if (this.templist[i].bone == true) {
          this.bonefilter.push(this.templist[i]);
        }
      }
      console.log("bonefilter done")
      // console.log(this.bonefilter)
      for (let i = 0; i < parseInt(this.bonefilter.length); i++) {
        if (this.bonefilter[i].completeImage == true) {
          this.completeImgfilter.push(this.bonefilter[i]);
        }
      }
      console.log("completeImgfilter done")
      // console.log(this.completeImgfilter)

      },
    goToModify(){
      this.$router.push({
        name: "modify",
        // params: { animalID: this.id,},
      });
    },
    // async getToDel(id){
    //   let _this = this
    //   //http://202.28.24.50:3000/
    //   //http://localhost:3000/animal/bone/web/
    //   axios.get("http://202.28.24.50:3000/animal/bone/web/"+id).then(Response => {
    //     _this.deleteTrack(Response.data)
    //     })
    // },
    goToPage(englishName, _id, thaiName) {
      console.log("U click");

      
      //Get animal from id Here! สำหรับเช็คเงื่อนไข
      let _this= this
      _this.get(_id, englishName, thaiName)
    },
    get(_id, englishName, thaiName){
      //http://202.28.24.50:3000/
      // var get = await axios.get("http://202.28.24.50:3000/animal/bone/web/"+_id).then(Response => Response.data) //http://localhost:3000/animal/bone/web/
      // this.aaa = await get
      // console.log("get is ")
      // console.log(await get)

      // try {
      //   var bone = await get.bone
      //   var boneL = await Object.values(get.bone).length
        
      // } catch (error) {
      //   console.log("don't have bone!")
      //   // console.log(error)
      //   window.alert("please insert bone!");
      // }

      // try {
      //   var comImg = await get.animal.completeImagePath
      //   var comImgL = await get.animal.completeImagePath.length
      // } catch (error) {
      //   console.log("don't have completeImagePath!")
      //   // console.log(error)
      //   window.alert("please insert completeImage!");
      // }

      
      // console.log("----------------")
      // console.log(bone)
      // console.log("bone length is "+boneL)
      // console.log(comImg)
      // console.log("completeImgPath is "+comImgL)
      // console.log("------------------")
      // // console.log(this.aaa)



      // // this.aaa = await get
      // // console.log(await this.aaa._id)
      // // console.log(await this.aaa)

      //   if ( //มีข้อมูลกระดูก +มี complete image path
      //     await bone &&
      //     await boneL > 0 &&
      //     await comImg &&
      //     await comImgL > 0
      //   ) {
      //     console.log(englishName+" pass condition");
      //     // console.log(await get)
      //     // this.aaa = await get
      //     this.$router.push({
      //     name: "add-data",
      //     params: { animalName: englishName, animalID: _id,},
      //   });
      //   } else if ( //ไม่มีข้อมูลกระดูก
      //     await bone &&
      //     await boneL == 0
      //   ) {
      //     console.log("please insert bone data!");
      //   } else if(
      //     await comImgL == 0
      //     ){ //ไม่มี complete img path
      //     console.log("please insert completeImage data!");
      //     window.alert("please insert completeImage!");
      //   }
      
      

      console.log(_id)
      console.log(englishName)
      console.log(this.animalGet)
      this.$router.push({
          name: "views-data",
          params: { animalName: englishName, animalID: _id, thaiName:thaiName},
        });
    }
  },
  created(){
    // Real IP DB         : "http://202.28.24.50:3000/animal/get-all-animal-name" --- อันนี้ฝั่งสัตวแพทย์ปิดเซฟอยู่
    // P pond DB On Local : "http://localhost:3000/animal/get-all-animal-name"  --- ใช้อันนี้ทดสอบไปก่อน
    // My DB              : "http://localhost:4000/getAnimalName/" --อันนี้ที่ทำเอง
    axios.get("http://localhost:4000/getAnimalName/").then(Response => {
      this.animalGet = Response.data
      // console.log("view ------------------------")
      // console.log(this.animalGet)
      this.check()
      })
  }
};
</script>
<style scoped>
.blank {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  height: 100%;
  /* width: 100%; */
  /* height: 700px; */
  
  background-color: white;
  /* background-color: #f0ffff; */
  /* background: #f8f8f8; */
}
.header-name {
  position: absolute;
  left: 670px;
  top: 80px;
  font-size: xx-large;
  font: bold;
}
.table {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 1330px;
  height: 600px;
  /* border: 1px solid black; */
}
.search {
  position: absolute;
  /* top: 8px; */
  top: 80px;
  left: 452.5px;
  width: 425px;
  height: 50px;
  /* border: 1px solid black; */
}
.box-search {
  border: 1px solid black;
  position: absolute;
  width: inherit;
  height: 35px;
  font-size: large;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0.5rem 1.2rem rgb(0 0 0 / 10%);
  /* left: 100px; */
  /* top: 9px; */
  background-color: rgba(255, 255, 255, 0.5);
}
.search-header {
  font-size: x-large;
  /* position: absolute; */
  /* top: 5px; */
  right: 10px;
  position: absolute;
  font-size: xx-large;
  font: bold;
  height: 40.84px;
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
.result-search {
  position: absolute;
  top: 55px;
  /* left: 155px; */
  left: 433px;
  min-width: 450px;
  height: auto;
  /* max-height: 345px; */
  max-height: 100px;
  border: 1px solid black;
  border-radius: 8px;
  /* border: 1px solid #eaeaea; */
  /* box-shadow: 0 0.5rem 1.2rem rgb(0 0 0 / 20%); */
  padding-top: 0.75rem;
  padding-right: 1.25rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
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
.modify {
  width: auto;
  height: auto;
  position: absolute;
  left: 1300px;
  top: 8px;
  font-size: x-large;
  font-weight: bold;
}
.in-article-card {
    border-radius: 8px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0.5rem 1.2rem rgb(0 0 0 / 6%);
    /* padding: .75rem 1.25rem; */
    padding-top: 0.75rem;
    padding-right: 1.25rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    /* padding-left: 1%; */
    width: 405px;
}
/* .article-content {
    font-size: 1.2rem;
    background: #fff;
    color: #000;
    overflow-wrap: break-word;
    border-radius: 8px;
    padding: 4rem;
    position: relative;
    width: 405px;
} */
.data{
  padding-top: 10px;
}
mouse-in :hover{
  background-color: rgb(206, 206, 206);
  opacity: .66;
}
.icon{
  position: absolute;
  right: -8px;
  top: 8px;
}
</style>