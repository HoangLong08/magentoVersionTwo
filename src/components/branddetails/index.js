import React from 'react'
import { Link, useParams } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
import { useBrandDetails } from '../../talons/useBrandDetails';
import defaultClasses from './branddetails.css';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import Products from './products';


function BrandDetail() {
	const classes = defaultClasses
	const { brandUrl = "" } = useParams();
	const { brandData, brandLoading, derivedErrorMessage } = useBrandDetails({ url_key: brandUrl.replace('.html', '') });
	console.log("brandData: ", brandData)

	if (!brandData || !brandData.mpbrand || !brandData.mpbrand.items || !brandData.mpbrand.items[0])
		return (
			<>
				<h1>Not found</h1>
			</>
		);

	const brandInformation = brandData.mpbrand.items[0];
	console.log("brandInformation: ", brandInformation)
	return (
		<div className={classes.rootDetails}>
			<h1>Hoang Long Details {brandUrl}</h1>

			<Products option_id={brandInformation.option_id}></Products>
		</div >
	)
}

export default BrandDetail
