<template>
    <v-icon
        :x-small="part === 1"
        :class="color"
    >
        mdi-medal
    </v-icon>
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
                case 1: return 'gold';
                case 2: return 'silver';
                case 3: return 'bronze';
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
        color: silver i !important;
    }

    .bronze {
        color: rgb(148, 82, 16) !important;
    }
</style>