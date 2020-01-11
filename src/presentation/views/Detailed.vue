<template>
  <div class="detailed">
    <router-link class="detailed__back" to="/">Back</router-link>
    <base-card>
      <template v-slot:header>
        <h1 class="card__header">Задача</h1>
      </template>
      <base-loader v-if="loadedTodo === null"></base-loader>
      <div v-else>
        <div class="detailed__top">
          <div>
            <input type="checkbox" id="checkbox" v-model="isCompleted" />
            <label for="checkbox">Done!</label>
          </div>
          <div>Created at {{ formattedDateTime }}</div>
        </div>
        <div class="detailed__middle">
          <input class="detailed__text" type="text" v-model="newText" />
        </div>
        <div class="detailed__bottom">
          <div>
            <button class="btn" @click="saveTodo">Save</button>
          </div>
          <div>
            <button class="btn red" @click="removeTodo">Remove</button>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseLoader from '../components/BaseLoader.vue';
import BaseCard from '../components/BaseCard.vue';
import TodoEntity from '../../domain/entities/todo_entity';
import { moduleName } from '../vuex/todo_vuex';

@Component({
  components: {
    BaseLoader,
    BaseCard,
  }
})
export default class Detailed extends Vue {
  @Prop(String) readonly uid!: string;

  newText: string = '';
  isCompleted: boolean = false;

  created() {
    this.$store.dispatch(moduleName + '/LOAD_TODOS');
  }

  removeTodo() {
    this.$store.dispatch(moduleName + '/REMOVE_TODO', this.uid);
  }

  saveTodo() {
    if (this.loadedTodo !== null) {
      this.loadedTodo.isCompleted = this.isCompleted;
      this.loadedTodo.text = this.newText;
      this.$store.dispatch(moduleName + '/TOGGLE_TODO_CHECK', this.loadedTodo);
      this.$store.dispatch(moduleName + '/UPDATE_TODO_TEXT', this.loadedTodo);
    }
  }

  get formattedDateTime() {
    let todo = this.loadedTodo;
    if (todo === null) {
      return '';
    }

    var t = new Date(1970, 0, 1);
    t.setSeconds(todo.createdAt);
    return t.toLocaleString() + ' (GMT)';
  }

  get loadedTodo(): TodoEntity | null {
    if (!this.$store.state[moduleName].isTodosLoaded) {
      return null;
    }

    for (let todo of this.$store.state[moduleName].allTodos) {
      if (todo.UID === this.uid) {
        this.newText = todo.text;
        this.isCompleted = todo.isCompleted;
        return todo;
      }
    }

    this.$router.push('/').catch(err => { });

    return null;
  }
}
</script>

<style lang="scss">
.detailed {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  &__back {
    margin-bottom: 0.25rem;
  }

  &__top,
  &__bottom {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  &__middle {
    margin-bottom: 0.5rem;
  }

  &__text {
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
</style>