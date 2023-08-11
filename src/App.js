import React, { Component} from 'react';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { translate } from 'react-i18next';
import { YMInitializer } from 'react-yandex-metrika';

import Header from './components/Header';

import routes from './routes';

import {ChangeLang} from './actions/system';

import { storage } from './services';

import config from './config';

import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends Component {

	

	componentWillMount(){
		const { i18n, ChangeLang } = this.props;
		const lang_id = storage.get('lng');
		if(lang_id !== null) {
			ChangeLang(lang_id);
			i18n.changeLanguage(config.API_LANGUAGES.filter(lang => lang.id === Number(lang_id)).shift().title);
		}
	}

	render() {
		return (
			<div>
				<YMInitializer accounts={[49919320]} option={{
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true,
					webvisor:true
				}} />
				<Header/>
				<main id="content">
					{routes}
				</main>
			</div>
		)
	}
}



const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		ChangeLang
	},
	dispatch
);
export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(App)));