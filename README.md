## Chemical
An Archiving App for the Chemical Pathology Department of ABUTH, Zaria. Using Angular wrapped in Electron for the front end. The backend/API server is written in PHP, relying heavily on the Active Record pattern. The AR pattern is implemented using this https://github.com/jpfuentes2/php-activerecord/tree/master, also installable via composer.

## TO USE
Install Angular and Electron via npm. Install a local development server like XAMPP/WAMP Copy the "chemapi" folder to your server htdocs (I use a virtual directory, less tedious for me). Whatever directory you end up moving the "chemapi" folder to, ensure to update it in the "serverinfo.dev.json" file in the src/app directory.

"ng serve" for angular app
"electron-build" for electron
See package.json for more...
I use electron-packager to compile the app for Windows or Mac
