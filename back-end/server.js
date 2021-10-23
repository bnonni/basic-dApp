const app = require('./app');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Server listening on http://127.0.0.1:${PORT}`);
});