<template>
  <span class="member-link">
    <a-tooltip top>
      <template #activator="{ on, attrs }">
        <g-link :to="`/member/${member.id}`">
          <nobr><em class="member-link__name" v-bind="attrs" v-on="on">{{ member.name }}</em></nobr>
        </g-link>
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

<style lang="postcss">
  .member-link__name {
      color: #ffffff;
      font-style: normal;
      text-shadow: 0 0 5px #ffffff;
  }
</style>
