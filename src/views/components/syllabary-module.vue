<template>
  <section class="syllabary-module-layout">
    <div class="mh-title">
      <section class="span">{{ title }}</section>
    </div>

    <section class="mc-container box-shadow"
             :class="`grid--${col}`">
      <template v-for="(item, index) in list">
        <section :key="index" class="item">
          <section class="kana">
            <span style="color: #7FC8A9;">{{ item.hiragana }}</span>
            <span style="color: #D5EEBB;">{{ item.katakana }}</span>
          </section>

          <span style="color: #5F7A61;">{{ item.roman }}</span>
        </section>
      </template>
    </section>
  </section>
</template>

<script>
export default {
  name: 'syllabary-module',
  props: {
    title: String,
    list: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: 5
    }
  }
}
</script>

<style scoped lang="scss">
.syllabary-module-layout {
  .mc-container {
    border-radius: 12px;
    padding: 30px 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 50px 20px;

    .item {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      align-items: center;

      .kana {
        span + span {
          margin-left: 10px;
        }
      }
    }
  }

  .grid--5 {
    grid-template-columns: repeat(5, 1fr);
  }

  .grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>