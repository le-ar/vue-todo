<template>
  <div class="home">
    <base-loader v-if="!isStateLoaded"></base-loader>
    <template v-else>
      <router-view></router-view>
      <div class="navs">
        <router-link
          v-for="i in pageCount"
          :key="i"
          :to="'/page/'+i"
          :class="{'navs__link': true, 'selected': selectedPage === i-1}"
        >{{ i }}</router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseLoader from '../components/BaseLoader.vue';
import { moduleName } from '../vuex/todo_vuex';


@Component({
  components: {
    BaseLoader
  }
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch(moduleName + '/GET_TODOS_COUNT');
  }

  get pageCount() {
    let pages = Math.floor(this.$store.state[moduleName].todosCount / 10);
    if (this.$store.state[moduleName].todosCount % 10 > 0) {
      pages += 1;
    }
    return pages;
  }

  get selectedPage() {
    return this.$store.state[moduleName].currentPage;
  }

  get isStateLoaded() {
    return this.$store.state[moduleName].isTodosCountLoaded;
  }
}
</script>
<style lang="scss">
.home {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.navs {
  background-color: #ebecf0;
  border-radius: 3px;
  padding: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  &__link {
    display: inline-block;
    padding: 0 0.25rem;
    margin: 0 0.25rem;
    width: 1.5rem;
    text-align: center;
    display: inline-block;
    color: black;

    &.selected {
      font-weight: bold;
    }
  }
}
</style>
