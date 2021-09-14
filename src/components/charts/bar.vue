<script>
export default {
    props: ['chart'],
    
    mounted() {
        this.renderChart(this.chart.data, this.chart.options);
    }
}
</script>