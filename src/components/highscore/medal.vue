<template>
    <v-icon
        :x-small="medal.part === 1"
        :class="color"
    >
        mdi-medal
    </v-icon>
</template>

<script>
export default {
    props: {
        medal: Object
    },
    computed: {
        color() {
            switch (this.medal.place) {
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
        color: gold;
    }
    .silver {
        color: silver;
    }

    .bronze {
        color: rgb(148, 82, 16);
    }
</style>