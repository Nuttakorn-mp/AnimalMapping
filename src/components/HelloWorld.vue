<template>
  <div>
    Test Model <br>
    <div class="model-window">
      <model-obj src="model.obj"></model-obj>
    </div>
    <div class="model-window">
      <model-gltf src="/tree/model.gltf"></model-gltf>
    </div>
  </div>
</template>

<script>
import { ModelObj } from "vue-3d-model";
import { ModelGltf } from 'vue-3d-model';
// import TreeModel from '../assets/tree/model.obj'
export default {
  name: "HelloWorld",
  components: {
    ModelObj,
    ModelGltf
  },
  props: {
    msg: String,
  },
  data: () => {
    return {
      // treeModel: TreeModel
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model-window {
  width: 800px;
  height: 600px;
  border: 1px solid black;
}
</style>
