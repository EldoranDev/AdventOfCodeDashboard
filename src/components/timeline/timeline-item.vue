<template>
    <v-timeline-item
        v-if="event.type === 'STAR'"
        color="amber" 
        :icon="'mdi-star'"
        :left="true"
        class="text-right d-flex align-center"
    >
        <template #opposite>
            {{ time }}
        </template>
        <div>
            <Member :member="event.member" /> got a <em class="star">star</em> by solving part {{ event.part }} of day {{ event.day }}
        </div>
    </v-timeline-item>
    <v-timeline-item  v-else color="green" :right="true">
        <template #opposite>
            <span :class="'headline font-weight-light'" v-text="date" />
        </template>
        <div class="py-8">
            <h2 :class="'headline font-weight-light mb-4'">
                Day {{event.day}}
            </h2>
            <div class="mb-4">
                {{ event.intro }}
            </div>

            <a :href="`https://adventofcode.com/${event.year}/day/${event.day}`" target="_blank" rel="noopener noreferrer">
                Go to task
            </a>
        </div>
    </v-timeline-item>
</template>

<script>
import Member from '../member.vue';

export default {
    props: {
        event: Object,
    },
    components: {
        Member,
    },
    computed: {
        color () {
            return "#00cc00";
        },
        date () {
            return new Date(this.event.timestamp * 1000).toLocaleDateString();
        },
        time () {
            return new Date(this.event.timestamp * 1000).toLocaleTimeString();
        }
    }
}
</script>


<style scoped>
  em.star {
    color: #ffff66;
    font-style: normal;
    text-shadow: 0 0 5px #ffff66;
  }

  .headline,
  a {
    text-decoration: none;
    color: #00cc00 !important;
    text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
  }
</style>