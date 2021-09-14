<template>
  <div class="app">
    <div class="container mx-auto">
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

<style>
html {
  color: #ccc;
}

.app {
  background-color: #0f0f23;
}

h1 {
  text-decoration: none;
  color: #00cc00;
  text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
}
</style>