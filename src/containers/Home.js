import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {translate} from 'react-i18next';
import ym from 'react-yandex-metrika';

import MoviesList from '../components/MoviesList';
import MoviesFilter from '../components/MoviesFilter';

class Home extends Component {

	static path = '/:page(\\d+)?';

	componentDidMount() {
		ym('hit', this.props.location.pathname);
	}

	render(){
		const { t } = this.props;

		return (

			<div className="bg-img-hero space-top-3 space-bottom-1  dark" style={{backgroundImage: 'url("assets/img/1920x667/img1.jpg")'}}>
				<MoviesFilter/>
				<MoviesList/>
			</div>
			
			// <div className="movies">
			// 	<Helmet>
			// 		<title>{t('The Movies')}</title>
			// 	</Helmet>
			// 	<MoviesFilter/>
			// 	<MoviesList/>
			// </div>
			
		)
	}
}
export default translate('translations')(Home);