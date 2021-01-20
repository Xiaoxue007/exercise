<template>
  <div>
    <div style="margin-bottom: 30px">
      <Input
        v-model="content"
        maxlength="140"
        show-word-limit
        type="textarea"
        placeholder="和大家聊聊吧~"
        :rows="4"
        class="textarea"
        @on-focus="login"
      />
      <Button type="primary" icon="md-redo" @click="send">发布</Button>
    </div>

    <List item-layout="vertical">
      <ListItem v-for="(item, index) in comments" :key="index">
        <Row type="flex" align="middle">
          <Col span="24">
            <a href="" class="commentAvatar">
              <Avatar
                v-if="item.user.avatar"
                :src="item.user.avatar"
                size="large"
              ></Avatar>
              <Avatar
                v-else
                style="color: #f56a00; background-color: #fde3cf"
                size="large"
              >
                {{ item.user.username[0].toUpperCase() }}
              </Avatar>
            </a>
            <div style="display: flex; flex-direction: column">
              <h5 class="myName">{{ item.user.username }}</h5>
              <Time
                :time="item.createdAt"
                class="commentTime"
                type="datetime"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col offset="1" span="23">
            <p class="detail">{{ item.content }}</p>

            <div v-if="item.reply[0]" class="comment">
              <!--回复-->
              <Reply
                :item="item"
                :is-more="true"
                :is-border="true"
                :bool="false"
                :show-more="showMore[index]"
              ></Reply>
              <span
                v-if="item.reply.length > 1"
                class="me moreReply"
                @click="moreClick(index)"
                >{{ showMore[index] ? '收起 ≙' : '查看更多回复 >' }}</span
              >
            </div>

            <div class="zanping">
              <span class="zan">
                <LikeBtn
                  icon="md-thumbs-up"
                  name="like"
                  size="20"
                  type="Comment"
                  :object="item._id"
                ></LikeBtn>
              </span>

              <span class="ping" @click="replyClick(index)">
                <Icon type="ios-chatboxes" size="18" color="#76839b" />
                <span class="huifu">{{
                  isTextbox[index] ? '取消回复' : '回复'
                }}</span>
              </span>
            </div>

            <div v-show="isTextbox[index]">
              <Input
                v-model="text[index]"
                maxlength="140"
                show-word-limit
                type="textarea"
                :placeholder="`回复${item.user.username}`"
                :rows="4"
                class="textarea"
              />
              <Button
                type="primary"
                icon="md-redo"
                @click="reply(index, item._id)"
                >发布</Button
              >
            </div>
          </Col>
        </Row>
      </ListItem>
    </List>
  </div>
</template>

<script>
import Reply from '@/components/Reply'
import eventBus from '@/plugins/eventBus.js'

export default {
  name: 'CommentList',
  components: { Reply },
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: '',
      comments: [],
      isTextbox: [],
      showMore: [],
      text: [],
      isDialog: false,
      modalType: 'login',
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true,
    },
  },
  methods: {
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          where: {
            type: this.type,
            object: this.object,
          },
        },
      })
    },
    async send() {
      if(this.content){
        await this.$axios.$post('comments', {
          type: this.type,
          object: this.object,
          content: this.content,
        })
        this.content = ''
        await this.fetch()
      }else{
        this.$Message.warning('评论不能回空哦！')
      }

    },
    replyClick(i) {
      if (this.$store.state.auth.user)
        this.$set(this.isTextbox, i, !this.isTextbox[i])
      else this.$Message.warning('登录后才能回复哦~')
    },
    moreClick(i) {
      this.$set(this.showMore, i, !this.showMore[i])
    },
    login() {
      if (!this.$store.state.auth.user) eventBus.$emit('loginClick')
    },
    async reply(i, id) {
      if(this.text[i]){
        await this.$axios.$post('comments', {
          type: 'Comment',
          object: id,
          content: this.text[i],
        })
        this.$set(this.text, i, '')
        await this.fetch()
      }else{
        this.$Message.warning('回复不能为空哦~')
      }

    },
  },
}
</script>

<style scoped>
.commentAvatar {
  display: inline-block;
  float: left;
}
.commentAvatar img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.myName {
  font-size: 1.5rem;
  padding-left: 15px;
  display: inline-block;
  float: left;
}

.commentTime {
  font-size: 1.3rem;
  color: #999999;
  float: right;
  padding-left: 15px;
}

.detail {
  width: 100%;
  padding-top: 15px;
}

.comment {
  width: 100%;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 10px 35px 5px 33px;
  margin-top: 20px;
}

.huifu {
  color: #76839b;
}

.me {
  color: #1dd2af;
}

/*.reply {*/
/*  padding: 20px 35px 15px 33px;*/
/*  border-bottom: 1px solid #e6e6e6;*/
/*}*/

/*.reply:last-child {*/
/*  border-bottom: none;*/
/*}*/

/*.replyContent {*/
/*  margin-top: 10px;*/
/*}*/

.zanping {
  margin-top: 20px;
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
  margin: 5px 0;
  cursor: pointer;
}
</style>
