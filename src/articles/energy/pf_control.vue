<template>
  <body>
    <div class="text-box">
      <p>
      <h1 class="research-title"> エネルギ論から見た位置制御と力制御 </h1>
      <p>
        制御系設計においては体系化された制御理論に則ることで定量的な設計が可能となるが，制御則の開発および発見に関しては，経験的知見が豊富に蓄積されている物理現象が非常に参考になることがある。ここでは，位置制御系と力制御系をエネルギ論の観点から考察し，物理的な解釈を与える。
      </p>
      <p>
        運動制御は系のエネルギを制御することに等しい。位置と力の制御をエネルギの観点から確認する。過渡状態において物体の自由運動は最小作用の原理に従って決定され，最低限の労力で運動を行う。また，定常状態において系のエネルギは極小値を取る力学的平衡状態となり，外部とのエネルギの交換がなく状態の変化が生じない。端的にいえば，自由運動では無駄にエネルギを消散するような運動をせず，停留時は力学的なつり合いの状態にある。制御では電気を介して人工的な力場を生成し，運動の時間発展および力学的平衡点を自在に変化させることができる。
      </p>

      <h2 class="research-subtitle"> 位置制御 </h2>
      <p>
        位置制御は位置決め目標位置となる平衡点位置を設定し，平衡点位置までの復元力を制御入力として発生することで実現される。ばねを介して壁に接続される質点について考えると，復元力は次のよう表される。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/controller_pos.png" class="pic-controller_pos">
      </div>
      <p>
        <vue-mathjax :formula="f1" />
        この系において，質点は時間の経過とともに平衡点に漸近する。したがって，比例要素と微分要素を用いて制御器を設計することで，位置決めを実現可能であることがわかる。今回の例で現れた制御器は，PD制御器に当たる。ここで，平衡点位置を位置決め目標として制御系に与えれば，位置制御が実現する。この系では，慣性力および復元力は系内部にてエネルギ交換を行う保存力であり，粘性力は系内部のエネルギを外部に消散させる非保存力となる。粘性力が小さく，質点の運動エネルギとばねの位置エネルギが循環する系では，振動が確認できる。一方で，粘性力が大きく，系内部で循環するエネルギが消散する系では振動の減衰および緩やかな運動が確認できる。この結果は系の極位置を確認することからも確認可能であるが，エネルギ論からも物理的解釈が可能である。この視点は振動制御系設計において参考になる所が大きい。
      </p>

      <h2 class="research-subtitle"> 力制御 </h2>
      <p>
        力制御は外界環境からの反作用力が所望値となることを目標とし，反作用力と力指令値がつり合う状態までの力学系の時間発展を制御する。力制御は，質点と外界環境間の作用反作用によって決定される「質点に働く合力」を制御入力とすることで実現される。質点が外界環境に接触する系の運動方程式は次のように表される。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/controller_force.png" class="pic-controller_force">
      </div>
      <p>
        <vue-mathjax :formula="f2" />
        この系は慣性力，作用力および環境反力の均衡が取れた場合に平衡状態となる。制御を行う場合には，合力を質点に入力することで系は平衡状態に漸近する。ここで，制御入力である合力に比例要素を乗算することを考えると，次の式が成立する。
        <vue-mathjax :formula="f3" />
        ここで，比例要素が等価的に質点の慣性を変化させており，作用力と環境反力の平衡状態までの時間発展に関して，慣性力の影響を操作可能であることを示している。上記の制御器はP制御器に当たる。平衡力を力指令値として制御系に与えることで，力制御が実現する。質点の慣性が大きい場合には，慣性エネルギの消散に時間を要するため，緩やかに平衡状態に漸近する。一方で，質点の慣性が小さい場合には，質点は系の時間発展に大きな影響を与えず，系は外界環境の機械特性に従って平衡状態に漸近する。ここで，質点と外界環境の接触においては両者間のエネルギ交換が発生するため，「外界環境への接触に適した質点の機械特性」といったものが存在する。人間は作業に際して手指の剛性を変化させており，機械特性を制御することの重要性が伺える。これは制御におけるインピーダンス制御に繋がる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="#" />
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/energy/control_stiffness">
          > 制御剛性の調整によるエネルギの制御
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
        f1: '$$ f=-k(x-x_{\\rm ep})-d(\\dot{x}-\\dot{x}_{\\rm ep}) $$',
        f2: '$$ f_{\\rm m}-f_{\\rm env}=m\\ddot{x} $$',
        f3: '$$ K(f_{\\rm m}-f_{\\rm env})=m\\ddot{x} \\\\ f_{\\rm m}-f_{\\rm env}=(m/K)\\ddot{x}$$',
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
.pic-controller_pos{
  width:90%;
  max-width:200px;
  margin:10px 0 0;
}
.pic-controller_force{
  width:90%;
  max-width:150px;
  margin:10px 0 0;
}
</style>
