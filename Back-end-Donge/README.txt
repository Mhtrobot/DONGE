install redis on linux/wsl
install mysql on linux/wsl
npm install
npx prisma migrate dev
npx prisma generate

File Descriptions:
Back-End-Donge:
    node_modules: packages and stuff
    prisma: ORM for mysql database
    src: code and stuff
        container: for dependency injection and capsulation which can be injected singular or many
        controllers: handling urls and routes (e.g, router.post/get/put('url', controllers))
        core: base settings of code
        interfaces: i dunno either
        middlewares: stays between the api and the controllers
        repositories: this folder integerates with the DataBase and can be injected from other parts of the service
        routes: initializes the apis and handles the middlewares and pass them to controllers
        services: handles logics and some implentations
        utils: holds basic connections