export default {
  '/': {
    pc: './views/Home',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】做最好的Kotlin中文社区',
  },
  '/edit': {
    pc: './views/Edit',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】发布新文章',
  },
  '/edit/:id': {
    pc: './views/Edit',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】编辑文章',
  },
  '/post/:id': {
    pc: './views/Post',
    mobile: './viewsMobile/Post',
    title: '【Kotlin CN】做最好的Kotlin中文社区'
  },
  '/topic/:key': {
    pc: './views/Topic',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】专题',
  },
  '/topic/:key/:id': {
    pc: './views/Topic',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】专题',
  },
  '/user/:uid': {
    pc: './views/User',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】个人主页'
  },
  '/comments/:id': {
    pc: './views/Home',
    mobile: './viewsMobile/Comments',
    title: '【Kotlin CN】评论',
  },
  '/message': {
    pc: './views/Message',
    mobile: './viewsMobile/Home',
    title: '【Kotlin CN】未读消息'
  }
}
