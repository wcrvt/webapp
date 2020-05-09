<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 動作における指令値/制御剛性の設計 </h1>
      <p>
        指令値を入力することはモータ系にエネルギを与えることであり，制御剛性を設定することは他系との接触におけるエネルギ交換を調整することに相当する。振動制御の例に示したように，モータ系の制御剛性を適切に設定することは外界環境との相互作用を円滑にする。道具を使用した作業等では適切な制御剛性を設定した上で操作に当たる必要がある。ここで，制御剛性は周波数依存値であり，系の運動が含む周波数成分を考慮して決定される必要がある。したがって，指令値と制御剛性は同時に設計する必要がある。道具を使用した作業は動作自由度が非常に高く，任意の動作に対して適切な制御剛性を定めることは困難であるため，初期段階においては人間による教示と試行錯誤による調整が必要になると予想される。
      </p>

      <h2 class="research-subtitle"> ロボットによるヴァイオリン演奏 </h2>

      <p>
        複雑なタスクの例として，ヴァイオリンの演奏を紹介する。ヴァイオリンの演奏には様々な技法が存在し，各演奏方法に独特な動作様式が存在する。今回はDetacheと呼ばれる演奏方法をロボットに演奏させた。Detacheを行う際の心がけは，「腕を脱力し，弦に一定の力を加え，一定の速度で弾く」ことであると言われている。ここで，腕を脱力することは制御剛性を低く設定することを示唆し，一定の力を加えながら一定の速度で弾くことは位置と力の指令値の規範を示している。この規範を軸として，以下の装置を使用して演奏を行なった。
      </p>

      <div class="pic-container">
        <img src="@/pic/energy/setup.jpg" class="pic-violin-setup">
      </div>

      <p>
        本検証から重力や摩擦等の非理想特性を極力除去するために，簡単な機構を用いて実験を行なった。水平方向をX軸，垂直方向をY軸とし，水平左方向をX軸正方向，垂直上方向をY軸正方向とした。ロボットはX軸/Y軸の非干渉制御を実現しており，各軸において位置/力の制御を実行することができる。
      </p>

      <p>
        はじめに，X軸/Y軸共に位置制御を行なって演奏を行なった。本条件では弦への加圧方向に対する制御剛性は非常に高く，人間の操作では極度の緊張状態に相当する。以下は演奏における各軸の位置/力応答を示している。位置応答には振動が確認されず，指令値への良好な追従が確認されたが，力応答が振動的であった。また，振動制御の例と同様に，制御剛性が非常に高いことから，演奏に際して弓が大きく振動し，演奏音にうなりが確認された。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/timeres_pos.png" class="pic-violin-timeres">
      </div>

      <p>
        続いて，X軸は位置制御のまま，Y軸に力制御を導入し，弦への加圧方向に低い制御剛性を設定した。本手法は力の平衡点を設定するインピーダンス制御であり，従来の位置の平衡点を設定するインピーダンス制御とは異なる。制御剛性の調整に当たっては試行錯誤によって適切な値を探索した。これにより腕の脱力を模倣した。以下は演奏における各軸の位置/力応答を示している。先ほどの結果とは異なり，各軸の力応答に振動が確認されなかった。また，演奏音に関してもうなりが確認されなかった。
      </p>
      <div class="pic-container">
        <img src="@/pic/energy/timeres_force.png" class="pic-violin-timeres">
      </div>

      <p>
        以下に①人間による演奏，②位置制御を用いた演奏，③力制御を用いた演奏の音圧波形を示した。人間の演奏と力制御を用いた演奏は，非常に近い音圧を発生させていることが確認できた。一方で，位置制御を用いた演奏ではうなりが発生していることが確認された。以上のことから，道具の操作に際しては適切な制御剛性を設定することが望ましいと考えられる。また，細部にわたる動作の調整には指令値に関しても細かい調整が必要であるが，両者の同時最適化設計に関する手法に関しては研究の余地があると考える。
      </p>

      <div class="pic-container">
        <img src="@/pic/energy/playsound_human.png" class="pic-violin-sound">
        <img src="@/pic/energy/playsound_pos.png" class="pic-violin-sound">
        <img src="@/pic/energy/playsound_force.png" class="pic-violin-sound">
      </div>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/energy/vibration">
          > エネルギ論から見た振動抑制制御
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

  export default {
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-violin-setup{
  max-width:350px;
  width:90%;
  margin:10px;
}
.pic-violin-timeres{
  max-width:650px;
  width:90%;
  margin:10px;
}
.pic-violin-sound{
  max-width:320px;
  width:90%;
  margin:10px;
}


</style>
