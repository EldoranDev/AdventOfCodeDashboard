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
</style>