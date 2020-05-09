<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 計算機アーキテクチャの設計 </h1>
      <p>
        ここでは制御工学の側面から計算機に必要な機能と性能の要求から，計算機を構成する要素の決定と配置，および構成要素間の接続を決定する。本項では大まかな計算機構成を示し，構成要素の仕様は次項に記載する。実装にはXilinx社製Programmable System-on-aChipのZynq SoCを使用することを想定する。そのため，内蔵されるデュアルコアARM Cortex-A9プロセッサとFPGA上の回路を組み合わせて制御用計算機とする。
      </p>

      <h2 class="research-subtitle"> 制御演算回路の設計 </h2>
      <p>
         FPGAを使用する利点として，設置する回路の設計自由度の高さと，回路の応答速度と処理速度の大きさが挙げられる。制御工学の観点からは，一巡伝達関数の特性を向上することが制御性能の向上に繋がるため，レスポンシブかつ低レイテンシの回路の設置は有効な手段となる。また，処理が決定されているのであれば，CPUに搭載されるような複雑な制御機構をFPGA上に設置する必要はなく，プリミティブな回路のみを使用して制御系の実装ができる。
      </p>
      <p>
         はじめに，単体のFPGAで動作可能な制御演算回路を設計する。実際の制御に必要なブロックは信号処理器，状態観測器，コントローラの3つとなる。この3つのブロックに対してパラメータ調整を行うことで，汎用的な制御が可能となる。下図に制御演算用の回路構成を示した。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer2/computer_arch1.png" class="pic-computer_arch1">
      </div>
      <p>
        赤線のループが制御演算に必要な部分を表しており，青線はパラメータ調整用システムを表す。また，センサによって取得した外部情報や制御系の内部状態を監視するために，緑線を用いて示されるデータ保存システムを用意した。コントローラには，プロセッサからの指令値や制御入力を受け取って制御を行うことを想定し，2自由度制御器を配置した。加えて，高速演算処理によって安定した広帯域制御を実現するための高速制御器を併設している。基本的な外乱抑圧はFPGA上の2自由度制御器が行うため，プロセッサは機能性の向上を目的とした制御系の設計に専念することができる。
      </p>

      <h2 class="research-subtitle"> 連携制御システムの設計 </h2>
      <p>
        単体のFPGAではパラメータの更新，柔軟な指令値や制御入力の生成，制御系の状態監視，データロギングなどが非常に難しいため，これらはプロセッサを用いて行う。そこで，下図のように制御器，パラメータテーブル設定システム，動作監視システム，データロガーを配置した。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer2/computer_arch2.png" class="pic-computer_arch2">
      </div>
      <p>
        この構成では，FPGAが信号処理を行うため，プロセッサは低ノイズ信号を扱うことができる。また，複雑なアルゴリズムを実行可能であり，実行結果をFPGA上の回路に反映することができる。ここで，プロセッサとFPGA上の回路の動作速度は異なるため，どのようにプロセッサとFPGAを通信させるかが重要となる。また，この制御システムの汎用性を向上するためには，FPGA上に実装する制御器のアーキテクチャの設計を制御工学の側面から検討する必要がある。次項では制御器アーキテクチャについて検討を進める。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer1/advantage">
            > 専用計算機を使用した制御系設計
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/computer2/controller_architecture">
          > 制御器アーキテクチャの設計
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

.pic-computer_arch1{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-computer_arch2{
  width:90%;
  max-width:610px;
  margin:10px;
}
</style>
