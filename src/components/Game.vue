<template>
  <section class="board">
    <figure ref="f00" v-on:click="input(0, 0)"></figure>
    <figure ref="f01" v-on:click="input(0, 1)"></figure>
    <figure ref="f02" v-on:click="input(0, 2)"></figure>
    <figure ref="f03" v-on:click="input(0, 3)"></figure>
    <figure ref="f10" v-on:click="input(1, 0)"></figure>
    <figure ref="f11" v-on:click="input(1, 1)"></figure>
    <figure ref="f12" v-on:click="input(1, 2)"></figure>
    <figure ref="f13" v-on:click="input(1, 3)"></figure>
    <figure ref="f20" v-on:click="input(2, 0)"></figure>
    <figure ref="f21" v-on:click="input(2, 1)"></figure>
    <figure ref="f22" v-on:click="input(2, 2)"></figure>
    <figure ref="f23" v-on:click="input(2, 3)"></figure>
    <figure ref="f30" v-on:click="input(3, 0)"></figure>
    <figure ref="f31" v-on:click="input(3, 1)"></figure>
    <figure ref="f32" v-on:click="input(3, 2)"></figure>
    <figure ref="f33" v-on:click="input(3, 3)"></figure>
  </section>
</template>

<script>
import { TacTou16 } from "@/logic/gamePlay.js";
import { Role } from "@/logic/gamePlay.js";
var Test = new TacTou16(-1);
export default {
  name: "Game",
  data: function() {
    return {
      claimed: [],
      graphicsO: require("@/assets/oks.svg"),
      graphicsX: require("@/assets/iks.svg")
    };
  },
  methods: {
    input(x, y) {
      let role = this.getRole();
      if (!Test.lookForWin()) {
        if (Test.claim({ x, y }, role)) {
          this.$refs["f" + x + y].classList.add("active");
          this.$refs["f" + x + y].insertAdjacentHTML(
            "beforeend",
            `<img src='` +
              (role + 1 ? this.graphicsO : this.graphicsX) +
              `' alt='player x'/>`
          );
          console.table(Test.filds);
          if (Test.lookForWin()) {
            setTimeout(function() {
              alert("We have a winner!");
            }, 500);
          }
        }
      }
    },
    getRole() {
      return Test.unclaimedFields().length % 2 == 0 ? Role.X : Role.O;
    }
  }
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template: repeat(4, 4rem) / repeat(4, 4rem);
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: rgb(28, 28, 28);
  border-radius: 0.5rem;
}
figure {
  margin: 0;
  display: flex;
  background-color: #506d8a;
  border-radius: 0.2rem;
  justify-content: center;
  align-items: center;
  transition-duration: 0.1s;
  overflow: hidden;
}
figure:hover {
  background-color: #7491b0;
  cursor: pointer;
}
figure {
  margin: 0;
  display: flex;
}
.active:hover {
  background-color: #506d8a;
}
</style>
<style>
figure img {
  width: 100%;
  padding: 0.5rem;
}
</style>
