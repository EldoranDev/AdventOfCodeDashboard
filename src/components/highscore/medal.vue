<template>
    <span v-if="place < 3"
        :x-small="part === 1"
        :class="color"
    >
        mdi-medal
    </span>
    <span v-else-if="part === 2" class="place">
        {{ place + 1 }}
    </span>
</template>

<script>
export default {
    props: {
        part: Number,
        place: Number,
    },
    computed: {
        color() {
            switch (this.place) {
                case 0: return 'gold';
                case 1: return 'silver';
                case 2: return 'bronze';
            }
        }
    }
}
</script>

<style scoped>
    .gold {
        color: gold !important;
    }
    .silver {
        color: silver !important;
    }

    .bronze {
        color: rgb(148, 82, 16) !important;
    }

    .place {
        color: #cccccc !important;
        opacity: 0.25;
    }
</style>