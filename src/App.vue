<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
    </p>
    <editor :content="content" :change-callback="handleContentChange"></editor>
    <input v-model="content"></input>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Editor from './components/editor'

export default {
  components: {
    Hello,
    Editor
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    handleContentChange(content) {
      this.content = content
    }
  },
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
