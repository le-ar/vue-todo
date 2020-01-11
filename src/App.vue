<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
}
.btn {
  background-color: #7ca65c;
  border: none;
  font-weight: bold;
  color: white;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  
  &.red {
  background-color: #b04632;
  }
}
</style>
