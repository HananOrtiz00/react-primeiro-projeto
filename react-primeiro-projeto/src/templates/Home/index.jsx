import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: '',
  };

  componentDidMount() {
    this.loadPosts();
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {

    const {
      posts,
      allPosts,
      page,
      postsPerPage,
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts: posts, page: nextPage })

    console.log('Load more posts chamado')

  }

  handleChange = (e) => {

    const { value } = e.target;

    this.setState({ searchValue: value })


  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage > allPosts.length;

    const filteredPosts = !!searchValue ?
      posts.filter(p => {
        return p.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className='container'>
        <div className="search-container">

          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <h2>Não existem posts para esse título :(</h2>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text='Load more posts'
              disabled={noMorePosts}
              onClick={this.loadMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
}

export default Home;
