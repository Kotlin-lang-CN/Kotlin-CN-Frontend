const CGI = {
  account: "https://debug.kotlin-cn.org/api/account",
  github: 'https://debug.kotlin-cn.org/api/github',
  admin: 'https://debug.kotlin-cn.org/api/admin',
  article: "https://debug.kotlin-cn.org/api/article",
  reply: 'https://debug.kotlin-cn.org/api/reply',
  rss: 'https://debug.kotlin-cn.org/api/rss',
  flower: 'https://debug.kotlin-cn.org/api/flower',
  misc: 'https://debug.kotlin-cn.org/api/misc',
  creator: 'https://debug.kotlin-cn.org/api/creator',
  message: 'https://debug.kotlin-cn.org/api/message'
};

const Config = {
  URL: {
    account: {
      register: CGI.account + '/register',
      login: CGI.account + '/login',
      user: CGI.account + '/user/{0}',
      password: CGI.account + '/user/{0}/password',
      update: CGI.account + '/user/{0}/update',
      profile: CGI.account + '/profile',
      profile_update: CGI.account + '/profile/update'
    },
    github: {
      createState: CGI.github + '/state',
      auth: CGI.github + '/auth'
    },
    admin: {
      articleList: CGI.admin + '/article/list',//管理员视角查看所有文章内容
      updateArticleState: CGI.admin + '/article/{0}/state',//更新文章状态
      updateUserState: CGI.admin + '/user/{0}/state',//跟新用户状态
      updateReplyState: CGI.admin + '/reply/{0}/state'//更新回复状态
    },
    article: {
      post: CGI.article + '/post',
      detail: CGI.article + '/post/{0}',
      update: CGI.article + '/post/{0}/update',
      delete: CGI.article + '/post/{0}/delete',

      category: CGI.article + '/category',//获取文章类别列表
      getLatest: CGI.article + '/list',//获取最新文章列表
      getFine: CGI.article + '/fine', //获取精品文章列表
      getCategory: CGI.article + '/category/{0}'//获取特定类别最新文章列表
    },
    reply: {
      count: CGI.reply + '/count',
      article: CGI.reply + '/article/{0}',
      delete: CGI.reply + '/id/{0}/delete',
      user: CGI.reply + '/user/{0}'
    },
    flower: {
      article_star: CGI.flower + '/article/{0}/star',
      article_unstar: CGI.flower + '/article/{0}/unstar',
      article_count: CGI.flower + '/article/star/count',
      reply_star: CGI.flower + '/reply/{0}/star',
      reply_unstar: CGI.flower + '/reply/{0}/unstar',
      reply_count: CGI.flower + '/reply/star/count'
    },
    rss: {
      fine: CGI.rss + "/fine",//精品文章订阅
      latest: CGI.rss + '/latest'//最新文章订阅
    },
    misc: {
      dashboard: CGI.misc + '/dashboard',//网站公告栏
      homeLink: CGI.misc + '/home/link'//首页广告栏链接
    },
    creator: {
      article_count: CGI.creator + '/article/count',
      reply_count: CGI.creator + '/reply/count',
      article: CGI.creator + '/article',
      reply: CGI.creator + '/reply'
    },
    message: {
      latest: CGI.message + '/latest',
      subscrib_count: CGI.message + '/article/subscribe/count',
      subscribe: CGI.message + '/article/{0}/subscribe',
      unsubscribe: CGI.message + '/article/{0}/unsubscribe'
    }
  },
  OAuth: {
    github: {
      cgi: 'http://github.com/login/oauth/authorize',
      clientId: '4515da98f829c9feb99f',
      scope: 'user',
    }
  },
  UI: {
    root: '/',
    account: '/account',
    edit: '/edit',
    post: '/post',
    comments: '/comments',
    topic: '/topic',
    user: '/user',
    message: '/message'
  },
  Topic: {
    select: [
      'p1', 'Kotlin-for-Android-Dev', 'p3', 'p4',
    ],
    def: "p1",
    data: {
      p1: {
        title: '【视频】Kotlin 入门到进阶',
        link: '/topic/p1/6284762828886261760',
        logo: 'fa fa-puzzle-piece',
        color: '#ea4335',
        toc: '6289706691865542656',
        readme: '6284762828886261760'
      },
      p2: {
        title: 'Kotlin in Chinese',
        link: '/topic/p2/6284229824772468736',
        logo: 'fa fa-send',
        color: '#4285f4',
        toc: '6287247888258359296',
        readme: '6284229824772468736'
      },
      p3: {
        title: '社区博客',
        link: '//www.kotliner.cn',
        logo: 'fa fa-comments-o',
        color: '#fbbc05',
        toc: '',
        readme: ''
      },
      p4: {
        title: '中文站',
        link: '//kotlincn.net',
        logo: 'fa fa-support',
        color: '#4285f4',
        toc: '',
        readme: ''
      },
      'Kotlin-for-Android-Dev': {
        title: 'Kotlin for Android Dev',
        link: '/topic/Kotlin-for-Android-Dev/6292540246044377088',
        logo: 'fa fa-send',
        color: '#4285f4',
        toc: '6292543219873017856',
        readme: '6292540246044377088'
      }
    }
  }
};

export default Config;
