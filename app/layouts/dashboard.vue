<template>
  <div class="h-screen bg-white overflow-hidden">
    <div class="flex h-full">

      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/50 md:hidden"
        @click="sidebarOpen = false"
      />

      <aside
        class="
          fixed md:static inset-y-0 left-0 z-50
          w-[280px] shrink-0
          transform transition-transform duration-300
          md:translate-x-0
        "
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <Sidebar1 />
      </aside>

      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div class="sticky top-0 z-30">
          <AppHeader1 @toggle-sidebar="sidebarOpen = true" />
        </div>

         <main class="flex-1 overflow-y-auto">
          <div class="p-4">
            <slot />
          </div>
        </main>
      </div>

    </div>
  </div>
</template>

<script setup>

const sidebarOpen = ref(false)
</script>
