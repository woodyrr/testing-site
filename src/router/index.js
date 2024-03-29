import { createRouter, createWebHistory } from 'vue-router'
import home from '../components/home.vue'
import details from '../views/details.vue'
import categories from '../components/categoryDetails.vue'
import area from '../views/areadetails.vue'
import loggedin from '../views/login.vue'
import sign from '../views/signup.vue'
import dashboard from '../views/dashboard.vue'
import currentUser from '../views/user.vue'
import dashDetails from '../views/dashdetails.vue'
import mainSite from '../views/HomeView.vue'
import Discover from '../views/Discover.vue'
import Careers from '../views/Careers.vue'
import Blog from '../views/Blog.vue'
import Safety from '../views/Safety.vue'
import Support from '../views/Support.vue'

import {getAuth, onAuthStateChanged} from "firebase/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name:'home',
      component:home,
      meta: {
        requiresAuth:true,

      },
    },
    {
      path: '/meals/:id',
      name:'meal Details',
      component:details
    },
    {
      path: '/discover',
      name:'Discover',
      component:Discover
    },
    {
      path: '/blog',
      name:'blog',
      component:Blog
    },
    {
      path: '/careers',
      name:'careers',
      component:Careers
    },
    {
      path: '/support',
      name:'Support',
      component:Support
    },
    {
      path: '/safety',
      name:'safety',
      component:Safety
    },
    {
      path: '/category/:id',
      name:'category Details',
      component:categories
    },
    {
      path: '/area/:id',
      name:'area Details',
      component:area
    },
    {
      path: '/Login',
      name:'loggedin',
      component:loggedin
    },
    {
      path: '/',
      name:'Homeview',
      component:mainSite
    },
    {
      path: '/signup',
      name:'signUp',
      component:sign
    },
    {
      path: '/dashboard',
      name:'Dashboard',
      component:dashboard
    },
    {
      path: '/dashmeals/:id',
      name:'Dashboard meals details',
      component:dashDetails
    },
    {
      path: '/user',
      name:'userName',
      component:currentUser
    },
  ],
});

const getCurrentUsers = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if ( await getCurrentUsers()){
      next();
    }
    else{
      alert("You dont have access")
      next("/");
    }
  }else {
    next();
  }
})
export default router
