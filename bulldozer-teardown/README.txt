Bulldozer Master 10.1.0 Deep Teardown

1. ZIP 압축을 풉니다.
2. index.html을 Chrome에서 엽니다.
3. 실제 ASTC UI 리소스는 각 카드에서 자동 또는 버튼 클릭으로 렌더링됩니다.
4. ASTC 디코더의 WASM 로딩을 위해 최초 열람 시 인터넷 연결이 필요합니다. 원본 .astc 469개는 resources/astc/에 모두 포함되어 있습니다.
5. HTML/일반 이미지/CSV/Excel은 로컬 파일입니다.

XAPK SHA256: e15e43a838b28e429488260aec63fac7ab733f49025d48f7a7cfb2ed09e5da88

실제 UI 이미지가 빈 상태라면 OPEN_REPORT.command를 실행해 Chrome을 로컬 HTTP 모드로 여는 것을 권장합니다. 두 종류의 WebAssembly ASTC 디코더를 순차적으로 시도하도록 구성되어 있습니다.
