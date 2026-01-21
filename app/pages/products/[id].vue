<template>
    <div class="max-w-6xl flex mx-auto">
<ProductDetail :product="product"/>    </div>
</template>

<script setup>
definePageMeta({
    layout: 'product'
 })
 const { id } = useRoute().params

 const api = 'https://fakestoreapi.com/products/' + id

const { data: product } =  await useFetch(api)
</script>

<style scoped>
    

</style>