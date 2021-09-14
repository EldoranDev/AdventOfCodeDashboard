<script>
export default {
    props: ['chart'],
    mounted() {
        this.renderChart({ datasets: this.chart.datasets }, this.chart.options);
    }
}
</script>