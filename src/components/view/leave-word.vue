<template>
    <div id="container" class="container">
        <Gitalk :title="'ali-werwe'" :id="'http://localhost:8080/#/footprint'"></Gitalk>
    </div>
</template>

<script>
import Gitalk from '@/components/common/gitalk';

export default {
  name: 'v-leave-word',
  components: {
    Gitalk
  }
}
</script>