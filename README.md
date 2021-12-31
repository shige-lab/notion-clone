# notion-clone

react, typescript, node.js, firebase を使い、notion の機能をできる限り再現しました。  
まだ対応しきれていない部分も多いですが、細かな挙動も可能な限り再現しています。  
C 言語以外にまともに扱ったことがなかったので、誤用やコード規則を無視してしまっていることがあるかもしれませんがご容赦下さい。  
firebase を扱う経験もしたかったので今回は認証部分を node.js ではなくて、firebase を使いました。  
私の現在通っている、42tokyo ではコード内にコメントを書くことを禁止されているため、今回はコメントを書いていません。なので読みにくい部分が多くあるかもしれませんがご了承下さい。

# アプリの使用のための準備

・ファイルインストール  
git clone https://github.com/shige-lab/notion-clone.git

・npm インストール  
react, nodejs ディレクトリで, npm install

・env ファイルの設定(firebase と mongodb のアカウントを作成し以下に則ってアカウント情報を env ファイルに記入する必要あり)。  
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

# 実装機能

・サイドバーのメニューからの機能。  
delete, duplicate, copy page link, rename.  
・各テキストのメニューからの機能  
delete, duplicate, turn into(text, heading1, heading2, heading3, to-do, bullet point).

最低限の notion 機能。  
ログイン機能。  
ログイン、サインイン画面で enter key でファーカスが次に行き、submit も可能。  
サイドバーの開閉機能。  
マウスオーバー機能の再現。  
テキスト入力時に表示されていたテキスト横のメニューアイコンを非表示に変更。  
スクロール不可(ノート数やノート長さによっては一部分だけスクロール可)。  
ノートタイトルがサイドバーの長さを超えた場合に...表示機能。  
サイドバーを閉じた時にテキストフィールドの幅を動的に変更。  
サイドバーで開いているページの背景色を変更。  
タイトルを rename 時に選択状態にする。  
ノートごとにルーティング。  
ノートのテキストが長い場合は自動で折り返し。  
placeHolder の再現(通常テキストだけはファーカス時のみ表示)。  
enter key で新たなテキストブロックを追加しフォーカスを当てる(前のテキストスタイルが todo, bullet point の場合はスタイルを維持)。  
テキストブロックがスタイルを持っているがテキストが空の時、enter key で通常スタイルに戻す。  
shift + enter key の場合は改行。  
日本語入力を確定するための enter key ではテキストブロックを追加しない。  
テキストブロックが空の場合、back space でテキストブロックの削除(テキストブロックがスタイルを持っている場合は通常スタイルに戻す)。  
"/"でテキストスタイル変更メニューの表示(テキストが空の場合はスタイル変更を現在のテキストブロックに適用、空ではない場合はテキストブロックを追加し、スタイル変更を適用)。  
"/"コマンドの後、テキストスタイルが変更された場合は"/"を削除。

# 苦労した点

typescript の型のエラー。  
複数の useEffect の使い方。  
css を使っての本家のスタイルの再現。  
基本的にはスクロールできないが、ノート数やノート長さによっては一部分だけスクロールできるようにする実装。  
タイトル変更時に再レンダリングされない。  
各ノートにルーティングした時に再レンダリングされない。  
エンターでフォーカス移動ができない。  
placeHolder の細かな再現。  
ドロップダウンメニューの表示位置を動的にする。  
テキストの日本語対応(react-contenteditable に innerRef を指定しない場合は可能であったが、innerRef は必須要素であるため、他のところの挙動がおかしくなる。innerRef を指定した場合は、テキストをアップデートする際に再レンダリングが起き１文字ずつ確定されてしまうため、"ka"と入力した場合"k あ"となってしまっていた。最終的に再レンダリングが行われないアップデートの仕方の模索し、対応した。)。

# できていないところ

早く多く文字を入力するとデータベースに送るのに時間がかかるため、入力してすぐ更新すると反映されず、更新するときに確認警告メッセージを表示できていない。  
/notes 以降の url が無効の場合に notFound ページに飛ばせない(最初のノートに飛ばすようにしてある)。  
components の分割がうまくできなくところがあり、コードが長い。

# 追加してみたい機能

画像の追加。  
ページ in ページ。  
move 機能。  
マルチメディア対応。  
メール認証機能。

# console の warning

Warning: Each child in a list should have a unique "key" prop.  
useEffect の第二引数
