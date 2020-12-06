<script>
import { Scatter } from 'vue-chartjs';

export default {
    extends: Scatter,
    props: ['chart'],
    mounted() {
        this.renderChart({ datasets: this.chart.datasets }, this.chart.options);
    }
}
</script>