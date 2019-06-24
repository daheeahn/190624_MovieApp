// import React, { Component } from 'react';
import React from 'react'; // Component 사용하지 않으므로!
import PropTypes from "prop-types";
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis'

function Movie({title, poster, genres, synopsis}) {
    return (
        // className : 정상적인 css에서 class를 뜻함. JSX에서는 class가 아닌 className을 써야함
        <div className="Movie">
            <div className="Movie__Columns">
                <MoviePoster poster={poster} alt={title} />
            </div>
            <div className="Movie__Columns">
                <h1>{title}</h1>
                <div className="Movie__Genre">
                    {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <p className="Movie__Synopsis">
                    <LinesEllipsis
                        text={synopsis}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                        />
                </p>
            </div>
        </div>

    )
}

export default Movie;

// don't have state
// render x lifecycle x
// only have return
function MoviePoster({poster, alt}) {
    return (
        <img className="Movie__Poster" alt={alt} title={alt} width="300" height="400" src={poster} />
    )
}

function MovieGenre({genre}) {
    return (
        <span className="Movie__Genre">{genre}&nbsp;</span>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired, // array!!
    synopsis: PropTypes.string.isRequired
}

MoviePoster.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

MovieGenre.propTypes = {
    genre: PropTypes.string.isRequired
}