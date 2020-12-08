<template>
  <Layout>
    <h1 class="text-h1 font-weight-thin text-center mb-10">Advent of Code 2020</h1>
    <navigation />
    <highscore-table
      class="mb-10"
      :members="$page.members.edges.map(({ node }) => node)"
      :days="$page.days.edges.map(({ node }) => node)"
    />
    <member-timeline />
  </Layout>
</template>

<page-query>
  query {
    members: allMember(sortBy: "score.local", order: DESC) {
      edges {
        node {
          id
          name
          score {
            local
            global
          }
          events {
            place
            day {
              id
            }
            part
          }
        }
      }
    }
    days: allDay(sortBy: "id", order: ASC) {
      edges {
        node {
          id
        }
      }
    }
  }
</page-query>

<script>
import MemberTimeline from '../components/timeline/timeline.vue';
import HighscoreTable from '../components/highscore/table.vue';
import Navigation from '../components/navigation.vue';

export default {
  components: {
    HighscoreTable,
    MemberTimeline,
    Navigation,
  },
  metaInfo: {
    title: 'Leaderbord',
  },
}
</script>

<style scoped>
</style>
