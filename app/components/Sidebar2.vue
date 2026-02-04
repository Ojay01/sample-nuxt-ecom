<template>
  <aside
    :data-collapsed="isCollapsed ? 'true' : 'false'"
    :class="[
      'relative h-screen shrink-0 flex flex-col bg-white border-r border-slate-200 text-slate-900',
      'dark:bg-[#000a2b] dark:border-white/10 dark:text-white/90',
      isCollapsed ? 'w-[88px]' : 'w-[280px]',
      'transition-[width] duration-300 ease-in-out',
    ]"
  >
    <div
      class="sticky top-0 z-20 h-16 md:h-20 px-4 flex items-center border-b border-slate-200 bg-white
             dark:border-white/10 dark:bg-[#000a2b]"
    >
<NuxtLink
  to="/"
  class="flex items-center gap-3 min-w-0 transition-all duration-300"
  :class="isCollapsed ? 'justify-center' : ''"
  :title="isCollapsed ? 'Glotelho Dashboard' : undefined"
>
  <div
    class="grid place-items-center overflow-hidden transition-all duration-300"
    :class="isCollapsed
      ? 'rounded-xl bg-slate-100 dark:bg-white/10'
      : 'h-14 w-auto rounded-none bg-transparent'
    "
  >
    <NuxtImg
      :src="isCollapsed
        ? '/favicon.png'
        : 'https://glotelho.cm/_ipx/_/temp/glotelho-e-commerce-logo-white-220x60.png'
      "
      :width="isCollapsed ? 52 : 220"
      :height="isCollapsed ? 64 : 60"
      class="h-full w-full object-contain transition-all duration-300"
      alt="Glotelho Logo"
    />
  </div>
</NuxtLink>
      <div class="flex-1" />
      <button
        class="hidden lg:grid h-10 w-10 place-items-center rounded-xl transition
               hover:bg-slate-100 active:bg-slate-200
               dark:hover:bg-white/10 dark:active:bg-white/15"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        :title="isCollapsed ? 'Expand' : 'Collapse'"
        @click="toggleCollapse"
      >
        <Icon
          :name="isCollapsed ? 'heroicons:chevron-double-right' : 'heroicons:chevron-double-left'"
          class="w-5 h-5 text-slate-600 dark:text-white/70"
        />
      </button>
    </div>
    <nav
      class="flex-1 py-4 space-y-1"
      :class="isCollapsed ? 'px-2 overflow-visible' : 'px-4 overflow-y-auto'"
    >
      <NavItem2
        label="Dashboard"
        to="/dashboard-2"
        :collapsed="isCollapsed"
      >
        <template #icon>
          <Icon name="heroicons:squares-2x2" class="w-6 h-6 text-slate-600 dark:text-white/70" />
        </template>
      </NavItem2>

      <NavGroup2
        label="Users"
        icon="heroicons:users"
        :open="openGroup === 'Users' && !isCollapsed"
        :active="openGroup === 'Users'"
        :collapsed="isCollapsed"
        @toggle="toggleGroup('Users')"
        @hover="onGroupHover"
        @leave="onGroupLeave"
      >
        <SubLink2 label="Clients" to="/users/clients" :collapsed="isCollapsed" />
        <SubLink2 label="Customer Service" to="/users/customer-service" :collapsed="isCollapsed" />
        <SubLink2 label="Admins" to="/users/admins" :collapsed="isCollapsed" />
        <SubLink2 label="Delivery Personnel" to="/users/delivery-personnel" :collapsed="isCollapsed" />
      </NavGroup2>

      <NavGroup2
        label="Products"
        icon="heroicons:cube"
        :open="openGroup === 'Products' && !isCollapsed"
        :active="openGroup === 'Products'"
        :collapsed="isCollapsed"
        @toggle="toggleGroup('Products')"
        @hover="onGroupHover"
        @leave="onGroupLeave"
      >
        <SubLink2 label="All Products" to="/products" exact :collapsed="isCollapsed" />
        <SubLink2 label="Categories" to="/products/categories" :collapsed="isCollapsed" />
        <SubLink2 label="Inventory" to="/products/inventory" :collapsed="isCollapsed" />
      </NavGroup2>

      <NavGroup2
        label="Orders"
        icon="heroicons:shopping-cart"
        :open="openGroup === 'Orders' && !isCollapsed"
        :active="openGroup === 'Orders'"
        :collapsed="isCollapsed"
        @toggle="toggleGroup('Orders')"
        @hover="onGroupHover"
        @leave="onGroupLeave"
      >
        <SubLink2 label="All Orders" to="/orders" exact :collapsed="isCollapsed" />
        <SubLink2 label="Pending" to="/orders/pending" :collapsed="isCollapsed" />
        <SubLink2 label="Returns" to="/orders/returns" :collapsed="isCollapsed" />
      </NavGroup2>

      <NavGroup2
        label="Reports"
        icon="heroicons:chart-bar"
        :open="openGroup === 'Reports' && !isCollapsed"
        :active="openGroup === 'Reports'"
        :collapsed="isCollapsed"
        @toggle="toggleGroup('Reports')"
        @hover="onGroupHover"
        @leave="onGroupLeave"
      >
        <SubLink2 label="Sales Report" to="/reports/sales" :collapsed="isCollapsed" />
        <SubLink2 label="Customers Report" to="/reports/customers" :collapsed="isCollapsed" />
      </NavGroup2>

      <div class="my-4 border-t border-slate-200 dark:border-white/10" />

      <NavItem2 label="Settings" to="/settings" :collapsed="isCollapsed">
        <template #icon>
          <Icon name="heroicons:cog-6-tooth" class="w-6 h-6 text-slate-600 dark:text-white/70" />
        </template>
      </NavItem2>

      <NavItem2 label="Support" to="/support" :collapsed="isCollapsed">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-slate-600 dark:text-white/70" />
        </template>
      </NavItem2>
    </nav>

    <div class="sticky bottom-0 z-20 border-t border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#000a2b]">
      <div
        class="flex items-center gap-3 rounded-2xl"
        :class="[
          isCollapsed ? 'px-2 py-2' : 'px-3 py-3',
          'bg-slate-100 dark:bg-white/5',
        ]"
      >
        <div
          class="h-10 w-10 rounded-2xl grid place-items-center text-xs font-semibold"
          :class="['bg-slate-200 text-slate-700', 'dark:bg-white/15 dark:text-slate-100']"
        >
          KO
        </div>

        <div v-show="!isCollapsed" class="min-w-0">
          <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">
            Kelly-Kingston Ojong
          </p>
          <p class="text-xs truncate text-slate-500 dark:text-white/55">
            Super Admin
          </p>
        </div>

        <button
          class="ml-auto h-10 w-10 grid place-items-center rounded-xl transition group"
          :class="['hover:bg-red-50', 'dark:hover:bg-red-500/15']"
          aria-label="Logout"
          title="Logout"
        >
          <Icon
            name="heroicons:power"
            class="w-5 h-5 transition group-hover:text-red-400"
            :class="['text-slate-600', 'dark:text-white/70']"
          />
        </button>
      </div>
    </div>

    <!-- Collapsed mode: attached sublinks column -->
    <div
      v-if="isCollapsed && hoverGroup && hoverGroup.tiles?.length"
      class="absolute top-16 md:top-20 left-[88px] h-[calc(100%-4rem)] md:h-[calc(100%-5rem)] w-64
             border-l border-slate-200 bg-white
             shadow-[0_0_24px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0B1228]
             dark:shadow-[0_0_28px_rgba(0,0,0,0.45)]"
      @mouseenter="onColumnEnter"
      @mouseleave="onColumnLeave"
    >
      <div class="pb-4 px-4 pt-4">
        <div class="mb-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-400">
            {{ hoverGroup.label }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <NuxtLink
            v-for="t in hoverGroup.tiles"
            :key="t.to"
            :to="t.to"
            class="group flex items-center gap-3 rounded-xl px-3 py-3 transition
                   text-slate-700 hover:bg-slate-100 hover:text-slate-900
                   dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span class="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/30" />
            <p class="text-sm font-semibold truncate">
              {{ t.label }}
            </p>
           </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  collapsed: { type: Boolean, default: false },
})

const emit = defineEmits(["toggle-collapse", "expand"])

const isCollapsed = computed(() => props.collapsed)

const openGroup = ref("")
const hoverGroup = ref(null)
const columnHover = ref(false)
let hoverTimer

watch(isCollapsed, (val) => {
  if (!val) {
    hoverGroup.value = null
    columnHover.value = false
    clearTimeout(hoverTimer)
    emit("expand", false)
  }
})

function toggleGroup(name) {
  if (props.collapsed) return
  openGroup.value = openGroup.value === name ? "" : name
}
function toggleCollapse() {
  emit("toggle-collapse")
  if (!props.collapsed) openGroup.value = ""
}

function onGroupHover(payload) {
  clearTimeout(hoverTimer)
  hoverGroup.value = payload
  emit("expand", true)
}

function onGroupLeave() {
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    if (!columnHover.value) {
      hoverGroup.value = null
      emit("expand", false)
    }
  }, 120)
}

function onColumnEnter() {
  columnHover.value = true
  clearTimeout(hoverTimer)
}

function onColumnLeave() {
  columnHover.value = false
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    if (!columnHover.value) {
      hoverGroup.value = null
      emit("expand", false)
    }
  }, 120)
}
</script>
