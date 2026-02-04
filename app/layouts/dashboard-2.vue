<template>
  <div class="h-screen overflow-hidden bg-white text-slate-900 dark:bg-gray-900 dark:text-slate-50">
    <div class="flex h-full">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/50 md:hidden"
        @click="sidebarOpen = false"
      />

      <aside
        class="
          fixed md:static inset-y-0 left-0 z-50
          shrink-0
          transform transition-[transform,width] duration-300 ease-in-out
          md:translate-x-0
          bg-transparent
        "
        :class="[
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-[88px]' : 'w-[280px]',
        ]"
      >
        <Sidebar2
          :collapsed="isCollapsed"
          @toggle-collapse="toggleCollapse"
          @expand="setCollapsedExpanded"
        />
      </aside>

      <!-- Main -->
      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div class="sticky top-0 z-30">
          <AppHeader2
            @toggle-sidebar="sidebarOpen = true"
            @toggle-collapse="toggleCollapse"
          />
        </div>

        <main
          class="flex-1 overflow-y-auto"
          :class="isCollapsed && isCollapsedExpanded ? 'md:pl-72' : ''"
        >
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
const isCollapsed = ref(false)
const isCollapsedExpanded = ref(false)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  if (!isCollapsed.value) isCollapsedExpanded.value = false
}

function setCollapsedExpanded(value) {
  isCollapsedExpanded.value = value
}

onMounted(() => {
  if (!process.client) return
  const saved = localStorage.getItem("theme")
  if (saved === "dark") {
    document.documentElement.classList.add("dark")
  } else if (saved === "light") {
    document.documentElement.classList.remove("dark")
  }
})

</script>
