<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 内部モデル原理に基づく制御系設計 </h1>
      <p>
        フィードバック制御器の設計自由度は非常に高く，定量的な設計指針を知ることが重要となる。外乱抑圧を行うための指針を与える定理に内部モデル原理が挙げられる。内部モデル原理は1976年にB. A. Francisによって定式化され，線形制御系においてフィードバック制御器が外乱を抑圧するための十分条件を「制御器が外乱生成多項式と等しい極を有すること」と定めている。ここでは，外乱抑圧の条件を確認し，内部モデル原理の証明を行う。
      </p>

      <h2 class="research-subtitle"> 最終値の定理 </h2>
      <p>
        外乱抑圧の条件を「外乱が出力に与える影響が0に漸近すること」と定義する。そこで，外乱応答の最終値が0となることを示す。ここで，時間関数<i class="italic-tnr" style="margin-right:2px">f</i>(<i class="italic-tnr" style="margin:2px">t</i>)の最終値を求める処理について考える。<i class="italic-tnr" style="margin-right:2px">f</i>(<i class="italic-tnr" style="margin:2px">t</i>)の一次導関数のラプラス変換は次のようになる。
        <vue-mathjax :formula="f_laplace_df" />
        ここで，<i class="italic-tnr">s&rarr;0+</i>の極限を取ると，次の関係式が確認できる。
        <vue-mathjax :formula="f_laplace_df2" />
        ただし，上式で最終値を判定可能な関数は，<i class="italic-tnr" style="margin-right:2px">sF</i>(<i class="italic-tnr" style="margin:2px">s</i>)=<i class="italic-tnr" style="margin:2px">A</i> (<i class="italic-tnr" style="margin:2px">A</i>=const.) となるステップ関数<i class="italic-tnr" style="margin-right:2px">f</i>(<i class="italic-tnr" style="margin:2px">t</i>)=<i class="italic-tnr" style="margin:0 2px 0px 0px">A</i>(<i class="italic-tnr" style="margin:2px">t</i>&geq;<i class="italic-tnr" style="margin:2px">0</i>)を除けば，<i class="italic-tnr" style="margin-left:0">s=0</i>にてラプラス変換が可能な関数に限られる。関数<i class="italic-tnr" style="margin-right:2px">f</i>(<i class="italic-tnr" style="margin:2px">t</i>)のラプラス変換が存在する条件は次のようになる。
        <vue-mathjax :formula="f_laplace_def" />
        ここで，Re[<i class="italic-tnr" style="margin:2px">s</i>] &gt;<i class="italic-tnr">a</i>(<i class="italic-tnr" style="margin:2px">a&in;R</i>) の範囲でラプラス変換が存在する条件は，次のように表される。
        <vue-mathjax :formula="f_laplace_def2" />
        <vue-mathjax :formula="f_laplace_condition" />
        これは減衰を伴わない周期関数，すなわち虚軸上に極を持つ関数は<i class="italic-tnr">s=0</i>近傍でラプラス変換が不可能であることを示している。したがって，周期関数に対して最終値の定理を当てはめることはできない。実際に周期関数は一定値に収束せず，最終値は不定である。
      </p>

      <h2 class="research-subtitle"> 内部モデル原理 </h2>
      <p>
        以下のフィードバック制御系において，外乱応答を確認する。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/imc.png" class="pic-imc">
      </div>
      <p>
        外乱<i class="italic-tnr">d</i>は外乱生成多項式<i class="italic-tnr">D</i>およびディラックのデルタ関数<i class="italic-tnr">&delta;</i>によって生成されるものとする。また，各要素を次のように既約表現する。
        <vue-mathjax :formula="f_irreducible_form" />
        ここで，多項式の次数をdeg(&middot;)，最低次数をmin deg(&middot;)を用いて表すと，系がプロパーとなるための条件から以下の式が成立する。
        <vue-mathjax :formula="f_mindeg_n1" />
        また，一般に指令値追従問題では制御器がP制御器 (定数項) を含む必要があるため，以下の条件式が成立する。
        <vue-mathjax :formula="f_mindeg_n2" />
        続いて，外乱抑圧条件を確認する。既約表現を用いて，外乱応答は次のように表される。
        <vue-mathjax :formula="f_tf_dis" />
        この外乱応答の分子多項式および分母多項式の最低次数は次のようになる。
        <vue-mathjax :formula="f_mindeg_nd" />
        ここで，外乱応答の最終値が0に収束するための必要条件は，分子多項式の最低次数+1が分母多項式の最低次数を超えることとなる。したがって，制御器の分母多項式の最低次数は外乱生成多項式の分母多項式の最低次数以上となる必要がある。
        <vue-mathjax :formula="f_final_condition" />
        ここで，次の制約を考慮すると，制御器の分母多項式の最低次数が外乱生成多項式の相対次数以上となる必要がある。
        <vue-mathjax :formula="f_final_restriction" />
        加えて，持続振動のような外乱がシステムに入力される場合，<i class="italic-tnr">s=0</i>近傍でラプラス変換が可能となるための必要条件は，制御器と外乱生成多項式が等しい分母多項式を持ち，外乱応答伝達関数にて極零相殺を起こすことである。すなわち，制御器の分母多項式を次のように設計する必要がある。
        <vue-mathjax :formula="f_controller" />
        以上より，外乱を除去するための十分条件は，制御器が外乱生成多項式と等しい極配置を有することとなる。この原理は周期外乱の抑制を目的とした比例共振制御器 (Proportional-resonant controller: PR controller) や繰り返し制御器の設計などに導入されている。
      </p>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/linear_system/architecture">
            > 基本的な制御系のアーキテクチャ
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/linear_system/luenberger_observer">
            > Luenbergerのオブザーバ
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

        f_laplace_df: "$$ \\begin{eqnarray} \\int^{\\infty}_{0}\\frac{d}{dt}f(t)e^{-st}dt=sF(s)-f(0) \\end{eqnarray} $$",

        f_laplace_df2: "$$ \\begin{eqnarray} \\lim_{s\\rightarrow 0+}\\int^{\\infty}_{0}\\frac{d}{dt}f(t)e^{-st}dt&=&\\lim_{s\\rightarrow 0+}\\left(sF(s)-f(0)\\right) \\\\ \\Leftrightarrow \\int^{\\infty}_{0}\\frac{d}{dt}dt&=&\\lim_{s\\rightarrow 0+}sF(s)-f(0) \\\\ \\Leftrightarrow f(\\infty)-f(0)&=&\\lim_{s\\rightarrow 0+}sF(s)-f(0) \\\\ \\Leftrightarrow f(\\infty)&=&\\lim_{s\\rightarrow 0+}sF(s)\\end{eqnarray} $$",

        f_laplace_def: "$$ \\begin{eqnarray} F(s) &=& \\int^{\\infty}_{0}f(t)e^{-st}dt \\leq B\\ \\ (B={\\rm const.}>0) \\\\ &\\Leftrightarrow&\\lim_{\\rm t\\rightarrow\\infty}f(t)e^{-st}=0 \\end{eqnarray} $$",

        f_laplace_def2: "$$ \\begin{eqnarray} &&|f(t)| \\lt Ce^{at}\\ \\ (C={\\rm const.}>0) \\end{eqnarray} $$",

        f_laplace_condition: "$$ \\begin{eqnarray} \\Rightarrow&& f(t)e^{-st}\\lt \\left(Ce^{-{\\rm Im}[s]t}\\right)e^{-({\\rm Re}[s]-a)t} \\\\ \\Leftrightarrow&& \\lim_{\\rm t\\rightarrow\\infty}f(t)e^{-st}\\lt \\lim_{\\rm t\\rightarrow\\infty}\\left(Ce^{-{\\rm Im}[s]t}\\right)e^{-({\\rm Re}[s]-a)t} \\\\ \\therefore && \\lim_{\\rm t\\rightarrow\\infty}f(t)e^{-st}=0\\ \\ (\\because {\\rm Re}[s]-a>0) \\end{eqnarray} $$",

        f_irreducible_form: "$$ \\begin{eqnarray} P&=&\\frac{N_{\\rm p}}{D_{\\rm p}},\\ \\ C&=&\\frac{N_{\\rm c}}{D_{\\rm c}},\\ \\ D&=&\\frac{N_{\\rm d}}{D_{\\rm d}} \\\\  \\end{eqnarray} $$",

        f_mindeg_n1: "$$ \\begin{eqnarray} {\\rm deg}(D_{\\rm p})\\geq {\\rm deg}(N_{\\rm p}),\\ \\ {\\rm deg}(D_{\\rm c})\\geq {\\rm deg}(N_{\\rm c}),\\ \\ {\\rm deg}(D_{\\rm d})\\geq {\\rm deg}(N_{\\rm d}) \\end{eqnarray} $$",

        f_mindeg_n2: "$$ \\begin{eqnarray} &&{\\rm min\\ deg}(N_{\\rm c})=0\\end{eqnarray} $$",

        f_tf_dis: "$$ \\begin{eqnarray} y&=&\\frac{P}{I+PC}d = \\frac{\\frac{N_{\\rm p}}{D_{\\rm p}}}{1+\\frac{N_{\\rm p}}{D_{\\rm p}}\\frac{N_{\\rm c}}{D_{\\rm c}}}\\frac{N_{\\rm d}}{D_{\\rm d}} = \\frac{N_{\\rm p}D_{\\rm c}}{D_{\\rm p}D_{\\rm c}+N_{\\rm p}N_{\\rm c}}\\frac{N_{\\rm d}}{D_{\\rm d}} \\end{eqnarray} $$",

        f_mindeg_nd: "$$ \\begin{eqnarray} {\\rm Numerator}&:&{\\rm min\\ deg}(N_{\\rm p}N_{\\rm d}D_{\\rm c}) \\\\ {\\rm Denominator}&:&{\\rm min\\ deg}((D_{\\rm p}D_{\\rm c}+N_{\\rm p}N_{\\rm c})D_{\\rm d})={\\rm min\\ deg}(N_{\\rm p}D_{\\rm d}) \\end{eqnarray} $$",

        f_final_condition: "$$ \\begin{eqnarray} &&{\\rm min\\ deg}(sN_{\\rm p}N_{\\rm d}D_{\\rm c})\\gt {\\rm min\\ deg}(N_{\\rm p}D_{\\rm d})\\\\ \\Leftrightarrow&&{\\rm min\\ deg}(sN_{\\rm d}D_{\\rm c})\\gt {\\rm min\\ deg}(D_{\\rm d})\\\\ \\Leftrightarrow&&{\\rm min\\ deg}(N_{\\rm d}D_{\\rm c})+1 \\gt {\\rm min\\ deg}(D_{\\rm d}) \\\\ \\Leftrightarrow&&{\\rm min\\ deg}(N_{\\rm d}D_{\\rm c}) \\geq  {\\rm min\\ deg}(D_{\\rm d}) \\end{eqnarray} $$",

        f_final_restriction: "$$ \\begin{eqnarray} {\\rm min\\ deg}(D_{\\rm d})&\\geq& {\\rm min\\ deg}(N_{\\rm d}) \\end{eqnarray} $$",

        f_controller: "$$ \\begin{eqnarray} D_{\\rm c}=QD_{\\rm d} \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-imc{
  width:70%;
  max-width:280px;
  margin:10px;
}

</style>
