import AdminLayout from '@/layouts/Layout.vue'
import DashboardView from '@/views/Admin/DashboardView.vue'
import EquiposView from '@/views/Admin/Equipos/EquiposView.vue'
import LogsView from '@/views/Admin/LogsView.vue'
import UsuariosView from '@/views/Admin/Usuarios/UsuariosView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegistroView from '@/views/Auth/RegistroView.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import InicioView from '@/views/InicioView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TareasView from '@/views/Admin/Tareas/TareasView.vue'
import ActividadesView from '@/views/Admin/Actividades/ActividadesView.vue'
import RecursosView from '@/views/Admin/Recursos/RecursosView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import ContactoView from '@/views/ContactoView.vue'
import PoliticasView from '@/views/legal/PoliticasView.vue'
import TerminosCondicionesView from '@/views/legal/TerminosCondicionesView.vue'
import NotAuthorizedView from '@/views/Error/NotAuthorizedView.vue'
import PoliticasCookiesView from '@/views/legal/PoliticasCookiesView.vue'
import SubTareasView from '@/views/Admin/SubTareas/SubTareasView.vue'
import AgregarUsuarioView from '@/views/Admin/AgregarUsuario/AgregarUsuarioView.vue'
import Layout from '@/layouts/Layout.vue'
import RecursosSistemasView from '@/views/Sistemas/Recursos/RecursosSistemasView.vue'
import DetalleRecursoSistemasView from '@/views/Sistemas/Recursos/DetalleRecursoSistemasView.vue'
import DashboardSistemasView from '@/views/Sistemas/DashboardSistemasView.vue'
import ListProyectosView from '@/views/Admin/Proyectos/ListProyectosView.vue'
import ProyectoView from '@/views/Admin/Proyectos/ProyectoView.vue'

const router = createRouter({
  linkActiveClass: 'underline underline-offset-2',
  linkExactActiveClass: 'underline underline-offset-2',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'No-encontrado',
      component: NotFoundView
    },
    {
      path: '/gestion-estatus',
      name: 'estatus',
      component: EstatusView
    },
    {
      path: '/acceso-denegado',
      name: 'No-autorizado',
      component: NotAuthorizedView
    },
    {
      path: '/',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: SobreNosotrosView
    },
    {
      path: '/contactanos',
      name: 'contactanos',
      component: ContactoView
    },
    {
      path: '/politicas-de-privacidad',
      name: 'politicas-privacidad',
      component: PoliticasView
    },
    {
      path: '/terminos-y-condiciones',
      name: 'terminos-condiciones',
      component: TerminosCondicionesView
    },
    {
      path: '/politicas-de-cookies',
      name: 'politicas-cookies',
      component: PoliticasCookiesView
    },
    {
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: [
        {
          path: '',
          name: 'Admin-dash',
          component: DashboardView
        },
        {
          path: '/Admin/usuarios',
          name: 'Admin-usuarios',
          component: UsuariosView
        },
        {
          path: '/Admin/agregar-usuario',
          name: 'Admin-agregar-usuario',
          component: AgregarUsuarioView,
        },
        {
          path: '/Admin/equipos',
          name: 'Admin-equipos',
          component: EquiposView
        },
        {
          path: '/Admin/proyectos',
          children: [
            {
              path: "",
              name: "Admin-proyectos",
              component: ListProyectosView
            },
            {
              path: ":id",
              name: "proyectos-detalle",
              component: ProyectoView,
            }
          ]
        },
        {
          path: '/Admin/tareas',
          name: 'Admin-tareas',
          component: TareasView,
        },
        {
          path: '/Admin/sub-tareas',
          name: 'Admin-sub-tareas',
          component: SubTareasView,
        },
        {
          path: '/Admin/actividades',
          name: 'Admin-actividades',
          component: ActividadesView,
        },
        {
          path: '/Admin/recursos',
          name: 'Admin-recursos',
          component: RecursosView,
        },
        {
          path: '/Admin/logs',
          name: 'Admin-logs',
          component: LogsView
        },
      ]
    },
    {
      path: '/gerente',
      name: 'gerente',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: []
    },
    {
      path: '/sistemas',
      name: 'sistemas',
      component: Layout,
      // meta: { requiresAuth: true, roles: ['Administrador'] },
      children: [
        {
          path: '',
          name: 'sistemas-dash',
          component: DashboardSistemasView,
        },
        {
          path: 'recursos',
          children: [
            {
              path: '',
              name: 'sistemas-recursos',
              component: RecursosSistemasView,
            },
            {
              path: ':id',
              name: 'recursos-detalle',
              component: DetalleRecursoSistemasView
            },
          ]
        }
      ]
    }
  ],
})

export default router
