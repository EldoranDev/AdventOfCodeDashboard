<template>
  <Layout>
    <h1 class="text-h1 font-weight-thin text-center mb-10">Advent of Charts 2020</h1>
    <navigation />
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
                    day
                    part
                    timestamp
                }
            }
        }
    }
  }
</page-query>

<script>
import ChartScatter from '../components/charts/scatter';
import Navigation from '../components/navigation';

import settings from '../components/charts/settings';

export default {
  components: {
      ChartScatter,
      Navigation,
  },
  metaInfo: {
    title: 'Charts',
  },
  computed: {
      days () {
          //TODO: move computation to build time
          return Array.from( (new Array(25)).keys()).map((day) => ({
            start: (Date.UTC(2020, 11, day, 5) / 1000),
          }));
      },
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
                    x: e.day,
                    y: e.timestamp - this.days[e.day].start,
                })) 
            })),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                styles: "height: 600px",
                tooltips: {
                    callbacks: {
                        label: (item, _) =>  {
                            const time = new Date(0);
                            time.setSeconds(item.value);
                            // TODO: switch to better formating for Date related stuff
                            // (maybe momentjs for calculations/formating)
                            return `Day ${item.label} took ${(item.value/60) | 0} minutes to complete`;
                        },
                    }
                },
                legend: {
                    position: "right",
                    labels: {
                        fontColor: settings.aocColors["main"],
                    },        
                },
                scales: {
                    xAxes: [{
                        ticks: { min: 0, max: 25, stepSize: 1},
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
                        type: "logarithmic",
                        ticks: {
                                fontColor: settings.aocColors["main"],
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
            },
          };
      }
  },
}
</script>
