<script>
import Chart from './chart';

export default {
    extends: Chart,
    props: ['chart'],
    data() {
        return {};
    },
    mounted() {
        this.renderChart('bar', this.chart.data, this.chart.options);
    }
}
</script>