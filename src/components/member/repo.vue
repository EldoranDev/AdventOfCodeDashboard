<template>
    <div class="repo">
        <svg-icon
            v-if="repo.language"
            type="mdi"
            :path="languageIcon"
        />
        <a
            v-if="repo.repo"
            target="_blank"
            :href="repo.repo"
        >
            <svg-icon
                type="mdi"
                :path="repoIcon"
            />
        </a>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';

import { getLanguageIcon, getRepoIcon } from '../../utils/icons';

export default {
    components: {
        SvgIcon
    },
    props: ["repo"],
    computed:  {
        languageIcon() {
            return getLanguageIcon(this.repo.language);
        },
        repoIcon() {
            return getRepoIcon(this.repo.repo);
        }
    }
}
</script>

<style lang="postcss">
    .repo { }
</style>