<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur
           supports-[backdrop-filter]:bg-white/60 shadow-[0_8px_24px_rgba(15,23,42,0.08)]
           dark:border-white/10 dark:bg-[#0B1228]/90 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
  >
    <div class="mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">
      <div class="h-16 md:h-20 flex items-center gap-2">
        <!-- Left cluster -->
        <div class="flex items-center gap-1.5">
           <button
            class="md:hidden h-10 w-10 grid place-items-center rounded-xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            @click="$emit('toggle-sidebar')"
            aria-label="Open sidebar"
          >
            <Icon name="heroicons:bars-3" class="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </button>

          <!-- Mobile search toggle -->
          <button
            class="md:hidden h-10 w-10 grid place-items-center rounded-xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            :aria-label="isSearchOpen ? 'Close search' : 'Open search'"
            title="Search"
            @click="toggleSearch"
          >
            <Icon
              :name="isSearchOpen ? 'heroicons:x-mark' : 'heroicons:magnifying-glass'"
              class="w-6 h-6 text-slate-700 dark:text-slate-200"
            />
          </button>

          <!-- Page title (large screens) -->
          <div class="hidden lg:flex items-center gap-3 pr-2">
            <span class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ pageTitle }}
            </span>
            <span class="h-5 w-px bg-slate-200/80 dark:bg-white/10" />
          </div>

          <!-- Desktop search -->
          <div
            class="hidden md:flex items-center gap-2 h-11 rounded-2xl w-[28rem] px-3
                   bg-white border border-slate-200/70 shadow-sm
                   dark:bg-[#0B1228]/90 dark:border-white/10"
          >
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <input
              v-model="q"
              class="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400
                     dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Search menu…"
            />
            <button
              v-if="q"
              class="h-8 w-8 grid place-items-center rounded-xl transition
                     hover:bg-slate-100 active:bg-slate-200
                     dark:hover:bg-white/10 dark:active:bg-white/15"
              @click="q = ''"
              aria-label="Clear"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4 text-slate-600 dark:text-slate-200" />
            </button>

            <div class="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-400">
              <span class="px-1.5 py-0.5 rounded-lg border border-slate-200 dark:border-white/10">⌘</span>
              <span class="px-1.5 py-0.5 rounded-lg border border-slate-200 dark:border-white/10">K</span>
            </div>
          </div>
        </div>

        <div class="flex-1" />

        <!-- Right cluster -->
        <div class="flex items-center gap-2">
          <!-- Language pill -->
          <div
            class="hidden sm:flex items-center rounded-2xl shadow-sm overflow-hidden
                   bg-white border border-slate-200/70
                   dark:bg-[#0B1228]/90 dark:border-white/10"
            role="group"
            aria-label="Language"
          >
            <button
              class="px-3 h-10 text-sm font-semibold transition-colors"
              :class="lang === 'EN'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'"
              @click="setLang('EN')"
            >
              ENG
            </button>
            <button
              class="px-3 h-10 text-sm font-semibold transition-colors"
              :class="lang === 'FR'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'"
              @click="setLang('FR')"
            >
              FRE
            </button>
          </div>

          <!-- Theme -->
          <button
            class="h-10 w-10 grid place-items-center rounded-xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            @click="toggleTheme"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            title="Toggle theme"
          >
            <Icon name="heroicons:moon" class="w-6 h-6 text-slate-700 dark:hidden" />
            <Icon name="heroicons:sun" class="hidden w-6 h-6 text-slate-200 dark:block" />
          </button>

          <!-- Notifications -->
          <button
            class="relative h-10 w-10 grid place-items-center rounded-xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            aria-label="Notifications"
          >
            <Icon name="heroicons:bell" class="w-6 h-6 text-slate-700 dark:text-slate-200" />
            <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4c6fff]" />
          </button>

          <!-- Profile -->
          <button
            class="h-10 px-2.5 flex items-center gap-2 rounded-2xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            aria-label="Profile"
          >
            <span
              class="h-8 w-8 rounded-xl grid place-items-center text-xs font-semibold
                     bg-slate-200 text-slate-700
                     dark:bg-white/10 dark:text-slate-100"
            >
              KO
            </span>
            <span class="hidden md:block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Kelly
            </span>
            <Icon name="heroicons:chevron-down" class="hidden md:block w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>

          <!-- Logout (mobile / tablet) -->
          <button
            class="h-10 w-10 grid place-items-center lg:hidden rounded-xl transition
                   hover:bg-slate-100 active:bg-slate-200
                   dark:hover:bg-white/10 dark:active:bg-white/15"
            aria-label="Logout"
            title="Logout"
            @click="doLogout"
          >
            <Icon name="heroicons:arrow-right-on-rectangle" class="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </div>

      <!-- Mobile search drawer -->
      <Transition name="search-float">
        <div v-show="isSearchOpen" class="md:hidden pb-3">
          <div
            class="flex items-center gap-2 px-3 h-12 rounded-2xl w-full
                   bg-white border border-slate-200/70 shadow-sm
                   dark:bg-[#0B1228]/90 dark:border-white/10"
          >
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <input
              ref="mobileSearchRef"
              v-model="q"
              class="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400
                     dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Search menu…"
            />
            <button
              v-if="q"
              class="h-9 w-9 grid place-items-center rounded-xl transition
                     hover:bg-slate-100 active:bg-slate-200
                     dark:hover:bg-white/10 dark:active:bg-white/15"
              @click="q = ''"
              aria-label="Clear"
            >
              <Icon name="heroicons:x-mark" class="w-5 h-5 text-slate-600 dark:text-slate-200" />
            </button>
          </div>

          <!-- Mobile language (since desktop pill is hidden on xs) -->
          <div class="pt-2 sm:hidden">
            <div
              class="inline-flex items-center rounded-2xl shadow-sm overflow-hidden
                     bg-white border border-slate-200/70
                     dark:bg-[#0B1228]/90 dark:border-white/10"
              role="group"
              aria-label="Language"
            >
              <button
                class="px-3 h-10 text-sm font-semibold transition-colors"
                :class="lang === 'EN'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'"
                @click="setLang('EN')"
              >
                ENG
              </button>
              <button
                class="px-3 h-10 text-sm font-semibold transition-colors"
                :class="lang === 'FR'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'"
                @click="setLang('FR')"
              >
                FRE
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
const route = useRoute()

const q = ref("")
const lang = ref("EN")
const isSearchOpen = ref(false)
const mobileSearchRef = ref(null)
const isDark = ref(false)

const emit = defineEmits([
  "toggle-sidebar",
  "nav-search",
  "toggle-theme",
  "change-lang",
  "logout",
])

watch(q, (v) => emit("nav-search", v))

const pageTitle = computed(() => {
  const metaTitle = route.meta?.title
  if (typeof metaTitle === "string" && metaTitle.trim()) return metaTitle

  if (typeof route.name === "string" && route.name.trim()) {
    return route.name
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ")
  }

  if (route.path === "/") return "Dashboard"
  const last = route.path.split("/").filter(Boolean).pop() || "Dashboard"
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
})

function toggleTheme() {
  if (!process.client) return
  const root = document.documentElement
  const next = !root.classList.contains("dark")
  root.classList.toggle("dark", next)
  isDark.value = next
  localStorage.setItem("theme", next ? "dark" : "light")
  emit("toggle-theme", next)
}

onMounted(() => {
  if (!process.client) return
  const saved = localStorage.getItem("theme")
  if (saved === "dark") {
    document.documentElement.classList.add("dark")
  } else if (saved === "light") {
    document.documentElement.classList.remove("dark")
  }
  isDark.value = document.documentElement.classList.contains("dark")
})

function setLang(code) {
  lang.value = code
  emit("change-lang", code)
}

async function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    mobileSearchRef.value?.focus()
  } else {
    q.value = ""
  }
}

function doLogout() {
  emit("logout")
}
</script>

<style scoped>
.search-float-enter-active,
.search-float-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.search-float-enter-from,
.search-float-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.search-float-enter-to,
.search-float-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
