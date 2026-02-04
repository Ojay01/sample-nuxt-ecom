<template>
  <aside
    class="w-[280px] shrink-0 h-screen bg-[#000a2b] text-white/90
           flex flex-col"
  >
    <div
      class="sticky top-0 z-20 h-20 px-6 flex items-center gap-3
             border-b border-white/10 bg-[#000a2b]"
    >
      <NuxtLink to="/" class="flex justify-center text-white">
        <img
          src="https://glotelho.cm/_ipx/_/temp/glotelho-e-commerce-logo-white-220x60.png"
          alt="Glotelho Logo"
          class="h-14 inline-block"
        />
      </NuxtLink>
    </div>

    <nav class="flex-1 overflow-y-auto px-4 py-5 space-y-1">
      <NavItem1 label="Dashboard" to="/dashboard-1">
        <template #icon>
          <Icon name="heroicons:squares-2x2" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>

      <NavGroup1
        label="Users"
        icon="heroicons:users"
        :open="openGroup === 'Users'"
        :active="openGroup === 'Users'"
        @toggle="toggleGroup('Users')"
      >
        <SubLink1 label="Clients" to="/users/clients" />
        <SubLink1 label="Customer Service" to="/users/customer-service" />
        <SubLink1 label="Admins" to="/users/admins" />
        <SubLink1 label="Delivery Personnel" to="/users/delivery-personnel" />
      </NavGroup1>

      <NavGroup1
        label="Products"
        icon="heroicons:cube"
        :open="openGroup === 'Products'"
        :active="openGroup === 'Products'"
        @toggle="toggleGroup('Products')"
      >
        <SubLink1 label="All Products" to="/products" exact />
        <SubLink1 label="Categories" to="/products/categories" />
        <SubLink1 label="Inventory" to="/products/inventory" />
      </NavGroup1>

      <NavGroup1
        label="Orders"
        icon="heroicons:shopping-cart"
        :open="openGroup === 'Orders'"
        :active="openGroup === 'Orders'"
        @toggle="toggleGroup('Orders')"
      >
        <SubLink1 label="All Orders" to="/orders" exact />
        <SubLink1 label="Pending" to="/orders/pending" />
        <SubLink1 label="Returns" to="/orders/returns" />
      </NavGroup1>

      <NavGroup1
        label="Reports"
        icon="heroicons:chart-bar"
        :open="openGroup === 'Reports'"
        :active="openGroup === 'Reports'"
        @toggle="toggleGroup('Reports')"
      >
        <SubLink1 label="Sales Report" to="/reports/sales" />
        <SubLink1 label="Customers Report" to="/reports/customers" />
      </NavGroup1>

      <div class="my-4 border-t border-white/10" />

      <NavItem1 label="Settings" to="/settings">
        <template #icon>
          <Icon name="heroicons:cog-6-tooth" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>

      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>
      <NavItem1 label="Support" to="/support">
        <template #icon>
          <Icon name="heroicons:question-mark-circle" class="w-6 h-6 text-white/70" />
        </template>
      </NavItem1>

    </nav>

    <div
      class="sticky bottom-0 z-20 p-4 border-t border-white/10 bg-[#000a2b]"
    >
      <div class="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
        <div class="h-10 w-10 rounded-full bg-white/15 grid place-items-center text-xs font-semibold">
          KO
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold text-white truncate">Kelly-Kingston Ojong</p>
          <p class="text-xs text-white/55 truncate">Super Admin</p>
        </div>
      <button
        class="
            ml-auto h-9 w-9 grid place-items-center rounded-lg
            transition-colors duration-200
            hover:bg-red-500/15
            group
        "
        >
        <Icon
            name="heroicons:power"
            class="w-5 h-5 text-white/70 transition-colors duration-200
                group-hover:text-red-400"
        />
        </button>

      </div>
    </div>
  </aside>
</template>

<script setup>

const openGroup = ref("");
function toggleGroup(name) {
  openGroup.value = openGroup.value === name ? "" : name;
}
</script>
