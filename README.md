# OooWaterMark
中身はJavaScript, HTML, CSSの練習  
特にp5.jsとか使っちゃう系
一応電子透かしのデモに使用予定

[BitCharDiff](https://github.com/matzTada/BitCharDiff)をもとにしてます．

## ざっくりと

* サーバー側
	* Code: ```/bin/www```
	* Node, Express
	* 同じホストのJSONファイル(```output.json```)を読んでwebsocketを用いてクライアントに送る
* クライアント側
	* Code: ```/public/javascripts/chatSketch.js```
	* JavaScript, HTML
	* JSONをwebsocket経由で受信してブラウザ上で表示する

## How-To

動かし方，全体の構成は[WestlabGCTCGUI](https://github.com/matzTada/WestlabGCTCGUI#how-to)と似てます．

### with Docker
* 本番はこっちを使う
* application起動(docker imageのbuildとdocker containerのrun) 
```
cd OooWaterMark/docker
bash launchContainer.sh
```
* 設定変更(portとjsonファイルの場所)
	* ```OooWaterMark/docker/launchContainer.sh```を書き換えてください.
	* ```GUI_PORT``` : gui用のport
	* ```JSON_DIR``` : 各アプリケーションの設定が書かれたJSONファイルが入っているディレクトリの変更
* Raspberry Piでも[Hypriotのrpi用nodeイメージ](https://hub.docker.com/r/hypriot/rpi-node/)を使えば動くことを確認しました．

### without Docker
* frontendのテストをするならこちらが便利．
* application起動(express applicationの起動)
```
cd OooWaterMark/WaterMarkGUI/
bash start.sh
```
* 設定変更(portとjsonファイルの場所)
	* ```OooWaterMark/WaterMarkGUI/start.sh```を書き換えてください(```#change here if you start express app without Docker```)と書いてあるところを変える．
	* ```PORT``` : gui用のport
	* ```JSON_FILE_DIR``` : 各アプリケーションの設定が書かれたJSONファイルが入っているディレクトリの変更

## おまけ(```/resource/periodicChanger.js```)

```output.json```と```output_prev.json```を定期的に書き換える  
電子透かし側がうまく動かなったときにローカルで変わってる風に見せられるのでオススメ

```
cd resource
node periodicChanger.js
```

## files

* ```/WaterMarkGUI/bin/www``` : server side program mainly for websocket
* ```/WaterMarkGUI/app.js``` : server side program mainly for frontend
* ```/WaterMarkGUI/views/index.ejs``` : client side script
* ```/WaterMarkGui/public/javascripts/chatSketch.js``` : client side program mainly for websocket and processing.js

## To Do

* （output.jsonから読むようにしたのでやらない）~~htmlから読めるようにしたほうがいいかも?~~
* （代わりにoutput.jsonとoutput_prev.jsonを定期的に書き換えるperiodicChanger.jsを作った）~~html作成機を作る？（NUCが止まっちゃったときのデモ用，テスト用）~~
* ~~Web serverを立てる~~
* ~~Websocketとも結合してみる <https://team-lab.github.io/skillup-nodejs/3/1.html>~~
	* (動いたので，やってない)~~Serure WebSocket(wss)を使うべきなのかも？~~

## Info.

* 複数キャンバスを使うなら[instance mode](https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace)を使う
	* これも役に立つ <http://www.joemckaystudio.com/multisketches/> 
* ```<div>```はブロック要素（一般的に前後に改行が入る）として，```<span>```はインライン要素（一般的に前後に改行が入らない）として使われる
* [p5.dom library](https://github.com/processing/p5.js/wiki/Beyond-the-canvas)はなんだかんだ重要

### 面白そうなライブラリ

* <https://github.com/bitcraftlab/p5.gui>
* <https://github.com/generative-light/p5.scribble.js>
* <https://github.com/linux-man/p5.tiledmap>7/28/2017 3:54:04 PM 
