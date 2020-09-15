const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "home", component: () => import("pages/Index.vue") },
      { path: "add-company", component: () => import("pages/AddCompany.vue") },

      {
        path: "add-company/:id",
        component: () => import("pages/AddCompany.vue"),
        props: route => ({
          id: route.params.id
        })
      },
      {
        path: "view-company/:id",
        component: () => import("pages/ViewCompany.vue"),
        props: route => ({
          id: route.params.id
        })
      },
      {
        path: "validate-account/:id",
        component: () => import("pages/ValidateAccount.vue"),
        props: route => ({
          id: route.params.id,
          validate: false
        })
      },
      {
        path: "validate-password/:id",
        component: () => import("pages/ValidateAccount.vue"),
        props: route => ({
          id: route.params.id,
          validate: true
        })
      }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/FlatLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Login.vue") },
      {
        path: "/forgot-password",
        component: () => import("pages/ForgotPassword.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
