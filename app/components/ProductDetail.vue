<template>
    <div class="grid grid-cols-2 gap-8">

        <div class="p-8">
            <img :src="product.image" :alt="product.title" class="mx-auto h-96 w-96 object-contain hover:scale-105 transition duration-300 cursor-pointer"/>
        </div>
        <div class="p-8 flex flex-col justify-center">
            <h1 class="text-4xl font-bold mb-4">{{ product.title }}</h1>
            <p class="text-2xl text-orange-700 font-semibold mb-6">{{ product.price }} FCFA</p>
            <p class="text-lg mb-6">{{ product.description }}</p>
            <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 w-40">
                Add to Cart
            </button>
                </div>

    </div>
</template>

<script setup>
const { product } = defineProps(['product'])
</script>

<style scoped>

</style>