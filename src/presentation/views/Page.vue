<template>
  <div class="page">
    <h1 class="page__header">Задачи</h1>
    <div class="todos__new">
      <input
        class="todos__new-input"
        type="text"
        placeholder="Enter a title for todo"
        v-model="textNewTodo"
      />
      <button class="todos__new-btn" @click="addTodo">Add todo</button>
    </div>
    <div>
      <div v-if="!isStateLoaded" class="todos__loader">
        <base-loader></base-loader>
      </div>
      <div v-else>
        <div class="todo" v-for="todo in todos" :key="todo.UID">
          <input
            class="todo__checkbox"
            type="checkbox"
            v-model="todo.isCompleted"
            @change="toggleTodo(todo)"
            :value="todo.isCompleted"
          />
          <span class="todo__text">{{ todo.text }}</span>
          <button class="todo__remove" @click="removeTodo(todo.UID)"></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { moduleName } from '../vuex/todo_vuex';
import BaseLoader from '../components/BaseLoader.vue';
import TodoEntity from '../../domain/entities/todo_entity';

@Component({
  components: {
    BaseLoader
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

  removeTodo(uid: string) {
    this.$store.dispatch(moduleName + '/REMOVE_TODO', uid);
  }

  toggleTodo(todo: TodoEntity) {
    this.$store.dispatch(moduleName + '/TOGGLE_TODO_CHECK', todo);
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
.page {
  text-align: left;
  width: 700px;
  background-color: #ebecf0;
  border-radius: 3px;
  padding: 1rem;
  margin: 0 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &__header {
    font-size: 18px;
    margin-top: 0;
  }

  @media screen and (max-width: 730px) {
    width: 100%;
  }
}

.todo {
  display: flex;
  overflow: hidden;
  background-color: white;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);

  &__checkbox {
    margin-right: 0.5rem;
  }

  &__text {
    display: block;
    flex: 1;
    overflow: auto;
    max-width: 92%;
  }

  &__remove {
    background-image: url("../../assets/trash.svg");
    background-repeat: no-repeat;
    background-position: center center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 16px;
  }
}

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

    &-btn {
      background-color: #7ca65c;
      border: none;
      font-weight: bold;
      color: white;
      padding: 0.5rem;
      border-radius: 3px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    }
  }
}
</style>