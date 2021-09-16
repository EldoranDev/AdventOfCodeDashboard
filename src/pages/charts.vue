<template>
  <Layout>
    <div class="chart">
        <chart-scatter :chart="completionScatter" style="height: 500px" />
    </div>
  </Layout>
</template>

<page-query>
  query {
    members: allMember {
        edges {
            node {
                id
                name
                color
                events {
                    day {
                        id
                    }
                    part
                    timeTaken
                    timestamp
                }
            }
        }
    }
    days: allDay {
        edges {
            node {
                id
                start
            }
        }
    }
  }
</page-query>

<script>
import ChartScatter from '../components/charts/scatter';


import settings from '../components/charts/settings';

export default {
  components: {
      ChartScatter,
  },
  metaInfo: {
    title: 'Charts',
  },
  computed: {
      completionScatter () {
          //TODO: move out of this file and try to recude code duplication for charts
          // Maybe us defaults with deep merge
          
          return {
              datasets: this.$page.members.edges.map(({node}) => ({
                borderWith: 1,
                borderColor: '#000',
                backgroundColor: node.color,
                pointRadius: 6,
                label: node.name, 
                data: node.events.map((e) => ({
                    x: e.day.id,
                    y: e.timeTaken,
                })) 
            })),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                styles: "height: 600px",
                layout: {
                    padding: '10px',
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (item, _) =>  {
                                console.log(item);
                                const time = new Date(0);
                                time.setSeconds(item.value);
                                // TODO: switch to better formating for Date related stuff
                                // (maybe momentjs for calculations/formating)
                                return `Day ${item.label} took ${(item.parsed.y/60).toFixed()} minutes to complete`;
                            },
                        }
                    },
                },
                legend: {
                    position: "right",
                    labels: {
                        color: settings.aocColors["main"],
                    },        
                },
                scales: {
                    xAxis: {
                        min: 0,
                        max: 25,
                        title: {
                            display: true,
                            align: 'center',
                            text: "Day of Advent",
                            color: settings.aocColors["main"],
                        },
                        grid: {
                            color: settings.aocColors["tertiary"],
                            zeroLinecolor: settings.aocColors["secondary"],
                        },
                        ticks: {
                            stepSize: 1,
                        }
                    },
                    yAxis: {
                        type: "logarithmic",
                        ticks: {
                            color: settings.aocColors["main"],
                        },
                        title: {
                            display: true,
                            text: "minutes taken per star (log scale)",
                            color: settings.aocColors["main"],
                        },
                        grid: {
                            color: settings.aocColors["tertiary"],
                            zeroLineColor: settings.aocColors["secondary"],
                        },
                    }
                }
            },
          };
      }
  },
}
</script>
