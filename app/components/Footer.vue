<template>
    <div>
        <footer class="mb-0 bg-slate-950 text-white">
            <div>
                <div class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-4 md:mb-0">
                            <NuxtLink to="/" class="flex justify-center text-white">
                                <img src="https://glotelho.cm/_ipx/_/temp/glotelho-e-commerce-logo-white-220x60.png" alt="Glotelho Logo" class="h-8 inline-block mr-2"/>   
                                <span class="font-semibold text-2xl">Kingston</span>
                            </NuxtLink>
                        </div>  
                        <div>
                            <nav class="flex space-x-6">
                                <NuxtLink to="/" class="hover:text-orange-500">Home</NuxtLink>
                                <NuxtLink to="/about-us" class="hover:text-orange-500">About Us</NuxtLink>
                                <NuxtLink to="/products" class="hover:text-orange-500">Products</NuxtLink>
                                <NuxtLink to="/careers" class="hover:text-orange-500">Careers</NuxtLink>
                            </nav>
                        </div>
                    </div></div>
            </div>
            <p class="text-center py-4 border-t mt-12"> &copy; 2026 Kings Glotelho Test Interview </p>

        </footer>
    </div>
</template>

<script setup>

</script>

<style  scoped>
    .router-link-active {
        font-weight: bold;
        text-decoration: underline;
        color: #ff8a4c;
    }
</style>