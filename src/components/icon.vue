<template>
    <span :class="classes"></span>
</template>

<script>
export default {
    props: {
        small: Boolean,
    },
    computed: {
        classes() {
            return {
                'mdi': true,
                [this.$slots.default[0].text.trim()]: true,
                'mdi--small': this.$props.small,
            };
        },
    },
}
</script>

<style scoped>
    .mdi {
        font-size: 24px;
    }

    .mdi--small {
        font-size: 12px;
    }
</style>