<template>
  <main>
    <img
      class="game-logo"
      src="./assets/taktou16.svg"
      alt="Taktou16 game logo"
    />
    <Game />
  </main>
</template>

<script>
import Game from "./components/Game.vue";
export default {
  name: "App",
  components: {
    Game
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  background-color: #374859;
  color: #e1e6eb;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  margin: 0;
}
.game-logo {
  height: 8rem;
  min-height: 120px;
  margin: 2rem 1rem;
}
@media screen and (max-width: 400px) {
  html,
  body,
  #app {
    font-size: 16px;
  }
}
@media screen and (min-width: 400px) {
  html,
  body,
  #app {
    font-size: 20px;
  }
}
</style>
