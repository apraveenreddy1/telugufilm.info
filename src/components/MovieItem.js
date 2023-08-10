import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';

import { LoadGenres } from '../actions/genres';

class MovieItem extends Component {

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){
		const { movie, genres, isFetched } = this.props;
		return (


                         




			<div className="col">
				<div className="product px-2 mb-4">
					<div className="product-image mb-1">
						<Link to={`/movie/${movie.id}`} className="d-inline-block position-relative stretched-link">
							<img className="img-fluid" src={`${config.API_IMAGE.small}/${movie.poster_path}`} onLoad={this.imageLoaded}/>
						</Link>
					</div>
					<div className="product-title">
						<Link to={`/movie/${movie.id}`} className="d-inline-block">
							<span className="text-gray-1300 font-size-12">{movie.vote_average}</span>
							<div className="mb-0 font-weight-bold font-size-1"> {movie.title}</div>
						</Link>
					</div>


					{/* <div className="movie-genres">
						<ul className="movie-genres">
							{isFetched && movie.genre_ids.map((id, index) => {
								const item = genres.filter(genre => genre.id === id);
								if(item.length)
									return (
										<li key={id}>{isFetched && item.shift().name}{index + 1 !== movie.genre_ids.length && ', '} </li>
									)
							})}
						</ul>
					</div> */}
					
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		genres: state.genres.all,
		isFetched: state.genres.isFetched
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);