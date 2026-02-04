<template>
  <header
    class="sticky top-0 z-30 bg-slate-50 border-b border-slate-200 shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
  >
    <div class="h-20 x-2 md:px-6 flex items-center">
      <div class="flex items-center ">
        <button
          class="md:hidden h-11 w-11 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors"
          @click="$emit('toggle-sidebar')"
          aria-label="Open sidebar"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6 text-slate-700" />
        </button>

        <button
          class="md:hidden h-11 w-11 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors"
          :aria-label="isSearchOpen ? 'Close search' : 'Open search'"
          title="Search"
          @click="toggleSearch"
        >
          <Icon
            :name="isSearchOpen ? 'heroicons:x-mark' : 'heroicons:magnifying-glass'"
            class="w-6 h-6 text-slate-700"
          />
        </button>

        <div
          class="hidden md:flex items-center gap-2 px-3 h-11 rounded-lg
                 bg-white border border-slate-200 w-96 shadow-sm ml-2"
        >
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-500" />
          <input
            v-model="q"
            class="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            placeholder="Search menu…"
          />
          <button
            v-if="q"
            class="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-100 transition"
            @click="q = ''"
            aria-label="Clear"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      <div class="flex-1" />
      <div class="flex items-center ">
        <div
          class="flex items-center rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden
                 scale-[0.92] sm:scale-100 origin-right"
        >
          <button
            class="px-2 h-9 text-xs font-semibold transition-colors sm:px-3 sm:h-10 sm:text-sm"
            :class="lang === 'EN' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'"
            @click="setLang('EN')"
          >
            ENG
          </button>
          <button
            class="px-2 h-9 text-xs font-semibold transition-colors sm:px-3 sm:h-10 sm:text-sm"
            :class="lang === 'FR' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'"
            @click="setLang('FR')"
          >
            FRE
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2 ml-3 mr-1">
        <button
          class="w-8 md:h-11 md:w-11 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          title="Toggle theme"
        >
          <Icon :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" class="w-6 h-6 text-slate-700" />
        </button>

        <button
          class="relative w-8 md:h-11 md:w-11 grid place-items-center rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Icon name="heroicons:bell" class="w-6 h-6 text-slate-700" />
          <span class="absolute top-1 md:top-3 right-2 md:right-3 h-2 w-2 rounded-full bg-[#4c6fff]" />
        </button>

        <button
          class="w-8 md:h-11 md:w-auto md:px-2 flex items-center justify-center md:gap-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Profile"
        >
          <span class="h-9 w-9 rounded-full bg-slate-200 grid place-items-center text-xs font-semibold text-slate-700">
            KO
          </span>
          <span class="hidden md:block text-sm font-medium text-slate-800">
            Kelly
          </span>
        </button>

        <button
          class="h-11 w-11 grid place-items-center lg:hidden rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Logout"
          title="Logout"
          @click="doLogout"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-6 h-6 text-slate-700" />
        </button>
      </div>
    </div>

    <Transition name="search-float">
      <div
        v-show="isSearchOpen"
        class="md:hidden absolute left-0 right-0 top-[76px] px-4 pb-4 z-40"
      >
        <div class="flex items-center gap-2 px-3 h-12 rounded-lg bg-white border border-slate-200 shadow-sm w-full">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-slate-500" />
          <input
            ref="mobileSearchRef"
            v-model="q"
            class="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            placeholder="Search menu…"
          />
          <button
            v-if="q"
            class="h-9 w-9 grid place-items-center rounded-md hover:bg-slate-100 transition"
            @click="q = ''"
            aria-label="Clear"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>

const q = ref("")
const lang = ref("EN")
const isDark = ref(false)
const isSearchOpen = ref(false)
const mobileSearchRef = ref(null)

const emit = defineEmits([
  "toggle-sidebar",
  "nav-search",
  "toggle-theme",
  "change-lang",
  "logout",
])

watch(q, (v) => emit("nav-search", v))

function toggleTheme() {
  isDark.value = !isDark.value
  emit("toggle-theme", isDark.value)
}

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
  transition: transform 0.45s ease, opacity 0.45s ease;
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
