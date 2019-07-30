"use module"
export async function* asyncAsyncIterSlice( inputs, start= 0, end){
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

export function* syncAsyncIterSlice( inputs, start, end){
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
