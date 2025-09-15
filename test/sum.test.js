const add=require('./sum.js')

test('first test',()=>{
    expect(add()).toBe(5)
})

test('second test',()=>{
    expect(add()).toBe(15)
})

