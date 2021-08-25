const bst = (function() {
    let methods = {}

    //Functions

    //For Counter
    methods.forCounter = function(range, callback){
        let arrayRange = [...Array(range).keys()]
    arrayRange.forEach((i) => {
        callback(i)}
    )}
    

    //Random Element
    methods.randomElement = function(array){
        return array[Math.floor(Math.random() * array.length)]
    }

    //Sum
    methods.sum = function(array){
        return array.reduce((a,c) => a + c, 0)
    }

    //numerical sort
    methods.numericalSort = function(array, reversed = false){
        return array.sort(a , b => {
            if (reversed){
                return a-b
            }else{
                return b-a
            }
        })
    }

    //Contains amount
    methods.containsAmount = function(array, containFilter){
        if (typeof containFilter === 'string'){
            containFilter = [containFilter]
        }
        let filteredArray = array.filter(e => containFilter.includes(e))
        return filteredArray.length
    }

    return methods
})()

export default bst