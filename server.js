require('express-async-errors');
const express = require('express');
const puppeteer = require('puppeteer');

const server = express();
server.use(express.json());

const animeURL = "https://meusanimes.com";

server.post('/search', async (request, response) => {
    let query = request.body.search;
    query = query.trim().replace(/\s/g, '+');
    
    const browser = await puppeteer.launch({
        headless: true,
        waitUntil: 'domcontentloaded',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`${animeURL}/?s=${query}`);

    const getResults = await page.evaluate(() => {
        let searchResults = document.querySelectorAll('.busca_container .ultAnisContainerItem')
        return [].map.call(searchResults, function(obj) {
            return {
                "title": obj.querySelector('.aniNome').innerText,
                "episodes": obj.querySelector('.aniEps').innerText,
                "imgUrl": obj.querySelector('.aniImg noscript').innerText.split('"')[1],
                "link": obj.querySelector('a').getAttribute('href')
            }
        });
    });

    await browser.close();

    response.status(200).send(getResults);
});

server.post('/infos', async (request, response) => {
    let link = request.body.link;
    const browser = await puppeteer.launch({
        headless: true,
        waitUntil: 'domcontentloaded',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`${link}`);

    const getInfos = await page.evaluate(() => {
        let title = document.querySelector('.anime_titulo').innerText;

        let status = document.querySelector('.anime_status_lanc') ? document.querySelector('.anime_status_lanc').innerText : document.querySelector('.anime_status_comp').innerText;
        let releaseDay;
        if(status === "Completo") {
            releaseDay = "";
        } else {
            releaseDay = status.replace(/Em Lançamento |[()]/g, '');
            status = 'Lançamento';
        }

        let nodeGenres = document.querySelectorAll('.anime_generos a')
        let genres = [].map.call(nodeGenres, function(obj) {
            return obj.innerText;
        });

        let nodeValues = document.querySelectorAll('.anime_number_count');
        let values = [].map.call(nodeValues, function(obj) {
            return obj.innerText;
        });
        let nodeTypes = document.querySelectorAll('.anime_number_title');
        let types = [].map.call(nodeTypes, function(obj) {
            return obj.innerText;
        });
        let numbers = [];
        for (let i = 0; i < types.length; i++) {
            numbers.push({ "type": types[i], "value": values[i] });
        }
        
        let synopsis = document.querySelector('#sinopse_content').innerText;
        synopsis = synopsis.replace(/Mostrar menos/g, '');

        let nodeTitles = document.querySelectorAll('.anime_info_title');
        let nodeContents = document.querySelectorAll('.anime_info_content');
        let titles = [].map.call(nodeTitles, function (obj) {
            return obj.innerText;
        });
        let contents = [].map.call(nodeContents, function (obj) {
            return obj.innerText;
        });
        let infos = [];
        for (let i = 0; i < titles.length; i++) {
            infos.push({ "title": titles[i], "content": contents[i] });
        }

        return {
            "title" : title,
            "status" : status,
            "releaseDay" : releaseDay,
            "genres" : genres,
            numbers,
            "synopsis" : synopsis,
            infos
        }
    });

    await browser.close();

    response.status(200).send(getInfos);
});

server.use((error, req, response, next) => {
    console.log(`${error.stack}`);
    response.status(error.statusCode ? error.statusCode : 500)
    .send({'Error' : error.statusCode ? error.message : 'Internal Server Error'});
});

const port = process.env.PORT || 3000;
server.listen(port, () =>{
    console.log(`Listening on port: ${port}`);
});