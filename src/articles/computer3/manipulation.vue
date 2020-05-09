<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> マニピュレータ制御への適用 </h1>
      <p>
        機械の機能は自由度に依存するため，複雑な作業を行うためには多自由度系の制御が必要となる。ここでは，設計した専用計算機が多自由度制御系の制御性能を向上することを示す。以下に本項で使用する平面2自由度マニピュレータを示す。マニピュレータは安川電機社製ダイレクトドライブモータによって駆動される。モータドライバとして，安川電機社製のD級インバータを使用する。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_setup.jpg" class="pic-setup">
      </div>
      <p>
        インバータのスイッチング周波数は12 kHzであり，専用計算機の制御周期と比較して遅く動作する。そのため，プロセッサベースおよびPSoCベースの制御系を使用した場合にも，同様の零次ホールドの効果を受ける。しかしながら，専用計算機は高い信号処理能力を有するため，フィードバック制御系に混入する雑音が低減し，結果的に制御応答に現れる振動成分を低減することができる。FPGAの信号処理能力を活用するために，次のように制御系を構築した。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_imple.png" class="pic-block">
      </div>
      <p>
        本設計では，FPGA上の位置および力制御器は使用しない。多自由度系の運動制御ではヤコビ行列を使用する必要があるが，ヤコビ行列が三角関数を含むことからプロセッサを使用して演算を行なった。一方で，加速度制御の構築にはFPGA上の回路を使用し，高速に動作させることで外乱抑圧特性を確保した。
      </p>

      <h2 class="research-subtitle"> 円軌道への追従 </h2>
      <p>
        マニピュレータを用いて半径10 cmの円を1 Hzで描かせ，追従誤差を確認した。はじめに，プロセッサベースの制御系を用いてマニピュレータの制御を行なった。エンドエフェクタのX軸 (水平軸) 位置，Y軸 (垂直軸) 位置，および追従誤差は以下のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_axistracking_arm.png" class="pic-result">
      </div>
      <p>
        続いて，制御系に混入する雑音量に起因する制御性能の差異を確認するため，プロセッサベース制御系と等しいコントローラを有するPSoCベース制御系を実装し，試験を行なった。軌道追従応答および追従誤差は以下のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_axistracking_fpga1.png" class="pic-result">
      </div>
      <p>
        X軸応答では，象限突起は確認されたものの，振動成分が抑制されていることが確認された。これはFPGAを用いた雑音低減に起因すると考えられる。また，フィードバック制御系内の雑音が少ないため，コントローラのゲインを高く設定する余地がある。最後に，高ゲインコントローラを設置したPSoCベースの制御系を用いて試験を行なった。軌道追従応答および追従誤差は以下のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_axistracking_fpga2.png" class="pic-result">
      </div>
      <p>
        X軸応答，Y軸応答の両方において追従誤差が低減することが確認された。ここで，上記の試験における軌道追従の二乗平均平方根誤差，描かれた円の半径の最大値と最小値，真円度を纏めたものを以下に示す。PSoCベース制御系の使用により，良好な誤差抑制が達成されることが確認できた。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/mp_table.png" class="pic-table">
      </div>
      <p>
        以上より，PSoCベース制御系は雑音低減能力に優れ，高ゲインコントローラにより高い制御性能を実現することが確認できた。PSoCの使用により制御帯域の広帯域化が実現するため，サーボ機械の達成可能な作業範囲が拡大することが期待できる。
      </p>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer3/positioning">
            > 精密位置決めへの適用
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
</script>

<style scoped>
body{
  background: #fff;
}

.pic-setup{
  width:90%;
  border-radius: 4pt;
  max-width:350px;
  margin:10px;
}
.pic-block{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-result{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-table{
  width:90%;
  max-width:400px;
  margin:10px;
}
@media screen and (max-width: 640px){
  .pic-table{
    width:65%;
    margin:5px;
  }
}
</style>
