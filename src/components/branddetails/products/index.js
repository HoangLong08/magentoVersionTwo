import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';
import GET_BRAND_PRODUCTS from "../../branddetails/getBrandProducts.graphql"
function Products(props) {
	const { option_id } = props;
	const [runQuery, queryResponse] = useLazyQuery(GET_BRAND_PRODUCTS);
	const { loading, error, data } = queryResponse;
	useEffect(() => {
		const newFilters = {};
		newFilters['brand'] = { eq: String(option_id) };

		runQuery({
			variables: {
				currentPage: 1,
				filters: newFilters,
				pageSize: 999,
			}
		});
		window.scrollTo({
			left: 0,
			top: 0,
			behavior: 'smooth'
		});
	}, [
		option_id,
		runQuery,
	]);

	console.log("data product: ", data)


	return (
		<div>
			<h1>Hoang Long</h1>
		</div>
	)
}

export default Products
