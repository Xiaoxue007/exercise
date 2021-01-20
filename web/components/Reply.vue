<template>
  <div>
    <div v-for="(reply, i) in form" :key="i" :class="{ reply: isBorder }">
      <div class="content">
        <span v-if="isMore" style="font-weight: bold; margin-right: 5px">
          {{ reply.user.username }}:
        </span>
        <span v-else style="margin-right: 5px">
          <span style="font-weight: bold" class="me">
            {{ reply.user.username }}
          </span>
          <span class="huifu" style="margin: 0 3px">回复</span>
          <span style="font-weight: bold">{{ item.user.username }}:</span>
        </span>

        <span class="replyContent">{{ reply.content }}</span>
        <div class="zanping">
          <Time
            :time="reply.createdAt"
            class="huifu"
            style="margin-right: 15px"
          />
          <span class="zan">
            <LikeBtn
              icon="md-thumbs-up"
              name="like"
              size="20"
              type="Comment"
              :object="reply._id"
            ></LikeBtn>
          </span>

          <span class="zan" @click="textClick(i)">
            <Icon type="ios-chatboxes" size="18" color="#76839b" />
            <span class="huifu">{{ isTextbox[i] ? '取消回复' : '回复' }}</span>
          </span>

          <span
            v-if="isMore && reply.reply[0]"
            class="ping"
            @click="replyClick(i)"
          >
            <Icon type="ios-quote" size="20" color="#76839b" />
            <span class="huifu">
              {{ isReply[i] ? '收起对话' : '查看对话' }}
            </span>
          </span>
        </div>
        <div v-show="isTextbox[i]">
          <Input
            v-model="content[i]"
            maxlength="140"
            show-word-limit
            type="textarea"
            :placeholder="`回复${reply.user.username}`"
            :rows="4"
            class="textarea"
          />
          <Button
            type="primary"
            icon="ios-redo"
            style="text-align: right"
            @click="send(i, reply._id)"
            >发布</Button
          >
        </div>
        <div v-if="reply.reply[0]">
          <Reply
            v-if="isReply[i] || bool"
            :item="reply"
            :is-more="false"
            :is-border="false"
            :bool="true"
            :show-more="true"
          ></Reply>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    item: Object,
    isMore: Boolean,
    isBorder: Boolean,
    bool: Boolean,
    showMore: Boolean,
    type: {
      type: String,
      default() {
        return 'Comment'
      },
    },
  },
  data() {
    return {
      form: [],
      isTextbox: [],
      isReply: [],
      content: [],
    }
  },
  watch: {
    item: {
      handler(cur, old) {
        this.fetch(this.item.reply)
      },
      immediate: true,
      deep: true,
    },
    showMore: {
      handler(cur, old) {
        this.fetch(this.item.reply)
      },
      immediate: true,
    },
  },
  methods: {
    async fetch(data) {
      const reply = []
      if (this.showMore) {
        for (const el of data) {
          const res = await this.$axios.$get('comments', {
            params: {
              where: {
                type: 'Comment',
                _id: el,
              },
            },
          })
          reply.push(res[0])
        }
      } else {
        const res = await this.$axios.$get('comments', {
          params: {
            where: {
              type: 'Comment',
              _id: data[0],
            },
          },
        })
        reply.push(res[0])
      }
      this.form = reply
    },
    textClick(i) {
      if (this.$store.state.auth.user)
        this.$set(this.isTextbox, i, !this.isTextbox[i])
      else this.$Message.warning('登录后才能回复哦~')
    },
    replyClick(i) {
      this.$set(this.isReply, i, !this.isReply[i])
    },
    async send(i, id) {
      if (this.content[i]) {
        const res = await this.$axios.$post('comments', {
          type: this.type,
          object: id,
          content: this.content[i],
        })
        this.$set(this.content, i, '')
        this.isTextbox[i] = false

        this.form[i].reply.push(res._id)
      } else {
        this.$Message.warning('回复不能为空哦~')
      }
    },
  },
}
</script>

<style scoped>
.huifu {
  color: #76839b;
}

.me {
  color: #1dd2af;
}

.content {
  padding-top: 10px;
}
.reply {
  /*padding: 20px 35px 15px 33px;*/
  border-top: 1px solid #c0d1f3;
  padding: 10px 0;
}

.reply:first-child {
  border-top: none;
}

.replyContent {
  margin-top: 10px;
}

.zanping {
  margin-top: 15px;
  font-size: 13px;
}

.zan {
  margin-right: 20px;
}

.zan:hover {
  cursor: pointer;
}

.ping:hover {
  cursor: pointer;
}

.textarea {
  font-size: 1.4rem;
  font-family: '微软雅黑';
  resize: none;
  margin: 20px 0;
}

.moreReply {
  display: block;
  margin-top: 15px;
}
</style>
