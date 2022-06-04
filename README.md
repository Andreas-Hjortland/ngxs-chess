# NgxsChess

A simple chess game using WebRTC to test
[`ngxs-message-plugin`](https://github.com/Andreas-Hjortland/ngxs-message-plugin)
over the internet instead of using postMessage locally.

To test it out, you can run `npm start` to run a local development server. Open
[localhost:4200](http://localhost:4200) and copy the link to the other player to
start playing on another browser.

If you want to do this over the internet, you can run `npm run build` to build
the app and deploy it to a server so that you can send the link to another
player or play against yourself on your phone and PC.

At the moment I haven't implemented any of the chess rules other than whoose
turn it is and that you can only capture your opponents pieces.

