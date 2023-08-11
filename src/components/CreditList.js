import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CreditItem from '../components/CreditItem';
import {LoadMovieCredits} from '../actions/credits';
import {translate} from 'react-i18next';

class CreditList extends Component {

	constructor(props){
		super(props);
		this.state = {
			visibleAll: props.match.params.cast !== undefined ? true : false
		}
	}

	componentDidMount(){
		const { match, LoadMovieCredits } = this.props;
		LoadMovieCredits(match.params.movie_id);
	}

	showAll = () => {
		const { history, match } = this.props;

		this.setState({
			visibleAll: !this.state.visibleAll
		});

		if(this.state.visibleAll)
			history.push(`/movie/${match.params.movie_id}`);
		else
			history.push(`/movie/${match.params.movie_id}/cast`);
	};

	render(){
		const { credits, isFetched, t } = this.props;

		let creditsArray = credits;

		if(!this.state.visibleAll)
			creditsArray = credits.slice(0, 6);

		if(!isFetched)
			return (
				<div className="credits">
					<div className="loading-box"></div>
				</div>
			);

		return (
			<div className="row row-cols-1 row-cols-md-3 row-cols-xl-6 mx-n2 dark">
				{creditsArray.map(credit => (
					<CreditItem key={credit.id} credit={credit}/>
				))}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadMovieCredits
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		credits: state.credits.all,
		isFetched: state.credits.isFetched
	};
};

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreditList)));