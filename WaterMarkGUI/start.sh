if [ -z "${PORT+x}" ] ; then #if PORT is not defined, define.
echo "PORT was not defined before, define PORT"
export PORT=3333 #change here if you start express app without Docker
fi
echo "PORT: $PORT"

if [ -z "${PREV_JSON_FILE_DIR+x}" ] ; then #if PREV_JSON_FILE_DIR is not defined, define.
echo "PREV_JSON_FILE_DIR was not defined before, define PREV_JSON_FILE_DIR"
export PREV_JSON_FILE_DIR="./public/json_prev" #change here if you start express app without Docker
fi
echo "PREV_JSON_FILE_DIR: $PREV_JSON_FILE_DIR"

if [ -z "${PREV_FILE_NAME+x}" ] ; then #if PREV_FILE_NAME is not defined, define.
echo "PREV_FILE_NAME was not defined before, define PREV_FILE_NAME"
export PREV_FILE_NAME="output_prev.json" #change here if you start express app without Docker
fi
echo "PREV_FILE_NAME: $PREV_FILE_NAME"

if [ -z "${AFTER_JSON_FILE_DIR+x}" ] ; then #if AFTER_JSON_FILE_DIR is not defined, define.
echo "AFTER_JSON_FILE_DIR was not defined before, define AFTER_JSON_FILE_DIR"
export AFTER_JSON_FILE_DIR="./public/json_after" #change here if you start express app without Docker
fi
echo "AFTER_JSON_FILE_DIR: $AFTER_JSON_FILE_DIR"

if [ -z "${AFTER_FILE_NAME+x}" ] ; then #if AFTER_FILE_NAME is not defined, define.
echo "AFTER_FILE_NAME was not defined before, define AFTER_FILE_NAME"
export AFTER_FILE_NAME="output.json" #change here if you start express app without Docker
fi
echo "AFTER_FILE_NAME: $AFTER_FILE_NAME"

npm start
