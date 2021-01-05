module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {
            'title': 'Home | Cube Workshop'
        })
    })

    app.get('/about', (req, res) => {
        res.render('about', {
            'title': 'Aboutg | Cube Workshop'
        })
    })
    app.get('/create', (req, res) => {
        res.render('create', {
            'title': 'Create | Cube Workshop'
        })
    })
    app.get('/details/:id', (req, res) => {
        res.render('details', {
            'title': 'Details | Cube Workshop'
        })
    })
    app.get('*', (req, res) => {
        res.render('404', {
            'title': 'Page Not Found | Cube Workshop'
        })
    })
}