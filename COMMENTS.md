## Processo de Desenvolvimento


Primeiramente, tive que idealizar como seria minha aplicação. Minha idéia original era a de mostrar ao usuário um mapa onde ele poderia selecionar uma localização por um Marker e abaixo estariam representadas algumas informações sobre o clima. O usuário poderia também selecionar uma cidade por um input de texto acima do mapa. O usuário teria também a opção de ver a previsão do tempo para a localidade selecionada, clicando no menu superior 'forecast'.

Com a idéia em mente, iniciei a escolha de um boilerplate simples e eficiente para dar início ao projeto. Optei pelo seguinte [boilerplate](https://github.com/tsaiDavid/simple-redux-boilerplate), pois possui, dentre outros recursos:
 - Suporte a ES6 (babel)
 - Webpack configurado para dev e produção
 - Arquitetura Redux
 - Redux Dev Tools
 - JS lint

Também modifiquei um pouco a estrutura do boilerplate quanto aos quesitos de environment e components; decidi adotar uma estrutura mais limpa e legível.

> Environments

```
|-- src/env
  |-- dev
    |-- Root.js
    |-- DevTools.js
    |-- configuretore.js
  |-- prod
    |-- Root.js
    |-- configuretore.js
```
> Components

```
|-- src/components
  |-- <ComponentName>
    |-- index.js
    |-- index.scss
    |-- test.js
  ...
```

Com a base para meu projeto criada, criei um esboço de telas do que seria a aplicação e que recursos da api do OpenWeather eu iria utilizar.

Em seguida iniciei o desenvolviemnto de um servidor bem simples usando nodejs, para que servisse de intermédio entre meu front-end e a Api do OpenWeather. Tomei essa decisão, primeiro, por questões de segurança(**proteger minha API_KEY**) e também por querer **simular um servidor com uma api graphql**, já que é o que será usado no projeto de fato.

O servidor é composto somente por 2 arquivos:
```
|-- server.js
!-- schema.js  // módulo que fornece o GraphQLSchema necessário para linkar a uri '/graphql'
```

Com o servidor pronto, iniciei a arquitetura dos componentes do sistema, tendo como base o esboço de telas feito anteriormente.

Na arquitetura inicial planejei os seguintes componentes:

```
SuperiorMenu | CityInput | GoogleMaps | Weather_Info | Card_Image | Forecast
```

Com o decorrer do desenvolvimento precisei criar também os seguintes componentes:

```
Loading | PredictionCard | SuperiorHeader
```

Com os componentes feitos, precisei de algo para guardar o estado da minha aplicação e que pudesse ser compartilhado em diferentes componentes. Passei então para a criação dos reducers e em paralelo a criação das actions necessárias para que minha aplicação front pudesse se comunicar com o servidor.

>Actions
```
|-- CurrentWeatherActions.js \\ realiza o request para o recurso de currentWeather provido pela api graphql
|-- ForecastActions.js \\ realiza o request para o recurso de forecast provido pela api graphql
```

> Reducers
```
|-- currentWeatherReducer.js \\ gerencia o estado para o recurso de currentWeather
|-- forecastReducer.js \\ gerencia o estado para o recurso de forecast
```

> Arquivos auxiliares
```
|-- src/graphql
  |-- queries.js // realiza a contrução da query que será utilizada para o request nas actions
  |-- schemas.js // schemas para os argumentos das queries da api graphql
|-- src/constants
  |-- ActionsTypes.js // constantes representando os diferentes actions existentes no sistema
  |-- Global.js // constantes globais como a url da api
```

Com meus componentes deviadamente conectados a suas Stores e Actions, minha aplicação se encontrava praticaente pronta e entao fiz o deploy em produção utilizando a PaaS **Heroku**. Realizei o deploy antes dos testes, pois imaginei que me tomaria mais tempo, e caso fosse, optaria por não criar os testes.

Link da aplicação em produção ->  https://mapweather.herokuapp.com/forecast

Finalizando o desenvolvimento, iniciei a criação de testes para os componentes e para isso utilizei a ferramenta [Jest](https://facebook.github.io/jest/). Por se tratar de uma ferramenta com uma grande compatibilidade com React, além de ser bem simples e eficiente. Os testes ficaram localizados no folder de cada componente e na raiz está localizado o folder __ __mocks__ __ com os mocks necessários para os testes.

> Comandos uteis

``` 
  npm install // instala todas as dependências do sistema
  npm run test // roda todos os testes do sistema
  npm run dev // roda a aplicação no modo dev
  npm run build // build na aplicação para produção
  npm run prod // roda o sistema no modo de produção
``` 
