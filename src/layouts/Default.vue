<template>
  <v-app dark>
    <v-main>
      <v-container>
        <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
* {
  font-family: "Source Code Pro", monospace !important
}

.theme--dark.v-application,
.theme--dark.v-data-table {
  background-color: var(--v-background-base, #121212) !important;
  color: var(--v-primary--text-base )!important;
}

h1 {
  text-decoration: none;
  color: #00cc00;
  text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
}
</style>