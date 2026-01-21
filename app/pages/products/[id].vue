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

const { data: product, error } =  await useFetch(api)

if (!product.value || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found'
  })
}
</script>

<style scoped>
    

</style>