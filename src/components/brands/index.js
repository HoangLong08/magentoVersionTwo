import React, { createContext, useState } from 'react'
import { Link } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_BRANDS_LIST } from './Brand.gql'

// import useAccordion from "@magento/peregrine/lib/talons/Accordion/useAccordion"
// import { mergeClasses } from "@magento/venia-ui/lib/classify.js"

import myStyles from "./style.css";

// const Accordion = createContext();


function Brands() {

	const [stateSelected, setStateSelected] = useState({
		alphabet: "all",
		select: true,
		listCompany: []
	})

	let alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 65));

	console.log(alphabet);
	const {
		data: brandsData,
		loading: brandsLoading,
		error: brandsError
	} = useQuery(GET_BRANDS_LIST, {
		variables: {
			pageSize: 99999,
			currentPage: 1,
		}
	});
	console.log("data ", brandsData)
	console.log("loading ", brandsLoading)
	// console.log("brandsError: ", brandsError)

	const { mpbrand } = brandsData;
	// console.log("items: ", mpbrand.items)

	function checkExist(arr, str) {
		// console.log("str: ", str);
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].alphabet === str) {
				return i;
			}
		}
		return -1;
	}

	let newArr = [];
	function jsonEditListCompany() {
		mpbrand.items.forEach((item, index) => {
			if (index === 0) {
				let tt = []
				tt.push({
					companyInfo: item
				})
				newArr.push({
					id: index,
					alphabet: item.page_title[0],
					content: [...tt]
				})
			} else {
				if (checkExist(newArr, item.page_title[0]) !== -1) {
					const rr = checkExist(newArr, item.page_title[0]);
					newArr[rr].content.push({
						companyInfo: item
					})
				} else {
					let tt_ = []
					tt_.push({
						companyInfo: item
					})
					newArr.push({
						id: index,
						alphabet: item.page_title[0],
						content: [...tt_]
					})
				}
			}
		});
	}
	jsonEditListCompany();
	const convertJson = JSON.parse(JSON.stringify(newArr));
	// console.log("newArr: ", JSON.stringify(newArr))

	function renderListAlphabet() {
		return alphabet.map((item, index) => {
			const rr = checkExist(newArr, item);
			return (
				<div
					onClick={() => setStateSelected({ ...stateSelected, alphabet: item })}
					key={index}
					className={rr !== -1 ?
						(stateSelected.select && stateSelected.alphabet === item ? myStyles.brands_dictOption + " " + myStyles.brands_selected : myStyles.brands_dictOption)
						: myStyles.brands_dictOption + " " + myStyles.brands_disabled}
				>
					{item}
				</div>
			)
		})
	}

	function renderSubCompany(arrTmp) {
		return arrTmp.content.map((item, index) => {
			console.log("item.page_title: ", item.companyInfo.page_title)
			if (stateSelected.alphabet === "all") {
				return (
					<>
						<div className={myStyles.brands_brandItem} key={index}>
							<a href="">
								<div className={myStyles.brands_brandItemImageWrapper} style={{ backgroundImage: `url(${item.companyInfo.image})`, width: "165px", height: "165px" }} />
							</a>
							<div className={myStyles.brands_brandItemInfo}>
								<a href="">
									{item.companyInfo.page_title}
								</a>
							</div>
						</div>

					</>
				)
			} else if (stateSelected.alphabet === arrTmp.alphabet) {
				return (
					<>
						<div className={myStyles.brands_brandItem} key={index}>
							<a href="">
								<div className={myStyles.brands_brandItemImageWrapper} style={{ backgroundImage: `url(${item.companyInfo.image})`, width: "165px", height: "165px" }} />
							</a>
							<div className={myStyles.brands_brandItemInfo}>
								<a href="">
									{item.companyInfo.page_title}
								</a>
							</div>
						</div>

					</>
				)
			} else {
				return null;
			}
		})
	}

	function renderListCompany() {
		return convertJson.map((item, index) => {
			// console.log("item.alphabet: ", item.alphabet, stateSelected.alphabet, item.alphabet === stateSelected.alphabet)
			if (stateSelected.alphabet === "all") {
				return (
					<>
						<div className={myStyles.brands_alphabetHeader} key={index + 100}>
							{item.alphabet}
						</div>
						{renderSubCompany(item)}
					</>
				)
			} else if (stateSelected.alphabet === item.alphabet) {
				return (
					<>
						<div className={myStyles.brands_alphabetHeader} key={index + 100}>
							{item.alphabet}
						</div>
						{renderSubCompany(item)}
					</>
				)
			} else {
				return null;
			}

		})
	}

	const [valueInput, setValueInput] = useState("");
	console.log("valueInput: ", valueInput)

	function handleChange(e) {
		setValueInput(e.target.value)
	}

	function renderListCompanyBySearch() {
		if (valueInput.length > 0) {
			return mpbrand.items.map((item, index) => {
				console.log("item.content.companyInfo.page_title: ", item)
				if (item.page_title.toUpperCase().includes(valueInput.toUpperCase())) {
					return (
						<a href="#" key={index}>
							<div className={myStyles.brands_searchItem}>
								<div className={myStyles.brands_searchItemPhotoWrapper}>
									<img className={myStyles.brands_searchItemPhoto} src={item.image} alt={item.page_title} />
								</div>
								<div className={myStyles.brands_searchItemInfo}>
									<div className={myStyles.brands_searchItemName}>
										{item.page_title}
									</div>
									<div className={myStyles.brands_searchItemDesc}>
										{item.short_description}
									</div>
								</div>
							</div>
						</a>
					)
				} else {
					return null;
				}
			})
		}
	}

	return (
		<div>
			<div className={myStyles.brands_breadCrumb}>
				<Link to="/">
					Home
				</Link>
				<span> / Brand</span>
			</div>
			<div className={myStyles.brands_brandPageHeader}>
				<div className={myStyles.brands_brandPageTitle}>
					<strong>Brands</strong>
				</div>
				<div className={myStyles.brands_brandPageSearchBox}>
					<input
						type="text"
						name={valueInput}
						onChange={(e) => handleChange(e)}
						className={myStyles.brands_brandPageSearchInput}
						placeholder="Search a brand name" />
					<div className={myStyles.brands_brandPageIcon}>
						<span className={myStyles.icon_root}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-icon-5Yc"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
						</span>
					</div>
					{valueInput.length > 0 && (
						<div className={myStyles.brands_searchResult}>
							{renderListCompanyBySearch()}
						</div>
					)}


				</div>
			</div>

			<div className={myStyles.brands_dictList}>
				{/* + myStyles.brands_selected */}
				<div onClick={() => setStateSelected({ ...stateSelected, alphabet: "all" })} className={stateSelected.select && stateSelected.alphabet === "all" ? myStyles.brands_dictOption + " " + myStyles.brands_selected : myStyles.brands_dictOption}>
					All
				</div>
				{renderListAlphabet()}
			</div>

			<div className={myStyles.brands_brandListContent}>

				{renderListCompany()}
			</div>

		</div>
	)
}

export default Brands
