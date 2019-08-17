"use module"
export class IndexesAsyncIterSlice{
	constructor( start= 0, end, countOrCollection){
		this.position= start
		this.start= start
		this.end= end
		this.countOrCollection= countOrCollection
	}
	next(){
		const done= this.computedDone
		return done? {
			done,
			value: this.value
		}: {
			done,
			value: this.position++
		}
	}
	throw( ex){
		this.done= true
	}
	return( value){
		this.done= true
		this.value= value
	}
	[ Symbol.iterator](){
		return this
	}

	get computedLength(){
		if( this.countOrCollection){
			if( isNaN( this.countOrCollection)){
				return this.countOrCollection.length
			}else{
				return this.countOrCollection
			}
		}
		return Number.POSITIVE_INFINITY
	}
	get computedEnd(){
		const len= this.computedLength
		if( this.end=== undefined|| this.end=== null){
			return len
		}else if( this.end< 0){
			return len+ this.end
		}else if( len>= this.end){
			return this.end
		}else{
			return len
		}
	}
	get computedDone(){	
		return this.done|| this.position>= this.computedEnd
	}
}

export {
	IndexesAsyncIterSlice as default,
	IndexesAsyncIterSlice as indexesAsyncIterSlice,
	IndexesAsyncIterSlice as IndexesSlice,
	IndexesAsyncIterSlice as indexesSlice,
	IndexesAsyncIterSlice as Indexes,
	IndexesAsyncIterSlice as indexes
}
