<template>
  <span>
    <a-tooltip top>
      <template #activator="{ on, attrs }">
        <!--<g-link :to="`/member/${member.id}`">
          <nobr><em v-bind="attrs" v-on="on">{{ member.name }}</em></nobr>
        </g-link>-->
        <nobr><em v-bind="attrs" v-on="on">{{ member.name }}</em></nobr>
      </template>
      {{ member.score.local}} | {{member.score.global}}
    </a-tooltip>
  </span>
</template>

<script>
import ATooltip from './tooltip';

export default {
    components: {
      ATooltip,
    },
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
</style>