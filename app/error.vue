<template>
    <div class="min-h-screen bg-slate-950 justify-center flex text-white text-center items-center">

        <div class="shadow-lg bg-gray-800 p-8 text-2xl rounded-2xl">
            <h1 class="text-6xl font-bold mb-4 hover:text-orange-500">
                {{ error.statusCode }}
            </h1>
            <p> Oooooooppssssss</p>
            <p class="text-red-500 mt-4">{{ error.message }}</p>

        <button class="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600" @click="$router.push('/')">
            Go Back Home 
        </button>
        </div>
    </div>
</template>

<script setup>
defineProps(['error'])
    </script>
