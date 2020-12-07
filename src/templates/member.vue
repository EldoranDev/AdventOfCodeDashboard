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
                        <tr v-for="medal in $page.member.medals" :key="medal.place">
                            <td>
                                <Medal :place="medal.place" :part="1" /> / <Medal :place="medal.place" :part="2" />
                            </td>
                            <td>
                                {{ medal.first }} / {{ medal.second }}
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
        medals {
            place
            first
            second
        }
        events {
            id
            day {
                id
                start
            }
            part
            timestamp
            timeTaken
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
                                y: (e.timeTaken / 60).toFixed(2),
                            })),
                            
                        },
                        {
                            label: "Part 2",
                            stack: 'member',
                            backgroundColor: Chart.helpers.color(this.$page.member.color).alpha(0.5).rgbString(),
                            data: this.$page.member.events.filter(e => e.part === 2).map((e) => ({
                                x: e.day,
                                y: (e.timeTaken / 60).toFixed(2),
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
                                labelString: "minutes taken per star",
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
