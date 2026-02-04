<template>
    <div class="mx-auto max-w-6xl p-4">
        <h1 class="text-5xl font-bold mx-auto text-center mt-12 "> Our Products</h1>
        <div class="mx-auto mt-4 h-1.5 w-16 bg-gradient-to-l from-orange-500 to-slate-950  rounded"></div>
<div class="grid lg:grid-cols-4 gap-4 py-12">
      <div v-for="p in products">
          <ProductCard :p="p" />
            </div>
        </div>
</div>
  
</template>

<script setup>


const { data: products} =  await useFetch('https://fakestoreapi.com/products')
</script>

<style  scoped>

</style>

