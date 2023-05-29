# GNN 기반 항로표지 예지보전 및 시각화 서비스(project-beacon)

기존의 항로표지 모니터링 시스템을 개선하는 충남대학교 컴퓨터융합학부 졸업프로젝트

## Live Demo
[[데모 링크](http://projectbeacon.azurewebsites.net/main)] - Azure 호스팅
## 시스템 구성
### 웹 서버
- 사용 언어 및 라이브러리: Python, Flask
### 웹 클라이언트
- 라이브러리: React
### 인공지능 모델
- 모델: AAAI 2021년에 출판된 논문 "Graph Neural Network-Based Anomaly Detection in Multivariate Time Series"에서 제안된 GDN(Graph Deviation Network)
- 사용 언어 및 라이브러리: Python, Pytorch