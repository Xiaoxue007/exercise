import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from "@/views/Main.vue";
// import CourseList from '@/views/courses/CourseList.vue'
// import CourseEdit from '@/views/courses/CourseEdit.vue'
// import CourseCrud from "@/views/courses/CourseCrud";
import List from "@/views/courses/List"
// import Edit from "@/views/courses/Edit";
const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {name:'home', path: '/', component: Home},
      // {name: 'courses-list', path: '/courses/list', component: CourseList},

      {name: 'courses-list', path: '/:resource/list', component: List,props: true},
      // {name: 'courses-edit', path: '/:resource/edit/:id', component: Edit,props: true},
      // {name: 'courses-create', path: '/:resource/create', component: Edit,props: true},


      // {name: 'courses-list', path: '/:resource', component: List,props: true,
      //   children: [
      //     {name: 'courses-edit', path: '/:resource/edit/:id', component: Edit,props: true},
      //     {name: 'courses-create', path: '/:resource/create', component: Edit,props: true},
      //   ]
      // },




    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
