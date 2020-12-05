<template>
  <span>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <g-link :to="`/member/${member.id}`">
          <em v-bind="attrs" v-on="on">{{ member.name }}</em>
        </g-link>
      </template>
      {{ member.score.local}} | {{member.score.global}}
    </v-tooltip>
  </span>
</template>

<script>
export default {
    props: {
        member: Object,
    },
}
</script>

<style scoped>
  em {
    color: #ffffff;
    font-style: normal;
    text-shadow: 0 0 5px #ffffff;
  }

  .v-application a {
    text-decoration:  none;
  }
</style>