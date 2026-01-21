<template>
    <div>
<NuxtRouteAnnouncer />
<header>
    <nav class="bg-slate-950 p-4 ">
        <div class="max-w-6xl mx-auto flex justify-between ">
            <div>
                <NuxtLink to="/" class="flex justify-center text-white">
                    <img src="https://glotelho.cm/_ipx/_/temp/glotelho-e-commerce-logo-white-220x60.png" alt="Glotelho Logo" class="h-8 inline-block mr-2"/>   
                    <span class="font-semibold text-2xl">Kingston</span>
                </NuxtLink>
            </div>

  <ul class="flex space-x-4 text-lg text-white">
            <li class="hover:text-orange-500"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="hover:text-orange-500"><NuxtLink to="/about-us">About Us</NuxtLink></li>
            <li class="hover:text-orange-500"><NuxtLink to="/products">Products</NuxtLink></li>
            <li class="hover:text-orange-500"><NuxtLink to="/orders">Orders</NuxtLink></li>
            <li class="hover:text-orange-500"><NuxtLink to="/table">Table</NuxtLink></li>
        </ul>
        </div>
      
    </nav>
</header>
    </div>
</template>

<script>

</script>

<style  scoped>
    .router-link-active {
        font-weight: bold;
        text-decoration: underline;
        color: #ff8a4c;
    }
</style>