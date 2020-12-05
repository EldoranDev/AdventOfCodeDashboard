<template>
    <Layout>
        <span>{{ $page }}</span>
    </Layout>
</template>

<page-query>
query ($memberId: ID){
    member(id: $memberId) {
        id
        name
        events {
            id
            timestamp
        }
    }
}
</page-query>

<script>
export default {

}
</script>

<style>

</style>