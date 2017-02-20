const remote = require('electron').remote;


setTimeout(() => {
    remote.getCurrentWindow().close();
    console.log('closing')
}, 1000*5)