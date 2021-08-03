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

### /infos
* ***Endpoint:*** https://anime-scrapper-ptbr.herokuapp.com/infos
* ***Método:*** POST
* ***Recebe:*** JSON - String
  * link - Link da página do anime recebido em [/search](#search)
* ***Retorna:*** JSON - Array de objetos com resultados
  * title - Nome do anime
  * status - Completo ou Lançamento
  * releaseDay - Caso lançamento: Dia da semana em que os episódios lançam; Caso completo: String vazia
  * genres - Array de strings com todos os gêneros do anime
  * numbers - Array de objetos com informações quantitativas:
    * type - Do que se trata a informação *value* no mesmo objeto
    * value - Quantidade referente a informação *type*
  * synopsis - Sinopse completa do anime
  * infos - Array de obejtos com informações sobre a produção do anime
    * title - Título informativo sobre do que se trata a informação em *content*
    * content - String de conteúdo da informação referente ao *title*
  
#### Exemplo de uso
* ***Requisição:***
    POST https://anime-scrapper-ptbr.herokuapp.com/infos
    Body (JSON):
    ```
    {
        "link" : "https://meusanimes.com/ver-animess-on/boku-no-hero-academia-2-dublado-episodios"
    }
    ```

* ***Resultado:***
  ```
  {
    "title": "Boku no Hero Academia 2 Dublado",
    "status": "Completo",
    "releaseDay": "",
    "genres": [
        "Ação",
        "Comédia",
        "Shounen",
        "Superpoder",
        "Vida Escolar"
    ],
    "numbers": [
        {
            "type": "EPISÓDIOS",
            "value": "25"
        },
        {
            "type": "ESPECIAIS",
            "value": "0"
        },
        {
            "type": "FILMES",
            "value": "0"
        }
    ],
    "synopsis": "Segunda Temporada de Boku no Hero Academia , O que é um herói? Para Midoriya Izuku, a resposta dessa pergunta sempre foi simples: “Tudo que eu quero ser!” E quem é o maior herói? Bem, o lendário All Might (Todo Poderoso), é claro. All Might é o herói número um e também o “Símbolo da Paz” mundial. Nem mesmo em seus sonhos mais loucos Izuku poderia imaginar que logo seu caminho cruzaria o de seu herói de infância. Em Boku no Hero Academia o status é governado pelas “Individualidades”, superpoderes singulares que se desenvolvem na infância. Mas infelizmente, o viciado em heróis, Midoriya “Deku” Izuku nunca teve uma Individualidade. Isto é, até conhecer All Might, o maior herói de todos. A transformação de sonhador em herói de Izuku começa na Academia U.A., a melhor escola de treinamento de heróis do Japão. Izuku fica eufórico quando é aceito para essa academia de prestígio, especialmente quando descobre que All Might é um dos professores. Que surpresas essa academia poderosa aguarda? Izuku será capaz de acompanhar os colegas de classe de elite?",
    "infos": [
        {
            "title": "AUTOR",
            "content": "Kōhei Horikoshi"
        },
        {
            "title": "ESTÚDIO",
            "content": "Bones"
        },
        {
            "title": "DIRETOR",
            "content": "Kenji Nagasaki"
        },
        {
            "title": "ANO",
            "content": "2017"
        }
    ]
  }
  ```