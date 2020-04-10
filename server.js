const connect = require('connect');
const serveStatic = require('serve-static');

connect().use(serveStatic('./material/build')).listen(8000, () => {
    console.log('Server running on 8000...');
});
