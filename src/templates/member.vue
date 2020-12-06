<template>
    <Layout>
        {{ $page.member }}

        <chart-line :data="starData" :options="{}" />
    </Layout>
</template>

<page-query>
query ($memberId: ID){
    member(id: $memberId) {
        id
        name
        events {
            id
            timestamp
        }
        medals {
            id
            day
            part
            place
        }
    }
}
</page-query>

<script>
import ChartLine from '../components/charts/line.vue';

export default {
    components: {
        ChartLine,
    },
    computed: {
        starData () {
            const stars = [];
            let count = 0;

            stars.push({ x: 0, y: 0});
            
            for (let event of this.$page.member.events.sort((a, b) => a.timestamp - b.timestamp)) {
                count++;
                stars.push({
                    x: event.timestamp,
                    y: count,
                });
            }

            return {
                labels: [0, ...Array.from( (new Array(25)).keys()).map((k) => Date.UTC(2020, 11, k, 5, 0) / 1000)],
                datasets: [ {
                    data: stars
                }],
            };
        }
    }
}
</script>

<style>

</style>