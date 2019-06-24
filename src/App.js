import React, { Component } from 'react';
import './App.css';
import Movie from "./Movie";

export default class App extends Component {

  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : componentWillReceiveProps() : 컴포넌트가 새로운 props를 받음 -> shouldComponentUpdate() : 리액트는 old props, new props르 살펴본 다음 서로가 다르면 업데이트 = true라고 생각함 그러면 업데이트!  -> componentWillUpdate() : 이곳에 뱅글뱅글 돌아가는 spinner를 붙일 수 있겠다! -> render() -> componentDidUpdate : 로딩 중 메시지나 아이콘 숨기기!

  // componentWillMount() { // 1
  //   console.log('will mount');
  //   // API에 작업 요청
  // }

  state = {
    

  }

  componentDidMount() { // 3
    this._getMovies(); 
  }


  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      console.log(movie)
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres} 
        synopsis={movie.synopsis}
        key={movie.id} />
      // key는 map의 index를 사용하지 않는 것이 좋음. 느리기 때문.
    })
    return movies
  }

  _getMovies = async () => { // async를 안쓰면 await이 동작하지 x
    // 이 함수는 비동기 함수이고 movies라는 variable을 갖고 있어
    // 그리고 이건 value를 갖고 있어. await 모드인 _callApi 함수를!
    const movies = await this._callApi(); 
    // await : callApi가 끝나기를 기다림. 성공적으로 수행하는 것을 기다리는 것이 아니라!
    // callApi의 return value가 무엇이든 그냥 그 value를 movies에 넣을거야

    this.setState({ // 그러나 이 라인은 callApi 작업이 완료되기까지 수행 안해 이 작업이 실패로 끝나더라도!
      movies // this is modern javascript. 그냥 이렇게 쓰면 state에서 정의 안해도 되나봐
    })
  }

  _callApi = () => {

    // This is Asynchronous
    // fetch는 url을 에이작스로 불러올 수 있다!
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    // then function은 1개의 attribute만 줘 그것은 object. fetch의 결과물
    .then(response => response.json()) // 성공적 수행이 아니라 그냥 작업이 끝나면
    // return json.data.movies 안해도 => 가 그 역할(return) 한다 : arrow fucntion
    .then(json => json.data.movies) // json으로 변환하기
    .catch(err => console.log(err)) // 혹시 에러가 나면 보여줘
    
    // old javascript
    // .catch(function(err) {
    //   console.log(err)
    // })
  }

  render() { // 2
    console.log('did render');
    // console.log('dd');
    // console.log(this.state.movies);

    const { movies } = this.state;
    return (
      // 영화가 state에 없으면 loading 띄우기
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'loading' }  
        
      </div>
    );
  }
}

