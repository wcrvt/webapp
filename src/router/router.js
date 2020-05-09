import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
    routes: [
    //Entry point 1
    {
      path: '/',
      component: () => import('@/components/hello')
    },
    {
      path: '/about',
      component: () => import('@/components/about')
    },
    {
      path: '/contact',
      component: () => import('@/components/contact')
    },
    {
      path: '/research',
      component: () => import('@/components/research'),
    },

    //Articles

    //Linear System
    {
      path: '/research/articles/linear_system/architecture',
      component: () => import('@/articles/linear_system/architecture'),
    },
    {
      path: '/research/articles/linear_system/inner_model_principle',
      component: () => import('@/articles/linear_system/inner_model_principle'),
    },
    {
      path: '/research/articles/linear_system/luenberger_observer',
      component: () => import('@/articles/linear_system/luenberger_observer'),
    },
    {
      path: '/research/articles/linear_system/youla_kucera',
      component: () => import('@/articles/linear_system/youla_kucera'),
    },

    //Problem
    {
      path: '/research/articles/problem/interdisciplinary',
      component: () => import('@/articles/problem/interdisciplinary'),
    },
    {
      path: '/research/articles/problem/phaselag',
      component: () => import('@/articles/problem/phaselag'),
    },
    {
      path: '/research/articles/problem/architecture',
      component: () => import('@/articles/problem/architecture'),
    },
    {
      path: '/research/articles/problem/approach',
      component: () => import('@/articles/problem/approach'),
    },

    //Energy
    {
      path: '/research/articles/energy/pf_control',
      component: () => import('@/articles/energy/pf_control'),
    },
    {
      path: '/research/articles/energy/control_stiffness',
      component: () => import('@/articles/energy/control_stiffness'),
    },
    {
      path: '/research/articles/energy/vibration',
      component: () => import('@/articles/energy/vibration'),
    },
    {
      path: '/research/articles/energy/impedance_control',
      component: () => import('@/articles/energy/impedance_control'),
    },

    //Feedforward
    {
      path: '/research/articles/feedforward/continuous',
      component: () => import('@/articles/feedforward/continuous'),
    },
    {
      path: '/research/articles/feedforward/perfect_tracking',
      component: () => import('@/articles/feedforward/perfect_tracking'),
    },

//    {
//      path: '/research/articles/feedforward/final-state_control',
//      component: () => import('@/articles/feedforward/final-state_control'),
//    },

    //Acceleration Control
    {
      path: '/research/articles/acceleration_control/advantage',
      component: () => import('@/articles/acceleration_control/advantage'),
    },
    {
      path: '/research/articles/acceleration_control/dob_base_acc',
      component: () => import('@/articles/acceleration_control/dob_base_acc'),
    },
    {
      path: '/research/articles/acceleration_control/multidof_acc',
      component: () => import('@/articles/acceleration_control/multidof_acc'),
    },

    //Kalman filter
    {
      path: '/research/articles/kalman_filter/principle_control',
      component: () => import('@/articles/kalman_filter/principle_control'),
    },
    {
      path: '/research/articles/kalman_filter/operation',
      component: () => import('@/articles/kalman_filter/operation'),
    },
    {
      path: '/research/articles/kalman_filter/principle_signal',
      component: () => import('@/articles/kalman_filter/principle_signal'),
    },

    //Computer 1
    {
      path: '/research/articles/computer1/background',
      component: () => import('@/articles/computer1/background'),
    },
    {
      path: '/research/articles/computer1/constraints',
      component: () => import('@/articles/computer1/constraints'),
    },
    {
      path: '/research/articles/computer1/advantage',
      component: () => import('@/articles/computer1/advantage'),
    },

    //Computer 2
    {
      path: '/research/articles/computer2/computer_architecture',
      component: () => import('@/articles/computer2/computer_architecture'),
    },
    {
      path: '/research/articles/computer2/controller_architecture',
      component: () => import('@/articles/computer2/controller_architecture'),
    },
    {
      path: '/research/articles/computer2/bus_architecture',
      component: () => import('@/articles/computer2/bus_architecture'),
    },

    //Computer 3
    {
      path: '/research/articles/computer3/implementation',
      component: () => import('@/articles/computer3/implementation'),
    },
    {
      path: '/research/articles/computer3/positioning',
      component: () => import('@/articles/computer3/positioning'),
    },
    {
      path: '/research/articles/computer3/manipulation',
      component: () => import('@/articles/computer3/manipulation'),
    },

    //Tutorial
    {
      path: '/research/articles/tutorial/manipulation_2dof',
      component: () => import('@/articles/tutorial/manipulation_2dof'),
    },
    {
      path: '/research/articles/tutorial/manipulation_3dof_redundant',
      component: () => import('@/articles/tutorial/manipulation_3dof_redundant'),
    },

  ],
  scrollBehavior (to, from, savedPosition) {
    const delaytime=300
    //Page switching takes 300ms for erasing and appearing. it is defined in App.vue
    if (savedPosition) {
      return savedPosition
    } else {
      return new Promise(resolve => {
          setTimeout(() => {
            resolve({ x: 0, y: 0 })
          }, delaytime)
      })
    }
  }
})
