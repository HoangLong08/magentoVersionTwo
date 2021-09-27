import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';
import GET_BRAND_PRODUCTS from "../../branddetails/getBrandProducts.graphql"

import myStyles from "./style.css";

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

	if (data === undefined) {
		return <> <h1>Loading</h1> </>
	}
	const dataList = data === undefined ? {} : data

	console.log("data product 1: ", loading)
	console.log("data product 2: ", dataList.products.items)

	function renderListProduct() {
		return dataList.products.items.map((item, index) => {
			return (

				<div className={myStyles.item_root} key={index}>
					<div className={myStyles.item_images}>
						<div className={myStyles.item_imageContainer + " " + myStyles.image_container}>
							<img className={myStyles.item_image} src={item.small_image.url} alt={item.name} height="375" />
						</div>
						<div className={myStyles.item_name}>
							{item.name}
						</div>
						<div className={myStyles.item_price}>
							{item.price.regularPrice.amount.value + " " + item.price.regularPrice.amount.currency}
						</div>
					</div>
				</div>

			)
		})
	}

	return (
		<>
			{renderListProduct()}
		</>
	)
}

export default Products
