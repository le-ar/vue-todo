<template>
  <div class="about">
    <h1>{{id}}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  @Prop(Number) readonly id: number | undefined

  created() {
    console.log(this.id);
    
  }
}
</script>