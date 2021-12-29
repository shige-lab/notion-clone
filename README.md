# notion-clone

# アプリの使用のための準備

・ファイルインストール  
git clone https://github.com/shige-lab/notion-clone.git

・npm インストール  
react, nodejs ディレクトリで, npm install

・env ファイルの設定(firebase と mongodb のアカウントを作成し以下に則ってアカウント情報を env ファイルに記入する必要あり。)  
react ディレクトリで.env.local ファイルを作成し、以下のコードを記入。

REACT_APP_FIREBASE_API_KEY=""  
REACT_APP_FIREBASE_AUTH_DOMAIN=""  
REACT_APP_FIREBASE_PROJECT_ID=""  
REACT_APP_FIREBASE_STORAGE_BUCKET=""  
REACT_APP_FIREBASE_MESSAGE_SENDER_ID=""  
REACT_APP_FIREBASE_APP_ID=""  
REACT_APP_PUBLIC_API="http://localhost:8080"

nodejs ディレクトリで.env ファイルを作成し、以下のコードを記入。

REACT_URL="http://localhost:3000"  
PORT=8080  
MONGO_URI="あなたの mongodb_url"

・プログラムの実行
react, nodejs ディレクトリでそれぞれ npm start コマンドを実行。  
http://localhost:3000 にアクセス。

# 苦労した点

typescript の型のエラー。  
複数の useEffect の使い方。  
css を使っての本家のスタイルの再現。  
基本的にはスクロールできないが、ノート数やノート長さによっては一部分だけスクロールできるようにする実装。
タイトル変更時に再レンダリングされない。  
各ノートにルーティングした時に再レンダリングされない。  
エンターでフォーカス移動ができない。

# できていないところ

早く多く文字を入力するとデータベースに送るのに時間がかかるため、入力してすぐ更新すると反映されず、更新するときに確認警告メッセージを表示できていない。
/notes 移行の url が無効の場合に notFound ページに飛ばせない(最初のノートに飛ばすようにしてある)。
sidebar のメニューが低すぎると全て表示されない場合がある。
database から return が来なくて更新されない場合がある。  
ノートの文字を途中から消せない。

# console の warning

Warning: Each child in a list should have a unique "key" prop.
useEffect の第二引数
