"use module"
import tape from "tape"
import IndexesSlice from "../indexes.js"

const SAMPLE= [ 0, 10, 20]

tape( "indexes no args will read everything", function( t){
	const
	  iter= new IndexesSlice( undefined, undefined, SAMPLE),
	  v0= iter.next(),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 1, "1")
	t.equal( v2.value, 2, "2")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes start skips", function( t){
	const
	  iter= new IndexesSlice( 1, null, SAMPLE),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v1.value, 1, "1")
	t.equal( v2.value, 2, "2")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes end terminates iteration", function( t){
	const
	  iter= new IndexesSlice( undefined, 2),
	  v0= iter.next(),
	  v1= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 1, "1")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes slice", function( t){
	const
	  iter= new IndexesSlice( 1, 3),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v1.value, 1, "1")
	t.equal( v2.value, 2, "2")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes empty slice", function( t){
	const
	  iter= new IndexesSlice( 1, 1),
	  over= iter.next()
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes negative end counts from back, -1", function( t){
	const
	  iter= new IndexesSlice( undefined, -1, SAMPLE),
	  v0= iter.next(),
	  v1= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 1, "1")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexes negative end counts from back, -2", function( t){
	const
	  iter= new IndexesSlice( undefined, -2, SAMPLE),
	  v0= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( over.done, true, "done")
	t.end()
})
