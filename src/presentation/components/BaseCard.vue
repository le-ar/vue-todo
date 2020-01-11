<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.card {
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
</style>