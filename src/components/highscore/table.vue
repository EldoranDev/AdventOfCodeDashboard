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

                  <td v-for="day in days" :key="day.id" class="px-0 place">
                    <div class="d-flex justify-center">
                      <nobr>
                        <Medal 
                          v-for="event in Object.values(member.events).filter((e) => e.day.id === day.id)"
                          :key="event.id"
                          :place="event.place"
                          :part="event.part"
                        />
                      </nobr>
                    </div>
                  </td>
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
  td{
    border: thin solid rgba(255, 255, 255, 0.12);
  }

  td.place {
    min-width: 50px;
  }
</style>