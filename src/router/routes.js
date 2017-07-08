export default {
  '/': './views/Home',
  '/edit': './views/Edit',
  '/post/:id': './views/Post',
  '/edit/:id': './views/Edit',
  '/topic': './views/Topic',
  '/topic/:key': './views/Topic',
  '/topic/:key/:id': './views/Topic',
  '/user/:uid':'./views/User',

  '/m/': './viewsMobile/Home',
  '/m/post/:id': './viewsMobile/Post',
  '/m/edit': './viewsMobile/Edit',
  '/m/edit/:id': './viewsMobile/Edit',
  '/m/comments/:id': './viewsMobile/Comments',
  '/comments/:id': './viewsMobile/Comments',
  '/m/topic': './views/404',
  '/m/topic/:key': './views/404',
  '/m/topic/:key/:id': './views/404',
  '/m/user/:uid':'./views/User'
}
