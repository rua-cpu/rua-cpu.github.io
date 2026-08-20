#!/bin/bash
cd "$(dirname "$0")"
PORT=8765
python3 -m http.server "$PORT" >/tmp/bulldozer_master_report.log 2>&1 &
PID=$!
sleep 1
open -a "Google Chrome" "http://127.0.0.1:$PORT/index.html"
echo "Bulldozer Master report server: http://127.0.0.1:$PORT/index.html"
echo "종료하려면 이 창에서 Enter를 누르세요."
read
kill "$PID" 2>/dev/null
