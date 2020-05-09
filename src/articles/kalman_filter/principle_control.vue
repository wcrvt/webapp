<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 最適な状態観測器 </h1>
      <p>
        制御工学の観点から見れば，カルマンフィルタはLuenbergerのオブザーバのクラスに属する状態推定器に僅かに手を加えたものと捉えられる。カルマンフィルタの利点は，対象となるシステムに関する情報が与えられれば，最適な状態推定（最小分散推定）を実現するオブザーバゲインを一意に求められることである。
      </p>

      <h2 class="research-subtitle"> カルマンフィルタとLuenbergerオブザーバの同一性 </h2>
      <p>
        カルマンフィルタの処理は一見複雑だが，大部分が最適オブザーバゲインを導出するためのものである。一度カルマンフィルタの動作原理に対する理解から離れ，純粋な動作のみに着目する。下記の状態空間表現されるシステムに対するカルマンフィルタの処理を以下に並べる。
      </p>

      <p>
        <span class="research-subsubtitle"> システムの状態空間表現：</span>
        <vue-mathjax :formula="f_model" />
        <span class="research-subsubtitle"> 予測ステップ： </span>
        <vue-mathjax :formula="f_kalman_prediction" />
        <span class="research-subsubtitle"> 更新ステップ： </span>
        <vue-mathjax :formula="f_kalman_update" />
      </p>

      <p>
        上式はカルマンフィルタの処理を簡潔に纏めたものである。これらの導出に関しては次項で行う。ここで，推定器の構造に関わる式は以下の二つである。
        <vue-mathjax :formula="f_kalman_structure" />
        これをブロック線図にすると，以下のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/kalman/observer.png" class="pic-observer">
      </div>
      <p>
        これはオブザーバゲインを次のように設定したLuenbergerオブザーバと等価構造を持つ。
        <vue-mathjax :formula="f_Lgain" />
        上記の状態推定器の構造に加えて，低域通過特性を持たせたものがカルマンフィルタとなる。具体的には，次の式から確認できる。
        <vue-mathjax :formula="f_lpf" />
        観測値と推定値の係数が相補的関係にあることから，観測値に低域通過フィルタを通した信号が推定値となることがわかる。詳細は次々項に記載する。
      </p>

      <h2 class="research-subtitle"> 最小分散推定オブザーバとの比較 </h2>
      <p>
        Luenbergerオブザーバの出力は次のように定義される。
        <vue-mathjax :formula="f_general_observer" />
        ここで，予測誤差は次のように計算される。
        <vue-mathjax :formula="f_observer_error" />
        また，予測誤差共分散に関しては次のように計算される。
        <vue-mathjax :formula="f_observer_cov" />
        カルマンフィルタでは推定誤差を最小化するように最適化されるが，予測値が推定値を線形変換した値であることから，予測誤差を最小化することでカルマンフィルタと等価な構造を導出することができる。予測誤差の二乗誤差を最小化する条件は，予測誤差共分散のトレースを最小化することとなる。したがって，最小分散推定のための条件は次のようになる。
        <vue-mathjax :formula="f_observer_covmin" />
        以上より，最小分散推定を実現するオブザーバゲインは次のように表される。
        <vue-mathjax :formula="f_kalman_gain" />
        これはカルマンフィルタの構成から作成したLuenbergerオブザーバと等しい構造を持つ。
      </p>


      <ul class="footer">
        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-left">
          <router-link class="article-link-f" />
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/kalman_filter/operation">
            > 状態量の予測と更新
          </router-link>
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

        f_model: "$$ \\begin{eqnarray} x[k+1]&=&Ax[k]+Bu[k]+Gv \\\\ y[k]&=&Cx[k]+w \\\\ {\\rm E}[vv^{\\mathrm T}]&=&Q,\\ {\\rm E}[ww^{\\mathrm T}]=R\\end{eqnarray} $$",

        f_kalman_prediction: "$$ \\begin{eqnarray} x_{\\rm p}[k+1]&=&A_{\\rm m}x_{\\rm K}[k]+B_{\\rm m}u[k] \\\\ P_{\\rm p}[k+1]&=&A_{\\rm m}(P_{\\rm p}[k]-P_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1}CP_{\\rm p}[k])A_{\\rm m}^{\\mathrm T}+GQG^{\\mathrm T}\\end{eqnarray} $$",

        f_kalman_update: "$$ \\begin{eqnarray} x_{\\rm K}[k]&=&x_{\\rm p}[k]+K[k](y[k]-C_{\\rm m}x_{\\rm p}[k]) \\\\ K[k] &=& P_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1}\\end{eqnarray} $$",

        f_kalman_structure: "$$ \\begin{eqnarray} x_{\\rm p}[k+1]&=&A_{\\rm m}x_{\\rm K}[k]+B_{\\rm m}u[k] \\\\ x_{\\rm K}[k]&=&x_{\\rm p}[k]+K[k](y[k]-C_{\\rm m}x_{\\rm p}[k]) \\\\ \\Leftrightarrow x_{\\rm p}[k+1]&=&A_{\\rm m}x_{\\rm p}[k]+A_{\\rm m}K[k](y[k]-C_{\\rm m}x_{\\rm p}[k])+B_{\\rm m}u[k] \\end{eqnarray} $$",

        f_Lgain: "$$ \\begin{eqnarray} L=A_{\\rm m}K \\end{eqnarray} $$",

        f_lpf: "$$ \\begin{eqnarray} x_{\\rm K}[k]&=&x_{\\rm p}[k]+K(y[k]-C_{\\rm m}x_{\\rm p}[k])  \\\\ &=&(I-KC_{\\rm m})x_{\\rm p}[k]+KCx[k]+Kw \\\\ &=&(I-F)(Ax_{\\rm K}[k-1]+B_{\\rm m}u[k-1])+F(Ax[k-1]+Bu[k-1]+Gv)+Kw \\\\ &=&(I-F)Ax_{\\rm K}[k-1]+FAx[k-1]+B_{\\rm m}u[k-1]+FGv+Kw \\\\ &=&(I-F)Ax_{\\rm K}[k-1]+F(Ax[k-1]+Gv+C^{+}w)+B_{\\rm m}u[k-1] \\\\ &&(F\\triangleq KC,\\ C^{+}\\triangleq(C^{\\mathrm T}C)^{-1}C^{\\mathrm T})\\end{eqnarray}$$",

        f_general_observer: "$$ \\begin{eqnarray} x_{\\rm p}[k+1]&=&A_{\\rm m}x_{\\rm p}[k]+B_{\\rm u}u[k]+L(y[k]-x_{\\rm p}[k]) \\end{eqnarray}$$",

        f_observer_error: "$$ \\begin{eqnarray} x[k+1]-x_{\\rm p}[k+1]&=&Ax[k]+Bu[k]+Gv-A_{\\rm m}x_{\\rm p}[k]-B_{\\rm u}u[k]-L(y[k]-C_{\\rm m}x_{\\rm p}[k]) \\\\ &=&A(x[k]-x_{\\rm p}[k])-L(y[k]-C_{\\rm m}x_{\\rm p}[k])+Gv \\\\ &=&A(x[k]-x_{\\rm p}[k])-L(Cx[k]+w-C_{\\rm m}x_{\\rm p}[k])+Gv \\\\ &=&(A-LC)(x[k]-x_{\\rm p}[k])+Gv-Lw \\\\ \\therefore e_{\\rm p}[k+1] &=&(A-LC)e_{\\rm p}[k]+Gv-Lw\\end{eqnarray}$$",

        f_observer_cov: "$$ \\begin{eqnarray} e_{\\rm p}[k+1]e_{\\rm p}^{\\mathrm T}[k+1]&=&((A-LC)e_{\\rm p}[k]+Gv-Lw)((A-LC)e_{\\rm p}[k]+Gv-Lw)^{\\mathrm T} \\\\ \\therefore P_{\\rm p}[k+1]&=& (A-LC)P_{\\rm p}[k](A-LC)^{\\mathrm T}+GQG^{\\mathrm T}+LRL^{\\mathrm T}　\\\\  &=& AP_{\\rm p}[k]A^{\\mathrm T}-AP_{\\rm p}[k]C^{\\mathrm T}L^{\\mathrm T}-LCP_{\\rm p}[k]A^{\\mathrm T}+LCP_{\\rm p}[k]C^{\\mathrm T}L^{\\mathrm T}+GQG^{\\mathrm T}+LRL^{\\mathrm T} \\end{eqnarray}$$",

        f_observer_covmin: "$$ \\begin{eqnarray} \\frac{\\partial {\\rm tr}(P_{\\rm p }[k])}{\\partial L} &=&  -2(CP_{\\rm p}[k]A^{\\mathrm T})^{\\mathrm T}+2L(CP_{\\rm p}[k]C^{\\mathrm T}+R)=0  \\end{eqnarray}$$",

        f_kalman_gain:"$$ \\begin{eqnarray} L &=& AP_{\\rm p}^{\\mathrm T}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\\\ &=& AP_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\\\ &=&AK\\\\&&(\\because P_{\\rm p}[k]=P_{\\rm p}^{\\mathrm T}[k])\\end{eqnarray}$$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
.pic-observer{
  width:90%;
  max-width:500px;
  margin:10px;
}
</style>
