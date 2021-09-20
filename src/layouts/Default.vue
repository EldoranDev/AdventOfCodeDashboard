<template>
  <div class="app">
    <div class="container mx-auto">
      <h1 class="headline">Advent of Code 2020</h1>
      <navigation />
      <slot/>
    </div>
  </div>  
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Navigation from '../components/navigation';

export default {
  components: { Navigation },  
}
</script>

<style>

</style>

<style lang="postcss">
.headline {
  @apply text-7xl text-center font-thin pt-3;
  font-family: "Roboto";
  text-decoration: none;
  color: #00cc00;
  text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
}

html {
  color: #ccc;
   background-color: #0f0f23;
}
</style>