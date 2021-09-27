import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_BRANDS_BY_URL = gql`
	query mpbrand (
		$url_key : String!
	) {
		mpbrand (
				filter : {url_key : {eq: $url_key}}
		) {
				items {
					brand_id
					attribute_id
					option_id
					value
					default_value
					store_id
					page_title
					url_key
					image
					is_featured
					short_description
					description
					static_block
					meta_title
					meta_keywords
					meta_description
					product_quantity
						mpbrandCategories {
								cat_id
								name
								url_key
						}
				}
				total_count
		}
	}
`;


export const useBrandDetails = props => {
	const { url_key } = props
	//get Brand Details useQuery
	const {
		data: brandData,
		loading: brandLoading,
		error: brandError
	} = useQuery(GET_BRANDS_BY_URL, {
		variables: {
			url_key: url_key
		}
	});

	let derivedErrorMessage;
	if (brandError) {
		const errorTarget = brandError;
		if (errorTarget.graphQLErrors) {
			// Apollo prepends "GraphQL Error:" onto the message,
			// which we don't want to show to an end user.
			// Build up the error message manually without the prepended text.
			derivedErrorMessage = errorTarget.graphQLErrors
				.map(({ message }) => message)
				.join(', ');
		} else {
			// A non-GraphQL error occurred.
			derivedErrorMessage = errorTarget.message;
		}
	}

	return {
		brandData,
		brandLoading,
		derivedErrorMessage
	}
}

