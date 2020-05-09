<template>
  <body>

    <p class="page-title"> Research </p>

    <div id="Box-A">
      <div class="caption-container">
        <p class="caption-title"> 運動制御のための基礎知識 </p>
        <p class="caption-sentence">
          現在の制御設計問題は，現代制御に代表されるフレームワークに則った最適化計算が多く見受けられ，必ずしも導入の敷居が低いとは言えません。ここでは制御対象に関する経験的知見を参考に直感的な設計が可能な古典制御を始めとして，運動制御への理解を深めるための知識を紹介します。
        </p>
      </div>

      <div class="article-board">
        <div class="article-box">
          <p class="article-caption"> Linear Control </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/linear_system/architecture">
                基本的な制御系のアーキテクチャ
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/linear_system/inner_model_principle">
                内部モデル原理に基づく制御系設計
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/linear_system/luenberger_observer">
                Luenbergerのオブザーバ
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/linear_system/youla_kucera">
                Youla-Ku&ccaron;eraのパラメトリゼーション
              </router-link>
            </li>
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Problems in Control </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/problem/interdisciplinary">
                複合領域のシステム設計
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/problem/phaselag">
                位相遅れによる制御性能の限界
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/problem/architecture">
                制御系アーキテクチャの制約
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/problem/approach">
                性能向上の制約と改善方法
              </router-link>
            </li>
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Energetics </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/energy/pf_control">
                エネルギ論から見た位置制御と力制御
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/energy/control_stiffness">
                制御剛性の調整によるエネルギの制御
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/energy/vibration">
                エネルギ論から見た振動抑制制御
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/energy/impedance_control">
                動作における指令値/制御剛性の設計
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="divider" />

    <div id="Box-B">
      <div class="caption-container">
        <p class="caption-title"> 高機能性を実現する制御技術 </p>
        <p class="caption-sentence">
          制御の基本は「システムの特性を考慮して入力する」「状態を観測する」「出力誤差を補正する」の3ステップから構成されます。これらはフィードフォワード制御器，状態観測器，フィードバック制御器の設計問題となります。ここでは各技術の有名な手法を紹介します。
        </p>
      </div>

      <div class="article-board">
        <div class="article-box">
          <p class="article-caption"> Feedforward Control </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/feedforward/continuous">
                連続時間系における設計
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/feedforward/perfect_tracking">
                完全追従制御
              </router-link>
            </li>
            <!--
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/feedforward/final-state_control">
                終端状態制御
              </router-link>
            </li>
            -->
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Acceleration Control </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/acceleration_control/advantage">
                加速度制御の利点
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/acceleration_control/dob_base_acc">
                外乱オブザーバを用いた加速度制御
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/acceleration_control/multidof_acc">
                多自由度系の加速度制御
              </router-link>
            </li>
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Kalman Filter </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/kalman_filter/principle_control">
                最適な状態観測器
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/kalman_filter/operation">
                状態量の予測と更新
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/kalman_filter/principle_signal">
                カルマンフィルタの構造
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="divider" />

    <div id="Box-C">
      <div class="caption-container">
        <p class="caption-title"> 制御専用計算機 </p>
        <p class="caption-sentence">
          私が設計した制御専用計算機について紹介します。計算機性能は，実現可能な制御性能や実装可能なアルゴリズムを決定する要因となります。ここでは，従来の制御設計問題や将来的な技術的需要を踏まえ，設計思想や計算機構造，実装した制御器構成などについて纏めました。
        </p>
      </div>

      <div class="article-board">
        <div class="article-box">
          <p class="article-caption"> Theory </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer1/background">
                計算機設計の背景
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer1/constraints">
                計算機性能に起因する制約
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer1/advantage">
                専用計算機を使用した制御系設計
              </router-link>
            </li>
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Design </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer2/computer_architecture">
                計算機アーキテクチャの設計
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer2/controller_architecture">
                制御器アーキテクチャの設計
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer2/bus_architecture">
                バスアーキテクチャの設計
              </router-link>
            </li>
          </ul>
        </div>

        <div class="article-box">
          <p class="article-caption"> Validation </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer3/implementation">
                専用計算機の実装
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer3/positioning">
                精密位置決めへの適用
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/computer3/manipulation">
                マニピュレータ制御への適用
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="divider" />

    <div id="Box-D">
      <div class="caption-container">
        <p class="caption-title"> Tutorial </p>
        <p class="caption-sentence">
          制御理論に関する理解を実装に繋げるために，シミュレーションを行います。基本方針として，制御演算用ライブラリは使用せずに初めから設計します。必要な知識に関しては当該記事を参照できるようにしているため，モータ制御の経験があれば事前知識がなくても問題ありません。
        </p>
      </div>

      <div class="article-board">
        <div class="article-box">
          <p class="article-caption"> Manipulation </p>
          <ul class="article-list">
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/tutorial/manipulation_2dof">
                2軸マニピュレータの位置制御
              </router-link>
            </li>
            <li class="article-title">
              <router-link class="article-link" to="/research/articles/tutorial/manipulation_3dof_redundant">
                3軸冗長マニピュレータの位置制御
              </router-link>
            </li>
          </ul>
        </div>


      </div>
    </div>

  </body>
</template>

<script>
</script>

<style scoped>

p{
  line-height: 160%;
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
}

.page-title{
  font-size:3.5rem;
  margin:0;
  padding: 0;
  color:#fff;
  padding:20px 0;
}

#Box-A{
  background:#fafafa;
  color:#333;
}
#Box-B{
  background:#fafafa;
  color:#333;
}
#Box-C{
  background:#fafafa;
  color:#333;
}
#Box-D{
  background:#fafafa;
  color:#333;
}

.divider{
  background:#fff;
  margin:0;
  padding: 15px;
}
.caption-container{
  margin: 0px 0;
  padding:0;
}
.caption-title{
  font-size:1.8rem;
  padding:40px 0 10px;
  margin:0;
}
.caption-sentence{
  text-align: left;
  font-size:1.1rem;
  padding:10px 0 20px;
  margin:0 100px;
}
.article-board{
  justify-content: center;
  display:-webkit-box;
  display:-moz-box;
  display:-ms-flexbox;
  display:-webkit-flex;
  display:-moz-flex;
  display:flex;
  -webkit-box-lines:multiple;
  -moz-box-lines:multiple;
  -webkit-flex-wrap:wrap;
  -moz-flex-wrap:wrap;
  -ms-flex-wrap:wrap;
  flex-wrap:wrap;
  padding:5px 0;
  margin:0;
}

.article-box{
  background: #fff;
  display: inline-block;
  font-size: 1.0rem;
  line-height:2.0rem;
  margin:10px 10px 30px;
  padding: 0px;
  border-radius: 3px;
  box-shadow:1px 1px 6px rgba(0,0,0,0.5);
  max-width:380px;
  min-width:360px;
  width:50%;
}

.article-caption{
  text-align: center;
  font-size: 1.1rem;
  color: #fff;
  background: #c80000;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 3px 3px 0 0;
  padding: 3px 0px;
  margin: 0 0 5px;
}
.article-list{
  text-align:left;
  font-size: 1.0rem;
  line-height:2.0rem;
  margin:0;
  padding:7px 10px 10px 40px;
}

.article-link{
  text-decoration: none;
  color:#333;
  margin:0;
  padding:0;
}
.article-link:hover
{
  text-decoration: underline;
}

@media screen and (max-width: 640px){

  .page-title{
    font-size:2.0rem;
    margin:0;
    padding: 0;
    color:#fff;
    padding:20px 0;
  }

  #Box-A{
    background:#fafafa;
    color:#333;
  }
  #Box-B{
    background:#fafafa;
    color:#333;
  }
  #Box-C{
    background:#fafafa;
    color:#333;
  }
  #Box-D{
    background:#fafafa;
    color:#333;
  }

  .divider{
    background:#fff;
    margin:0;
    padding: 10px;
  }
  .caption-container{
    margin: 0px 0;
    padding:0;
  }
  .caption-title{
    font-size:1.1rem;
    padding:25px 0 5px;
    margin:0;
  }
  .caption-sentence{
    text-align: left;
    font-size:0.8rem;
    padding:10px 0 15px;
    margin:0 20px;
  }
  .article-board{
    justify-content: center;
    display:-webkit-box;
    display:-moz-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:-moz-flex;
    display:flex;
    -webkit-box-lines:multiple;
    -moz-box-lines:multiple;
    -webkit-flex-wrap:wrap;
    -moz-flex-wrap:wrap;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    padding:5px 0;
    margin:0;
  }

  .article-box{
    background: #fff;
    display: inline-block;
    font-size: 0.8rem;
    line-height:1.2rem;
    margin:0px 10px 17px;
    padding: 0px;
    border-radius: 3px;
    box-shadow:1px 1px 6px rgba(0,0,0,0.5);
    max-width:350px;
    min-width:310px;
    width:50%;
  }

  .article-caption{
    text-align: center;
    font-size: 0.8rem;
    color: #fff;
    background: #c80000;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 3px 3px 0 0;
    padding: 3px 0px;
    margin: 0 0 5px;
  }
  .article-list{
    text-align:left;
    font-size: 0.8rem;
    line-height:1.5rem;
    margin:0;
    padding:3px 10px 7px 40px;
  }
  .article-title{
  }

  .article-link{
    text-decoration: none;
    color:#333;
    margin:0;
    padding:0;
  }
}

</style>
