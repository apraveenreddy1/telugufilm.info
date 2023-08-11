import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {translate} from 'react-i18next';
import Helmet from 'react-helmet';
import ym from 'react-yandex-metrika';

import config from '../config';

import { LoadMovie } from '../actions/movie';
import { LoadMovieCredits } from '../actions/credits';
import { LoadGenres } from '../actions/genres';

import CreditList from '../components/CreditList';
import ImagesList from '../components/ImagesList';
import RecommendationsList from '../components/RecommendationsList';

class Movie extends Component {

	static path = '/movie/:movie_id(\\d+)/:cast?';

	componentDidMount(){
		const { match, LoadMovie, LoadGenres } = this.props;
		LoadGenres();
		LoadMovie(match.params.movie_id);
		ym('hit', this.props.location.pathname);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadMovie, currentLangID } = this.props;
		if(match.params.movie_id !== nextProps.match.params.movie_id || Number(nextProps.currentLangID) !== Number(currentLangID)){
			LoadMovie(nextProps.match.params.movie_id);
		}
	}

	convertMinsToHrsMins = (mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		h = h < 10 ? h : h;
		m = m < 10 ? '0' + m : m;
		return `${h}:${m}`;
	};

	moneySpace = (money) => {
		let parts = money.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".");
	};

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { movie, isFetched, t } = this.props;

		if(!isFetched)
			return (
				<div className="loading-box"></div>
			);

		return (
			<div className="bg-gray-1100 space-bottom-2 space-bottom-lg-3">
				<div className="container px-md-6">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb dark font-size-1">
							<li className="breadcrumb-item"><a href="../home/index-2.html" className="text-gray-1300">Home</a></li>
							<li className="breadcrumb-item"><a href="#" className="text-gray-1300">Movie</a></li>
							<li className="breadcrumb-item text-white active" aria-current="page"> {movie.title}</li>
						</ol>
					</nav>
				</div>
				<section>
					<div className="container px-md-6">
                  		<div className="row">

						  <div className="col-md-3">
							<div>
								<img className="img-fluid" src={`${config.API_IMAGE.medium}/${movie.poster_path}`} alt={movie.title} />
							</div>
							{/* <div className="bg-gray-3100">
								<div>
									<ul className="list-unstyled">
										<li className="border-bottom border-gray-3200">
											<div className="p-4">
											<a className="d-block mt-1" href="#">
											<img className="img-fluid" src="../../assets/img/200x40/img1.png" alt="Image-Description"/>
											</a>
											</div>
										</li>
										<li className="border-bottom border-gray-3200">
											<div className="p-4">
											<a className="d-block mt-1" href="#">
											<img className="img-fluid" src="../../assets/img/200x40/img2.png" alt="Image-Description"/>
											</a>
											</div>
										</li>
										<li className="border-bottom border-gray-3200">
											<div className="p-4">
											<a className="d-block mt-1" href="#">
											<img className="img-fluid" src="../../assets/img/200x40/img3.png" alt="Image-Description"/>
											</a>
											</div>
										</li>
										<li className="border-bottom border-gray-3200">
											<div className="p-4">
											<a className="d-block mt-1" href="#">
											<img className="img-fluid" src="../../assets/img/200x40/img4.png" alt="Image-Description"/>
											</a>
											</div>
										</li>
									</ul>
								</div>
							</div> */}
						</div>

						<div className="col-md-9">
							<div className="pl-md-2 pt-4">
								<div className="row border-bottom border-gray-5600 space-bottom-2 no-gutters mb-4">
									<div className="col-md-7 col-lg">
										<div className="mb-5 mb-md-0">
											<h6 className="font-size-36 text-white mb-4 pb-1">{movie.title}</h6>
											<div className="d-flex align-items-center mb-5">
											<div className="d-flex">
												<div>
													<i className="fas fa-star text-primary font-size-42"></i>
												</div>
												<div className="text-lh-1 ml-1">
													<div className="text-primary font-size-24 font-weight-semi-bold">{movie.vote_average}</div>
													<span className="text-gray-1300 font-size-12">0 Votes</span>
												</div>
											</div>
											</div>
											<ul className="list-unstyled nav nav-meta font-secondary mb-3 pb-1 flex-nowrap flex-lg-wrap overflow-auto overflow-lg-hidden">
												<li className="text-white flex-shrink-0 flex-shrink-lg-1">{movie.release_date}</li>
												<li className="text-white flex-shrink-0 flex-shrink-lg-1">{this.convertMinsToHrsMins(movie.runtime)}</li>
												<li className="text-white flex-shrink-0 flex-shrink-lg-1">$ {this.moneySpace(movie.budget)}</li>
												<li className="text-white flex-shrink-0 flex-shrink-lg-1">$ {this.moneySpace(movie.revenue)}</li>
											</ul>
											<ul className="list-unstyled">
												{movie.genres && movie.genres.map(item => {
													return (
														<li className="text-white flex-shrink-0 flex-shrink-lg-1" key={item.id}>{item.name}</li>
													)
												})}
											</ul>
											<p className="text-gray-5500 font-size-16 mb-5 pb-1 text-lh-md">{movie.title}</p>
											{/* <div className="d-flex justify-content-between">
												<div>
													<h6 className="font-size-15 mb-0">
														<a href="single-movies-v1.html" className="text-white">Robert Rodriguez</a>
													</h6>
													<span className="text-white font-size-13">Director</span>
												</div>
												<div>
													<h6 className="font-size-15 mb-0">
														<a href="single-movies-v1.html" className="text-white">Martin McKandy</a>
													</h6>
													<span className="text-white font-size-13">Screenplay</span>
												</div>
												<div>
													<h6 className="font-size-15 mb-0">
														<a href="single-movies-v1.html" className="text-white">Anna martez</a>
													</h6>
													<span className="text-white font-size-13">Producer</span>
												</div>
											</div> */}
										</div>
									</div>
									
									{/* <div className="col-md-5 col-lg-auto">
										<div className="pl-md-3">
											<div className="d-flex flex-column">
											<a href="#" className="btn btn-primary d-flex align-items-center justify-content-center w-lg-220rem h-52rem mb-3" tabindex="0">WATCH NOW</a>
											<a href="#" className="btn btn-primary d-flex align-items-center justify-content-center  w-lg-220rem h-52rem mb-3" tabindex="0">Buy Tickets</a>
											<a href="#" className="btn btn-outline-light d-flex align-items-center justify-content-center  w-lg-220rem h-52rem" tabindex="0">+ PLAYLIST</a>
											</div>
										</div>
									</div> */}
								</div>

								<div className="mb-6 mb-lg-8">
									<div className="font-size-26 text-gray-5500 mb-3 pb-1">Cast</div>
									<CreditList/>
								</div>

								<div className="mb-6 mb-lg-8">
									<ImagesList/>
								</div>

								<div className="mb-6 mb-lg-8">
									<div className="font-size-26 text-gray-5500 mb-3 pb-1">Related Movies</div>
									<RecommendationsList/>
								</div>

							</div>
						</div>


						</div>
					</div>
				</section>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadMovie,
		LoadGenres,
		LoadMovieCredits
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movie: state.movie.data,
		isFetched: state.movie.isFetched,
		currentLangID: state.system.currentLangID
	};
};

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Movie));