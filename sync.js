"use module"

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
export {
	syncAsyncIterSlice as default,
	syncAsyncIterSlice as SyncIterSlice,
	syncAsyncIterSlice as syncSlice,
	syncAsyncIterSlice as SyncSlice
}
