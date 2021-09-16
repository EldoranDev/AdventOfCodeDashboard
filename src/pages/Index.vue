<template>
  <Layout>
    <highscore-table
      :members="$page.members.edges.map(({ node }) => node)"
      :days="$page.days.edges.map(({ node }) => node)"
    />
    <!--<member-timeline />-->
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