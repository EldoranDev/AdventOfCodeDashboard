<script>
import Chart from './chart';

export default {
    extends: Chart,
    props: ['chart'],
    data() {
        return {};
    },
    mounted() {
        this.renderChart('scatter', { datasets: this.chart.datasets }, this.chart.options);
    }
}
</script>