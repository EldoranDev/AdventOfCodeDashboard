<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: ['chart'],
    
    mounted() {
        this.renderChart(this.chart.data, this.chart.options);
    }
}
</script>