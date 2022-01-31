import fetch from 'node-fetch'
globalThis.fetch = fetch;

function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
        return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

let endpoint = 'https://api.edamam.com/api/recipes/v2';
let parameters = {
    "type": 'public',
    "q": 'egg, bacon',
    "app_id": 'b6ea811a',
    "app_key": 'fcf1fb0a1cf2574eaeb07b483a2561ad',
    "field": 'label',
    "field": 'url'
}
let url = endpoint + formatParams(parameters)
let r = fetch(url).then(response => response.json())
r.then(function(result){
    console.log('Here are 3 relevant recipes:')
    console.log(JSON.stringify(result.hits[0].recipe.url, null, 2).replace(/\"/g, ""))
    console.log(JSON.stringify(result.hits[1].recipe.url, null, 2).replace(/\"/g, ""))
    console.log(JSON.stringify(result.hits[2].recipe.url, null, 2).replace(/\"/g, ""))
})
