import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import Pagination from "react-js-pagination";

import {LoadGenres} from '../actions/genres';
import {LoadMovies, LoadSearchMovies} from '../actions/movies';

import MovieItem from '../components/MovieItem';

const obj = {
	"page": 1,
	"results": [
	   {
		  "adult": false,
		  "backdrop_path": "/d3l7kgFJyLTTQSrR4ysCk5yeVyW.jpg",
		  "genre_ids": [
			 28,
			 18
		  ],
		  "id": 579974,
		  "original_language": "te",
		  "original_title": "రౌద్రం రణం రుధిరం",
		  "overview": "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
		  "popularity": 88.437,
		  "poster_path": "/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",
		  "release_date": "2022-03-24",
		  "title": "RRR",
		  "video": false,
		  "vote_average": 7.8,
		  "vote_count": 1026
	   },
	   {
		  "adult": false,
		  "backdrop_path": "/xpu8enBAtOHo8KS5eGNONsC6GaS.jpg",
		  "genre_ids": [
			 28,
			 12,
			 18,
			 14
		  ],
		  "id": 256040,
		  "original_language": "te",
		  "original_title": "బాహుబలి:ద బిగినింగ్",
		  "overview": "The young Shivudu is left as a foundling in a small village by his mother. By the time he’s grown up, it has become apparent that he possesses exceptional gifts. He meets the beautiful warrior princess Avanthika and learns that her queen has been held captive for the last 25 years. Shividu sets off to rescue her, discovering his own origins in the process.",
		  "popularity": 24.241,
		  "poster_path": "/9BAjt8nSSms62uOVYn1t3C3dVto.jpg",
		  "release_date": "2015-07-10",
		  "title": "Bāhubali: The Beginning",
		  "video": false,
		  "vote_average": 7.5,
		  "vote_count": 682
	   },
	   {
		  "adult": false,
		  "backdrop_path": "/yCRYYGldFGVa4cmZVpTVCRQMfjA.jpg",
		  "genre_ids": [
			 28,
			 12,
			 14
		  ],
		  "id": 350312,
		  "original_language": "te",
		  "original_title": "బాహుబలి 2: ది కన్ క్లూజన్",
		  "overview": "When Mahendra, the son of Bāhubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
		  "popularity": 18.959,
		  "poster_path": "/21sC2assImQIYCEDA84Qh9d1RsK.jpg",
		  "release_date": "2017-04-27",
		  "title": "Bāhubali 2: The Conclusion",
		  "video": false,
		  "vote_average": 7.4,
		  "vote_count": 634
	   },
	   {
		  "adult": false,
		  "backdrop_path": "/nJMuIVqqewxPKX96aqUzXDpoyhI.jpg",
		  "genre_ids": [
			 28
		  ],
		  "id": 607313,
		  "original_language": "te",
		  "original_title": "సరిలేరు నీకెవ్వరు",
		  "overview": "A tough army major is deployed to Kurnool on a mission to keep the country safe from external threats.",
		  "popularity": 9.599,
		  "poster_path": "/2IhWzaIOowmXattw8Xozwr9rJ76.jpg",
		  "release_date": "2020-01-10",
		  "title": "Sarileru Neekevvaru",
		  "video": false,
		  "vote_average": 6.3,
		  "vote_count": 50
	   },
	   {
		  "adult": false,
		  "backdrop_path": "/2f9YnS7JKrIqBv7dMQG8sRS2aJv.jpg",
		  "genre_ids": [
			 28,
			 18,
			 53
		  ],
		  "id": 690957,
		  "original_language": "te",
		  "original_title": "పుష్పా - The Rise",
		  "overview": "Pushpa Raj is a coolie who rises in the world of red sandalwood smuggling. Along the way, he doesn’t shy from making an enemy or two.",
		  "popularity": 20.902,
		  "poster_path": "/r1yAzVQNbCbPTbB3GZFour9Qr0t.jpg",
		  "release_date": "2021-12-16",
		  "title": "Pushpa: The Rise - Part 1",
		  "video": false,
		  "vote_average": 7.3,
		  "vote_count": 84
	   },
	   {
		  "adult": false,
		  "backdrop_path": "/cDau8XMNbURuVPOhqJo9AK1kUQm.jpg",
		  "genre_ids": [
			 35,
			 18,
			 14
		  ],
		  "id": 1090486,
		  "original_language": "te",
		  "original_title": "BRO",
		  "overview": "After being fatally injured in a car crash, a man is given three months back on earth to make amends.",
		  "popularity": 10.301,
		  "poster_path": "/PY9PUiVUBirsNPMm5HwHz0ee2U.jpg",
		  "release_date": "2023-07-27",
		  "title": "BRO",
		  "video": false,
		  "vote_average": 9,
		  "vote_count": 2
	   }
	],
	"total_pages": 127,
	"total_results": 2522
 };

class MoviesList extends Component {

	

	componentDidMount(){
		const { match, LoadGenres, LoadMovies, filter } = this.props;
		LoadGenres();
		LoadMovies(match.params.page, filter);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadGenres, LoadMovies, LoadSearchMovies, currentLangID, filter, searchText } = this.props;
		if(Number(nextProps.currentLangID) !== Number(currentLangID) || nextProps.filter !== filter || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadGenres();
			if(searchText.length === 0){
				LoadMovies(nextProps.match.params.page, nextProps.filter);
			} else {
				LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
			}

		}
	}



	render(){
		const { movies, isFetched } = this.props;
		console.log("hhhh: "+this.props);
		
		if(!isFetched)
			return (
				<div className="movies-list-container">
					<div className="loading-box"></div>
				</div>
			);
		return (
			
			<div className="tab-content">
				<div className="tab-pane fade show active">
                  	<div className="container">
                     	<div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 no-gutters">
							{movies.results && movies.results.map(movie => (
								<MovieItem key={movie.id} movie={movie}/>
							))}
						</div>
				 	</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres,
		LoadMovies,
		LoadSearchMovies
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.movies.all,
		searchText: state.movies.searchText,
		isFetched: state.movies.isFetched,
		filter: state.movies.filter,
		currentLangID: state.system.currentLangID
	};
};

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList)));