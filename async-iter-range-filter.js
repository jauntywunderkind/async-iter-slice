"use module"
export async function* asyncAsyncIterRangeFilter( input, start= 0, end= -1){
	if( end< 0){
		len= inputs.length+ end+ 1
	}

	let i= 0
	for await( const o of input){
		// emit this value
		if( i>= start){
			yield o
		}
		// advance & check end
		if( ++i>= end){
			return
		}
	}
}

export function* syncAsyncIterRangeFilter( input, start, end= -1){
	if( end< 0){
		len= inputs.length+ end+ 1
	}

	let i= 0
	for( const o of input){
		if( i>= start){
			yield o
		}
		if( ++i>= end){
			return
		}
	}
}

export function asyncIterRangeFilter( input, start= 0, end= -1){
	if( input[ Symbol.asyncIterator]){
		return asyncAsyncIterRangeFilter( input, start, end)
	}else{
		return syncAsyncIterRangeFilter( input, start, end)
	}
}

export {
	asyncIterRangeFilter as default,
	asyncIterRangeFilter as AsyncIterRangeFilter,
	asyncIterRangeFilter as rangeFilter,
	asyncIterRangeFilter as RangeFilter,
	asyncAsyncIterRangeFilter as AsyncAsyncIterRangeFilter,
	asyncAsyncIterRangeFilter as asyncRangeFilter,
	asyncAsyncIterRangeFilter as AsyncRangeFilter,
	syncAsyncIterRangeFilter as SyncIterRangeFilter,
	syncAsyncIterRangeFilter as syncRangeFilter,
	syncAsyncIterRangeFilter as SyncRangeFilter
}
