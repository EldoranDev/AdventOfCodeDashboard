<template>
    <Layout>
        <div class="member__row">
            <h2 class="member__name">{{ $page.member.name }}</h2>
        </div> 
        <repo
            v-if="$page.member.repo"
            class="member__row"
            :repo="$page.member.repo"
        />
        <div class="member__row">
            <table>
                <tbody>
                    <tr v-for="medal in $page.member.medals" :key="medal.place">
                        <td>
                            <Medal :place="medal.place-1" :part="1" /> / <Medal :place="medal.place-1" :part="2" />
                        </td>
                        <td>
                            {{ medal.first }} / {{ medal.second }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="isMounted">
            <div>
                <!--<chart-bar :chart="timeTakenBars" />-->
            </div>
        </div>
    </Layout>
</template>

<page-query>
query ($memberId: ID){
    member(id: $memberId) {
        id
        name
        color
        repo {
          language
          repo
          solutions {
            year
            day
            link
          }
        }
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
import Repo from '../components/member/repo';

import { Chart } from 'chart.js';

export default {
    components: {
        ChartBar,
        Medal,
        Navigation,
        Repo,
    },
    data() {
        return {
            isMounted: false,
        }
    },
    mounted() {
        this.isMounted = true;
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

<style lang="postcss">
    .member__row {
        @apply flex flex-wrap justify-center flex-auto;
    }

    .member__name {
        @apply text-2xl;
    }
</style>