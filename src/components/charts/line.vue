<script>
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: ['data', 'options'],
    mounted() {
        console.log(this.data);
        this.renderChart(this.data, this.options);
    }
}
</script>

<style>

</style>