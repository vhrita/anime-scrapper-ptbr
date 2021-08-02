const express = require('express');
const puppeteer = require('puppeteer');

const server = express();
server.use(express.json());

const animeURL = "https://meusanimes.com";

server.post('/search', async (request, response) => {
    let query = request.body.search;
    query = query.replace(/\s/g, '+');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${animeURL}/?s=${query}`);

    const getResults = await page.evaluate(() => {
        let searchResults = document.querySelectorAll('.busca_container .ultAnisContainerItem')
        let infos = [].map.call(searchResults, function(obj) {
            let title = obj.querySelector('.aniNome').innerText;
            let episodes = obj.querySelector('.aniEps').innerText;
            let img = obj.querySelector('.aniImg noscript').innerText.split('"')[1];
            let link = obj.querySelector('a').getAttribute('href');
            return {
                "title" : title,
                "episodes" : episodes,
                "imgUrl" : img,
                "link" : link
            }
        });
        return infos;
    });

    await browser.close();

    response.send(getResults);
});

server.post('/infos', async (request, response) => {
    let link = request.body.link;
    const browser = await puppeteer.launch();
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
            let text = obj.innerText;
            return text;
        });

        let nodeValues = document.querySelectorAll('.anime_number_count');
        let values = [].map.call(nodeValues, function(obj) {
            let text = obj.innerText;
            return text;
        });

        let nodeTypes = document.querySelectorAll('.anime_number_title');
        let types = [].map.call(nodeTypes, function(obj) {
            let text = obj.innerText;
            return text;
        });
        
        let synopsis = document.querySelector('#sinopse_content').innerText;
        synopsis = synopsis.replace(/Mostrar menos/g, '');

        let nodeTitles = document.querySelectorAll('.anime_info_title');
        let titles = [].map.call(nodeTitles, function(obj) {
            let text = obj.innerText;
            return text;
        });

        let nodeContents = document.querySelectorAll('.anime_info_content');
        let contents = [].map.call(nodeContents, function(obj) {
            let text = obj.innerText;
            return text;
        });

        return {
            "title" : title,
            "status" : status,
            "releaseDay" : releaseDay,
            "genres" : genres,
            "numbers" : {
                "values" : values,
                "types" : types
            },
            "synopsis" : synopsis,
            "infos" : {
                "titles" : titles,
                "contents" : contents
            },
        }
    });

    await browser.close();

    response.send(getInfos);
});

// Impossível receber as imagens corretas, utilizar scrapper para trazer infos e utilizar page.click para atualizar elementos.
// server.post('/calendar', async (request, response) => {
//     var day = request.body.day;
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`${animeURL}/calendario`);
    
//     await page.waitForSelector('.calendario_dias_container .calendario_dia');
//     await page.waitForSelector('.closeme');
//     page.click('.closeme');
//     await page.waitForSelector('.btn-cookies');
//     page.click('.btn-cookies');

//     const path = `calendario_${day}.png`;

//     await Promise.all([
//         page.click(`.calendario_dias_container .calendario_dia[data-target="${day}"]`),
//         page.waitForSelector('.calendario_container'),
//         page.waitForSelector('.calendario_container .calendario_header'),
//         page.waitForSelector('.calendario_container .calendario_section'),
//         page.waitForTimeout(1000),
//     ]);

//     const element = await page.$('.calendario_container');
//     await element.screenshot({path: path});

//     await browser.close();

//     response.send(path);
// });

const port = 3000;
const host = "localhost";
const protocol = "http";
server.listen(port, () => {
    console.log(`
        Servidor subiu com sucesso!
        Acesse em ${protocol}://${host}:${port}
    `);
});