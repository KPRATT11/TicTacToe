export const convertIDtoArrayPos = function(id){
    if (id[0] === 'c'){
        id = id.substring(1)
    }
    let splitID = id.split('-')
    return splitID.map(e => Number(e))
}
