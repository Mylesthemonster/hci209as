import db from './firebase';

const RecipeFetch = (q) => {
    let r1 = '';
    let r2 = '';
    let r3 = '';

    function formatParams( params ){
        return "?" + Object
            .keys(params)
            .map(function(key){
            return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }

    const endpoint = 'https://api.edamam.com/api/recipes/v2';
    let parameters = {
        "type": 'public',
        "q": q,
        "app_id": 'b6ea811a',
        "app_key": 'fcf1fb0a1cf2574eaeb07b483a2561ad',
        "field": 'url'
    }
    let url = endpoint + formatParams(parameters)

    return fetch(url).then( res => res.json()).then(response => {
        let recipe = (response);
        r1 = JSON.stringify(recipe.hits[0].recipe.url);
        r2 = JSON.stringify(recipe.hits[1].recipe.url);
        r3 = JSON.stringify(recipe.hits[2].recipe.url);
       
        db.collection("recipes").doc(q).set({
            ingredients: q,
            url1: r1.replaceAll('"',''),
            url2: r2.replaceAll('"',''),
            url3: r3.replaceAll('"',''),
        })
    })
}

export default RecipeFetch;