import React from 'react'
import { useParams } from "react-router-dom"
function Category() {
	const { categoryUrl } = useParams()
	return (
		<div>
			<h1>Hoang Long Category {categoryUrl}</h1>
		</div>
	)
}

export default Category
