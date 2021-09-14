<template>
  <table>
    <thead>
        <th>Member</th>
        <th>Score</th>

        <th v-for="day in 25" :key="day">
            {{day}}
        </th>
    </thead>
    <tbody>
        <tr v-for="member in members" :key="member.id">
            <td class="member">
              <Member :member="member" />
            </td>
            <td class="score">
              {{ member.score.local }}
            </td>
            <td v-for="day in days" :key="day.id" class="place">
              <nobr>
                <Medal 
                  v-for="event in Object.values(member.events).filter((e) => e.day.id === day.id)"
                  :key="event.id"
                  :place="event.place"
                  :part="event.part"
                />
              </nobr>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import Member from '../member.vue';
import Medal from './medal.vue';

export default {
    components: {
        Medal,
        Member
    },
    props: {
      members: Array,
      days: Array,
    },
}
</script>

<style lang="postcss" scoped>
  td {
    border: thin solid rgba(255, 255, 255, 0.12);
  }
  .member {
    @apply p-2;
  }

  .score {
    @apply flex justify-center p-2;
  }

  .place {
    text-align: center;
    min-width: 50px;  
  }
</style>