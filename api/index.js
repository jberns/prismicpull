import Prismic from 'prismic-javascript';
import {PRISMIC_API_URL} from '../config';

const getBlogPostsAPI = async params => {
  try{
    const API = await Prismic.api(PRISMIC_API_URL);

    const response = await API.query(
      Prismic.Predicates.at('document.type','blog_post'),
      {
        orderings:'[my.blog_post.date desc]',
        ...params
      }
    );

    return response;
  } catch(error){
    return error;
  }
};

const getBlogPostAPI = async slug => {
  try{
    const API = await Prismic.api(PRISMIC_API_URL);

    const response = await API.query(
      Prismic.Predicates.at('my.blog_post.uid', slug)
    );
    return response.results[0];
  } catch(error){
    console.error(error);
    return error;
  }
};

const getHomePageAPI = async () => {
  try{
    const API = await Prismic.api(PRISMIC_API_URL);

    const response = await API.query(
      Prismic.Predicates.at('my.homepage.uid', 'home')
    );
    console.log(response);
    console.log(response.data);

    return response.results[0];
  } catch(error){
    console.error(error);
    return error;
  }
};

export {getHomePageAPI, getBlogPostsAPI, getBlogPostAPI};