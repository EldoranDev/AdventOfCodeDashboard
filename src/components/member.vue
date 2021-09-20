<template>
  <g-link :to="`/member/${member.id}`">
    <nobr>
      <em class="member-link__name">
        {{ member.name }}
        <svg-icon
          v-if="member.repo && member.repo.language"
          type="mdi"
          class="member-link__icon"

          :path="languageIcon"
        />
      </em>
    </nobr>
  </g-link>
</template>

<script>
import { getLanguageIcon } from '../utils/icons';
import SvgIcon from '@jamescoyle/vue-icon';

export default {
    components: {
      SvgIcon
    },
    props: {
        member: Object,
    },
    computed: {
      languageIcon() {
        return getLanguageIcon(this.member.repo.language);
      }
    }
}
</script>

<style lang="postcss">
  .member-link__name {
      color: #ffffff;
      font-style: normal;
      text-shadow: 0 0 5px #ffffff;
  }

  .member-link__icon {
    display: inline;
  }
</style>
