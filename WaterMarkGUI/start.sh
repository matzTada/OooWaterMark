if [ -z "${PORT+x}" ] ; then #if PORT is not defined, define.
  echo "PORT was not defined before, define PORT"
  export PORT=3333 #change here if you start express app without Docker
fi
echo "PORT: $PORT"

if [ -z "${JSON_FILE_DIR+x}" ] ; then #if JSON_FILE_DIR is not defined, define.
  echo "JSON_FILE_DIR was not defined before, define JSON_FILE_DIR"
  export JSON_FILE_DIR="./public/jsons" #change here if you start express app without Docker
fi
echo "JSON_FILE_DIR: $JSON_FILE_DIR"

npm start
