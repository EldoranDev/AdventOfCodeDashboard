<template>
  <span>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          <em>{{ member.name }}</em>
        </span>
      </template>
      {{ member.score.local}} | {{member.score.global}}
    </v-tooltip>
  </span>
</template>

<static-query>
query {
  allMember {
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
export default {
    props: {
        id: Number,
    },
    computed: {
        member () {
          const { node } = this.$static.allMember.edges.find(({ node }) => Number(node.id) === this.id);

          return node;
        },
    }
}
</script>

<style scoped>
  em {
    color: #ffffff;
    font-style: normal;
    text-shadow: 0 0 5px #ffffff;
  }
</style>