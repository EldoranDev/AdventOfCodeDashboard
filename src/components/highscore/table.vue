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
              <tr v-for="{ node } in $static.allMember.edges" :key="node.id">
                  <td> <Member :id="Number(node.id)" /></td>
                  <td> {{ node.score.local }}</td>

                  <td v-for="day in 25" :key="day">

                  </td>
              </tr>
          </tbody>
      </template>
  </v-simple-table>
</template>

<static-query>
  query {
    allMember(sortBy: "score.local", order: DESC) {
      edges {
        node {
          id
          name
          score {
            local
            global
          }
        }
      }
    }
  }
</static-query>

<script>
import Member from '../member';

export default {
    components: {
        Member
    }
}
</script>

<style>

</style>