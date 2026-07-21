#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
#  새 페이지를 배포하는 헬퍼
#
#  사용법:
#    ./new-page.sh <slug> <source.html>   기존 HTML 파일을 페이지로 배포
#    ./new-page.sh <slug>                 빈 템플릿 폴더만 생성
#
#  예:
#    ./new-page.sh invoice ~/Desktop/청구서.html
#    ./new-page.sh portfolio
# ─────────────────────────────────────────────────────────────

REPO_URL="https://rua-cpu.github.io"
SLUG="${1:-}"
SRC="${2:-}"

if [[ -z "$SLUG" ]]; then
  echo "사용법: ./new-page.sh <slug> [source.html]"
  exit 1
fi

# slug 검증: 소문자 / 숫자 / 하이픈만 허용
if [[ ! "$SLUG" =~ ^[a-z0-9-]+$ ]]; then
  echo "❌ slug는 소문자·숫자·하이픈(-)만 쓰세요.  예: my-page"
  exit 1
fi

cd "$(dirname "$0")"

if [[ -e "$SLUG" ]]; then
  echo "❌ '$SLUG' 가 이미 존재합니다."
  exit 1
fi

mkdir -p "$SLUG"

if [[ -n "$SRC" ]]; then
  [[ -f "$SRC" ]] || { echo "❌ 소스 파일 없음: $SRC"; exit 1; }
  cp "$SRC" "$SLUG/index.html"
  echo "📄 $SRC → $SLUG/index.html"
else
  cat > "$SLUG/index.html" <<'HTML'
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>새 페이지</title>
</head>
<body>
  <h1>새 페이지</h1>
  <p>여기에 내용을 채우세요.</p>
</body>
</html>
HTML
  echo "📄 빈 템플릿 생성: $SLUG/index.html"
fi

git add "$SLUG/index.html"
git commit -m "Add page: $SLUG"
git push

echo ""
echo "✅ 배포 완료! (반영까지 최대 1분)"
echo "🔗 $REPO_URL/$SLUG/"
echo ""
echo "💡 허브(첫 화면)에도 노출하려면 index.html 의 pages 배열에 아래 줄을 추가하세요:"
echo "   { slug: \"$SLUG\", title: \"제목\", desc: \"설명\", date: \"$(date +%F 2>/dev/null || echo YYYY-MM-DD)\" },"
