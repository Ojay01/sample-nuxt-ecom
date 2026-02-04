<template>
  <div class="relative">
    <!-- Group button -->
    <button
      ref="btnEl"
      type="button"
      class="group w-full flex items-center gap-3 h-12 rounded-xl transition-colors duration-200"
      :class="[
        collapsed ? 'px-3 justify-center' : 'px-4',
        active ? 'bg-gray-600 text-white' : 'text-white/80 hover:bg-white/10',
      ]"
      :aria-expanded="collapsed ? undefined : (open ? 'true' : 'false')"
      @click="onClick"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @focusin="onEnter"
      @focusout="onLeave"
    >
      <Icon :name="icon" class="w-6 h-6 shrink-0" />

      <!-- label only when expanded -->
      <span v-if="!collapsed" class="font-semibold text-base truncate">
        {{ label }}
      </span>

      <!-- chevron only when expanded -->
      <span v-if="!collapsed" class="ml-auto">
        <Icon
          name="heroicons:chevron-down"
          class="w-4 h-4 opacity-80 transition-transform duration-300 ease-out"
          :class="open ? 'rotate-180' : 'rotate-0'"
        />
      </span>

      <span
        v-if="collapsed"
        class="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2
               whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1.5 text-xs text-white
               opacity-0 translate-x-[-4px] transition duration-150
               group-hover:opacity-100 group-hover:translate-x-0"
      >
        {{ label }}
      </span>
    </button>

    <div
      v-if="!collapsed"
      ref="contentEl"
      class="mt-1 relative overflow-hidden"
      :style="panelStyle"
    >
      <div class="relative pl-6 py-2">
        <span class="absolute top-2 bottom-2 w-px bg-white/10"></span>
        <div class="space-y-1">
          <slot />
        </div>
      </div>
    </div>

    <Transition name="tiles-pop">
      <div
        v-if="collapsed && showTiles && tiles.length"
        class="absolute left-[calc(100%+12px)] top-0 z-50 w-72
               rounded-2xl border border-white/10 bg-[#000a2b]/95 backdrop-blur
               shadow-[0_18px_48px_rgba(0,0,0,0.35)] p-3"
        @mouseenter="tilesHover = true"
        @mouseleave="tilesHover = false; onLeave()"
      >
        <div class="flex items-center gap-2 px-2 pb-2">
          <Icon :name="icon" class="w-5 h-5 text-white/80" />
          <p class="text-sm font-semibold text-white">{{ label }}</p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <NuxtLink
            v-for="t in tiles"
            :key="t.to"
            :to="t.to"
            class="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10
                   px-3 py-3 transition"
            :title="t.label"
          >
            <p class="text-sm font-semibold text-white/90 group-hover:text-white truncate">
              {{ t.label }}
            </p>
            <p class="text-xs text-white/55 group-hover:text-white/70 truncate">
              View
            </p>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useSlots } from "vue"

const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  open: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false }, 
})

const emit = defineEmits(["toggle"])

const slots = useSlots()

const contentEl = ref(null)
const height = ref(0)
let ro

const measure = () => {
  const el = contentEl.value
  if (!el) return
  height.value = el.scrollHeight
}

watch(
  () => props.open,
  async (isOpen) => {
    await nextTick()
    if (isOpen) measure()
  },
  { immediate: true }
)

onMounted(async () => {
  await nextTick()
  measure()

  if (contentEl.value && "ResizeObserver" in window) {
    ro = new ResizeObserver(() => {
      if (props.open) measure()
    })
    ro.observe(contentEl.value)
  }

  const onResize = () => props.open && measure()
  window.addEventListener("resize", onResize)

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize)
    if (ro) ro.disconnect()
  })
})

const panelStyle = computed(() => {
  return props.open
    ? {
        maxHeight: `${height.value}px`,
        opacity: "1",
        transform: "translateY(0)",
        transitionProperty: "max-height, opacity, transform",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        willChange: "max-height, opacity, transform",
      }
    : {
        maxHeight: "0px",
        opacity: "0",
        transform: "translateY(-4px)",
        transitionProperty: "max-height, opacity, transform",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        willChange: "max-height, opacity, transform",
      }
})

const showTiles = ref(false)
const tilesHover = ref(false)
let hideTimer

function onEnter() {
  if (!props.collapsed) return
  clearTimeout(hideTimer)
  showTiles.value = true
}

function onLeave() {
  if (!props.collapsed) return
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (!tilesHover.value) showTiles.value = false
  }, 120)
}

function onClick() {
  // collapsed: don't expand inside sidebar
  if (props.collapsed) {
    showTiles.value = true
    return
  }
  emit("toggle")
}

// Extract sublink props from slot VNodes (expects SubLink1 label/to)
const tiles = computed(() => {
  const vnodes = slots.default?.() ?? []
  return vnodes
    .map((v) => v?.props)
    .filter(Boolean)
    .map((p) => ({ label: p.label, to: p.to }))
    .filter((t) => t.label && t.to)
})
</script>

<style scoped>
.tiles-pop-enter-active,
.tiles-pop-leave-active {
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.tiles-pop-enter-from,
.tiles-pop-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
.tiles-pop-enter-to,
.tiles-pop-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
