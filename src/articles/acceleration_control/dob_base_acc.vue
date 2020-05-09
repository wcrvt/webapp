<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 外乱オブザーバを用いた加速度制御 </h1>
      <p>
        加速度制御系を構築する方法は，状態フィードバック制御を用いた方法，外乱オブザーバを用いた方法，スライディングモード制御を用いた方法など様々な方式が挙げられる。ここでは，外乱オブザーバを用いた方法について紹介する。外乱オブザーバを用いた方法の利点は，(1) 加速度次元の2自由度制御を実現すること，(2) 制御帯域を設定が容易であること，(3) 内部モデル原理に基づいた設計が可能であることなどが挙げられる。したがって，加速度制御系の追従特性は確保され，外乱抑圧に関して明確な設計が可能となる。物理的に明快な2自由度制御系の構築が可能であるという点において，状態フィードバック制御と比較して簡潔な設計が可能となる。また，カスケード制御系では内側制御系の制御帯域を明記可能という点において高い使用性を有する。
      </p>

      <h2 class="research-subtitle"> 外乱オブザーバの原理と構成 </h2>
      <h3> 動作原理 </h3>
      <p>
        外乱オブザーバは制御系に印加される外乱を推定するための状態観測器であり，推定値をフィードバックすることで外乱を相殺するように働くため，ロバストな制御系の構築において使用される。以下に外乱オブザーバを使用した制御系の概念図を示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/distobserv_schematic.png" class="pic-schematic">
      </div>
      <p>
        ここで，<i class="italic-tnr">P</i>および<i class="italic-tnr">P<sub>n</sub></i>はプラントモデルおよび公称モデルを表す。外乱オブザーバが正確に外乱を推定する場合，制御系の入出力は次のようになる。
        <vue-mathjax :formula="f_dob_principle" />
        したがって，外部からこの制御系を見た場合に，外乱の影響が取り除かれている。
        外乱オブザーバの着想は，1自由度制御系における極零配置問題の限界，追従特性と外乱抑圧特性が独立に設計不可である問題を解決することであった。これは体系化された2自由度制御系の設計理念に等しい。後に外乱オブザーバを使用した制御系が限定的な2自由度制御系であること，限定的な環境下では最適化計算を施した<i class="italic-tnr">H<sub>&infin;</sub></i>制御が性能面で優位であることなどが報告されている。外乱オブザーバを使用する利点は，状態観測器が明示的に外乱推定を担うことであり，物理的に明快な設計指針を与えた。また，様々な用途において有効性を示す加速度規範型制御系の基盤技術として使用された。
      </p>

      <h3> 構成方法 </h3>
      <p>
        本項では簡単な外乱オブザーバの導出を紹介する。外乱オブザーバはLuenbergerオブザーバを基にGopinathの方法を用いて導出される。オブザーバの設計では，プラントモデルに外乱のダイナミクスを追加した拡大系を定義する。端的に言えば，外乱オブザーバは拡大系に対する最小次元オブザーバである。ここでは，以下に示すシステムの外乱推定を行うオブザーバを設計する。
        <vue-mathjax :formula="f_dob_model" />
        測定可能な状態量は速度とする。ここで，外乱のダイナミクスを次のように仮定する。
        <vue-mathjax :formula="f_dob_model_dis" />
        これは一定外乱がシステムに入力されることを想定している。この仮定の下で設計される外乱オブザーバは0次外乱オブザーバと呼ばれる。このオブザーバが厳密に推定できる外乱は一定値外乱のみであり，周波数成分を持つ外乱に対しては正確な推定は行えず，状態観測器は位相遅れを伴った外乱値を出力する。この推定遅れを取り除くためには外乱のダイナミクスを定義する必要があるが，0次外乱オブザーバを使用しても観測器ゲインを高く設定することで推定遅れを小さく抑えることができるため，単純な0次外乱オブザーバが広く使用されている。ここで，プラントシステムの状態空間表現は次のようになる。
        <vue-mathjax :formula="f_dob_model_ssr" />
        また，速度と外乱を状態とした拡大系の状態空間表現は次のようになる。
        <vue-mathjax :formula="f_dob_model_exssr" />
        この拡大系の可観測行列はフルランクであり，全状態量に対して状態観測器を設計可能である。
        <vue-mathjax :formula="f_dob_model_observable" />
        ここで，Gopinathの方法に基づいて最小次元オブザーバを構成する。このシステムにおいて，オブザーバを構成する要素は次のように表される。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/minobserver.png" class="pic-minobserver">
      </div>
      <p>
        <vue-mathjax :formula="f_min_observer" />
        したがって，外乱は次のように推定される。
        <vue-mathjax :formula="f_observer_eq" />
      </p>
      <p>
        以上より，外乱オブザーバを使用した制御系のブロック線図は以下のようになる。外乱オブザーバは左図枠線部分に示す部分となる。推定外乱値は同相であるため，実外乱を除去するためには推定外乱を負帰還フィードバックする必要がある。ここで，外乱推定におけるフィルタに負符号があるため，負符号を反転して正符号とし，正帰還することで同様の制御が達成される。右図の外乱オブザーバは，逆相の外乱を推定して出力するものとなっている。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/minimalorder_dob_simple1.png" class="pic-dob1">
      </div>
      <p>
        外乱オブザーバの構造において，左側ループの値から右側ループの値を減算した値は外乱値と等しい。外乱オブザーバはこの外乱値にフィルタを通すことで推定外乱値とする。0次外乱オブザーバでは，外乱は一次低域通過フィルタを通して推定される。この低域通過フィルタの遮断周波数は<i class="italic-tnr">PL</i>となり，オブザーバゲイン<i class="italic-tnr">L</i>の設定で自由に遮断周波数を決定できる。高次外乱オブザーバではこのフィルタ部分が高い次数を持つ。推定フィルタを入出力安定なフリーパラメータ<i class="italic-tnr">Q</i>として一般化した外乱オブザーバを以下に示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/minimalorder_dob_simple2.png" class="pic-dob2">
      </div>
      <p>
        <vue-mathjax :formula="f_dob_inout" />
        この入出力関係において，参照値入力と外乱入力の係数が独立した値を持っている。また，上記の構成はYoula-Ku&ccaron;eraの示した安定な2自由度制御器においてパラメータを調整することで実現可能である。したがって，外乱オブザーバを用いた制御系は2自由度制御系であることがわかる。
      </p>

      <h2 class="research-subtitle"> 2自由度制御系の等価構造 </h2>
      <p>
        制御系が安定化制御器を有する時，以下の制御系は等価となる。
        <vue-mathjax :formula="f_youla" />
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/youla.png" class="pic-youla">
      </div>
      <p>
        外乱オブザーバを用いた制御系は，以下のパラメータを有する制御系と等価となる。ただし，<i class="italic-tnr">L</i>はフリーパラメータである。
        <vue-mathjax :formula="f_para" />
        <vue-mathjax :formula="f_controller" />
        そして，この制御器のブロック線図は以下に示される。
      </p>
      <div class="pic-container">
        <img src="@/pic/acceleration_control/youla-eq.png" class="pic-youla2">
      </div>
      <p>
        このように，外乱オブザーバを用いた制御系は限定的な2自由度制御系と一致する。外乱オブザーバを使用したからといって制御性能が向上することはなく，多くの場合において2自由度制御器の一般形に対して最適化調整を行う方が性能確保は容易であると予想される。ただし，加速度次元で2自由度制御系を構築することは，加速度規範型制御系の構築に繋がるため，非常に意義のある手法であると考えられる。
      </p>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/acceleration_control/advantage">
            > 加速度制御の利点
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/acceleration_control/multidof_acc">
            > 多自由度系の加速度制御
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

        f_dob_principle: "$$ \\begin{eqnarray} \\ddot{x}=PP_{\\rm n}^{-1}\\ddot{x}^{\\rm ref}+P(f_{\\rm dis}-\\hat{f}_{\\rm dis}) \\approx \\ddot{x}^{\\rm ref}\\end{eqnarray} $$",

        f_dob_model: "$$ \\begin{eqnarray} \\ddot{x}&=&P(f_{\\rm drive}+f_{\\rm dis}) \\end{eqnarray}$$",

        f_dob_model_ssr: "$$ \\begin{eqnarray} \\frac{d}{dt}\\dot{x}&=& 0\\dot{x} + P f_{\\rm drive}+ P f_{\\rm dis} \\\\ y&=& \\dot{x}\\end{eqnarray} $$",

        f_dob_model_dis: "$$ \\begin{eqnarray} \\frac{d}{dt}f_{\\rm dis}&=&0 \\end{eqnarray}$$",

        f_dob_model_exssr: "$$ \\begin{eqnarray} \\frac{d}{dt}\\begin{bmatrix}  f_{\\rm dis} \\\\ \\dot{x} \\end{bmatrix}&=&\\begin{bmatrix} 0 & 0 \\\\ P & 0  \\end{bmatrix}\\begin{bmatrix}  f_{\\rm dis} \\\\ \\dot{x} \\end{bmatrix}+\\begin{bmatrix} 0 \\\\ P \\end{bmatrix}f_{\\rm drive} \\\\ y&=& \\begin{bmatrix} 0 & 1 \\end{bmatrix}\\begin{bmatrix} f_{\\rm dis} \\\\ \\dot{x} \\end{bmatrix}\\end{eqnarray} $$",

        f_dob_model_observable: "$$ \\begin{eqnarray} \\begin{bmatrix} C \\\\ CA  \\end{bmatrix}&=&\\begin{bmatrix} 0 & 1 \\\\ P & 0 \\end{bmatrix} \\end{eqnarray} $$",

        f_min_observer: "$$ \\begin{eqnarray} &&B_1-LB_2=-PL\\\\ &&A_{12}-LA_{22}=0\\\\ &&A_{11}-LA_{21}=-PL \\end{eqnarray}$$",

        f_observer_eq: "$$ \\begin{eqnarray} \\hat{f}_{\\rm dis}&=& \\frac{1}{s+PL}\\left(-PLf_{\\rm drive}+sL\\dot{x}\\right) \\\\  &=& -\\frac{PL}{s+PL}\\left(f_{\\rm drive}-sP^{-1}\\dot{x}\\right) \\end{eqnarray}$$",

        f_dob_inout: "$$ \\begin{eqnarray} y&=&P\\left(u+d\\right) \\\\ u&=&P_{\\rm n}^{-1}r+Q\\left\\{u-P_{\\rm n}^{-1}P(u+d)\\right\\} \\\\ \\Leftrightarrow u&=& \\left\\{(I-Q)+QP_{\\rm n}^{-1}P\\right\\}^{-1}\\left(P_{\\rm n}^{-1}r-QP_{\\rm n}^{-1}Pd\\right) \\\\ \\therefore y&=&P \\left\\{(I-Q)+QP_{\\rm n}^{-1}P\\right\\}^{-1} \\left\\{P_{\\rm n}^{-1}r+(I-Q)d \\right\\}  \\\\ \\Rightarrow y&=&r+P(I-Q)d \\ \\ \\ ({\\rm when}\\ \\ P=P_{\\rm n}) \\end{eqnarray}$$",

        f_youla: "$$ \\begin{eqnarray} C=(Y-Q\\tilde{N})^{-1}(X+Q\\tilde{D}) \\\\ \\left(\\begin{matrix} P=ND^{-1}=\\tilde{D}^{-1}\\tilde{N} \\\\ YD+XN=I \\end{matrix} \\right)\\end{eqnarray}$$",

        f_para: "$$ \\begin{eqnarray} K=N^{-1},\\ X=0,\\ Y=D^{-1},\\ Q=D^{-1}L\\tilde{N}^{-1} \\end{eqnarray}$$",

        f_controller: "$$ \\begin{eqnarray} C&=&(D^{-1}-Q\\tilde{N})^{-1}Q\\tilde{D} \\\\ &=& (D^{-1}-D^{-1}L\\tilde{N}^{-1}\\tilde{N})^{-1}D^{-1}L\\tilde{N}^{-1}\\tilde{D} \\\\ &=&(I-L)^{-1}LP^{-1} \\end{eqnarray}$$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-schematic{
  width:350px;
  width:90%;
  margin:10px;
}
.pic-minobserver{
  width:90%;
  max-width:400px;
  margin:10px 0 0;
}
.pic-dob1{
  width:90%;
  max-width:700px;
  margin:10px 0 0;
}
.pic-dob2{
  width:90%;
  max-width:350px;
  margin:10px 0 0;
}
.pic-youla{
  width:90%;
  max-width:800px;
  margin:0 10px;
}
.pic-youla2{
  width:90%;
  max-width:400px;
  margin:10px 0 0;
}

@media screen and (max-width: 640px){
  .pic-dob2{
    width:70%;
    max-width:350px;
    margin: 0;
  }
  .pic-schematic{
    width:70%;
    margin:5px;
  }
  .pic-youla2{
    width:80%;
    max-width:400px;
    margin:10px 0 0;
  }
}

</style>
