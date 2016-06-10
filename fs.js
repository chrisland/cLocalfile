
/*
    Local filesystem with phonegap
    v0.0.1

    
    Christian Marienfeld - post@chrisland.de

    ###############################################
    HOW TO:

    // init filesystem temp folder
    FS.init(function () {
        // open or create file
        FS.openFile("newTempFile.txt", false, function () {
            var data = new Blob(['some text....'], { type: 'text/plain' });
            FS.writeFile(data);
        });
    });

    // later on...
    FS.openFile("newTempFile.txt", false, function () {
        FS.readFile(function (path, result) {
            console.log(path, result);
        });
    });

    ###############################################
*/

var FS = {

    g: {
        name: false,
        root: false,
        file: false
    },

    init: function (callback) {

        //console.log('---initFile');

        var fs = window.requestFileSystem || window.webkitRequestFileSystem;
        fs(window.TEMPORARY, 5 * 1024 * 1024 , function (fs) {

            //console.log('file system open: ' + fs.name);

            FS.g.name = fs.name;
            FS.g.root = fs.root;

            //onsole.log(FS.g);

            if (callback && typeof callback === 'function') {
                callback();
            }
            return true;
        }, function(err) {

            console.log(err);
            return false;
        });


    },
    openFile: function (fileName, isAppend, callback) {

        //console.log('---openFile');
        if (!FS.g.root) {
            return false
        }
        // Creates a new file or returns the file if it already exists.
        FS.g.root.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

            FS.g.file = fileEntry;
            //console.log(FS.g.file);
            //writeFile(fileEntry, null, isAppend);

            if (callback && typeof callback === 'function') {
                callback();
            }

        }, function (e) {
            console.log(e);
        });

    },
    writeFile: function (dataObj, callback) {

        //console.log('---writeFile');
        if (!FS.g.file) {
            return false;
        }
        // Create a FileWriter object for our FileEntry (log.txt).
        FS.g.file.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function() {
                //console.log("Successful file write...");
                //readFile(fileEntry);
                if (callback && typeof callback === 'function') {
                    callback(FS.g.file);
                }
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file read: " + e.toString());
            };

            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj = new Blob([''], { type: 'text/plain' });
            }

            fileWriter.write(dataObj);
        });

    },
    readFile: function (callback) {

        //console.log('---readFile');
        if (!FS.g.file) {
            return false;
        }

        FS.g.file.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function() {
                //console.log("Successful file read: " + this.result);
                //console.log(FS.g.file.fullPath + ": " + this.result);
                if (callback && typeof callback === 'function') {
                    callback(FS.g.file.fullPath, this.result);
                }
            };

            reader.readAsText(file);

        }, function (e) {
            console.log(e);
        });

    }

};
