<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 連続時間系における設計 </h1>
      <p>
        フィードフォワード制御はシステムの俊敏な応答を実現するために不可欠な技術である。1自由度制御系では指令値と出力の偏差から制御入力が決定されたため，出力遅れを回避することができなかった。そのため，システムの動的特性を考慮して入力を行い，追従特性を向上する必要があった。ここでは，2自由度制御系のフィードフォワード制御系の設計のうち，連続時間系で設計を行った後に実装する方法について紹介する。
      </p>

      <h2 class="research-subtitle"> 平滑器を用いた実装方法</h2>

      <p>
        2自由度制御系の構造と入出力特性は次のように表される。
        <vue-mathjax :formula="f_tf_2dof" />
      </p>
      <div class="pic-container">
        <img src="@/pic/feedforward/controller_2dof.png" class="pic-controller_2dof">
      </div>
      <p>
        ただし，<i class="italic-tnr">N, D</i>は<i class="italic-tnr">P</i>右既約分解表現における分子多項式および分母多項式とする。ここで，多項式の次数をdeg(&middot;)を用いて表した時，次の関係が成立する。
        <vue-mathjax :formula="f_nd_proper" />
        一般的に<i class="italic-tnr">D</i>は非プロパーであり，理想的な出力に純粋な微分演算を必要とするため直接実装することはできない。ただし，実際に実装するフィードフォワード制御器およびフィードバック制御系への入力整形器は次の通りである。
        <vue-mathjax :formula="f_controller" />
        したがって，<i class="italic-tnr">K</i>は平滑器として働き，制御系をプロパーとする役割を持つ。ここで，システムの相対次数をrel deg(&middot;)と表記すると，制御器がプロパーとなる条件は次のようになる。
        <vue-mathjax :formula="f_condition" />
        ただし，出力は平滑器<i class="italic-tnr">K</i>に依存する遅れが伴うため，正確な軌道設計が困難になるという問題がある。
      </p>

      <h2 class="research-subtitle"> 解析解を用いた実装方法 </h2>
      <p>
        システムが非プロパーであっても，入力が既知である場合にはシステムの入出力の解析解を用いて実装することができる。すなわち，既知の指令値が入力となるフィードフォワード制御器は，解析解を用いて実装可能である。
      </p>
      <p>
        非プロパーシステムに現れる<i class="italic-tnr">s<sup>n</sup></i>は，限定的な条件において純粋なn階微分処理を表しており，入力信号のn次導関数を用いることで実装可能となる。
        <vue-mathjax :formula="f_solution" />
        したがって，<i class="italic-tnr">s<sup>n</sup></i>の実装には入力となる指令値がn階微分可能であり，かつ初期値および(n-1)次までの導関数の初期値が0であればよい。次数2のシステムの制御では関数の初期値および1次導関数の初期値が0の信号を指令値として設計すれば良く，次に示すステップ状関数が使用できる。
        <vue-mathjax :formula="f_command" />
        ただし，実装においてはサンプル&ホールドの影響があるため，連続時間系の解析解を使用したフィードフォワード信号を離散制御系で使用した際にサンプル点追従の実現は保証されない。厳密なサンプル点追従のためには離散時間系で設計されたフィードフォワード制御器を使用する必要がある。サンプル点追従の制約がなく，出力位相遅れの低減を目的としたフィードフォワード制御であれば，誤差はフィードバック制御器が補償するため，解析解を用いた方法で十分となる。
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
          <router-link class="article-link-f" to="/research/articles/feedforward/perfect_tracking">
            > 完全追従制御
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

        f_tf_2dof: "$$ \\begin{eqnarray} y&=& N_{\\rm n}Kr-(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}Kr+(I+PC)^{-1}Pd　\\\\ &\\approx& N_{\\rm n}Kr+(I+PC)^{-1}Pd \\end{eqnarray} $$",

        f_nd_proper: "$$ \\begin{eqnarray} {\\rm deg}(D)\\geq{\\rm deg}(N) \\end{eqnarray} $$",

        f_controller: "$$ \\begin{eqnarray} F_{\\rm ff}&=&D_{\\rm n}K \\\\ F_{\\rm fb}&=&N_{\\rm n}K \\end{eqnarray} $$",

        f_condition: "$$ \\begin{eqnarray} {\\rm rel\\ deg}(K)\\geq{\\rm deg}(D_{\\rm n}) \\end{eqnarray} $$",

        f_solution: "$$ \\begin{eqnarray} F(s)&\\triangleq&\\int^{\\infty}_{0}f(t)e^{-st}dt \\\\[10pt] \\int^{\\infty}_{0}\\frac{d}{dt}f(t)e^{-st}dt &=& \\left[f(t)e^{-st}\\right]^{\\infty}_{0}-\\int^{\\infty}_{0}f(t)\\frac{d}{dt}e^{-st}dt\\\\&=&sF(s)-f(0) \\\\ &=&sF(s)\\ \\ \\left({\\rm when}\\ f(0)=0\\right)\\\\[10pt] \\int^{\\infty}_{0}\\frac{d^2}{dt^2}f(t)e^{-st}dt &=& \\left[\\frac{d}{dt}f(t)e^{-st}\\right]^{\\infty}_{0}-\\int^{\\infty}_{0}\\frac{d}{dt}f(t)\\frac{d}{dt}e^{-st}dt \\\\ &=& -\\frac{d}{dt}f(0)+s\\int^{\\infty}_{0}\\frac{d}{dt}f(t)e^{-st}dt\\\\ &=&s^2F(s)-sf(0)-\\frac{d}{dt}f(0) \\\\ &=&s^2F(s)\\ \\ \\left({\\rm when}\\ f(0)=\\frac{d}{dt}(0)=0\\right)\\\\[10pt] \\int^{\\infty}_{0}\\frac{d^{\\rm n}}{dt^{\\rm n}}f(t)e^{-st}dt &=& \\left[\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}f(t)e^{-st}\\right]^{\\infty}_{0}-\\int^{\\infty}_{0}\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}f(t)\\frac{d}{dt}e^{-st}dt \\\\ &=& -\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}f(0)+s\\int^{\\infty}_{0}\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}f(t)e^{-st}dt \\\\ &=& s^{\\rm n}F(s)-s^{{\\rm n}-1}f(0)-s^{{\\rm n}-2}\\frac{d}{dt}f(0)-s^{{\\rm n}-3}\\frac{d^2}{dt^2}f(0)-\\cdots-\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}f(0) \\\\ &=&s^{\\rm n}F(s)\\ \\ \\left({\\rm when}\\ f(0)=\\frac{d}{dt}(0)=\\frac{d^2}{dt^2}(0)=\\cdots=\\frac{d^{{\\rm n}-1}}{dt^{{\\rm n}-1}}(0)=0\\right) \\end{eqnarray} $$",

        f_command: "$$ \\begin{eqnarray} r(t)=&&\\left\\{\\begin{matrix} \\frac{A}{2}(1-\\cos(2\\pi ft)) & (0\\leq t < \\frac{1}{2f}) \\\\ A & (t\\geq \\frac{1}{2f}) \\end{matrix}\\right. \\\\[4pt] &&(A:\\ {\\rm step\\ size},\\ \\ f:\\ {\\rm frequency}) \\end{eqnarray} $$",
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-controller_2dof{
  width:90%;
  max-width:500px;
  margin:0 0 10px;
}

</style>
