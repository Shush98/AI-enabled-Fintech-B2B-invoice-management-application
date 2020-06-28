const INITIAL_STATE = {
	Tcust:51,
	loading1:false,
	data:[],
	TAR:0,
	TIO:0,
	TAD:0,
	RowData:[],
	SmallData:[],
	loading:false,
	SELECTED:[],
	FilterP:[],
	SELTable:[]
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case "SET_TAR":
			return{
				...state,
                TAR:action.payload
			}
		case "TABLE_CHART":
			return{
				...state,
				FilterP:action.payload
			}	
		case "SEL_ROW":
			return{
				...state,
				SELECTED:action.payload
			}
		case "VALUE":
			return{
				...state,
				val:action.payload
			}
		case "SELTABLE":
		    return{
			    ...state,
			    SELTable:action.payload
		}				
		case "FETCH_ROW_DATA":
			return{
				...state,
				RowData:action.payload
			}
		case "FETCH_SMALL_DATA":
			return{
				...state,
				SmallData:action.payload
			}		
		case "SET_TIO":
			return{
				...state,
				TIO:action.payload
			}
		case "SET_DataAgain":
			return{
				...state,
				loading1:false,
				data:action.payload,
				
			}	
		case "SET_TAD":
			return{
				...state,
				TAD:action.payload
			}		
		case "SET_DATA":
			return {
				...state,
				Tcust:action.payload
			}
		case "FETCH_REQUEST":
			return{
				...state,
                loading1:true
			}
		case "FETCH_SUCCESS":
			return{
					...state,
					loading:true,
					data:action.payload,
					error:''
			}
		// case "FETCH_FAILURE":
		// 	return{
		// 		...state,
		// 		loading:false,
		// 		data:[],
		// 		error:action.payload
		// 	}			
		default:
			return state;
	}
};
