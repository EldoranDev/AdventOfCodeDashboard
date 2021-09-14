<template>
  <nav class="nav">
      <!--<g-link class="mx-4" to="/">Highscore</g-link>
      <g-link class="mx-4" to="/charts">Charts</g-link>-->
  </nav>
</template>

<style lang="postcss" scoped>
    a {
        color: #ffffff;
        font-style: normal;
        text-shadow: 0 0 5px #ffffff;   
    }

        a.active--exact {
        color: #00cc00 !important;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
    }

    .nav {
        @apply flex justify-center m-10;
    }
</style>