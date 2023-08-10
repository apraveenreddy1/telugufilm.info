import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {translate} from 'react-i18next';

import {storage} from '../services';
import {ChangeFilter} from '../actions/movies';

class MoviesFilter extends Component {

	componentWillMount(){
		const filterStorage = storage.get('filter');
		if(filterStorage !== null)
			this.props.ChangeFilter(filterStorage);
	}

	ChangeFilter = (filter) => {
		this.props.ChangeFilter(filter);
	};

	render(){
		const { filter, t } = this.props;

		const filters = [
			{
				title: t('Popular'),
				slug: 'popular',
			},
			{
				title: t('Top rated'),
				slug: 'top_rated'
			},
			{
				title: t('Upcoming'),
				slug: 'upcoming',
			}
		];
		return (
			<div className="text-center movies-filter">
               <ul className="nav justify-content-center align-items-center mb-7 tab-nav__v4 font-secondary font-weight-semi-bold font-size-1rem" role="tablist">
			   		{filters.map(item => (
						<li key={item.slug} className={item.slug === filter  ? 'nav-link active' : 'nav-link'} onClick={() => this.ChangeFilter(item.slug)}>{item.title}</li>
					))}
               </ul>
            </div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		ChangeFilter
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		filter: state.movies.filter
	};
};
export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MoviesFilter));