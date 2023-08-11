import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {translate} from 'react-i18next';
import Helmet from 'react-helmet';
import ym from 'react-yandex-metrika';

import config from '../config';

import { LoadPerson } from '../actions/person';
import { LoadGenres } from '../actions/genres';

import PersonCreditList from '../components/PersonCreditsList';
import PersonImagesList from '../components/PersonImagesList';

class Movie extends Component {

	static path = '/person/:person_id(\\d+)';

	componentDidMount(){
		const { match, LoadPerson, LoadGenres } = this.props;
		LoadGenres();
		LoadPerson(match.params.person_id);
		ym('hit', this.props.location.pathname);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadPerson, currentLangID } = this.props;
		if(match.params.person_id !== nextProps.match.params.person_id) {
			LoadPerson(nextProps.match.params.person_id);
		}
		if(Number(nextProps.currentLangID) !== Number(currentLangID)){
			LoadPerson(nextProps.match.params.person_id);
		}
	}

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { person, isFetched, t } = this.props;

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
							<li className="breadcrumb-item"><a href="#" className="text-gray-1300">Person</a></li>
							<li className="breadcrumb-item text-white active" aria-current="page"> {person.name}</li>
						</ol>
					</nav>
				</div>

				<section>
					<div className="container px-md-6">
						<div className="row">
							<div className="col-md-3">
								<img className="img-fluid" src={`${config.API_IMAGE.medium}/${person.profile_path}`} onLoad={this.imageLoaded}/>
							</div>

							<div className="col-md-9">
								<div className="pl-md-2 pt-4">
									<div className="row border-bottom border-gray-5600 space-bottom-2 no-gutters mb-4">
										<div className="col-md-7 col-lg">
											<div className="mb-5 mb-md-0">
												<h6 className="font-size-36 text-white mb-4 pb-1">{person.name}</h6>

												<table>
													<tbody>
														{person.birthday && (
															<tr>
																<th class="text-gray-5500 w-160rem font-weight-normal">{t('Birthday')}: </th>
																<td><span class="d-block text-gray-5500 font-weight-medium">{person.birthday}</span></td>
															</tr>
														)}
													
														{person.place_of_birth && (
															<tr>
																<th class="text-gray-5500 w-160rem font-weight-normal">{t('Place of birth')}:</th>
																<td><span class="d-block text-gray-5500 font-weight-medium">{person.place_of_birth}</span></td>
															</tr>
														)}

														{person.biography && (
															<tr>
																<th class="text-gray-5500 w-160rem font-weight-normal">{t('Biography')}:</th>
																<td><span class="d-block text-gray-5500 font-weight-medium">{person.biography}</span></td>
															</tr>
														)}
														
													</tbody>
												</table>
											</div>
										</div>	
									</div>

									{/* <div className="mb-6 mb-lg-8">
										<div className="font-size-26 text-gray-5500 mb-3 pb-1">Person</div>
										<PersonImagesList/>
									</div> */}

									<div className="mb-6 mb-lg-8">
										<div className="font-size-26 text-gray-5500 mb-3 pb-1">Movie</div>
										<PersonCreditList/>
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
		LoadPerson,
		LoadGenres
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		person: state.person.data,
		isFetched: state.person.isFetched,
		currentLangID: state.system.currentLangID
	};
};

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Movie));