<template>
    <div class="flex flex-col bg-white  p-4 shadow-xl rounded-lg h-84 hover:border-orange-500 border-2 transition duration-300 overflow-hidden">
        <div class="flex justify-center">
        <img :src="p.image" :alt="p.title" class="h-48 w-48 object-contain  cursor-pointer transition-transform duration-300 ease-out hover:scale-105 mr-4"/>

        </div>
        <div>
  <NuxtLink :to="`/products/${p.id}`" class="flex flex-col py-5">
                <h2 class="text-lg font-semibold mb-2 hover:text-orange-500 truncate max-w-72">{{ p.title }}</h2>
                <p class="text-2xl font-bold text-orange-700 ">{{ p.price }} FCFA</p>
            </NuxtLink>
        </div>

    </div>
</template>

<script setup>
const { p } = defineProps(['p'])
</script>

<style  scoped>

</style>