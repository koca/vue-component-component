<template>
  <div id="app">
    <header style="text-align:center;">
      <h1>Vue Component Component
        <br>Examples
      </h1>
      <p>Docs &amp; Source code on:
        <a href="https://github.com/koca/vue-component-component">GitHub</a>
      </p>
    </header>
    <v-example>
      <h3>Example 1: Fetch on `mounted`</h3>
      <p>Showing the latest gists from github</p>
      <vue-component
        :initialState="{ gists: null }"
        :mounted="({ setState }) => {
            fetch('https://api.github.com/gists?per_page=5')
              .then(res => res.json())
              .then(gists => setState({ gists }));
          }"
      >
        <div slot-scope="{state}">
          <ul v-if="state.gists">
            <li :key="gist.id" v-for="gist in state.gists">
              <a :href="gist.html_url">{{gist.description || gist.id}}</a>
            </li>
          </ul>
          <span v-else>Loading or you should reload(why?
            <b>mounted</b>, remember?)
          </span>
        </div>
      </vue-component>
    </v-example>
    <hr>
    <v-example>
      <h3>Example 2: Hello World</h3>
      <vue-component :initialState="{msg: 'world'}">
        <div slot-scope="props">Hello {{props.state.msg}}</div>
      </vue-component>
    </v-example>
    <hr>
    <v-example>
      <h3>Example 3: Hello User</h3>
      <vue-component :initialState="{name: 'guest'}">
        <div slot-scope="props">Name:
          <input type="text" v-model="props.state.name">
          <br>
          Hello {{ props.state.name }}
        </div>
      </vue-component>
    </v-example>
    <hr>
    <v-example>
      <h3>Example 4: Todo List</h3>
      <vue-component :initial-state="{newTodo: 'go shopping', items:[]}">
        <div slot-scope="{ state }">
          What to do?:
          <input type="text" ref="inp" v-model="state.newTodo">
          <button
            @click="()=>{
              state.items.push(state.newTodo)
              state.newTodo = '';
              $refs.inp.focus();
            }"
          >Add</button>
          <br>
          <ul>
            <li :key="item" v-for="item in state.items">{{item}}</li>
          </ul>
        </div>
      </vue-component>
    </v-example>
    <hr>
    <v-example>
      <h3>Example 5: Svg</h3>
      <vue-component :initialState="{hue: 0}">
        <div slot-scope="{ state, setState }">
          <button @click="state.hue = Math.random() * 360">Generate Color</button>
          <br>
          <svg width="100" height="100">
            <path
              d="M20,30 Q40,5 50,30 T90,30"
              fill="none"
              :stroke="`hsl(${state.hue}, 50%, 50%)`"
              stroke-width="10"
            ></path>
          </svg>
        </div>
      </vue-component>
    </v-example>
  </div>
</template>


<script>
import Component from "./components/Component";
import Card from "./Card";
export default {
  name: "App",
  components: {
    "vue-component": Component,
    "v-example": Card
  }
};
</script>

<style>
body {
  background: rgba(0, 0, 0, 0.05);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 60px;
}
hr {
  max-width: 50px;
  margin: 0 auto;
  outline: none;
  border: none;
  height: 3px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
