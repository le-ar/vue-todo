<template>
  <div class="todo">
    <input
      class="todo__checkbox"
      type="checkbox"
      v-model="todo.isCompleted"
      @change="toggleTodo"
      :value="todo.isCompleted"
    />
    <a class="todo__text" @click="goToDetailed">{{ todo.text }}</a>
    <button class="todo__remove" @click="removeTodo"></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TodoEntity from '../../domain/entities/todo_entity';
import { moduleName } from '../vuex/todo_vuex';

@Component
export default class TodoElement extends Vue {
  @Prop({ required: true }) readonly todo!: TodoEntity;

  goToDetailed() {
    this.$router.push({ name: 'detailed', params: { uid: this.todo.UID } })
  }

  removeTodo() {
    this.$store.dispatch(moduleName + '/REMOVE_TODO', this.todo.UID);
  }

  toggleTodo() {
    this.$store.dispatch(moduleName + '/TOGGLE_TODO_CHECK', this.todo);
  }
}
</script>

<style lang="scss">
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
    cursor: pointer;
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
</style>