const PRISMIC = 'prismic';
const NEXT = 'next';

const route_types = [
  {name: 'home', page: 'index', pattern: '/', doc_type:'home', id_type:''},
  {name: 'blog', page: 'blogPost', pattern: '/blog', doc_type:'blog_post', id_type: 'slug'}
];

function linkResolver(doc, type = PRISMIC){
  const route = route_types.find(routeByDocType => {
    return doc.type === routeByDocType.doc_type});

  switch(type){
    case PRISMIC:
      return `${route.pattern}/${doc.uid}`

    case NEXT:
      return `/${route.page}?${route.id_type}=${doc.uid}`
  }
}



module.exports = {
  linkResolver, PRISMIC, NEXT, route_types
};