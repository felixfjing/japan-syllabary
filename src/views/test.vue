<template>
  <section class="test-layout">
    <section class="card-layout">
      <section class="card-container">
        <span class="card-header">读音：</span>

        <section class="card-content">
          <span>{{ currentSyllable.roman || '' }}</span>
        </section>

        <section class="card-footer">
          <van-button round plain type="primary" size="small"
                      @click="refreshSyllable"
                      style="width: 50%;">重新随机
          </van-button>
        </section>
      </section>
    </section>

    <section class="form-layout">
      <section class="annotation-text">请根据随机给出的读音打出对应的平假名或片假名</section>

      <section class="form-container">
        <van-row gutter="20">
          <van-col span="12">
            <van-field label="" placeholder="请输入平假名"
                       v-model.trim="submitForm.hiragana"/>
          </van-col>
          <van-col span="12">
            <van-field label="" placeholder="请输入片假名"
                       v-model.trim="submitForm.katakana"/>
          </van-col>
          <van-col span="24">
            <section class="submit-btn">
              <van-checkbox v-model="hiraganaChecked" shape="square"
                            @change="checkChange">只校验平假名
              </van-checkbox>
              <van-button round plain type="primary" size="small"
                          @click="handleCheck"
                          style="width: 50%;">校验
              </van-button>
            </section>
          </van-col>
        </van-row>
      </section>

      <section class="check-result-container" v-if="showResult">
        <span class="success-text" v-if="calcCheckResult">你很棒哟，全部校验成功！！</span>
        <template v-else>
          <span class="failer-text">很遗憾，校验失败！</span>

          <section class="result-detail">
           <span @click="visible = true"
                 v-if="!visible"><van-icon name="eye-o"/> 查看答案</span>
            <transition name="van-fade">
              <section v-show="visible" class="syllable">
                <span>平假名：{{ currentSyllable.hiragana || '' }}</span>
                <span v-if="!hiraganaChecked">片假名：{{ currentSyllable.katakana || '' }}</span>
              </section>
            </transition>
          </section>
        </template>
      </section>
    </section>
  </section>
</template>

<script>
import { unvoicedSyllable } from '@/source'
import { validatenull } from '../lib/utils'

const randomIndex = (m, n) => {
  return Math.floor(Math.random() * (m - n) + n)
}

const getRandomSyllable = (list) => {
  if (validatenull(list)) return {}

  const length = list.length
  const index = randomIndex(0, length)

  return list[index]
}
export default {
  name: 'test',
  data() {
    return {
      visible: false,
      showResult: false,
      hiraganaChecked: false,
      currentSyllable: {},
      allSyllable: unvoicedSyllable.filter((item) => {
        return !validatenull(item.hiragana) && !validatenull(item.katakana) && !validatenull(item.roman)
      }),
      submitForm: {
        hiragana: '',
        katakana: ''
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.refreshSyllable()
    })
  },
  computed: {
    calcCheckResult() {
      const {hiragana: sHiragana, katakana: sKatakana} = this.submitForm
      const {hiragana: cHiragana, katakana: cKatakana} = this.currentSyllable

      if (this.hiraganaChecked && sHiragana === cHiragana) return true
      else if (sKatakana === cKatakana && sHiragana === cHiragana) return true

      return false
    }
  },
  methods: {
    checkChange() {
      this.showResult = false
      this.visible = false
    },
    handleCheck() {
      const {hiragana: sHiragana, katakana: sKatakana} = this.submitForm

      if (validatenull(sHiragana)) {
        this.$toast('请输入平假名')
        return false
      } else if (!this.hiraganaChecked && validatenull(sKatakana)) {
        this.$toast('请输入片假名')
        return false
      }

      this.showResult = true
    },
    refreshSyllable() {
      this.submitForm = {
        hiragana: '',
        katakana: ''
      }
      this.showResult = false
      this.visible = false

      this.currentSyllable = getRandomSyllable(this.allSyllable)
    }
  }
}
</script>

<style scoped lang="scss">
.test-layout {
  padding: 30px 20px;

  .card-layout {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;

    .card-container {
      box-shadow: 0 0 8px 5px $gray-3;
      width: 600px;
      padding: 30px;
      border-radius: 12px;

      .card-header {
        font-size: 28px;
        color: $blue;
      }

      .card-content {
        width: 100%;
        height: 300px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 150px;
          font-weight: 700;
        }
      }

      .card-footer {
        margin-top: 40px;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .form-layout {
    padding: 50px 20px;

    .form-container {
      margin-top: 30px;

      .van-cell {
        padding-left: 0px;
        padding-right: 0px;
        border-bottom: 1px solid #ebedf0;
      }
    }

    .submit-btn {
      margin-top: 50px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;

      /deep/ .van-checkbox {
        display: flex;
        display: -webkit-flex;
        align-items: center;

        &__icon {
          font-size: 35px !important;
        }

        &__label {
          color: $blue;
          font-size: 28px;
          line-height: normal;
          padding-top: 2px;
        }
      }
    }
  }

  .check-result-container {
    padding: 50px 0px;

    .result-detail {
      margin-top: 20px;
      color: $blue;
      font-size: 28px;
      display: flex;
      display: -webkit-flex;
      align-items: center;

      .syllable {
        span + span {
          margin-left: 25px;
        }
      }
    }

    .success-text {
      color: $blue;
      font-size: 30px;
      font-weight: 700;
    }

    .failer-text {
      color: $red;
      font-size: 30px;
    }
  }
}
</style>