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
            <Member :member="event.member" /> got a <Star :points="event.points" /> by solving part {{ event.part }} of day {{ Number(event.day.id) + 1 }}
        </div>
    </v-timeline-item>
    <v-timeline-item  v-else color="green" :right="true">
        <template #opposite>
            <span :class="'headline font-weight-light'" v-text="date" />
        </template>
        <div class="py-8">
            <h2 :class="'headline font-weight-light mb-4'">
                Day {{ Number(event.day.id) + 1 }} - {{ event.day.name }}
            </h2>
            <div class="mb-4">
                {{ event.day.intro }}
            </div>

            <a :href="`https://adventofcode.com/${event.year}/day/${Number(event.day.id) + 1}`" target="_blank" rel="noopener noreferrer">
                Go to task
            </a>
        </div>
    </v-timeline-item>
</template>

<script>
import Member from '../member.vue';
import Star from '../star.vue';

export default {
    props: {
        event: Object,
    },
    components: {
        Member,
        Star
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
  .headline,
  a {
    text-decoration: none;
    color: #00cc00 !important;
    text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
  }
</style>