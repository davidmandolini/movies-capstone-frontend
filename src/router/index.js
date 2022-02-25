import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import GroupsIndex from "../views/GroupsIndex.vue";
import GroupsShow from "../views/GroupsShow.vue";
import EventsIndex from "../views/EventsIndex.vue";
import EventsShow from "../views/EventsShow.vue";
import NominationsIndex from "../views/NominationsIndex.vue";
import NominationsShow from "../views/NominationsShow.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/groups",
    name: "GroupsIndex",
    component: GroupsIndex,
  },
  {
    path: "/groups/:id",
    name: "GroupsShow",
    component: GroupsShow,
  },
  {
    path: "/events",
    name: "EventsIndex",
    component: EventsIndex,
  },
  {
    path: "/events/:id",
    name: "EventsShow",
    component: EventsShow,
  },
  {
    path: "/nominations",
    name: "NominationsIndex",
    component: NominationsIndex,
  },
  {
    path: "/nominations/:id",
    name: "NominationsShow",
    component: NominationsShow,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
