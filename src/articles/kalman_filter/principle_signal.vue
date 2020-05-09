<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> カルマンフィルタの構造 </h1>
      <p>
        複雑な過程を経て導出されたカルマンフィルタではあるが，最終的に実装されるフィルタは単純で無機質な形式となる。本項では導出されたフィルタの信号処理的性質を確認する。カルマンフィルタの最終的な推定式は次のようになる。ただし，モデル化誤差およびモデル変動は十分に小さいものとした。
        <vue-mathjax :formula="f_update2" />
        ここで，<i class="italic-tnr">F</i>は次のような値を持つ。
        <vue-mathjax :formula="f_update3" />
        上記のフィルタにおいて，予測値の係数と観測値の係数は相補的な関係にあり，このフィルタは低域通過フィルタのように働くことがわかる。そして，その遮断周波数は<i class="italic-tnr">H</i>によって決定される。単純な離散低域通過フィルタの導出を本項付録に記した。ここで，<i class="italic-tnr">H</i>の持つ意味について考える。発見的な解釈ではあるが，<i class="italic-tnr">H</i>の分母多項式は観測誤差の共分散行列に相当する。以下に観測誤差の共分散行列の導出過程を示す。まず，観測誤差は次のように表される。
        <vue-mathjax :formula="f_error_sensor" />
        不偏推定が達成されていると仮定すると，共分散行列は以下のように計算される。
        <vue-mathjax :formula="f_cov_sensor" />
        したがって，<i class="italic-tnr">H</i>の分母多項式は観測誤差の共分散行列であり，予測誤差の共分散と観測雑音の共分散から構成される。そして，<i class="italic-tnr">H</i>の分子多項式は予測誤差の共分散を表す。以上より，<i class="italic-tnr">H</i>は予測誤差の共分散が観測誤差の共分散に与える影響の割合を示す変数である。<i class="italic-tnr">H</i>が大きいことは，予測誤差が観測誤差の大半を占める原因であり，予測が当てにならないことを示している。この場合にはフィルタリングにおいて観測値の係数<i class="italic-tnr">F</i>が大きくなり，観測値を通過させて予測値の寄与を低減する。一方で観測雑音が大きい場合には<i class="italic-tnr">H</i>は小さい値を持ち，観測結果より予測の方が信頼できることを示す。このとき，フィルタリングにおいて予測値の係数<i class="italic-tnr">I-F</i>が大きくなり，予測値を通過させて観測値の寄与を低減する。つまり，<i class="italic-tnr">H</i>は予測誤差の共分散と観測雑音の共分散の内分点を示し，カルマンフィルタは「予測と観測の信頼性の比率」に基づき予測状態量と観測状態量の通過率を決定する。
      </p>

      <h2 class="research-subtitle"> 付録：離散低域通過フィルタの導出 </h2>
      <p>
        連続時間系において，次に示す単純なIIR (Infinite Impulse Response)フィルタを考える。
        <vue-mathjax :formula="f_continuout_lpf" />
        ただし，<i class="italic-tnr">g</i>は遮断周波数を表す。ここで，サンプル時間を<i class="italic-tnr">T</i>として，後退差分法を用いて離散時間系における低域通過フィルタを導出する。
        <vue-mathjax :formula="f_discrete_lpf" />
        したがって，右辺の項は相補的関係にある場合に，フィルタは低域通過特性を持つ。ここで，<i class="italic-tnr">y</i>の係数が大きいことは遮断周波数が低いことを示し，<i class="italic-tnr">x</i>の係数が大きいことは遮断周波数が高いことを示す。カルマンフィルタは観測値を入力<i class="italic-tnr">x</i>として推定値を出力<i class="italic-tnr">y</i>とする構成であり，遮断周波数が「観測の信頼性」に依存する低域通過フィルタであることがわかる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/kalman_filter/operation">
            > 状態量の予測と更新
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" />
        </li>

        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
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
        f_update2: "$$ \\begin{eqnarray} x_{\\rm K}[k]&=&x_{\\rm p}[k]+K[k]e_{\\rm y}[k] \\\\ &=&x_{\\rm p}[k]+K[k](y[k]-C_{\\rm m}x_{\\rm p}[k]) \\\\ &=&x_{\\rm p}[k]+K[k]y[k]-K[k]C_{\\rm m}x_{\\rm p}[k] \\\\ &=&x_{\\rm p}[k]+K[k]Cx[k]-K[k]C_{\\rm m}x_{\\rm p}[k]+K[k]w \\\\ &=&(I-K[k]C)x_{\\rm p}[k]+K[k]Cx[k]+K[k]w　\\\\ &=&(I-F)x_{\\rm p}[k]+Fx[k]+K[k]w \\\\ &=&(I-F)(A_{\\rm m}x_{\\rm K}[k-1]+B_{\\rm m}u[k-1])+F(Ax[k-1]+Bu[k-1]+Gv)+K[k]w \\\\ &=&(I-F)Ax_{\\rm K}[k-1]+FAx[k-1]+Bu[k-1]+FGv+K[k]w \\\\ &=&(I-F)Ax_{\\rm K}[k-1]+F(Ax[k-1]+Gv+C^{+}w)+Bu[k-1] \\\\ &&(F\\triangleq K[k]C,\\ C^{+}\\triangleq(C^{\\mathrm T}C)^{-1}C^{\\mathrm T}) \\end{eqnarray} $$",

        f_update3: "$$ \\begin{eqnarray} F&=&P_{\\rm p}[k]^{\\mathrm T} C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1}C = C^{+} H C \\\\ H&\\triangleq&CP_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\end{eqnarray}$$",

        f_error_sensor: "$$ \\begin{eqnarray} e_{\\rm y}[k] &=&y[k]-y_{\\rm p}[k] \\\\ &=&Cx[k]-C_{\\rm m}x_{\\rm p}[k] +w \\\\ &=&Ce_{\\rm p}[k]+w\\end{eqnarray} $$",

        f_cov_sensor: "$$ \\begin{eqnarray} e_{\\rm y}[k]e_{\\rm y}^{\\mathrm T}[k]&=& (Ce_{\\rm p}[k]+w)(Ce_{\\rm p}[k]+w)^{\\mathrm T} \\\\ &=& (Ce_{\\rm p}[k]+w)(e_{\\rm p}^{\\mathrm T}[k]C^{\\mathrm T}+w^{\\mathrm T}) \\\\ &=& Ce_{\\rm p}[k]e_{\\rm p}^{\\mathrm T}[k]C^{\\mathrm T}+Ce_{\\rm p}[k]w+we_{\\rm p}^{\\mathrm T}[k]C^{\\mathrm T}+ww^{\\mathrm T} \\\\ \\therefore P_{\\rm y}[k]&=&CP_{\\rm p}[k]C^{\\mathrm T}+R \\\\ (P_{\\rm y}[k]&\\triangleq&{\\rm cov}\\left[e_{\\rm y}[k]\\right]) \\end{eqnarray} $$",

        f_continuout_lpf: "$$ \\begin{eqnarray} L_{\\rm c}(s)=\\frac{g}{s+g} \\end{eqnarray} $$",
        f_discrete_lpf: "$$ \\begin{eqnarray} s&\\leftarrow&\\frac{1-z^{-1}}{T} \\\\ L_{\\rm d}(z)&=&L_{\\rm c}\\left(\\frac{1-z^{-1}}{T}\\right)=\\frac{gT}{1+gT-z^{-1}}\\\\ &\\Leftrightarrow&(1+gT-z^{-1})y[k]=gTx[k] \\\\ \\therefore y[k]&=&\\frac{1}{1+gT}y[k]+\\frac{gT}{1+gT}x[k] \\\\ &=&\\frac{T^{-1}}{T^{-1}+g}y[k]+\\frac{g}{T^{-1}+g}x[k]　\\end{eqnarray} $$",
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
</style>
