<template>
  <Layout>
    <div class="flow-root w-full xl:w-2/3 m-auto">
      <paginator class="mb-12" v-model="day" :min="0" :max="highestDay" :size="4" />
      <ul role="list" v-if="day !== null">
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
        solution
      }
    }
  }
}
</page-query>

<script>
import Member from '../components/member';
import Star from '../components/star';
import TimelineItem from '../components/timeline/timeline-item';
import Paginator from '../components/paginator';

export default {
    components: {
        Member,
        Star,
        TimelineItem,
        Paginator,
    },
    data() {
        return {
            day: null,
        };
    },
    computed: {
        events() {
            return this.$page.events.edges.map(({ node: event }) => event).filter(event => {
                return Number(event.day.id) === this.day;
            });
        },
        highestDay() {
          let highest = 0;

          for (let { node: event } of this.$page.events.edges) {
            if (Number(event.day.id) > highest) {
              highest = Number(event.day.id)
            }
          }

          return highest;
        },
    },
    mounted() {
      this.day = this.highestDay;
    }
}
</script>