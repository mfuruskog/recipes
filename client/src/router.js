import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import AddRecipe from './components/AddRecipe.vue'
import RecipeDetails from './components/RecipeDetails.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'recipe-add',
      component: AddRecipe
    },
    {
      path: '/recipes/:id',
      name: 'recipe-details',
      component: RecipeDetails,
      props: true
    }
  ]
})

export default router
