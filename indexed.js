"use module"
import IndexesAsyncIterSlice from "./indexes.js"

export class IndexedAsyncIterSlice extends IndexesAsyncIterSlice{
	constructor( indexable, start= 0, end){
		super( start, end, indexable)
	}
	next(){
		const next= super.next()
		if( !next.done){
			next.value= this.countOrCollection[ next.value]
		}
		return next
	}
	[ Symbol.iterator](){
		return this
	}
}
export {
	IndexedAsyncIterSlice as default,
	IndexedAsyncIterSlice as indexedAsyncIterSlice,
	IndexedAsyncIterSlice as IndexedSlice,
	IndexedAsyncIterSlice as indexedSlice,
	IndexedAsyncIterSlice as Indexed,
	IndexedAsyncIterSlice as indexed,
}
