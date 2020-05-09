<template>
  <body>
    <div class="text-box">
      <h1> 終端状態制御 </h1>
      <p>
        ...
      </p>

      <vue-mathjax :formula="f_kinetic_energy" />


      <ul class="footer">
        <li class="article-title-f" style="text-align:left">
          <router-link class="article-link-f" to="/research/articles/feedforward/final-state_control">
            > 完全追従制御
          </router-link>
        </li>

        <li class="article-title-f" style="text-align:center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f" style="text-align:right">
          <router-link class="article-link-f" />
        </li>
      </ul>

    </div>
  </body>
</template>

<script>
  import { VueMathjax } from "vue-mathjax"
  export default {
    components: {
      "vue-mathjax": VueMathjax,
    },
    data () {
      return {

        f_kinetic_energy: "$$ \\begin{eqnarray} \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-workspace_acc1{
  width:90%;
  max-width:600px;
  margin:10px;
}

</style>
