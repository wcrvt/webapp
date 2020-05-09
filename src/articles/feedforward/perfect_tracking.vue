<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 完全追従制御 </h1>
      <p>
        連続時間で設計した制御系を離散化した場合には，離散化誤差の影響で理想的なフィードフォワードを実現することができない。完全追従制御はシステムの厳密離散化表現に基づいて入力を決定する手法であり，観測サンプル点上の追従を達成する。本手法の特徴は，観測サンプル点間において複数回の入力を行うマルチレート制御系であることが挙げらえれる。ここでは，マルチレート制御による完全追従制御の紹介をする。
      </p>

      <h2 class="research-subtitle"> システムの厳密離散化 </h2>
       <p>
         連続時間系において，システムが次の非斉次微分方程式によって表されるものとする。
         <vue-mathjax :formula="f_ssr_cmodel" />
         この方程式の解を定数変化法により求める。ここで，斉次微分方程式の解は次のようになる。
         <vue-mathjax :formula="f_ssr_homogeneous" />
         そこで，非斉次微分方程式の一般解を次のようにおく。
         <vue-mathjax :formula="f_ssr_nonhomogeneous" />
         このとき，非斉次微分方程式を展開することで次の解を得る。
         <vue-mathjax :formula="f_ssr_nonhomogeneous2" />
         計算の都合上，積分変数を変更して式を整理すると，以下のようになる。
         <vue-mathjax :formula="f_ssr_nonhomogeneous3" />
         ここで，システムが線形時不変であるとすると，解は次のようになる。
         <vue-mathjax :formula="f_ssr_nonhomogeneous4" />
         サンプリング時間を<i class="italic-tnr">T<sub>s</sub></i>とし，サンプル点kおよびサンプル点k+1の状態を調べると，次の関係が成立する。
         <vue-mathjax :formula="f_ssr_sample1" />
         ここで，入力がサンプル点間にて一定値を取る場合，積分計算が次のように簡略化される。
         <vue-mathjax :formula="f_ssr_sample2" />
         上式は置換積分を用いて簡略化することができる。
         <vue-mathjax :formula="f_ssr_substitution" />
         <vue-mathjax :formula="f_ssr_sample3" />
         右辺第一項はシステムの自由運動による1ステップの状態遷移を表し，第二項は入力による1ステップの状態遷移を表す。
       </p>

      <h2 class="research-subtitle"> 状態遷移の可到達性と可制御性 </h2>
      <p>
        完全追従制御はマルチレートフィードフォワード技術であり，複数回の入力の切り替えによって観測サンプル点における指令値追従を達成する。複数回の入力が必要な理由は，制御する状態の数に対して入力の自由度が不足しているためである。今，システムの状態空間表現がn個の状態を持つ場合に1個の入力を用いてサンプル点追従の達成する条件を求める。
        <vue-mathjax :formula="f_ssr_dmodel" />
        この時，サンプル点k+1において所望の状態<i class="italic-tnr">x<sup>d</sup></i>への遷移を実現する入力は次のように表される。
        <vue-mathjax :formula="f_ssr_input1" />
        しかしながら，入力行列<i class="italic-tnr">B</i>の逆行列は存在しないため，サンプル点追従を達成する入力<i class="italic-tnr">u</i>は求まらない。これは，入力<i class="italic-tnr">u</i>が1ステップでは作用できない状態が存在することに起因する。これに対処するためには，複数ステップの入力によってn個の状態に作用する必要がある。
        <vue-mathjax :formula="f_ssr_input2" />
        このように，入力<i class="italic-tnr">u</i>はシステムの自由運動によって間接的に全ての状態に作用する可能性を有する。ここで，行列<i class="italic-tnr">M</i>は可制御行列と呼ばれる。行列<i class="italic-tnr">M</i>のi列は，サンプル点k+n-iの入力がサンプル点k+nの状態に与える影響を表す。この行列がフルランクであることは，入力が全ての状態に可到達であることを示す。ここで，行列<i class="italic-tnr">M</i>が正則であり，逆行列が存在するのであれば，n個の状態はn回の入力の切り替えによって作用可能となる。
        <vue-mathjax :formula="f_ssr_input3" />
      </p>

      <h2 class="research-subtitle"> マルチレート2自由度制御系 </h2>
      <p>
        システムを厳密に記述することは非常に困難であり，外乱やシステムの不確かさなどが存在することから，フィードフォワード制御のみを用いて制御目標を達成することは難しい。完全追従制御は上記のフィードフォワード制御器に加えてフィードバック制御器を有するマルチレート制御系の構成をとる。
      </p>
      <div class="pic-container">
        <img src="@/pic/feedforward/ptc.png" class="pic-ptc">
      </div>
      <p>
        完全追従制御ではn回の入力切り替えによってnサンプル点ごとのサンプル点追従を達成するため，フィードバック制御器はフィードフォワード制御器のn倍遅い周期を持つ。本制御系を用いることで，理想状態においてはサンプル点追従が実現されるが，制御対象が共振系である場合には，指令値やフィードバック制御器の設計によってサンプル点間応答が振動的になるので留意する必要がある。また，完全追従制御は指令値の急峻なの変化や不連続な変化に対して入力飽和を起こしやすい。特に，制御開始時に全ての状態量が初期値から滑らかに変化するような指令値を設計する必要がある。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/feedforward/continuous">
            > 連続時間系における設計
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link />
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

        f_ssr_cmodel: "$$ \\begin{eqnarray} \\dot{x}(t)=Ax(t)+Bu(t) \\end{eqnarray} $$",

        f_ssr_homogeneous: "$$ \\begin{eqnarray} x(t)={\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C\\ \\ (C={\\rm const}.) \\end{eqnarray} $$",

        f_ssr_nonhomogeneous: "$$ \\begin{eqnarray} x(t)={\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C(t) \\end{eqnarray} $$",

        f_ssr_nonhomogeneous2: "$$ \\begin{eqnarray} && \\dot{x}(t)=Ax(t)+Bu(t) \\\\ \\Leftrightarrow && A{\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C(t) + {\\rm exp}\\left(\\int^{t}_{0} Adt\\right)\\frac{d}{dt}C(t)=A{\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C(t)+Bu(t) \\\\ \\Leftrightarrow && {\\rm exp}\\left(\\int^{t}_{0} Adt\\right)\\frac{d}{dt}C(t)=Bu(t) \\\\ \\Leftrightarrow && \\frac{d}{dt}C(t)={\\rm exp}\\left(-\\int^{t}_{0} Adt\\right)Bu(t) \\\\ \\Leftrightarrow && C(t)=\\int^{t}_{0} {\\rm exp}\\left(-\\int^{t}_{0} Adt\\right)Bu(t) dt +C_{0}\\ \\ (C_{0}={\\rm const}.) \\\\ \\therefore && x(t)={\\rm exp}\\left(\\int^{t}_{0} Adt\\right)\\int^{t}_{0} {\\rm exp}\\left(-\\int^{t}_{0} Adt\\right)Bu(t) dt +{\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C_{0} \\end{eqnarray} $$",

        f_ssr_nonhomogeneous3: "$$ \\begin{eqnarray} x(t)&=&{\\rm exp}\\left(\\int^{t}_{0} Adt\\right)\\int^{t}_{0} {\\rm exp}\\left(-\\int^{\\tau}_{0} Ad\\tau\\right)Bu(\\tau) d\\tau +C_{0}{\\rm exp}\\left(\\int^{t}_{0} Adt\\right) \\\\ &=&\\int^{t}_{0} \\left(\\int^{t}_{\\tau} Ad\\tau\\right)Bu(\\tau){\\rm exp} d\\tau +{\\rm exp}\\left(\\int^{t}_{0} Adt\\right)C_{0} \\\\ &=& {\\rm exp}\\left(\\int^{t}_{0} Adt\\right)x(0)+ \\int^{t}_{0} {\\rm exp}\\left(\\int^{t}_{\\tau} Ad\\tau\\right)Bu(\\tau) d\\tau \\end{eqnarray} $$",

        f_ssr_nonhomogeneous4: "$$ \\begin{eqnarray} x(t)&=& e^{At}x(0) + \\int^{t}_{0} e^{A(t-\\tau)}Bu(\\tau) d\\tau \\end{eqnarray} $$",

        f_ssr_sample1: "$$ \\begin{eqnarray} x(kT_{\\rm s})&=& e^{A(kT_{\\rm s})}x(0) + \\int^{kT_{\\rm s}}_{0} e^{A(kT_{\\rm s}-\\tau)}Bu(\\tau) d\\tau \\\\ x((k+1)T_{\\rm s})&=& e^{A((k+1)T_{\\rm s})}x(0) + \\int^{(k+1)T_{\\rm s}}_{0} e^{A((k+1)T_{\\rm s}-\\tau)}Bu(\\tau) d\\tau \\\\ &=& e^{A((k+1)T_{\\rm s})}x(0) + \\int^{(k+1)T_{\\rm s}}_{kT_{\\rm s}} e^{A((k+1)T_{\\rm s}-\\tau)}Bu(\\tau) d\\tau + \\int^{kT_{\\rm s}}_{0} e^{A((k+1)T_{\\rm s}-\\tau)}Bu(\\tau) d\\tau \\\\ &=& e^{AT_{\\rm s}}\\left( e^{A(kT_{\\rm s})}x(0) + \\int^{kT_{\\rm s}}_{0} e^{A(kT_{\\rm s}-\\tau)}Bu(\\tau) d\\tau \\right)+ \\int^{(k+1)T_{\\rm s}}_{kT_{\\rm s}} e^{A((k+1)T_{\\rm s}-\\tau)}Bu(\\tau) d\\tau \\\\ &=& e^{AT_{\\rm s}}x(kT_{\\rm s})+ \\int^{(k+1)T_{\\rm s}}_{kT_{\\rm s}} e^{A((k+1)T_{\\rm s}-\\tau)} Bu(\\tau) d\\tau \\end{eqnarray} $$",

        f_ssr_sample2: "$$ \\begin{eqnarray} x((k+1)T_{\\rm s})&=& e^{AT_{\\rm s}}x(kT_{\\rm s})+ \\left(\\int^{(k+1)T_{\\rm s}}_{kT_{\\rm s}} e^{A((k+1)T_{\\rm s}-\\tau)} d\\tau\\right) Bu(kT_{\\rm s}) \\end{eqnarray} $$",

        f_ssr_substitution: "$$ \\begin{eqnarray} \\gamma&\\triangleq&(k+1)T_{\\rm s}-\\tau\\ \\ (\\gamma:\\ T_{\\rm s}\\rightarrow 0,\\ \\ d\\tau = -d\\gamma) \\end{eqnarray} $$",

        f_ssr_sample3: "$$ \\begin{eqnarray} x((k+1)T_{\\rm s})&=& e^{AT_{\\rm s}}x(kT_{\\rm s})+ \\left(\\int^{0}_{T_{\\rm s}} e^{A\\gamma} (-d\\gamma)\\right) Bu(kT_{\\rm s}) \\\\&=& e^{AT_{\\rm s}}x(kT_{\\rm s})+ \\left(\\int^{T_{\\rm s}}_{0} e^{A\\gamma} d\\gamma\\right) Bu(kT_{\\rm s}) \\\\ \\therefore x((k+1)T_{\\rm s})&=&A_{\\rm d}x(kT_{\\rm s})+B_{\\rm d}u(kT_{\\rm s}) \\ \\ \\left( A_{\\rm d} \\triangleq e^{AT_{\\rm s}},\\ \\ B_{\\rm d}\\triangleq \\int^{T_{\\rm s}}_{0} e^{A\\gamma} d\\gamma B \\right)\\end{eqnarray} $$",

        f_ssr_dmodel: "$$ \\begin{eqnarray} x[k+1]&=&A_{\\rm d}x[k]+B_{\\rm d}u[k] \\\\ (A\\in R^{{\\rm n}\\times n},\\ B&\\in& R^{{\\rm n}\\times 1},\\ x\\in R^{{\\rm n}\\times 1},\\ u\\in R )\\end{eqnarray} $$",

        f_ssr_input1: "$$ \\begin{eqnarray} u[k]&=&B_{\\rm d}^{-1}(x^{\\rm d}[k+1]-A_{\\rm d}x[k])\\end{eqnarray} $$",

        f_ssr_input2: "$$ \\begin{eqnarray} x[k+1]&=&A_{\\rm d}x[k]+B_{\\rm d}u[k] \\\\ x[k+2]&=&A_{\\rm d}x[k+1]+B_{\\rm d}u[k+1] \\\\ &=&A_{\\rm d}(A_{\\rm d}x[k]+B_{\\rm d}u[k])+B_{\\rm d}u[k+1] \\\\ &=&A^2_{\\rm d}x[k]+A_{\\rm d}B_{\\rm d}u[k]+B_{\\rm d}u[k+1] \\\\ x[k+3]&=&A_{\\rm d}x[k+2]+B_{\\rm d}u[k+2]\\\\ &=& A_{\\rm d}(A^2_{\\rm d}x[k]+A_{\\rm d}B_{\\rm d}u[k]+B_{\\rm d}u[k+1])+B_{\\rm d}u[k+2] \\\\ &=& A^3_{\\rm d}x[k]+A^2_{\\rm d}B_{\\rm d}u[k]+A_{\\rm d}B_{\\rm d}u[k+1]+B_{\\rm d}u[k+2] \\\\ &\\vdots& \\\\x[k+{\\rm n}]&=& A^{{\\rm n}}_{\\rm d}x[k]+ A^{{\\rm n}-1}_{\\rm d}B_{\\rm d}u[k]+A^{{\\rm n}-2}_{\\rm d}B_{\\rm d}u[k+1]+\\cdots+B_{\\rm d}u[k+{\\rm n}-1] \\\\ &=& A^{{\\rm n}}_{\\rm d}x[k]+MU[k] \\\\ &&\\left(\\begin{matrix}M\\triangleq\\begin{bmatrix} B_{\\rm d} & A_{\\rm d}B_{\\rm d} & A^2_{\\rm d}B_{\\rm d}& \\cdots & A^{{\\rm n}-1}_{\\rm d}B_{\\rm d}  \\end{bmatrix}, \\\\ U[k]\\triangleq\\begin{bmatrix} u[k+{\\rm n}-1] & u[k+{\\rm n}-2] & \\cdots& u[k+1] & u[k] \\end{bmatrix}^{\\mathrm T} \\end{matrix}\\right)\\end{eqnarray} $$",

        f_ssr_input3: "$$ \\begin{eqnarray} U[k]&=&M^{-1}(x^{\\rm d}[k+{\\rm n}]-A^{{\\rm n}}_{\\rm d}x[k]) \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-ptc{
  width:90%;
  max-width:600px;
  margin:10px;
}

</style>
