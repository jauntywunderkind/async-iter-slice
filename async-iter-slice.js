"use module"

import asyncAsyncIterSlice from "./async.js"
import syncAsyncIterSlice from "./sync.js"

export function asyncIterSlice( inputs, start= 0, end){
	if( inputs[ Symbol.asyncIterator]){
		return asyncAsyncIterSlice( inputs, start, end)
	}else{
		return syncAsyncIterSlice( inputs, start, end)
	}
}

export {
	asyncIterSlice as default,
	asyncIterSlice as AsyncIterSlice,
	asyncIterSlice as rangeFilter,
	asyncIterSlice as Slice,
	asyncAsyncIterSlice as AsyncAsyncIterSlice,
	asyncAsyncIterSlice as asyncSlice,
	asyncAsyncIterSlice as AsyncSlice,
	syncAsyncIterSlice as SyncIterSlice,
	syncAsyncIterSlice as syncSlice,
	syncAsyncIterSlice as SyncSlice
}
