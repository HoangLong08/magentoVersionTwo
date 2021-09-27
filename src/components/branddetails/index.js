import React from 'react'
import { Link, useParams } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
import { useBrandDetails } from '../../talons/useBrandDetails';
import { usePagination } from '@magento/peregrine';
import defaultClasses from './branddetails.css';

// import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
// import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import Products from './products';
import myStyles from "./branddetails.css";


function BrandDetail() {
	const classes = defaultClasses
	const { brandUrl = "" } = useParams();
	const { brandData, brandLoading, derivedErrorMessage } = useBrandDetails({ url_key: brandUrl.replace('.html', '') });
	console.log("brandData: ", brandData)

	// const [paginationValues, paginationApi] = usePagination();
	// const { currentPage, totalPages } = paginationValues;
	// const { setCurrentPage, setTotalPages } = paginationApi;

	// const pageControl = {
	// 	currentPage,
	// 	setPage: setCurrentPage,
	// 	totalPages
	// };

	// console.log("pageControl: ", pageControl)

	// const totalPagesFromData = data
	// 	? data.products.page_info.total_pages
	// 	: null;

	// useEffect(() => {
	// 	setTotalPages(totalPagesFromData);
	// 	return () => {
	// 		setTotalPages(null);
	// 	};
	// }, [setTotalPages, totalPagesFromData]);

	// useEffect(() => {
	// 	if (error && !loading && currentPage !== 1) {
	// 		setCurrentPage(1);
	// 	}
	// }, [currentPage, error, loading, setCurrentPage]);

	if (!brandData || !brandData.mpbrand || !brandData.mpbrand.items || !brandData.mpbrand.items[0])
		return (
			<>
				<h1>Not found</h1>
			</>
		);

	const brandInformation = brandData.mpbrand.items[0];
	console.log("brandData: ", brandData)
	return (
		<div className={classes.rootDetails}>
			<h1>{brandInformation.page_title}</h1>
			<section>
				<div className={myStyles.gallery_root}>
					<div className={myStyles.gallery_items}>
						<Products option_id={brandInformation.option_id}></Products>
					</div>
				</div>
			</section>
		</div >
	)
}

export default BrandDetail
