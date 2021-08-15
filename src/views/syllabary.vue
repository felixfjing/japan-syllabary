<template>
  <section class="syllabary-layout">
    <template v-for="item in list">
      <syllabary-module :title="item.title"
                        :list="item.source"
                        :col="item.title === '拗音' ? 3 : 5"
                        :key="item.title" class="syllabary-module"></syllabary-module>
    </template>

    <section class="annotation-text">注：以上数据均来自于百度百科</section>
  </section>
</template>

<script>
import SyllabaryModule from '@/views/components/syllabary-module'
import { unvoicedSyllable, vocalSyllable, halfVocalSyllable, bendSyllable } from '@/source'

export default {
  name: 'syllabary',
  components: {
    SyllabaryModule
  },
  data() {
    return {
      list: [
        {
          title: '清音',
          source: unvoicedSyllable
        },
        {
          title: '浊音',
          source: vocalSyllable
        },
        {
          title: '半浊音',
          source: halfVocalSyllable
        },
        {
          title: '拗音',
          source: bendSyllable
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.syllabary-layout {
  padding: 30px 20px;

  .syllabary-module {
    margin-bottom: 50px;

    &:last-child {
      //margin-bottom: 0px;
    }
  }
}
</style>