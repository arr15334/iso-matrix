/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    name: 'Checklist',
    view: 'Checklist',
  },
  {
    path: '/dashboard',
    view: 'Dashboard',
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList',
  },
  {
    path: '/notifications',
    view: 'Notifications',
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade',
  },
]
