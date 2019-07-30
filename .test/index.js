"use module"
import tape from "tape"
import RangeFilter from ".."

async function* fixture(){
	yield 2
	yield 4
	yield 6
	yield 8
}

tape( "no args will read everything", async function( t){
	const
	  iter= RangeFilter( fixture()),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  v3= await iter.next(),
	  v4= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 2, "2")
	t.equal( v2.value, 4, "4")
	t.equal( v4.value, 8, "6")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "start skips", async function( t){
	const
	  iter= RangeFilter( fixture(), 1),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  v3= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 4, "4")
	t.equal( v2.value, 6, "6")
	t.equal( v3.value, 8, "8")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "end terminates iteration", async function( t){
	const
	  iter= RangeFilter( fixture(), undefined, 2),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 2, "2")
	t.equal( v2.value, 4, "4")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "slice", async function( t){
	const
	  iter= RangeFilter( fixture(), 1, 3),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 4, "4")
	t.equal( v2.value, 6, "6")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "empty slice", async function( t){
	const
	  iter= RangeFilter( fixture(), 1, 1),
	  over= await iter.next()
	t.equal( over.done, true, "done")
	t.end()
})

tape( "negative end counts from back, -1", async function( t){
	const
	  iter= RangeFilter( fixture(), undefined, -1),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  v3= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 2, "2")
	t.equal( v2.value, 4, "4")
	t.equal( v3.value, 6, "6")
	t.equal( over.done, true, "done")
	t.end()
})

tape( "negative end counts from back, -2", async function( t){
	const
	  iter= RangeFilter( fixture(), undefined, -2),
	  v1= await iter.next(),
	  v2= await iter.next(),
	  over= await iter.next()
	t.equal( v1.value, 2, "2")
	t.equal( v2.value, 4, "2")
	t.equal( over.done, true, "done")
	t.end()
})
