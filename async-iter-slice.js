"use module"
export async function* asyncAsyncIterRangeFilter( inputs, start= 0, end= -1){
	if( end< 0){
		if( end=== -1){
			end= Number.POSITIVE_INFINITY
		}else if( inputs.length=== undefined){
			throw new Error("TODO: support negative 'end' for non-fixed length")
		}else{
			len= inputs.length+ end+ 1
		}
	}

	let i= 0
	for await( const o of inputs){
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

export function* syncAsyncIterRangeFilter( inputs, start, end= -1){
	if( end< 0){
		len= inputs.length+ end+ 1
	}

	let i= 0
	for( const o of inputs){
		if( i>= start){
			yield o
		}
		if( ++i>= end){
			return
		}
	}
}

export function asyncIterRangeFilter( inputs, start= 0, end= -1){
	if( inputs[ Symbol.asyncIterator]){
		return asyncAsyncIterRangeFilter( inputs, start, end)
	}else{
		return syncAsyncIterRangeFilter( inputs, start, end)
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
