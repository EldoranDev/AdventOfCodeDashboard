<template>
    <!--<v-timeline-item
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
    </v-timeline-item>-->
    <li>
        <div class="relative pb-8">
            <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex space-x-6">
                <div>
                    <span :class="circleClasses">
                    <!-- Heroicon name: solid/user -->

                    </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex space-x-4"  >
                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        <time :datetime="time">{{ time }}</time>
                    </div>
                    <div v-if="star">
                        <p class="text-sm text-gray-500">
                            <Member :member="event.member" /> got a <Star :points="event.points" /> by solving part {{ event.part }} of day {{ Number(event.day.id) + 1 }}
                        </p>
                    </div>
                    <div v-else>
                            <h2 class="timeline-item__intro-header">
                                Day {{ Number(event.day.id) + 1 }} - {{ event.day.name }}
                            </h2>
                            <div class="mb-4">
                                {{ event.day.intro }}
                            </div>

                            <a
                                :href="`https://adventofcode.com/${event.year}/day/${Number(event.day.id) + 1}`"
                                
                                target="_blank"
                                rel="noopener noreferrer"

                                class="timeline-item__link"
                            >
                                Go to task
                            </a>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import Member from '../member.vue';
import Star from '../star.vue';

const EVENT_START = 'START';
const EVENT_STAR = 'STAR';

export default {
    props: {
        event: Object,
    },
    components: {
        Member,
        Star
    },
    computed: {
        star() {
            return this.event.type === EVENT_STAR;
        },
        circleClasses() {
            return {
                'timeline-item__circle': true,
                'timeline-item__circle--start': this.event.type === EVENT_START,
            };
        },
        time () {
            return new Date(this.event.timestamp * 1000).toLocaleTimeString();
        }
    }
}
</script>

<style lang="postcss">
    .timeline-item__circle {
        @apply h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center ring-4 ring-white;
    }

    .timeline-item__circle--start {
        @apply bg-aoc-green;
    }

    .timeline-item__intro-header {
        @apply text-5xl font-thin pb-3 text-aoc-green;
        font-family: "Roboto";
        text-decoration: none;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
    }

    .timeline-item__link {
        @apply text-aoc-green;
        text-decoration: none;
        text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
    }
</style>