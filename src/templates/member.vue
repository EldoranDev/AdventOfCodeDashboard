<template>
    <Layout>
        <h1 class="text-h1 font-weight-thin text-center mb-10">Advent of Code 2020</h1>
        <navigation />

        <v-row class="justify-center mb-10">
        <h2>{{ $page.member.name }}</h2>
        </v-row> 
        <v-row class="justify-center">
            <v-simple-table>
                <template #default>
                    <tbody>
                        <tr v-for="(medal, i) in medals" :key="i">
                            <td>
                                <Medal :place="i+1" :part="1" /> / <Medal :place="i+1" :part="2" />
                            </td>
                            <td>
                                {{ medals[i][0] }} / {{ medals[i][1] }}
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-row>
        <v-row>
            <v-col>
                <chart-bar :chart="timeTakenBars" />
            </v-col>
        </v-row>
    </Layout>
</template>

<page-query>
query ($memberId: ID){
    member(id: $memberId) {
        id
        name
        color
        events {
            id
            day
            part
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
import Medal from '../components/highscore/medal.vue';
import Navigation from '../components/navigation.vue';
import ChartBar from '../components/charts/bar.vue';
import settings from '../components/charts/settings';
import { Chart } from 'chart.js';

export default {
    components: {
        ChartBar,
        Medal,
        Navigation,
    },
    computed: {
        medals () {
            //TODO: move computation to build time
            return this.$page.member.medals.reduce((carry, medal) => {
                carry[medal.place-1][medal.part-1]++;

                return carry;
            }, [[0 , 0], [0, 0], [0, 0]]);
        },
        days () {
            return Array.from( (new Array(25)).keys()).map((day) => ({
                start: (Date.UTC(2020, 11, day, 5) / 1000),
            }));
        },
        timeTakenBars () {

            return {
                data: {
                    labels: Array.from( (new Array(25)).keys()).map((l) => ++l),
                    datasets: [
                        {
                            label: "Part 1",
                            backgroundColor: this.$page.member.color,
                            stack: 'member',
                            data: this.$page.member.events.filter(e => e.part === 1).map((e) => ({
                                x: e.day,
                                y: ((e.timestamp - this.days[e.day].start) / 60).toFixed(2),
                            })),
                            
                        },
                        {
                            label: "Part 2",
                            stack: 'member',
                            backgroundColor: Chart.helpers.color(this.$page.member.color).alpha(0.5).rgbString(),
                            data: this.$page.member.events.filter(e => e.part === 2).map((e) => ({
                                x: e.day,
                                y: ((e.timestamp - this.days[e.day].start) / 60).toFixed(2),
                            })),
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    /*legend: {
                        position: "right",
                        labels: {
                            fontColor: settings.aocColors["main"],
                        },        
                    },*/
                    scales: {
                       xAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Day of Advent",
                                fontColor: settings.aocColors["main"],
                            },
                            gridLines: {
                                color: settings.aocColors["tertiary"],
                                zeroLinecolor: settings.aocColors["secondary"],
                            }
                        }],
                        yAxes: [{
                            // type: "",
                            ticks: {
                                fontColor: settings.aocColors["main"],
                                beginAtZero: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "minutes taken per star (log scale)",
                                fontColor: settings.aocColors["main"],
                            },
                            gridLines: {
                                color: settings.aocColors["tertiary"],
                                zeroLineColor: settings.aocColors["secondary"],
                            },
                        }]
                    }
                }
            }
        }
    }
}
</script>
