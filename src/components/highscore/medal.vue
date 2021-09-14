<template>
    <svg-icon
        v-if="place < 3"
        
        type="mdi" 
        
        :path="medal"
        :class="classes"
        :size="size"
    />
    <span v-else-if="part === 2" class="place">
        {{ place + 1 }}
    </span>
</template>

<script>
import { mdiMedal } from '@mdi/js';

export default {
    props: {
        part: Number,
        place: Number,
    },
    computed: {
        medal() {
            return mdiMedal;
        },
        classes() {
            return {
                'medal--gold': this.place === 0,
                'medal--silver': this.place === 1,
                'medal--bronze': this.place === 2,
            };
        },
        size() {
            return this.part === 1 ? 16 : 24;
        }
    }
}
</script>

<style lang="postcss" scoped>
    
    .medal--gold {
        color: gold;
    }

    .medal--silver {
        color: silver;
    }

    .medal--bronze {
        color: rgb(148, 82, 16);
    }

    .medal--small {
        height: 12px;
        width: 12px;
    }

    .place {
        color: #cccccc;
        opacity: 0.25;
    }
</style>