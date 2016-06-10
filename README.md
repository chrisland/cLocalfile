# cLocalfile

## Local filesystem with phonegap/cordova

Version: 0.0.1

Christian Marienfeld - post@chrisland.de

### Install

Phonegap / cordova File plugin:

##### config.xml
```
<plugin name="cordova-plugin-file" source="npm" />
<plugin name="cordova-plugin-file-transfer" source="npm" />
```

### Use

```javascript
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
```
