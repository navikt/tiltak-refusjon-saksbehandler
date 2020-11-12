const setup = (router) => {
    router.use('/modiacontextholder/api/decorator', (req, res) => {
        res.json({ ident: 'X123456', navn: 'Navn' });
    });
};

export default { setup };
