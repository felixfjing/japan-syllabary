<template>
  <section class="layout">
    <section class="layout-wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.$keepAlive"/>
      </keep-alive>

      <router-view v-if="!$route.meta.$keepAlive"/>
    </section>

    <van-tabbar route
                :placeholder="true"
                :safe-area-inset-bottom="true">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/syllabary" icon="flower-o">音标</van-tabbar-item>
    </van-tabbar>
  </section>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
.layout {
  height: 100%;

  .layout-wrapper {
    //height: calc(100% - 50px);
  }
}
</style>