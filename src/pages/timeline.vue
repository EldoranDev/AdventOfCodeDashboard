<template>
  <Layout>
    <div class="flow-root w-full xl:w-2/3 m-auto">
        <ul role="list" class="-mb-8">
            <timeline-item
                v-for="event in events"
                :key="event.id"
                :event="event"
            />
        </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  events: allEvent(sortBy: "timestamp", order: ASC) {
    edges {
      node {
        id
        type
        member {
          id
          name
          repo {
              language
          }
          score {
            local
            global
          }
        }
        points
        timestamp
        year
        day {
          id
          intro
          name
        }
        part
      }
    }
  }
}
</page-query>

<script>
import Member from '../components/member';
import Star from '../components/star';
import TimelineItem from '../components/timeline/timeline-item';

export default {
    components: {
        Member,
        Star,
        TimelineItem,
    },
    data() {
        return {
            day: 0,
        };
    },
    computed: {
        events() {
            return this.$page.events.edges.map(({ node: event }) => event).filter(event => {
                return Number(event.day.id) === this.day;
            });
        }
    }
}
</script>