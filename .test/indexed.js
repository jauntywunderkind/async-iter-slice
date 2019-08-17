"use module"
import tape from "tape"
import IndexedSlice from "../indexed.js"

const SAMPLE= [ 0, 10, 20]

tape( "indexed no args will read everything", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, undefined, undefined),
	  v0= iter.next(),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 10, "10")
	t.equal( v2.value, 20, "20")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed start skips", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, 1, null),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v1.value, 10, "10")
	t.equal( v2.value, 20, "20")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed end terminates iteration", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, undefined, 2),
	  v0= iter.next(),
	  v1= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 10, "10")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed slice", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, 1, 3),
	  v1= iter.next(),
	  v2= iter.next(),
	  over= iter.next()
	t.equal( v1.value, 10, "10")
	t.equal( v2.value, 20, "20")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed empty slice", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, 1, 1),
	  over= iter.next()
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed negative end counts from back, -1", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, undefined, -1),
	  v0= iter.next(),
	  v1= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( v1.value, 10, "10")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "indexed negative end counts from back, -2", function( t){
	const
	  iter= new IndexedSlice( SAMPLE, undefined, -2),
	  v0= iter.next(),
	  over= iter.next()
	t.equal( v0.value, 0, "0")
	t.equal( over.done, true, "done")
	t.end()
})
