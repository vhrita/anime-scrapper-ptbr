# Anime Scrapper PTBR Web API

#### :brazil: Olá, por essa ser uma API que retorna todos seus dados em português do brasil, o Readme principal foi escrito em minha língua nativa. :brazil:

#### ***🛠 A API ainda está em desenvolvimento, porém conta com endpoints funcionais para teste, novos endpoint ainda serão adicionados! 🛠***

***URL Base:*** https://anime-scrapper-ptbr.herokuapp.com/

### Endpoints Ativos
* [/search](#search)
* [/infos](#infos)

### Exemplos
* [Exemplos de Erros](#errors)

### /search
* ***Endpoint:*** https://anime-scrapper-ptbr.herokuapp.com/search
* ***Método:*** POST
* ***Recebe:*** JSON - String
  * search - Palavras chave para nomes de animes
* ***Retorna:*** JSON - Array de objetos com resultados
  * title - Nome do anime
  * episodes - Quantidade de episódios do anime
  * imgUrl - Link da imagem do banner do anime
  * link - Link para acessar as infos do anime (usado como parâmetro em [/infos](#infos))
  
#### Exemplo de uso
* ***Requisição:***
    POST https://anime-scrapper-ptbr.herokuapp.com/search
    Body (JSON):
    ```
    {
        "search" : "Boku no Hero"
    }
    ```

* ***Resultado:***
  ```
  [
    {
        "title": "Boku no Hero Academia 2 Dublado",
        "episodes": "25 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-2-dublado-todos-os-episodios-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-2-dublado-episodios"
    },
    {
        "title": "Boku no Hero Academia 5 Dublado",
        "episodes": "13 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-5-dublado-todos-os-episodios-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-5-dublado-todos-os-episodios"
    },
    {
        "title": "Boku no Hero Academia 5",
        "episodes": "18 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-5-todos-os-episodios-legendado-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-5-episodios-hd"
    },
    {
        "title": "Boku no Hero Academia Dublado",
        "episodes": "13 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-dublado-todos-os-episodios-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animes/boku-no-hero-academia-dublado"
    },
    {
        "title": "Boku no Hero Academia 4",
        "episodes": "28 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-4-todos-os-episodios-legendado-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-4-online"
    },
    {
        "title": "Boku no Hero Academia 3",
        "episodes": "25 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-3-todos-os-episodios-legendado-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-3-online"
    },
    {
        "title": "Boku no Hero Academia 2",
        "episodes": "25 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-2-todos-os-episodios-legendado-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-2-online"
    },
    {
        "title": "Boku no Hero Academia",
        "episodes": "19 Episódios",
        "imgUrl": "https://meusanimes.com/animes/capas/assistir-boku-no-hero-academia-todos-os-episodios-legendado-hd-meus-animes-online.jpg",
        "link": "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-online"
    }
  ]
  ```
