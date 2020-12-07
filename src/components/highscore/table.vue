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
                  <td><div class="d-flex justify-center">{{ member.score.local }}</div></td>

                  <!-- <td v-for="day in days" :key="day.id" class="px-0">  
                    <div  class="d-flex justify-center">
                      <nobr>
                        <template v-for="i in day.first.length">
                          <Medal
                            v-if="day.first[i-1].member.id === member.id"
                            :key="`1-${i}`"
                            :part="day.first[i-1].part"
                            :place="day.first[i-1].place"
                          />
                        </template>
                        
                        <template v-for="i in day.second.length">
                          <Medal
                            v-if="day.second[i-1].member.id === member.id"
                            :key="`2-${i}`"
                            :part="day.second[i-1].part"
                            :place="day.second[i-1].place"
                          />
                        </template>
                      </nobr>
                    </div>
                  </td>-->
                  <!-- <td v-for="day in (25-days.length)" :key="days.length+day"/>-->
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
    border: thin solid rgba(255, 255, 255, 0.12);
  }
</style>