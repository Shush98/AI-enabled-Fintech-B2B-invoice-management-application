export const setData = (data) => {
	return {
		type: "SET_DATA",
		payload:data
	}
}

export const setTar = (data) => {
	return {
		type: "SET_TAR",
		payload:data
	}
}
export const setTio = (data) => {
	return {
		type: "SET_TIO",
		payload:data
	}
}
export const setTad = (data) => {
	return {
		type: "SET_TAD",
		payload:data
	}
}

export const fetchRequest =() =>{
	return{
		type:"FETCH_REQUEST",
	}
}

export const fetchValue =() =>{
	return{
		type:"VALUE",
	}
}

export const tableChart=(data)=>{
	return{
		type:"TABLE_CHART",
		payload:data
	}
}

export const setTable=(data)=>{
	return{
		type:"SELTABLE",
		payload:data
	}
}

export const selectedRows=(data)=>{
	return{
		type:"SEL_ROW",
		payload:data
	}
}

export const setDataAgain=(data)=>{
	return{
		type:"SET_DataAgain",
		payload:data
	}
}

export const fetchSuccess =(data) =>{
	return{
		type:"FETCH_SUCCESS",
		payload:data
	}
}



export const fetchRowData=(data)=>{
	return{
		type:"FETCH_ROW_DATA",
		payload:data
	}
}

export const fetchSmallData=(data)=>{
	return{
		type:"FETCH_SMALL_DATA",
		payload:data
	}
}
