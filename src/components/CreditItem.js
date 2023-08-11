import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../config';

class CreditItem extends Component {

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { credit } = this.props;

		return (
			<div className="col-xl px-2">
				<div className="product mb-5 mb-xl-0">
					<div className="product-image mb-2">
						<Link to={`/person/${credit.id}`} className="d-inline-block position-relative stretched-link">
							{credit.profile_path ? (
								<img className="img-fluid" src={`${config.API_IMAGE.small}/${credit.profile_path}`} onLoad={this.imageLoaded}/>
							) : (<img className="img-fluid" src="../assets/img/no_image.jpg" onLoad={this.imageLoaded}/>)}
						</Link>
					</div>
					<div className="product-meta font-size-12 mb-1">
						<div className="product-meta font-size-12 mb-1">
							<span><a href="#" className="h-g-primary text-white">{credit.character}</a></span>
						</div>
					</div>
					<div className="product-title font-weight-bold font-size-1 text-white"><a href="#" class="text-white">{credit.name}</a></div>
				</div>
			</div>
		)
	}
}

export default CreditItem;