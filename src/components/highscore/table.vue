<template>
  <v-simple-table dense>
      <template #default>
          <thead>
              <th>Member</th>
              <th>Score</th>
              
              <th v-for="day in 25" :key="day">
                  {{day}}
              </th>
          </thead>
          <tbody>
              <tr v-for="member in members" :key="member.id">
                  <td class="member"> <Member :member="member" /></td>
                  <td class="score"><div class="d-flex justify-center">{{ member.score.local }}</div></td>

                  <td v-for="day in days" :key="day.id" width="60">  
                    <div  class="d-flex justify-center">
                    <template v-for="i in day.first.length">
                      <Medal
                        v-if="day.first[i-1].member.id === member.id"
                        :key="`1-${i}`"
                        :medal="day.first[i-1]"
                      />
                    </template>
                    
                    <template v-for="i in day.second.length">
                      <Medal
                        v-if="day.second[i-1].member.id === member.id"
                        :key="`2-${i}`"
                        :medal="day.second[i-1]"
                      />
                    </template>
                    </div>
                  </td>
                  <td v-for="day in (25-days.length)" :key="days.length+day" width="60"/>
              </tr>
          </tbody>
      </template>
  </v-simple-table>
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

<style scoped>
  td {
    padding: 0 !important;
    border: thin solid rgba(255, 255, 255, 0.12);
  }
  .member {
    width: 150px;
  }
</style>