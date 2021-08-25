export const convertIDtoArrayPos = function(id){
    let splitID = id.split(',')
    return splitID.map(e => Number(e))
}
