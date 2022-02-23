import fetch from 'node-fetch'
globalThis.fetch = fetch;
import promptSync from 'prompt-sync';
import * as fs from 'fs';
import { error } from 'console';

const prompt = promptSync();

let r1 = '';
let r2 = '';
let r3 = '';

const message = prompt('What ingredients do you have: '); //Put 'Recipe for: ____ '

function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
        return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

switch(true){
    case message.includes('Recipe') || message.includes('recipe'):
    let q = message.substring(message.indexOf(': ') + 2);
    const endpoint = 'https://api.edamam.com/api/recipes/v2';
    let parameters = {
        "type": 'public',
        "q": q,
        "app_id": 'b6ea811a',
        "app_key": 'fcf1fb0a1cf2574eaeb07b483a2561ad',
        "field": 'url'
    }
    let url = endpoint + formatParams(parameters)
    let xtra_param = '&field=label&field=source&field=image'
    fetch(url+xtra_param)
        .then( res => res.json())
        .then(response => {
            let recipe = (response);
            r1 = JSON.stringify(recipe.hits[0].recipe.url) + '\n';
            r2 = JSON.stringify(recipe.hits[1].recipe.url) + '\n';
            r3 = JSON.stringify(recipe.hits[2].recipe.url) + '\n';
            const recipeList = [r1, r2, r3];

            const random = Math.floor(Math.random() * recipeList.length);

            return new Promise(function(resolve, reject) {
                fs.appendFile("./urls.txt",recipeList[random], function(err) {
                    if (err){
                        reject(err)
                        console.log('error')
                    }
                    else resolve(r1);
                })
            })
        })

    let result = fs.readFileSync("./urls.txt", 'utf-8')
    const single = result.split('\n');
    if(single[single.length -1] === ''){
        console.log(single[single.length-2])
    }else  console.log(single[single.length-1])
    
    break;
}