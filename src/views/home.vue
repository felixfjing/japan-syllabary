<template>
  <section class="home-layout">
    <!--    <section class="desc-wrapper">-->
    <!--      <section>-->
    <!--        <sapn class="label">音标小卡片：</sapn>-->
    <!--        <span>是用来辅助您加深对音标的记忆，共分为以下三种模式。</span>-->
    <!--      </section>-->
    <!--      <ul>-->
    <!--        <li>随机全部：会全部随机平假名和片假名。</li>-->
    <!--        <li>随机平假名：只会随机平假名。</li>-->
    <!--        <li>随机片假名：只会随机片假名。</li>-->
    <!--      </ul>-->
    <!--    </section>-->

    <section>
      <van-popover
          :actions="modeActions"
          v-model="showMode"
          trigger="click"
          placement="bottom-start"
          @select="handleSelectMode">
        <template #reference>
          <section class="mode-change">{{ currentMode.text || '请选择模式' }}
            <van-icon name="arrow-down" :class="showMode ? 'rotate-180' : ''"/>
          </section>
        </template>
      </van-popover>

      <section class="card-layout">
        <section class="card-container">
          <section class="card-content">
            <span>{{ currentSyllable.text || '' }}</span>
          </section>

          <section class="card-footer">
            <span class="roman"
                  @click="visible = !visible">显示读音
              <transition name="van-fade"
                          :duration="{enter:3000,leave:10}">
                <span v-show="visible">{{ currentSyllable.value || '' }}</span>
              </transition>
            </span>

            <van-button round plain type="primary" size="small"
                        @click="refreshSyllable"
                        style="width: 50%;">重新随机
            </van-button>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { unvoicedSyllable } from '@/source'
import { validatenull } from '@/lib/utils'

const modeActions = [
  {text: '随机全部', key: 'all'},
  {text: '随机平假名', key: 'hiragana'},
  {text: '随机片假名', key: 'katakana'}
]
const filterAllSyllable = (type = 'all') => {
  const temp = []

  unvoicedSyllable.forEach((item) => {
    const {hiragana, katakana, roman} = item

    switch (type) {
      case 'all': {
        if (!validatenull(hiragana) && !validatenull(roman)) {
          temp.push({
            text: hiragana,
            value: roman
          })
        }
        if (!validatenull(katakana) && !validatenull(roman)) {
          temp.push({
            text: katakana,
            value: roman
          })
        }
        break
      }
      case 'hiragana': {
        if (!validatenull(hiragana) && !validatenull(roman)) {
          temp.push({
            text: hiragana,
            value: roman
          })
        }
        break
      }
      case 'katakana': {
        if (!validatenull(katakana) && !validatenull(roman)) {
          temp.push({
            text: katakana,
            value: roman
          })
        }
        break
      }
    }
  })

  return temp
}

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
  name: 'Home',
  components: {},
  data() {
    return {
      visible: false,
      showMode: false,
      modeActions,
      currentMode: modeActions[0],
      allSyllable: filterAllSyllable('all'),
      hiraganaSyllable: filterAllSyllable('hiragana'),
      katakanaSyllable: filterAllSyllable('katakana'),
      currentSyllable: {}
    }
  },
  watch: {
    currentMode: {
      handler() {
        this.refreshSyllable()
      }
    }
  },
  methods: {
    refreshSyllable() {
      this.visible = false

      setTimeout(() => {
        const {key} = this.currentMode
        switch (key) {
          case 'all': {
            this.currentSyllable = getRandomSyllable(this.allSyllable)
            break
          }
          case 'hiragana': {
            this.currentSyllable = getRandomSyllable(this.hiraganaSyllable)
            break
          }
          case 'katakana': {
            this.currentSyllable = getRandomSyllable(this.katakanaSyllable)
            break
          }
        }
      }, 30)
    },
    handleSelectMode(action) {
      this.currentMode = action
    }
  },
  created() {
    this.$nextTick(() => {
      this.refreshSyllable()
    })
  }
}
</script>

<style scoped lang="scss">
.home-layout {
  padding: 30px 20px;

  .desc-wrapper {
    font-size: 26px;
    color: $gray-7;

    .label {
      color: $gray-8;
    }
  }

  .mode-change {
    font-size: 28px;
    color: $blue;
  }

  .card-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;

    .card-container {
      position: relative;
      width: 600px;
      height: 700px;
    }

    .card-content {
      width: 600px;
      height: 600px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 12px;
      box-shadow: 0 0 8px 5px $gray-3;
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
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .roman {
        font-size: 28px;
        color: $blue;
      }
    }
  }
}
</style>
