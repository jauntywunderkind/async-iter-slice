"use module"
export async function* asyncAsyncIterRangeFilter( inputs, start= 0, end){
	let buffer
	let fill
	if( end< 0){
		buffer= new Array( end* -1)
		fill= end
		end= undefined
	}

	let i= 0
	for await( let o of inputs){
		if( buffer){
			let pos= fill
			if( fill< 0){
				// prebuffering
				buffer[ buffer.length+ fill]= o
				fill++
				continue
			}else{
				// buffer filled, swap o& buffer
				let stored= buffer[ fill]
				buffer[ fill]= o
				o= stored
			}
			fill= ( fill+ 1)% buffer.length
		}

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

export function* syncAsyncIterRangeFilter( inputs, start, end){
	let buffer
	let fill
	if( end< 0){
		buffer= new Array( end* -1)
		fill= end
		end= undefined
	}

	let i= 0
	for( let o of inputs){
		if( buffer){
			let pos= fill
			if( fill< 0){
				// prebuffering
				buffer[ buffer.length+ fill]= o
				fill++
				continue
			}else{
				// buffer filled, swap o& buffer
				let stored= buffer[ fill]
				buffer[ fill]= o
				o= stored
			}
			fill= ( fill+ 1)% buffer.length
		}

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

export function asyncIterRangeFilter( inputs, start= 0, end){
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
