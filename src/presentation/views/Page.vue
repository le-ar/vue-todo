<template>
  <base-card>
    <template v-slot:header>
      <h1 class="card__header">Задачи</h1>
    </template>
    <div class="todos__new">
      <input
        class="todos__new-input"
        type="text"
        placeholder="Enter a title for todo"
        v-model="textNewTodo"
      />
      <button class="btn" @click="addTodo">Add todo</button>
    </div>
    <div>
      <div v-if="!isStateLoaded" class="todos__loader">
        <base-loader></base-loader>
      </div>
      <div v-else>
        <todo-element v-for="todo in todos" :key="todo.UID" :todo="todo"></todo-element>
      </div>
    </div>
  </base-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { moduleName } from '../vuex/todo_vuex';
import BaseLoader from '../components/BaseLoader.vue';
import BaseCard from '../components/BaseCard.vue';
import TodoElement from '../components/TodoElement.vue';
import TodoEntity from '../../domain/entities/todo_entity';

@Component({
  components: {
    BaseLoader,
    BaseCard,
    TodoElement,
  }
})
export default class Page extends Vue {
  @Prop({ default: 0 }) readonly id!: number

  textNewTodo: string = '';

  created() {
    this.updateCurrentPage();
  }

  addTodo() {
    if (this.textNewTodo.length === 0) {
      alert('Wrong title');
      return;
    }
    this.$router.push('/').catch(err => { });
    this.$store.dispatch(moduleName + '/ADD_TODO', this.textNewTodo);
  }

  updateCurrentPage() {
    this.$store.dispatch(moduleName + '/LOAD_TODOS');
    this.$store.commit(moduleName + '/SET_CURRENT_PAGE', this.id);
  }

  get todos() {
    let allTodos: any[] = this.$store.state[moduleName].allTodos;
    if (allTodos.length === 0) {
      return [];
    }
    if (allTodos.length <= this.id * 10) {
      this.$router.push('/').catch(err => { });
      return [];
    }
    if (allTodos.length - this.id * 10 > 10) {
      return allTodos.slice(this.id * 10, (this.id + 1) * 10)
    }
    return allTodos.slice(this.id * 10);
  }

  get isStateLoaded() {
    return this.$store.state[moduleName].isTodosLoaded;
  }

  @Watch('$route')
  onRouteChange() {
    this.updateCurrentPage()
  }
}
</script>
<style lang="scss">

.todos {
  &__loader {
    display: flex;
    justify-content: center;
  }

  &__new {
    margin-bottom: 1rem;

    &-input {
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
      margin-bottom: 0.5rem;
      border: none;
      border-radius: 3px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      outline: none;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>