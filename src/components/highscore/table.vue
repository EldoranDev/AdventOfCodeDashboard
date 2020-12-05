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
                  <td> <Member :member="member" /></td>
                  <td> {{ member.score.local }}</td>

                  <td v-for="day in 25" :key="day">

                  </td>
              </tr>
          </tbody>
      </template>
  </v-simple-table>
</template>

<script>
import Member from '../member';

export default {
    components: {
        Member
    },
    props: {
      members: Array
    },
}
</script>

<style>

</style>