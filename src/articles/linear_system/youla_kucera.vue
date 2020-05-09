<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> Youla-Ku&ccaron;eraのパラメトリゼーション </h1>
      <p>
        Youla-Ku&ccaron;eraのパラメトリゼーションはフィードバック制御系の全ての安定化制御器を1つのフリーパラメータの関数として記述する。複雑な多重フィードバックループを持つ制御系であっても単一フィードバック制御器を用いた等価構造を有し，フリーパラメータを使用して記述可能である。また，Youla-Ku&ccaron;eraのパラメトリゼーションを用いることで2自由度制御系の内部構造と動作を簡潔に表すことができる。
      </p>

      <h2 class="research-subtitle"> 安定化制御器の表現 </h2>
      <p>
        制御対象<i class="italic-tnr">P</i>の右・左既約分解表現が与えられた時，制御系を安定化する全ての制御器は次のように表現される。
        <vue-mathjax :formula="f_youla_controller" />
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/youla1.png" class="pic-youla1">
      </div>
      <p>
        ここで，<i class="italic-tnr">Q</i>はフリーパラメータを表す。また，<i class="italic-tnr" style="margin-left:0">X, Y, X&#771;, Y&#771;</i>は (<i class="italic-tnr" style="margin:2px">N, D</i>) および (<i class="italic-tnr" style="margin:2px">N&#771;, D&#771;</i>) のベズー係数とし，次を満たすとする。
        <vue-mathjax :formula="f_youla_bezout" />
        上式はベズーの等式と右・左既約分解の性質を纏めた行列方程式を表す。フリーパラメータ<i class="italic-tnr">Q</i>は次を満たす範囲で自由に設計できる。
        <vue-mathjax :formula="f_youla_Qparam" />
        ベズー係数が求まった後，フリーパラメータを設計することで制御系の調整が可能となる。
      </p>

      <h2 class="research-subtitle"> 2自由度制御系の内部構造 </h2>
      <p>
        2自由度制御系は指令値追従特性を確保する機構と外乱を抑圧する機構を備えている。Youla-Ku&ccaron;eraが示した安定化制御器を使用して2自由度制御系を変換することで，機能ごとに独立したブロック線図を得ることができる。これにより2自由度制御器の動作をより理解することができる。
      </p>
      <p>
        制御系の入力<i class="italic-tnr">u</i>に着目して2自由度制御器の構造を変換する。制御器<i class="italic-tnr">C</i>がYoula-Ku&ccaron;eraの定義した制御器構成を取る場合に，入力<i class="italic-tnr">u</i>は次のように表される。
        <vue-mathjax :formula="f_youla_input" />
        この入力を基にブロック線図を作成すると，以下のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/youla2.png" class="pic-youla2">
      </div>
      <p>
        上図において，外乱を推定する機構(A)および推定外乱をフィードバックする機構が確認できる。2自由度制御系の設計理念は指令値追従と外乱抑圧の機構を独立にすることであり，外乱推定機構(A)は後者の役割を果たす。また，この外乱推定機構(A)を除いた場合に，出力は次のように表される。
        <vue-mathjax :formula="f_youla_nominal1" />
        <vue-mathjax :formula="f_youla_nominal2" />
        したがって，上側ループは追従特性を確保していることがわかる。ここで，<i class="italic-tnr">X</i>は推定外乱をフィードバックする機構に影響を与えず，指令値追従特性の確保のみに関わることが確認できる。これは制御器<i class="italic-tnr">C</i>の分母多項式が<i class="italic-tnr">Y</i>，分子多項式が<i class="italic-tnr">X</i>に依存することから推察できる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/linear_system/luenberger_observer">
            > Luenbergerのオブザーバ
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

        f_youla_controller: "$$ \\begin{eqnarray} P&\\triangleq&ND^{-1}=\\tilde{D}^{-1}\\tilde{N}\\\\C&=&(Y-Q\\tilde{N})^{-1}(X+Q\\tilde{D})=(\\tilde{X}+DQ)(\\tilde{Y}-NQ)^{-1} \\end{eqnarray} $$",

        f_youla_bezout: "$$ \\begin{eqnarray} \\begin{bmatrix} Y & X \\\\ -\\tilde{N} & \\tilde{D} \\end{bmatrix}\\begin{bmatrix} D & -\\tilde{X} \\\\ N & \\tilde{Y} \\end{bmatrix}&=&\\begin{bmatrix} I & 0 \\\\ 0 & I \\end{bmatrix}　\\\\ \\begin{bmatrix} D & -\\tilde{X} \\\\ N & \\tilde{Y} \\end{bmatrix}\\begin{bmatrix} Y & X \\\\ -\\tilde{N} & \\tilde{D} \\end{bmatrix}&=&\\begin{bmatrix} I & 0 \\\\ 0 & I \\end{bmatrix} \\end{eqnarray} $$",

        f_youla_Qparam: "$$ \\begin{eqnarray} \\left\\{\\begin{matrix}{\\rm det}(Y-Q\\tilde{N})\\neq0 \\\\ {\\rm det}(\\tilde{Y}-QN)\\neq0\\end{matrix}\\right. \\end{eqnarray} $$",

        f_youla_input: "$$ \\begin{eqnarray} u&=&DKr+C(NKr-y) \\\\ &=&DKr+(Y-Q\\tilde{N})^{-1}(X+Q\\tilde{D})(NKr-y) \\\\[4pt] \\Leftrightarrow (Y-Q\\tilde{N})u&=&(Y-Q\\tilde{N})DKr+(X+Q\\tilde{D})(NKr-y) \\\\[4pt]  \\Leftrightarrow Yu&=&Q\\tilde{N}u+(Y-Q\\tilde{N})DKr+(X+Q\\tilde{D})(NKr-y) \\\\ &=&(YD+XN)Kr-Xy +Q(\\tilde{N}u-\\tilde{D}y) +Q(\\tilde{D}N-\\tilde{N}D)Kr \\\\ &=&Kr-Xy +Q\\tilde{N}(u-P^{-1}y) \\ \\ \\ (\\because\\ \\tilde{N}D-\\tilde{D}N=0,\\ \\ YD+XN=I)\\\\[4pt] \\Leftrightarrow u&=&Y^{-1}(Kr-Xy+Q\\tilde{N}(u-P^{-1}y)) \\end{eqnarray} $$",

        f_youla_nominal1: "$$ \\begin{eqnarray} y&=&P(Y^{-1}Kr-Y^{-1}Xy) \\\\ &=&PY^{-1}Kr-PY^{-1}(I-YD)N^{-1}y \\\\ &=&PY^{-1}Kr-P(Y^{-1}N^{-1}-P^{-1})y \\\\ &=&PY^{-1}Kr-(PY^{-1}N^{-1}-I)y \\end{eqnarray} $$",

        f_youla_nominal2: "$$ \\begin{eqnarray} \\Leftrightarrow (I+PY^{-1}N^{-1}-I)y&=&PY^{-1}Kr \\\\  \\Leftrightarrow PY^{-1}N^{-1}y&=&PY^{-1}Kr \\\\ \\therefore y&=&NKr\\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-youla1{
  width:90%;
  max-width:450px;
  margin:10px;
}
.pic-youla2{
  width:90%;
  max-width:500px;
  margin:10px;
}

</style>
