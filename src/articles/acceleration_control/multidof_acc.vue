<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 多自由度系の加速度制御 </h1>
      <p>
        加速度制御系の利点は制御剛性を調節可能であることが挙げられる。これは複雑なタスクを行う際に重要な利点であり，多自由度ロボットに適用することが望ましい。本項では，任意の系に対して加速度制御系を適用可能とする加速度制御系の一般化表現を紹介する。
      </p>

      <h2 class="research-subtitle"> 作業空間等価慣性の定式化 </h2>
      <p>
        加速度制御は系の慣性行列を単位行列<i class="italic-tnr">I</i>とする。制御系から直接操作可能な対象は関節空間に存在するモータであり，関節空間で加速度制御系を構築することで関節空間における系の慣性行列が単位行列に固定できる。ただし，多自由度ロボットが作業を行う際には，作業空間において加速度制御系を構築する必要がある。つまり，作業空間の見かけ上の慣性を単位行列に固定する必要がある。
      </p>

      <p>
        前述のように，制御可能な物理量は関節空間の慣性行列である。この関節空間慣性<i class="italic-tnr">J</i>を制御することにより，作業空間慣性<i class="italic-tnr">M</i>を関節的に制御する。まず，エネルギ保存の法則から関節空間慣性と作業空間等価慣性の関係を定式化する。関節空間の仕事が作業空間の仕事に変換されるため，状態量の写像においてエネルギが保存される必要がある。また，エネルギ保存則より，関節空間運動エネルギと作業空間運動エネルギは等しい。
        <vue-mathjax :formula="f_kinetic_energy" />
        ただし，<i class="italic-tnr">q</i>は関節空間一般化位置，<i class="italic-tnr">x</i>は作業空間一般化位置を表す。ここで，運動学を以下のように定義する。
        <vue-mathjax :formula="f_jacobian" />
        このとき，関節空間慣性と作業空間慣性の関係は次のようになる。
        <vue-mathjax :formula="f_work_inertia" />
        ここで，作業空間等価慣性を単位行列に固定する条件は次のようになる。
        <vue-mathjax :formula="f_work_inertia_nominal" />
      </p>

      <h2 class="research-subtitle"> 一般化力の座標変換 </h2>
      <p>
        作業空間におけるロボットの作用力を制御するために，関節空間一般化力と作業空間一般化力の関係を導出する。導出には以下の二つの関係式を使用する。
        <vue-mathjax :formula="f_ft_prepare" />
        上式を使用して，作業空間における運動方程式を変形する。
        <vue-mathjax :formula="f_ft_motion_eq" />
        以上より，以下の関係を得る。
        <vue-mathjax :formula="f_ft_transform1" />
        特に，作業空間加速度制御が実現している場合には次のようになる。
        <vue-mathjax :formula="f_ft_transform2" />
        ロボット制御の教本においては，上記の式の第二項の速度依存項を取り払った形式の変換式が多く見受けられる。
        <vue-mathjax :formula="f_ft_transform3" />
        これは仮想仕事の原理から導出された静的つり合い状態の力の変換式である。
        <vue-mathjax :formula="f_ft_virtual_work" />
        静的状態であれば速度が0となるため，実際に成立する。しかしながら，高速動作時には動力学に誤差が生じ，制御性能が劣化する。
      </p>

      <h2 class="research-subtitle"> 一般化加速度制御系 </h2>
      <p>
         加速度制御系は作業空間慣性を単位行列 (<i class="italic-tnr" style="margin-right:2px">M</i>=<i class="italic-tnr" style="margin-left:2px">I</i>) とすることで達成される。これは適切な発生力変換，関節空間仮想慣性制御，関節空間加速度制御を組み合わせることで一般化加速度制御系を構築することができる。以下にブロック線図を示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/workspace_acc.png" class="pic-workspace_acc1">
      </div>
      <p>
        <vue-mathjax :formula="f_inertia_desire" />
        この制御系では，関節空間慣性を次のように固定する。
        <vue-mathjax :formula="f_inertia_control" />
        また，この制御器の計算は短縮可能であり，以下のように簡略化できる。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/workspace_acc2.png" class="pic-workspace_acc2">
      </div>
      <p>
         この制御系の入出力関係は次のようになる。
         <vue-mathjax :formula="f_dynamics" />
         以上より，一般化加速度制御系の構築が確認できた。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/acceleration_control/dob_base_acc">
            > 外乱オブザーバを用いた加速度制御
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

        f_kinetic_energy: "$$ \\begin{eqnarray} \\frac{1}{2}\\dot{q}^{\\mathrm T}J(q)\\dot{q} = \\frac{1}{2}\\dot{x}^{\\mathrm T}M(q)\\dot{x} \\end{eqnarray} $$",

        f_jacobian: "$$ \\begin{eqnarray} x &=& H(q) \\\\ \\dot{x}&=&\\frac{\\partial H(q)}{\\partial q}\\triangleq J_{\\rm aco}(q)\\dot{q} \\\\ \\ddot{x}&=&J_{\\rm aco}(q)\\ddot{q}+\\dot{J}_{\\rm aco}(q)\\dot{q}\\end{eqnarray} $$",

        f_work_inertia: "$$ \\begin{eqnarray} &&\\frac{1}{2}\\dot{q}^{\\mathrm T}J(q)\\dot{q} = \\frac{1}{2}\\dot{x}^{\\mathrm T}M(q)\\dot{x} \\\\ &\\Leftrightarrow& \\frac{1}{2}\\dot{q}^{\\mathrm T}J(q)\\dot{q} = \\frac{1}{2}\\dot{q}^{\\mathrm T}J_{\\rm aco}^{\\mathrm T}(q)M(q)J_{\\rm aco}(q)\\dot{q} \\\\ &\\Leftrightarrow& \\left\\{ \\begin{matrix} J(q) = J_{\\rm aco}^{\\mathrm T}(q)M(q)J_{\\rm aco}(q) \\\\  M(q) = J_{\\rm aco}^{\\mathrm -T}(q)J(q)J_{\\rm aco}^{-1}(q) \\end{matrix} \\right. \\end{eqnarray} $$",

        f_work_inertia_nominal: "$$ \\begin{eqnarray} J(q)=J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q) \\end{eqnarray} $$",

        f_ft_prepare: "$$ \\begin{eqnarray} \\ddot{x}&=&\\dot{J}_{\\rm aco}(q)\\dot{q}+J_{\\rm aco}(q)\\ddot{q}\\\\ M(q)&=&J_{\\rm aco}^{\\mathrm -T}J(q)J_{\\rm aco}^{-1}(q)\\end{eqnarray} $$",

        f_ft_motion_eq: "$$ \\begin{eqnarray} F&=&M(q)\\ddot{x}\\\\ &=&M(q)\\dot{J}_{\\rm aco}\\dot{q}+M(q)J_{\\rm aco}\\ddot{q}\\\\ &=&M(q)\\dot{J}_{\\rm aco}\\dot{q}+ J_{\\rm aco}^{\\mathrm -T}J(q)J_{\\rm aco}^{-1}(q)J_{\\rm aco}\\ddot{q}\\\\ &=&M(q)\\dot{J}_{\\rm aco}\\dot{q}+ J_{\\rm aco}^{\\mathrm -T}J(q)\\ddot{q}\\\\ &=&M(q)\\dot{J}_{\\rm aco}\\dot{q}+ J_{\\rm aco}^{\\mathrm -T}\\tau \\end{eqnarray} $$",

        f_ft_transform1: "$$ \\begin{eqnarray} \\left\\{\\begin{matrix} F=J_{\\rm aco}^{\\mathrm -T}(q)\\left(\\tau + J_{\\rm aco}^{\\mathrm -T}(q)M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)\\\\ \\tau=J_{\\rm aco}^{\\mathrm T}(q)\\left(F-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right) \\end{matrix} \\right. \\end{eqnarray} $$",

        f_ft_transform2: "$$ \\begin{eqnarray} \\left\\{\\begin{matrix} F=J_{\\rm aco}^{\\mathrm -T}(q)\\left(\\tau + J_{\\rm aco}^{\\mathrm -T}(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)\\\\ \\tau=J_{\\rm aco}^{\\mathrm T}(q)\\left(F-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right) \\end{matrix} \\right. \\end{eqnarray} $$",

        f_ft_transform3: "$$ \\begin{eqnarray} \\left\\{\\begin{matrix} F=J_{\\rm aco}^{\\mathrm -T}(q)\\tau\\\\ \\tau=J_{\\rm aco}^{\\mathrm T}(q)F \\end{matrix} \\right. \\end{eqnarray} $$",

        f_ft_virtual_work: "$$ \\begin{eqnarray} \\delta x^{\\mathrm T}F&=&\\delta q^{\\mathrm T}\\tau \\\\ \\Leftrightarrow \\delta q^{\\mathrm T}J_{\\rm aco}^{\\mathrm T}(q)F&=&\\delta q ^{\\mathrm T} \\tau \\\\ \\Leftrightarrow J_{\\rm aco}^{\\mathrm T}(q)F&=&\\tau \\end{eqnarray} $$",

        f_inertia_desire: "$$ \\begin{eqnarray} M(q)=I\\ \\rightarrow\\ J(q)=J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q) \\end{eqnarray} $$",

        f_inertia_control: "$$ \\begin{eqnarray} \\ddot{q}&=&J_{\\rm aco}^{-1}(q)J_{\\rm aco}^{\\mathrm -T}(q)\\tau^{\\rm ref} \\\\[6pt] \\Leftrightarrow \\tau^{\\rm ref} &=& J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q) \\ddot{q} \\\\ &=& J_{\\rm v}\\ddot{q} \\\\[6pt] ( J_{\\rm v}&\\triangleq&J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q)) \\end{eqnarray} $$",

        f_dynamics: "$$ \\begin{eqnarray} \\ddot{q}&=&\\left(I+s^{-1}J_{\\rm aco}^{-1}(q)\\dot{J}_{\\rm aco}(q)\\right)^{-1}J_{\\rm aco}^{-1}(q)f^{\\rm ref} \\\\ &=&\\left(J_{\\rm aco}(q)+s^{-1}\\dot{J}_{\\rm aco}(q)\\right)^{-1}f^{\\rm ref} \\\\ \\ddot{x}&=&\\left(J_{\\rm aco}(q)+s^{-1}\\dot{J}_{\\rm aco}(q)\\right)\\ddot{q} = f^{\\rm ref} \\end{eqnarray} $$",

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
.pic-workspace_acc2{
  width:90%;
  max-width:450px;
  margin:10px;
}
</style>
