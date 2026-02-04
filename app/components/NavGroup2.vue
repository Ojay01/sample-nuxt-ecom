<template>
  <div class="relative">
    <button
      ref="btnEl"
      type="button"
      class="group w-full flex items-center gap-3 h-12 rounded-xl transition-colors duration-200"
      :class="[
        collapsed ? 'px-3 justify-center' : 'px-4',
        active
          ? 'bg-slate-100 text-slate-900 dark:bg-gray-400/50 dark:text-white'
          : 'text-slate-600 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10',
      ]"
      :aria-expanded="collapsed ? undefined : (open ? 'true' : 'false')"
      @click="onClick"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @focusin="onEnter"
      @focusout="onLeave"
    >
      <Icon :name="icon" class="w-6 h-6 shrink-0" />

      <span v-if="!collapsed" class="font-semibold text-base truncate">
        {{ label }}
      </span>

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
               whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs
               opacity-0 translate-x-[-4px] transition duration-150
               group-hover:opacity-100 group-hover:translate-x-0"
        :class="'bg-white text-slate-900 shadow border border-slate-200 dark:bg-slate-900/95 dark:text-white dark:border-transparent'"
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
        <span class="absolute top-2 bottom-2 w-px bg-slate-200 dark:bg-white/10"></span>
        <div class="space-y-1">
          <slot />
        </div>
      </div>
    </div>

    <!-- tiles panel moved to Sidebar2 column -->
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

const emit = defineEmits(["toggle", "hover", "leave"])

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

function onEnter() {
  if (!props.collapsed) return
  emit("hover", { label: props.label, icon: props.icon, tiles: tiles.value })
}

function onLeave() {
  if (!props.collapsed) return
  emit("leave")
}

function onClick() {
  // collapsed: don't expand inside sidebar
  if (props.collapsed) {
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
