# rua-cpu.github.io

cowork에서 만든 HTML을 올려서 **개별 URL로 공유**하는 GitHub Pages 저장소입니다.

## URL 구조

| 위치 | 주소 |
|------|------|
| 허브(전체 목록) | `https://rua-cpu.github.io/` |
| 개별 페이지 | `https://rua-cpu.github.io/<폴더이름>/` |

폴더 하나 = 사이트 하나. 폴더 안에 `index.html`만 있으면 됩니다.

```
rua-cpu.github.io/
├─ index.html        ← 허브 (페이지 카드 목록)
├─ .nojekyll         ← Jekyll 처리 끄기 (그대로 두세요)
├─ hello/
│  └─ index.html     → https://rua-cpu.github.io/hello/
└─ <새-폴더>/
   └─ index.html     → https://rua-cpu.github.io/<새-폴더>/
```

## 새 페이지 배포하기

### 방법 1 — cowork에서 Claude에게 맡기기 (기본)
> "이 HTML을 `invoice` 라는 이름으로 배포해줘"

라고 하면 Claude가 폴더 생성 → 커밋 → 푸시 → URL을 알려줍니다.

### 방법 2 — 헬퍼 스크립트
```bash
# 기존 HTML 파일을 페이지로
./new-page.sh invoice ~/Desktop/청구서.html

# 빈 템플릿부터 시작
./new-page.sh portfolio
```
실행하면 자동으로 커밋·푸시하고 URL을 출력합니다.

### 방법 3 — 수동
```bash
mkdir my-page
cp 어떤파일.html my-page/index.html
git add my-page && git commit -m "Add page: my-page" && git push
```

## 허브 목록에 추가 (선택)
첫 화면(`index.html`)에도 카드로 노출하려면 `index.html` 안의 `pages` 배열에 한 줄 추가:
```js
{ slug: "invoice", title: "청구서", desc: "7월 청구서", date: "2026-07-21" },
```
> 허브에 안 올려도 개별 URL(`/invoice/`)은 그대로 동작합니다.

## 참고
- **공개 저장소**입니다. 올린 페이지는 URL만 알면 누구나 볼 수 있어요. (민감한 내용 금지)
- 푸시 후 반영까지 **최대 1분** 정도 걸립니다.
- 인증은 SSH 키(`rua-cpu-GitHub`)로 처리되므로 별도 로그인이 필요 없습니다.
- `.claude/` 등 로컬 설정은 `.gitignore`로 제외되어 공개되지 않습니다.
