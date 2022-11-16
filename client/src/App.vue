<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />

  <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

  <RouterView />
</template>