import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';

import config from '../config';
import { ChangeLang } from '../actions/system';
import {LoadSearchMovies} from '../actions/movies';

class Header extends Component {

	changeLang = (e, lang_id) => {
		e.preventDefault();
		const { i18n, ChangeLang } = this.props;
		ChangeLang(lang_id);
		i18n.changeLanguage(config.API_LANGUAGES.filter(lang => lang.id === Number(lang_id)).shift().code);
	};

	searchInputChange = (e) => {
		const { history } = this.props;
		let value = e.target.value;
		if(value.length > 0) {
			history.push(`/search/${value}`);
		} else {
			history.push(`/`);
		}
	};

	render(){
		const { currentLangID, t, searchText } = this.props;
		const languages = config.API_LANGUAGES;
		const currentLang = languages.filter(language => language.id === Number(currentLangID));

		return (
			<header id="header" className="header left-aligned-navbar">
				<div className="header-section shadow-soft">
					<div id="logoAndNav" className="container-fluid px-md-5">

						<nav className="js-mega-menu navbar navbar-expand-xl py-0 position-static justify-content-start">
							<button type="button" className="navbar-toggler btn btn-icon btn-sm rounded-circle mr-2" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
								<span className="navbar-toggler-default">
									<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z" />
									</svg>
								</span>
								<span className="navbar-toggler-toggled">
									<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z" />
									</svg>
								</span>
							</button>


							<a className="navbar-brand w-auto mr-xl-5 mr-wd-8 display-4 text-secondary" href="/" aria-label="Vodi">Telugu Film</a>

							<div id="navBar" className="collapse navbar-collapse order-1 order-xl-0">
                     			<div className="navbar-body header-abs-top-inner">
									
									<ul className="navbar-nav">

										<li className="hs-has-sub-menu navbar-nav-item">
											<a id="blogMegaMenu" className="hs-mega-menu-invoker nav-link nav-link-toggle font-secondary" href="/">Movie</a>
											<div id="blogSubMenu" className="hs-sub-menu dropdown-menu" aria-labelledby="blogMegaMenu" style={{minWidth: '230px'}}>
												<a className="dropdown-item" href="#">Action</a>
												<a className="dropdown-item" href="#">Adventure</a>
											</div>
										</li>
										<li className="hs-has-sub-menu navbar-nav-item">
											<a id="docsMegaMenu" className="hs-mega-menu-invoker nav-link nav-link-toggle font-secondary" href="/">Person</a>
											<div className="hs-sub-menu dropdown-menu mega-menu-sub-menu-md" aria-labelledby="docsMegaMenu">
												<a className="dropdown-item" href="#">Director</a>
												<a className="dropdown-item" href="#">Actor</a>
											</div>
										</li>
									</ul>


								</div>
							</div>






							<div className="d-flex align-items-center ml-auto">

								<form className="d-none d-xl-block">
									<label className="sr-only">Search</label>
									<div className="input-group">
									<input type="email" className="search-form-control form-control py-2 pl-4 min-width-250 rounded-pill" name="email" id="searchproduct-item" placeholder="Search..." aria-label="Search..." aria-describedby="searchProduct1" required />
									<div className="input-group-append position-absolute top-0 bottom-0 right-0  z-index-4">
										<button className="d-flex py-2 px-3 border-0 bg-transparent align-items-center" type="button" id="searchProduct1">
											<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={{fill: '#656565'}}>
												<path d="M7 0C11-0.1 13.4 2.1 14.6 4.9 15.5 7.1 14.9 9.8 13.9 11.4 13.7 11.7 13.6 12 13.3 12.2 13.4 12.5 14.2 13.1 14.4 13.4 15.4 14.3 16.3 15.2 17.2 16.1 17.5 16.4 18.2 16.9 18 17.5 17.9 17.6 17.9 17.7 17.8 17.8 17.2 18.3 16.7 17.8 16.4 17.4 15.4 16.4 14.3 15.4 13.3 14.3 13 14.1 12.8 13.8 12.5 13.6 12.4 13.5 12.3 13.3 12.2 13.3 12 13.4 11.5 13.8 11.3 14 10.7 14.4 9.9 14.6 9.2 14.8 8.9 14.9 8.6 14.9 8.3 14.9 8 15 7.4 15.1 7.1 15 6.3 14.8 5.6 14.8 4.9 14.5 2.7 13.6 1.1 12.1 0.4 9.7 0 8.7-0.2 7.1 0.2 6 0.3 5.3 0.5 4.6 0.9 4 1.8 2.4 3 1.3 4.7 0.5 5.2 0.3 5.7 0.2 6.3 0.1 6.5 0 6.8 0.1 7 0ZM7.3 1.5C7.1 1.6 6.8 1.5 6.7 1.5 6.2 1.6 5.8 1.7 5.4 1.9 3.7 2.5 2.6 3.7 1.9 5.4 1.7 5.8 1.7 6.2 1.6 6.6 1.4 7.4 1.6 8.5 1.8 9.1 2.4 11.1 3.5 12.3 5.3 13 5.9 13.3 6.6 13.5 7.5 13.5 7.7 13.5 7.9 13.5 8.1 13.5 8.6 13.4 9.1 13.3 9.6 13.1 11.2 12.5 12.4 11.4 13.1 9.8 13.6 8.5 13.6 6.6 13.1 5.3 12.2 3.1 10.4 1.5 7.3 1.5Z"></path>
											</svg>
										</button>
									</div>
									</div>
								</form>


								<div className="d-inline-flex ml-md-5">
									<ul className="d-flex list-unstyled mb-0 align-items-center">
										<li className="col d-xl-none position-static px-2">
											<div className="dropdown mr-2 position-static">
												<a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary" href="/" id="dropdownMenu2" data-toggle="dropdown">
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
													<path d="M7 0C11-0.1 13.4 2.1 14.6 4.9 15.5 7.1 14.9 9.8 13.9 11.4 13.7 11.7 13.6 12 13.3 12.2 13.4 12.5 14.2 13.1 14.4 13.4 15.4 14.3 16.3 15.2 17.2 16.1 17.5 16.4 18.2 16.9 18 17.5 17.9 17.6 17.9 17.7 17.8 17.8 17.2 18.3 16.7 17.8 16.4 17.4 15.4 16.4 14.3 15.4 13.3 14.3 13 14.1 12.8 13.8 12.5 13.6 12.4 13.5 12.3 13.3 12.2 13.3 12 13.4 11.5 13.8 11.3 14 10.7 14.4 9.9 14.6 9.2 14.8 8.9 14.9 8.6 14.9 8.3 14.9 8 15 7.4 15.1 7.1 15 6.3 14.8 5.6 14.8 4.9 14.5 2.7 13.6 1.1 12.1 0.4 9.7 0 8.7-0.2 7.1 0.2 6 0.3 5.3 0.5 4.6 0.9 4 1.8 2.4 3 1.3 4.7 0.5 5.2 0.3 5.7 0.2 6.3 0.1 6.5 0 6.8 0.1 7 0ZM7.3 1.5C7.1 1.6 6.8 1.5 6.7 1.5 6.2 1.6 5.8 1.7 5.4 1.9 3.7 2.5 2.6 3.7 1.9 5.4 1.7 5.8 1.7 6.2 1.6 6.6 1.4 7.4 1.6 8.5 1.8 9.1 2.4 11.1 3.5 12.3 5.3 13 5.9 13.3 6.6 13.5 7.5 13.5 7.7 13.5 7.9 13.5 8.1 13.5 8.6 13.4 9.1 13.3 9.6 13.1 11.2 12.5 12.4 11.4 13.1 9.8 13.6 8.5 13.6 6.6 13.1 5.3 12.2 3.1 10.4 1.5 7.3 1.5Z"></path>
													</svg>
												</a>
												<div className="dropdown-menu w-100 border-0 rounded-0 px-3 mt-0 right-0 left-0 mt-n2" aria-labelledby="dropdownMenu2">
													<form className="input-group input-group-sm input-group-merge">
														<input className="form-control search-form-control rounded-pill" placeholder="Search..."/>
														<div className="input-group-append">
															<button type="button" className="btn">
															<i className="fas fa-search"></i>
															</button>
														</div>
													</form>
												</div>
											</div>
										</li>
										<li className="col pl-0 d-none d-xl-block">
											<a href="#" className="d-flex align-items-center" data-toggle="tooltip" data-placement="top" data-original-title="Uplode">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" style={{fill: '#6f6f6f'}}>
													<path d="M15.2 16.2C15.2 15.6 15.2 15 15.2 14.4 17.7 14.4 21.1 14.8 22.2 13.3 22.5 12.9 22.8 12.5 23 12 23.8 9.7 22.1 7.8 20.6 7.3 20 7.1 19.4 7.2 18.7 7.2 18.6 6.4 18.3 5.7 17.9 5.1 16.9 3.3 16 2.6 13.8 2 13.2 1.8 12.2 1.7 11.5 1.9 11.1 2 10.6 2.1 10.2 2.2 9.3 2.6 8.6 3.1 8 3.7 7.7 4 7.5 4.6 7.1 4.7 6.8 4.5 6 4.5 5.7 4.6 5 4.9 4.6 5.3 4.5 6.1 4.5 6.5 4.5 6.8 4.6 7.2 3 7.6 1.2 9.5 1.9 11.8 2.1 12.4 2.4 12.9 2.8 13.3 3.9 14.8 7.2 14.4 9.8 14.4 9.8 15 9.8 15.6 9.8 16.2 8 16.2 5.1 16.4 3.8 16 2.3 15.5 1.3 14.5 0.6 13.2 0.2 12.3-0.2 10.7 0.2 9.4 0.4 8.6 1.1 7.5 1.7 7 2 6.8 2.6 6.5 2.7 6 2.8 5.8 2.8 5.2 2.9 4.9 3.3 4.1 3.9 3.4 4.7 3 5 2.9 5.3 2.8 5.7 2.7 6 2.6 6.5 2.8 6.6 2.7 7 2.4 7.4 2 7.7 1.6 8.5 1.1 9.4 0.6 10.4 0.3 11.7-0.2 13.6 0 14.8 0.4 17.4 1.3 19 2.9 20 5.5 22.4 5.5 24.2 7.4 24.8 9.3 25.3 10.7 24.8 12.6 24.3 13.5 23.6 14.6 22.5 15.5 21.2 16 19.9 16.4 17 16.2 15.2 16.2ZM13.4 10.8C13.4 13.2 13.4 15.6 13.4 18 12.8 18 12.2 18 11.6 18 11.6 15.6 11.6 13.2 11.6 10.8 10.7 10.8 9.8 10.8 9 10.8 9 10.8 9 10.7 9 10.7 9.8 9.8 10.7 9 11.5 8.1 11.8 7.9 12.1 7.3 12.6 7.2 13.4 8.1 14.2 8.9 15.1 9.8 15.4 10.1 15.9 10.4 16 10.8 15.2 10.8 14.3 10.8 13.4 10.8Z"></path>
												</svg>
												<span className="ml-2 text-dark">Upload</span>
											</a>
										</li>
										<li className="col pr-xl-0 px-2 px-sm-3">
											<div className="dropdown">
												<a className="js-hs-unfold-invoker dropdown-nav-link dropdown-toggle py-4 position-relative d-flex align-items-center" href="#"  id="dropdownMenu2" data-toggle="dropdown">
													<svg width="32px" height="32px">
													<image x="0px" y="0px" width="32px" height="32px" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACB1BMVEW7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu7vLu3t7eys7KztLO4uLi6u7q0tbSxsrG2t7awsrC7vLu8vLy1trW8vby1tbWysrK6urq3uLe5urm9vr24ubitrq2wsbCsrazV1dXs7Oz29vb39/fw8PDe3t6vsK/v7+/////5+vnLy8urrKuxsbHGx8aur67k5OT4+Pizs7P9/f3R0tGurq7Oz87j4+OsrqzU1NTo6OiusK7+/v7k5eT4+fjGyMa7u7v6+vrMzMyrq6u+vr7Ky8ri4uLt7e3u7u7m5+bT1NOwsLC+v77Q0NDe397f39/T09O/v7/FxsX5+fn09PS9vb37+/v09fTNzs3g4ODh4uHX2Nf8/PzY2djIyMjIycjU1dTl5uXx8fHm5ubV1tVi3+TsAAAAUnRSTlMADleWxOHwxphZESftmiuDiBvN0iAq8TAW9xzX340dI5ymCPj9VV+lydDl5/P05srRnqdjCvr+EKCqipTd5Pb7IfI31NmLkAQvojIVn+PLoWIYYNJBTgAAAAFiS0dEca8HXOIAAAAHdElNRQfjBQECDwMxTbKCAAACG0lEQVQ4y21T90PTQBQ+RKpY3FisExcuEHEvFPdeXLikJLnakjbVgjESSEutqIiKIo66R90L/SNtbzTp+H66e9/37r17A4ACqqZUT63xeGqmTa+dAcrhra7rhEIXQl2iFPDMnFXKz0bdoqzIBIosdqM5RfTceYKKZRdwUJhf7/AL6iD35lAU6Gvg/ELfJe4eCgd62FGT/IuYYDGkPI5E9RASYiK9anAJyw8yFx1evhLv7buKYwoJqMCleX4ZUskVG+iaSXC936ICFS3PCRoHyItKUOw1OQZtYsMDKwBYuUqgEaxEgTeTQxFiE1dXgTWdlFdxyhGYN9LM2gQaJVoB46aLN4ctWg19LVjH/nDrtltwJ42IFa4HG8JUMFLpBTm8ETSHeA53K+SAmkELE8jWqMPfY7/ICzYFWHfcdbhv40KIVok3Z+RBH6XHHj7ivYWbQZvOL+N6+vHEk6fPnoejCh8dfQuo5SHkjB158fLV6zdvg3aGj4e6FWzbTkqtida74SQN8T4xGBM0UuodOwHYlW+WZosT7jok1HROgfXduW7WI1HRoviDWYT4eEzLtdubH4g98GOmZ8wsQVY2NLiXjtQ+Q/pkliE+ZLTzod/fb1bA5wMdfKwbDn4p57/6DzmL0XH42/diOvXjiLdot47+TLgkqdFfx46XLOeJtpbffyaT2Wxy8u8//8lTFfb7dNOZ1rMeX/u58xcuOtb/keQ/CDzeyUsAAAAASUVORK5CYII="></image>
													</svg>
												</a>
												<div className="dropdown-menu my-account-dropdown" aria-labelledby="dropdownMenu2">
													<a className="dropdown-item" href="/">Sign in</a>
													<a className="dropdown-item" href="/">Register</a>
												</div>
											</div>

											
										</li>
									</ul>
								</div>
							</div>

							




						</nav>
					</div>
				</div>
			</header>
		)
	}
}



const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		ChangeLang,
		LoadSearchMovies
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		searchText: state.movies.searchText,
		currentLangID: state.system.currentLangID
	};
};
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));