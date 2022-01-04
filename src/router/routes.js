
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/todo', component: () => import('pages/todo.vue') },
      { path: '/help', component: () => import('pages/help.vue') },
      { path: '/homes', component: () => import('pages/home.vue') },
      { path: '/test', component: () => import('pages/test.vue') },
      { path: '/inventory', component: () => import('pages/inventory.vue') }
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
