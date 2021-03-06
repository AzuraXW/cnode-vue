<template>
  <ul class="msg-list">
    <li v-for="message in messages" :key="message.id">
      <div class="top">
        <router-link
          :to="{ name: 'UserLately', params:{ username: message.author.loginname } }"
        >
          {{message.author.loginname}}
        </router-link>
        <template v-if="message.type === 'reply'">
          <span>回复了你的话题</span>
        </template>
        <template v-if="message.type === 'at'">
          <span>在话题</span>
        </template>
        <router-link
          :to="`/topic/${message.topic.id}#${message.reply.id}`"
        >
          {{message.topic.title}}
        </router-link>
        <template v-if="message.type === 'at'">
          <span>@了你</span>
        </template>
        <span>，说到：</span>
      </div>
      <div v-html="message.reply.content" class="answer"></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['messages']
}
</script>

<style lang="scss" scoped>
.msg-list{
  margin: 0;
  padding: 0;
  list-style: none;
  li{
    padding: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #EBEEF5;
    }
    .answer{
      margin: 20px 0 0 35px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
