<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 精密位置決めへの適用 </h1>
      <p>
        ここでは設計した計算機を用いて位置制御を行い，制御系の有効性を確認する。PSoCの導入による効果として，位相遅れの少ない雑音低減による高ゲイン制御器の設計，零次ホールドによる振幅/位相特性の劣化の軽減が挙げられる。ここでは従来のプロセッサベースの制御系とPSoCベースの制御系の応答を比較し，それぞれの効果を確認する。実験には，下記に示すセットアップを使用した。モータはGHC社製のシャフトモータを使用した。モータはTHK社製ボールガイドによって支持されている。駆動系はTrust Automation社製の公称制御帯域5 kHzのリニアアンプを使用した。センサとして，Renishaw社製の10 nmの分解能を有する光学式インクリメンタルエンコーダを使用した。プロセッサ上の制御器の制御周期は，プロセッサベース，PSoCベース制御系の両方において100 &micro;sに設定した。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_setup.jpg" class="pic-setup">
      </div>

      <h2 class="research-subtitle"> 零次ホールドの影響の低減 </h2>
      <p>
        零次ホールドによる影響の低減を確認するために，等しいゲインを有するコントローラを2つのシステムに設置し，各10回の位置決めを行なった。ここで，位置決めのステップサイズは10 &micro;m，立ち上がり周波数は25 Hzとしている。上がプロセッサベース，下がPSoCベース制御系を用いた際の結果を表す。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_arm.png" class="pic-result" style="margin-bottom:0">
        <img src="@/pic/computer3/lmb_fpga_samegain.png" class="pic-result">
      </div>
      <p>
        ボールガイドを使用しているため結果に再現性がなく，フィードフォワード制御の適用が難しいことが確認できる。そのため，誤差抑制は主にフィードバック制御系によって行われる。ここで，2つの制御系は等しいゲインを有するにも関わらず，立ち上がり時に大きな差が確認できた。これはフィードバック制御系の一巡伝達関数に振幅減衰効果が入るためと考えられる。これを解決するためには位相進み補償器等を挿入して高い周波数帯域の振幅特性を回復する必要があるが，雑音の影響により実現は難しい。そのため，PSoCによる高速制御回路の導入は効果的な解決方法であるといえる。
      </p>

      <h2 class="research-subtitle"> 高ゲイン制御器による性能向上 </h2>
      <p>
        続いて，PSoCベース制御系に高ゲインコントローラを設置し，10回の位置決めを行なった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_fpga_highgain.png" class="pic-result">
      </div>
      <p>
        コントローラゲインの向上に反して，先の実験と比較して立ち上がり時の誤差が増大していることが確認できる。これは摩擦の影響によるものであると考えられる。一方で，高ゲインコントローラの使用により，定常状態における誤差抑制効果が向上した。以下の左図にプロセッサベース，右図にPSoCベース制御系を使用した際の位置決め結果の定常応答を示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_error.png" class="pic-result">
      </div>
      <p>
        PSoCを使用することで，位置決め誤差が10nm (1パルス) 以下 に収まっていることが確認できた。また，各10回における位置決めの過渡状態および定常状態の二乗平均平方根誤差および誤差最大値は次のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_table.png" class="pic-table">
      </div>
      <p>
        以上より，PSoCベース制御系の導入により位置決め精度が向上することが確認できた。上記の実験では高速移動を行なったが，低速移動であれば過渡状態の誤差を抑制することができる。位置決めのステップサイズは10 &micro;m，立ち上がり周波数1 Hzとした場合の位置決め応答を以下に示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/lmb_fpga_lowspeed.png" class="pic-result">
      </div>
      <p>
        低速駆動であれば追従誤差を100 nm以下に抑えることができた。高速移動が必要な場合には，ガイドの機械特性の改善，もしくは摩擦補償を制御器で行う必要がある。摩擦補償は非常に難しいため，エアースライダの導入など機構的な改善が多く見受けられる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer3/implementation">
            > 専用計算機の実装
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/computer3/manipulation">
          > マニピュレータ制御への適用
          </router-link>
        </li>
      </ul>

    </div>
  </body>
</template>

<script>
</script>

<style scoped>
body{
  background: #fff;
}

.pic-result{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-setup{
  width:90%;
  border-radius: 4pt;
  max-width:400px;
  margin:10px;
}
.pic-table{
  width:90%;
  max-width:350px;
  margin:10px;
}

@media screen and (max-width: 640px){
  .pic-table{
    width:65%;
    margin:5px;
  }
}

</style>
