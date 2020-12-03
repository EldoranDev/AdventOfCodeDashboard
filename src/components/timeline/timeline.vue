<template>
  <v-timeline>
      <timeline-item v-for="{ node } in $static.allEvent.edges" :key="node.id" :event="node" />
  </v-timeline>
</template>

<static-query>
query {
  allEvent(sortBy: "timestamp", order: DESC) {
    edges {
      node {
        id
        type
        member
        timestamp
        part
        day
        intro
      }
    }
  }
}
</static-query>

<script>
import TimelineItem from './timeline-item.vue';

export default {
  components: {
    TimelineItem,
  },
}
</script>
