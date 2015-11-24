fs = require("fs")
path = require 'path'

basedir = __dirname + "/../photos"
basedir = path.resolve basedir
bigdir = basedir + "/big"
fs.mkdirSync(bigdir)
smalldir = basedir + "/small"
fs.mkdirSync(smalldir)

fs.readdir basedir,(err,filenames)=>

    for filename in filenames

        filepath = basedir + "/" + filename
        if fs.lstatSync(filepath).isDirectory()
            continue

        console.log filepath
        fileSizeInBytes = fs.statSync(filepath).size
        fileSizeInKilobytes = fileSizeInBytes / 1000.0
        fileSizeInMegabytes = fileSizeInKilobytes / 1000.0
        console.log fileSizeInKilobytes

        if fileSizeInKilobytes < 100
            #delete
            fs.unlink filepath
            continue

        if fileSizeInKilobytes > 500
            fs.renameSync(filepath,bigdir + "/" + filename)
        else
            fs.renameSync(filepath,smalldir + "/" + filename)