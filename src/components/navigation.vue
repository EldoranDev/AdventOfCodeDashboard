<template>
  <nav class="navigation">
      <g-link class="link" to="/">Highscore</g-link>
      <g-link class="link" to="/charts">Charts</g-link>
      <g-link class="link" to="/timeline">Timeline</g-link>
  </nav>
</template>

<style lang="postcss">
    .link {
        @apply text-white mx-4;
        color: #ffffff;
        font-style: normal;
        text-shadow: 0 0 5px #ffffff;
    }

    .link.active--exact {
        color: #00cc00;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
    }

    .navigation {
        @apply flex justify-center m-10;
    }
</style>