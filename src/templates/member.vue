<template>
    <Layout class="member">
        <div class="row">
            <h2 class="name">{{ $page.member.name }}</h2>
        </div> 
        <repo
            v-if="$page.member.repo"
            class="member row"
            :repo="$page.member.repo"
        />
        <div class="row">
            <table class="medals">
                <tbody>
                    <tr
                        v-for="medal in $page.member.medals"
                        :key="medal.place"
                        class="row"
                    >
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
            <chart-bar :chart="timeTakenBars" />
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
                            backgroundColor: `${this.$page.member.color}`,
                            stack: 'member',
                            data: this.$page.member.events.filter(e => e.part === 1).map((e) => ({
                                x: Number(e.day.id),
                                y: Number((e.timeTaken / 60).toFixed(2)),
                            })),
                            
                        },
                        {
                            label: "Part 2",
                            stack: 'member',
                            backgroundColor: `${this.$page.member.color}66`,
                            data: this.$page.member.events.filter(e => e.part === 2).map((e) => ({
                                x: Number(e.day.id),
                                y: Number((e.timeTaken / 60).toFixed(2)),
                            })),
                        }
                    ],
                },
                options: {
                    legend: {
                        position: "right",
                        labels: {
                            color: settings.aocColors["main"],
                        },        
                    },
                    scales: {
                       xAxes: {
                            stacked: true,
                            title: {
                                display: true,
                                text: "Day of Advent",
                                color: settings.aocColors["main"],
                            },
                            grid: {
                                color: settings.aocColors["tertiary"],
                                zeroLinecolor: settings.aocColors["secondary"],
                            }
                        },
                        yAxes: {
                            ticks: {
                                color: settings.aocColors["main"],
                                beginAtZero: true,
                            },
                            title: {
                                display: true,
                                text: "minutes taken per star",
                                color: settings.aocColors["main"],
                            },
                            grid: {
                                color: settings.aocColors["tertiary"],
                                zeroLineColor: settings.aocColors["secondary"],
                            },
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="postcss">
    .member {
        & .row {
            @apply flex flex-wrap justify-center flex-auto mt-5;
        }

        & .name {
            @apply text-2xl;
        }

        & .medals {
            & > tbody > .row {
                @apply h-12;

                & td {
                    @apply px-4;
                    vertical-align: middle;
                }

                &:not(:last-of-type) {
                    &> td {
                        border-bottom: thin solid hsla(0,0%,100%,.12);
                    }
                }
            } 
        }
    }
</style>