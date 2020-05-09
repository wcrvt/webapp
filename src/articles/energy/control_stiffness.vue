<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 制御剛性の調整によるエネルギの制御 </h1>
      <p>
        モータの役割には外界環境との接触が含まれる。すなわち，モータと外界環境の間でエネルギの交換が発生する。モータが外界環境に接触する目的は，外界環境にエネルギを渡し，状態の変化を促すことである。この際，電力系からモータにエネルギを供給し，モータを介して間接的に外界環境にエネルギが伝達される。したがって，モータを用いた仕事とは，電力系と外界環境のエネルギ交換によるものと言い換えることができる。このエネルギの交換に際しては，両者のインピーダンスの比によってエネルギの流れ方が決定する。制御はモータのインピーダンスを設定し，外界環境に与えるエネルギを調整することができる。
      </p>

      <h2 class="research-subtitle"> 制御剛性 </h2>
      <p>
        制御によって設定可能なモータのインピーダンスは，制御剛性として定義されている。
        <vue-mathjax :formula="f1" />
        実際にモータが外力の影響を受けた際には，制御帯域内ではこの制御剛性に従って運動が生じるが，制御帯域外ではモータの機構特性に従って運動を行う。制御剛性の定義には，変分表記が用いられているが，これは平衡点からの変位による運動特性を表すために用いられている。位置制御では，外界環境からの影響を受けずに位置決めを行うことを目的としており，外界環境より高いインピーダンスを持つことが望ましい。力制御では，外界環境に倣う運動を目的とするため，外界環境より低いインピーダンスを持つことが望ましい。位置制御系と力制御系の制御剛性は次のように表される。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/cstiff_pos_force.png" class="pic-cstiff_pos_force">
      </div>
      <p>
        <vue-mathjax :formula="f2" />
        <vue-mathjax :formula="f3" />
        位置制御系の制御剛性について，第一項はモータ慣性，第二項は位置制御器によって付加されるインピーダンスを示す。力制御系の制御剛性は，モータの等価慣性を示す。ここで，上記の制御剛性を適切に設計することで，外界環境との接触に適したインピーダンスをモータに付与することができる。これはインピーダンス制御と呼ばれる。続いて，位置制御器と力制御器が併用された制御系について確認する。この制御系の制御剛性は次のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/cstiff_hybrid.png" class="pic-cstiff_hybrid">
      </div>
      <p>
        <vue-mathjax :formula="f4" />
        ここで，第一項はモータの等価慣性，第二項は制御器によって付加されるインピーダンスを示す。特筆すべきことは，この制御系では制御器の指令値を位置と力の目標平衡点とし，平衡点からの変位によって制御入力を決定することである。すなわち，モータと外界環境の作用反作用力がつり合った状態，何らかの作業中にあるモータのインピーダンスを設定することも可能である。これは，複雑なタスクを行うためのインピーダンス制御器の構築に繋がる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/energy/pf_control">
            > エネルギ論から見た位置制御と力制御
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/energy/vibration">
          > エネルギ論から見た振動抑制制御
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
        f1: '$$ \\kappa=-\\frac{\\partial f}{\\partial x} $$',
        f2: '$$ \\left.\\begin{matrix} x=\\frac{1}{ms^2}\\left\\{C_{\\rm p}(x^{\\rm cmd}-x)-f\\right\\} \\\\ \\Leftrightarrow(ms^2+C_{\\rm p})x-C_{\\rm p}x^{\\rm cmd}=-f \\end{matrix}\\right\\} \\rightarrow \\kappa_{\\rm p}=ms^2+C_{\\rm p}$$',
        f3: '$$ \\left.\\begin{matrix} x=\\frac{1}{ms^2}C_{\\rm f}(f^{\\rm cmd}-f) \\\\ \\Leftrightarrow \\frac{m}{C_{\\rm p}}s^2x=f^{\\rm cmd}-f \\end{matrix}\\right\\}\\rightarrow \\kappa_{\\rm f}=\\frac{m}{C_{\\rm f}}s^2 $$',
        f4: '$$ \\left.\\begin{matrix} x=\\frac{1}{ms^2}\\left\\{C_{\\rm p}(x^{\\rm cmd}-x)+C_{\\rm f}(f^{\\rm cmd}-f)\\right\\} \\\\ \\Leftrightarrow \\frac{ms^2+C_{\\rm p}}{C_{\\rm f}}x-\\frac{C_{\\rm p}}{C_{\\rm f}}x^{\\rm cmd}=f^{\\rm cmd}-f \\end{matrix}\\right\\}\\rightarrow \\kappa_{\\rm pf}=\\frac{m}{C_{\\rm f}}s^2+ \\frac{C_{\\rm p}}{C_{\\rm f}}$$',
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
.pic-cstiff_pos_force{
  width:90%;
  max-width:320px;
  margin:10px 0 0;
}
.pic-cstiff_hybrid{
  width:90%;
  max-width:400px;
  margin:10px 0 0;
}
</style>
