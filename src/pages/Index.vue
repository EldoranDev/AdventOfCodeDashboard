<template>
  <Layout>
    <h1 class="text-h1 font-weight-thin text-center mb-10">Advent of Code 2020</h1>
    <highscore-table class="mb-10" :members="$page.members.edges.map(({ node }) => node)"/>
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
        }
      }
    }
  }
</page-query>

<script>
import MemberTimeline from '../components/timeline/timeline.vue';
import HighscoreTable from '../components/highscore/table.vue';

export default {
  components: {
    HighscoreTable,
    MemberTimeline,
  },
  metaInfo: {
    title: 'Leaderbord',
  },
}
</script>

<style scoped>
h1 {
  text-decoration: none;
  color: #00cc00;
  text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
}
</style>
