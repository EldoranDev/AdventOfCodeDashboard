<template>
    <div>
        <canvas ref="canvas">
        </canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
    data() {
        return {
            _data: null,
            _plugins: [],
        };
    },
    methods: {
        renderChart(type, data, options) {
            this.$data._data = new Chart(
                this.$refs.canvas.getContext('2d'), {
                    type,
                    data,
                    options,
                    plugins: this.$data._plugins
                }
            );
        }
    }
}
</script>