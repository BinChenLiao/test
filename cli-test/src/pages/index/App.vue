<template>
  <div id="index1">
    index
    <img src="../../static/img/7.png" class="asd">
    <index></index>
  </div>
</template>

<script>
import index from "@components/index";
export default {
  name: 'index1',
  created() {
  },
  components: {
    index
  }
}
</script>

<style>
.asd {
  width: 20px;
  height: 20px;
}
</style>
