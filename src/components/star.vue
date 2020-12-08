<template>
<v-tooltip top>
  <template #activator="{ on, attrs }">
    <span v-bind="attrs" v-on="on">
      star
    </span>
  </template>
  worth {{ points }} points
</v-tooltip>
</template>


<script>
export default {
    props: ['points'],
}
</script>

<style scoped>
  span {
    color: #ffff66;
    font-style: normal;
    text-shadow: 0 0 5px #ffff66;
  }
</style>