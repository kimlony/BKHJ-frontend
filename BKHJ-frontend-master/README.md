###### 웹 애플리케이션 프로젝트 입니다.

##### 2023.05.01 ~ 2023.06.26 동안 Spring Boot, React, Python을 사용해 구현했습니다.

###### 저희는 금융정보 데이터 분석 기반, 대출상품 추천 솔루션 구축 이라는 주제로 진행하였습니다.

###### 과제1 :  React + java + SpringBoot + JPA + DB [MYSQL]기반의 웹어플리케이션 개발
###### 과제2 : Python 기반의 데이터분석: 수집(web scraping) + 정제(pandas) + 분석 + 시각화
###### 과제3 : Python 기반의 데이터 예측: AI 알고리즘 (선형회귀, 다항 션형회귀)을 활용하여 데이터 예측 시스템 구축
&nbsp;

# 프로젝트 시연 영상 <과제3>


https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/908e9bed-0504-419b-9c69-47503a2e998a



&nbsp;

## ➕목차
* ##### 프로젝트 구조
* ##### 사용기술
* ##### 구현기능
* ##### 기능 실행화면
* ##### ELK
* ##### ERD설계
* ##### 트러블슈팅
* ##### 참고사항
&nbsp;

## ✓프로젝트 구조
![프로젝트 구조2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/f78882e7-d212-4104-b958-7b2ae8d72580)
## ✓사용기술
### Backend
* java,  Python </br>
* Spring Boot, Spring MVC </br>
* JPA, Mybatis,  REST API controller </br>
* Junit5, Snapshot </br>
* Maven </br>
### DevOps
* MySQL, Elasticsearch, Logstash, Kibana </br>
* Testng, lombok </br>
* cookie, security, JWT </br>
* Web scraping, Numpy, Pandas, Flask, CORS </br>
### Frontend
* HTML5, CSS3(SCSS), JS, JSX, Node.js </br>
* React </br>
### Tools & Collaboration
* IntelliJ, STS4, Eclipse, VScode, Pycharm </br>
* Git, Sourcetree, Kakaotalk </br>
&nbsp;

## ✓구현기능
*  ##### 게시판 기능
    * ###### 모든 게시글 및 특정 게시글 조회
    * ###### 특정 게시글 검색 (제목, 작성자, 작성일)
    * ###### 게시글 작성 [회원]
    * ###### 게시글 수정 [회원, 게시글 작성자]
    * ###### 게시글 삭제 [회원, 게시글 작성자]
* ##### 댓글 기능
    * ###### 댓글 작성 [회원]
    * ###### 댓글 수정 [회원]
    * ###### 댓글 삭제 [회원]
* ##### 파일업로드 기능
    * ###### 파일 업로드 및 조회 [회원]
    * ###### 파일 다운로드
    * ###### 파일 수정 [회원, 게시글 작성자]
    * ###### 파일 삭제 [회원, 게시글 작성자]
* ##### 회원 기능
    * ###### 회원가입
    * ###### 로그인/로그아웃
    * ###### 회원탈퇴
    * ###### 회원정보수정
* ##### ELK Stack을 이용한 데이터 분석 및 시각화 기능
    * ###### CSV 데이터를 Elastic 검색으로 가져오고 React를 사용하여 시각화
* ##### 데이터 예측 기능
    * ###### 선형 회귀 분석을 사용하여 응답에서 로그인된 쿼리 값에 대한 데이터 검색 자동화 및 DB 업데이트
    * ###### 대출한도 및 대출 기간 입력에 따른 다항식 선형 회귀를 이용한 금리 예측
&nbsp;

## ✓기능 실행화면
### 메인화면페이지
![5](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/240ddae9-1eab-4536-ac94-909d5de39ba7)
&nbsp;

## 게시판 기능
### 모든 게시글 및 특정 게시글 조회
* ###### 모든 게시글을 조회할 수 있습니다. 페이징 기능을 통해 한 페이지에서 최대 10개의 게시글이 조회됩니다.
![21(게시판 페이징)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/fd55d0ca-4375-4592-9a32-c55534f52a16)
* ###### 게시글의 제목을 클릭하면, 게시글의 상세내용을 조회할 수 있습니다.
![23(게시글)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/da2d543e-2173-486a-8f0d-b96c508df433)
### 특정 게시글 검색 (제목, 작성자, 작성일)
* ###### 게시글의 제목과 작성자 또는 작성일로 게시글을 검색할 수 있습니다.
![22](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/929feb93-d7a7-4f8a-899f-911c1b503aa2)
### 게시글 작성
* ###### 로그인한 사용자는 게시글을 작성할 수 있습니다.
![24](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/aefda6cc-95c5-4da5-a3ba-a5e1edd57445)
![24_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c2667cf0-660f-41ef-98e2-e976fe3cf168)
* ###### 로그인하지 않았을 경우 글 작성이 제한됩니다.
![25](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/817f7e20-b52d-4997-9a99-a1e3e727a153)
### 게시글 수정
* ###### 게시글 작성자는 게시글을 수정할 수 있습니다.
![26(게시글 수정)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/f4771c07-b36e-487a-9e06-5469793a4d1e)
![26_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/2905df00-5f4c-40e7-a119-a55a66c7b978)
### 게시글 삭제
* ###### 게시글 작성자는 게시글을 삭제할 수 있습니다.
![27(게시글 삭제)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/5d161ddc-de99-4b5c-80e0-a7b9e2ff8ea8)
![27_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/be5cb152-0f24-43c3-95f3-aeae2a62e7a0)
&nbsp;

## 댓글 기능
### 댓글 작성
* ###### 특정 게시글에 대한 댓글을 작성할 수 있습니다. 게시글 작성 과 마찬가지로 로그인한 사용자만 댓글을 작성할 수 있습니다. 그리고 작성한 댓글을 ```게시글 상세``` 에서 조회할 수 있습니다.
![28(댓글)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/b76b9916-cd25-4adb-b2c9-b4bb21e59ac0)
![28_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/5fb4db7c-b066-4cd7-a773-dd728307ea8c)
* ###### 자신이 작성한 댓글을 수정할 수 있습니다.
![29(댓글수정)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/96854ded-34a2-49ea-9ade-66984306a259)
![29_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c715ec52-135c-4330-8441-ff4b1958c37e)
![29_3](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/66baeb15-74b8-43c2-ad88-51a6d649bd71)
* ###### 자신이 작성한 댓글을 삭제할 수 있습니다.
![30(댓글삭제)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/70cacdf4-2f9a-4bd0-afc2-8dacf2f1f7ac)
&nbsp;

## 파일 업로드 기능
### 파일 업로드 및 조회
* ###### 게시글을 작성할 때 파일도 같이 업로드하여 게시판 조회시 업로드된 파일을 확인할 수 있습니다.
![31(파일업로드)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/b98752a5-14cc-4ddd-83f5-17dfe96d4dcd)
### 파일 다운로드
* ###### 게시글 조회할 때 파일 이름을 클릭 시 파일을 다운로드할 수 있습니다.
![32(파일 다운로드)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/8a186647-c0ac-430a-9845-f505056f13e9)
### 파일 수정
* ###### 게시글 수정 버튼을 누르면 파일도 같이 수정할 수 있다. 여러 개의 파일을 한 번에 업로드할 수 있습니다.
![33(파일 수정)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/5fd9b377-e834-4806-a7bb-ce1860ebdd99)
![33_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/4e5dbcae-18ce-4222-b4ed-4ba9bae9caf1)
### 파일 삭제
* ###### 파일을 각각 따로 삭제가 가능합니다. 게시글을 삭제하면 전체 다 삭제됩니다.
![34(파일삭제)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/35dd95e7-2b2c-4e01-b22d-cc3e3bafe3f0)
&nbsp;

## 회원 기능
### 회원가입
* ###### 메인페이지와 로그인 페이지에서 회원가입을 진행할 수 있다. 
![35(회원가입)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c9086e59-9734-43f0-b25f-581c13ab6166)
![35_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/638b36a4-71dd-4614-a086-93580e556d78)
![35_3](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/7c7784ef-0a03-4e43-9f49-ee0d8151a6a4)
* ###### 주소를 입력할 때 카카오주소를 사용하여 입력합니다. 회원가입을 통해 서비스에 사용자 정보를 저장합니다.
![36(카카오주소)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/db0e0f35-b8fe-434e-a665-fd787fb93abc)
&nbsp;

### 로그인/로그아웃
* ###### 회원가입할 때 입력했던 아이디와 비밀번호를 입력합니다.
![37(로그인)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/0b832d80-4b4d-4f2d-9f2d-a9fec110817e)
* ###### 로그인에 성공하면 메인페이지로 자동으로 이동하고 헤더에 사용자의 아이디가 표시됩니다.
![38(로그인시 메인페이지 이동)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c5abe843-377e-48f2-939c-3e53664d4f3f)
* ###### 로그인을 완료하면 브라우저의 ```Local Storage``` 에 사용자 ```ID```와 ```JWT``` 토큰 정보를 저장합니다.
![39(토큰)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/39a63d30-edd6-4f75-912a-90af97b37c09)
* ###### 로그아웃
![40(로그아웃)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/79d4e9fc-f062-43e3-a034-12b6a9423a59)
* ###### 로그아웃을 완료하면 브라우저의 ```Local Storage``` 의 내용도 삭제합니다.
![41(로그아웃 토큰)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/1449ceff-e81a-4da8-bd92-fd2328fe5f41)
&nbsp;

### 회원탈퇴
* ###### 마이페이지(아이디 클릭)에서 회원탈퇴가 가능합니다.
![42(마이페이지)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/d6759c36-b218-4cf1-ac54-4be87110d98d)
![42_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/dc22299f-b316-48c7-b422-7ecf519ac601)
* ###### DB 에서도 회원 데이터 정보가 삭제된 모습을 볼 수 있습니다.
![43(회원탈퇴 db)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/e02b2ef0-9ec1-41f2-9e43-b949a81ebf99)
### 회원정보수정
* ###### 회원정보수정
![44(회원정보 수정)](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/1fd243da-d796-452e-a98e-918e02cb712c)
![44_2](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/63d7013a-0fe9-4a27-b704-8c4e48dfc095)
![44_3](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c8e7cc2c-260d-42b1-8f52-f9f35f019ba3)
&nbsp;

## ELK Stack을 이용한 데이터 분석 및 시각화 기능
### CSV 데이터를 Elastic 검색으로 가져오고 React를 사용하여 시각화
* ###### ELK(Elastic search, Logstash, Kibana) Stack을 활용하여 데이터 분석 및 시각화 기능을 보여줍니다. 효율적인 저장 및 인덱싱을 위해 Excel 파일의 데이터를 CSV 형식으로 변환한 다음 ELK로 import.
![8](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/4885aa89-cff6-41a9-addc-e7fbefb158df)
![9](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c2b0a6ef-ac8d-415f-ba4e-49028610d733)
* ###### Elastic search에서 가져온 데이터는 React 응용 프로그램을 통해 시각화되고 사용자에게 표시됩니다. 이를 통해 대화형의 사용자 친화적인 데이터 탐색 및 분석이 가능합니다.
![7](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/1965d7e0-7759-4a41-b33c-c18ea62e6645)
* ###### 대출 제품 데이터를 가져오고, 사용자가 데이터를 검색, 필터링 및 탐색할 수 있습니다. 또한 프록시 구성을 사용하여 React 응용 프로그램과 Elastic 검색 간의 통신이 가능하므로 응용 프로그램이 시각화 및 상호 작용을 위해 Elastic 검색에서 데이터를 검색할 수 있습니다.
![10](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/36ea5996-02b5-4c67-8215-6bbb889365d6)
![11](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/68f002c4-1413-4015-b7bf-8dc34f8e894a)
&nbsp;

## 데이터 예측 기능
### 선형 회귀 분석을 사용하여 응답에서 로그인된 쿼리 값에 대한 데이터 검색 자동화 및 DB 업데이트
* ###### 데이터 예측 기능은 선형 회귀 및 다항식 선형 회귀와 같은 기계 학습 알고리즘을 활용합니다. 로그인한 쿼리 값은 React의 데이터베이스에서 자동으로 가져와 업데이트됩니다. 이를 통해 학습된 AI 모델을 기반으로 예측 금리를 실시간으로 검색하고 활용할 수 있습니다. 선형 회귀 알고리즘은 쿼리 값을 검색하고 업데이트하는 프로세스를 자동화하는 데 사용됩니다.
![12](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/39b39ef5-89ac-47e7-9c12-5a33721a885f)
![13](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/54aae90f-aa2b-4517-8d22-d22dcf1106fa)
* ###### ```Local Storage``` 에서 사용자에 대한 ID값을 가져와 쿼리가 제공된 사용자 ID를 기반으로 데이터베이스에서 연령 및 성별 정보를 검색한다. 그리고 React 코드가 HTTP GET 요청을 Flask API에 수행하여 사용자 ID를 쿼리 매개 변수로 전달할 수 있습니다. 그런 다음 파생된 값을 JSON으로 반환합니다.
![16](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/d25c77e0-23ba-4c02-a84c-8baf98118bf7)
![17](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c6fb29ce-dc5e-45be-987f-e90a1fe913c6)
![19](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/c828663c-b244-43cc-8de2-e2d90dc7dc93)
### 대출한도 및 대출 기간 입력에 따른 다항식 선형 회귀를 이용한 금리 예측
* ###### 다항식 선형회귀는 대출한도와 대출기간 값을 입력하여 금리를 예측하는 데 활용됩니다. 결과 예측은 정확하며 대출 상품의 맥락에서 정보에 입각한 의사 결정을 가능하게 합니다.
![14](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/ede9eaa4-c505-4a3d-b69b-f2f0f682fe7f)
![15](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/47314855-74b3-4132-9cef-741f56986f68)

* ###### Flask 서버측 코드는 대출 한도 및 대출 기간 입력을 기반으로 예측을 처리하는 경로를 정의하고 React 구성 요소는 이러한 값을 입력하고 서버에서 반환되는 예측 금리를 표시하는 사용자 인터페이스를 제공합니다.
![18](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/24b3fb47-093b-4696-9e1d-1d30f3f8043d)
![20](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/4f7eca71-7513-4252-bcaa-22a03275ddac)
&nbsp;

## ✓ELK
### Elasticsearch
![7](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/0b2065f1-8754-4fbd-85cf-c9501798afce)
&nbsp;

## ✓ERD설계
![6](https://github.com/Hooddduck/BKHJ-frontend/assets/117276980/132866bf-91f7-4f7f-8ac1-a3ddc93f74ac)
&nbsp;

## ❕❕트러블슈팅
### 1. 회원탈퇴
회원정보를 jwt, accessToken을 사용하여 개발하였는데 회원정보 삭제 기능에 있어서 토큰을 찾지 못하여 회원정보가 삭제가 되지 않는 문제가 발생하였습니다. </br>
예상으로는 axios를 걸어주는 service부분에서 문제가 발생하여 계속해서 토큰을 찾지못하는 문제점이었습니다.
&nbsp;
```
deleteMember() {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    };

    return axios.delete(API_URL + `delete/${user.id}`, config);
  }
```
* 발생조건 파악하기
    * 토큰 저장소 확인: 액세스 토큰이 브라우저의 localStorage에 올바르게 저장되어 있는지 확인합니다. 브라우저 개발자 도구를 사용하여 localStorage를 검사하고 토큰이 올바른 키(이 경우에는 'user')로 저장되었는지 확인할 수 있습니다. 사용자가 로그인하거나 등록할 때 토큰이 올바르게 저장되고 있는지 확인합니다.
    * 토큰 만료 확인: 토큰을 제대로 검색하고 있지만 구성원 삭제 프로세스 중에 여전히 찾을 수 없는 경우, 토큰이 만료되었을 수 있습니다. 토큰 만료 메커니즘을 확인하고 만료된 토큰이 제대로 처리되는지 확인합니다.
    * 토큰 가용성 보장: deleteMember() 함수가 호출될 때 액세스 토큰을 사용할 수 있는지 확인합니다. 제공된 코드에서는 토큰이 localStorage에 저장되고 localStorage.getItem('user')을 사용하여 검색되는 것으로 가정합니다. localStorage에서 가져온 사용자 개체에 액세스 권한이 포함되어 있는지 확인합니다.
* **해결법**
    * ```localStorage:``` 웹 응용 프로그램이 브라우저에 데이터를 저장할 수 있도록 해주는 웹 API입니다. 쿠키와 유사하지만 용량이 더 크고 보안이 향상된 키 값 스토리지 메커니즘을 제공합니다. </br>
    * ```getItem()``` 메서드는 지정된 키와 연결된 값을 검색하는 데 사용됩니다. 이 경우 키는 'user'입니다. </br>
    * ```JSON.parse()``` 함수를 호출하여 검색된 문자열을 JSON으로 구문 분석하고 JavaScript 개체로 변환합니다. </br>
    * 이 코드를 실행한 후 사용자 변수에는 localStorage에서 검색된 사용자 데이터가 포함됩니다. </br>
* localStorage를 활용하여 문제점을 해결할 수 있었습니다.
&nbsp;

### 2. ELK Stack을 이용한 데이터 분석 및 시각화 기능을 위해 python에서 kibana검색을 불러와서 react로 화면 출력
* 상황 파악: </br>
React 응용 프로그램의 **프록시**를 사용하여 Elastic 검색에서 데이터를 불러왔습니다. 그런데 특정 컬럼에대한 관련 모든 데이터를 검색 후 불러오는 과정에서 오류가 발생하였습니다.
```
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9200", // Replace with your Elasticsearch endpoint
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/product/_doc/_search?size=186", // Replace with your Elasticsearch path
      },
    })
  );
};
```
이 코드에는 seq 값의 존재에 따라 API 끝점을 결정하는 조건문 const apiUrl = seq ? /api/${seq} : "/api"가 포함됩니다.
이 문제는 useEffect 종속성 배열에 [apiURL]을 추가하고 response.data.hits.hits의 길이를 확인하여 데이터 가용성을 보장함으로써 해결됩니다.
&nbsp;

* 오류발생 출처: </br>
    * 이 문제의 원인은 useEffect 종속성 배열에 apiUrl 값이 잘못 사용되었거나 없기 때문인 것 같습니다.
    * apiUrl 값이 종속성 배열에 포함되지 않으면 apiUrl 값이 변경될 때 영향이 트리거되지 않아 일관성 없는 데이터 검색이 발생할 수 있습니다.
```
  const apiUrl = seq ? `/api/${seq}` : "/api";

  useEffect(() => {
    fetchLoanProduct();
  }, [apiUrl]);
```
&nbsp;

* 발생 조건: </br>
이 문제는 ELK에서 특정 열의 데이터를 검색할 때 발생합니다.
특히 seq 값이 존재하는 경우 apiUrl을 /api/${seq}(으)로 설정하여 특정 문서에 대한 데이터를 가져와야 합니다. 그렇지 않으면 apiUrl을 "/api"로 설정하여 모든 데이터를 검색해야 합니다. 또한 useEffect 종속성 배열에 apiUrl 값이 포함되지 않은 경우 이 문제가 발생할 수 있습니다.
&nbsp;

* **해결법:** 다음 단계를 통해 문제를 해결합니다. </br>
    * seq 값을 기준으로 apiUrl 변수가 올바르게 설정되었는지 확인합니다. seq가 있으면 apiUrl을 /api/${seq}로 설정하고, 그렇지 않으면 "/api"로 설정합니다.
    * apiUrl 값이 변경될 때 효과를 트리거하려면 useEffecthook의 종속성 배열에 [apiUrl]을 포함합니다.
    * response.data.hits.hits의 길이를 확인하여 데이터에 액세스하기 전에 데이터를 사용할 수 있는지 확인합니다. 이렇게 하면 빈 배열의 속성에 액세스할 때 발생할 수 있는 오류를 방지할 수 있습니다.
```
const LoanProduct = () => {
  const [showModal, setShowModal] = useState(false);
{/* 자세히보기  */}
<>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : selectedLoanProduct ? (
            <DetailViewProduct seq={selectedLoanProduct.seq} />
          ) : (
            <p>No loan product details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="footerbutton"
          onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
</>
}
```
&nbsp;
```
const DetailViewProduct = () => {
const { seq } = useParams();
  const [loanProduct, setLoanProduct] = useState([]);
  const apiUrl = seq ? `/api/${seq}` : "/api";

  useEffect(() => {
    fetchLoanProduct();
  }, [apiUrl]);

  const fetchLoanProduct = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (
        response.data &&
        response.data.hits &&
        response.data.hits.hits.length > 0
      ) {
        setLoanProduct(response.data.hits.hits[0]._source);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error retrieving loan product:", error);
    }
  };
}
```
&nbsp;

* 요약: </br>
    * 이 문제는 useEffect 종속성 배열에 apiUrl 값이 잘못 사용되거나 없기 때문에 발생했으며 response.data.hits.hits.hits의 데이터 가용성에 대한 유효성을 검사하지 않았기 때문에 발생했습니다.
    * 종속성 배열에 [apiUrl]을(를) 추가하고 response.data.hits.hits의 길이를 확인하여 문제를 해결했습니다.
    * seq 값을 기준으로 apiUrl을 올바르게 설정하고 데이터 가용성을 적절하게 처리하여 일관성 있고 신뢰할 수 있는 데이터 검색을 보장해야 합니다.
&nbsp;

### 3. spring boot로 백엔드를 개발하였는데 데이터 예측 기능을 만들기 위해 선형회귀 적용 가능한 python으로 백엔드 추가 개발하여 react로 화면 출력
* 상황 파악: </br>
    * 제공된 코드는 선형 회귀를 사용하여 대출 제품 추천을 위해 Python Backend와 통신하는 React Frontend를 포함합니다.
    * **Python 서버는 localhost:5000에서 호스팅**되며 프런트 엔드는 Axios를 사용하여 Backend로 요청을 보냅니다.
    * 이 문제는 Python Backend에서 로그인한 사용자의 ID 값을 검색하는 것과 관련이 있습니다.
    * Frontend는 JWT와 액세스를 사용합니다.토큰을 사용하여 사용자를 인증하고 사용자의 ID를 얻습니다.
```
[메모장 코드 작성]
```
&nbsp;

* 문제 발생 출처: </br>
    * 로그인 상태에서 해당 ID 값을 검색할 수 없었습니다. 이 문제는 토큰 추출 프로세스 또는 ID가 Backend로 전송되는 방식에 오류가 있었던 것 같습니다.
    * 로그인상태의 해당 ID값을 가져와 결과값을 도출을 해결했는데 Python서버가 DB검색을 자동화하지않아 회원가입을 할때마다 Python서버를 껏다켜야하는 문제가 발생했습니다.
&nbsp;

* 발생 조건: </br>
    * 사용자가 Python Backend에 ID를 명시적으로 입력하지 않고 React Frontend에서 로그인할 때 발생합니다. Frontend는 JWT와 액세스를 활용합니다.토큰을 사용하여 사용자를 인증하고 ID를 얻습니다. 그러나 ID 값이 Backend 측에서 성공적으로 검색되지 않습니다.
&nbsp;

* **해결법:** </br>
    * Frontend:
        * 토큰이 프런트 엔드에 올바르게 저장되어 있고 API 요청 시 액세스할 수 있는지 확인합니다.
        * 토큰 추출 프로세스에서 ID 값이 토큰에서 올바르게 추출되었는지 확인합니다.
        * API를 호출하기 전에 AuthService.getCurrentUser()에서 가져온 currentUser.id 값이 null이거나 정의되지 않았는지 확인합니다.
        * Axios 요청에 사용된 URL 형식(http://localhost:hostname/api/customization?id=${currentUser.id })을 다시 확인하여 백엔드 끝점과 일치하는지 확인합니다.
```
const Customization = () => {
const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:5000/api/customization?id=${currentUser.id}`)
        .then(response => {
          setDerivedValues(response.data);
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
    }
  }, [currentUser]);
}
```
    * Python Backend:
        * Flask endpoint /api/customization을 디버그하여 수신된 ID 값이 없음이 아니라 올바른지 확인합니다.
        * 데이터베이스 쿼리가 MySQL 데이터베이스의 스키마 및 테이블 구조와 일치하는지 확인합니다.
        * PooledDB 클래스를 사용하여 특정 데이터베이스에 대한 연결 풀을 만들고 관리합니다. 연결 풀을 사용하면 필요할 때마다 새 연결을 만들지 않고 재사용할 수 있는 사전 초기화된 데이터베이스 연결 풀을 설정할 수 있습니다. pymysql.cursors의 DictCursor 클래스가 사용됩니다. 이 커서 클래스는 쿼리 결과를 사전으로 반환합니다.
        * ID 값이 쿼리에서 올바르게 사용되고 사용자 테이블에서 원하는 정보를 검색하는지 확인합니다.
        * 데이터 검색, 예측 및 JSON 응답과 관련된 문제를 디버그하여 예상대로 작동하는지 확인합니다.
&nbsp;

* 요약: </br>
    * 이 문제는 Python 백엔드에서 로그인한 사용자의 ID 값을 검색하지 못해 발생합니다.
    * 문제 해결 단계에는 토큰 추출 프로세스 확인, Frontend에서 currentUser.id 의 유효성 확인, Backend 엔드포인트 및 데이터베이스 쿼리의 정확성 확인이 포함됩니다.
```
# Cache to store previously computed customization results
customization_cache = {}

@app.route('/api/customization')
def get_customization():
    user_id = request.args.get('id')
    cached_result = customization_cache.get(user_id)

    if cached_result:
        # If the customization result is cached, return it directly
        return jsonify(cached_result)

    # Acquire a connection from the connection pool
    connection = pool.connection()
    with connection.cursor() as cursor:
        # 데이터베이스에서 연령 및 성별 검색
        query = f"SELECT AGE, GENDER FROM users WHERE id={user_id}"  # 쿼리와 일치하도록 <조건> 수정
        cursor.execute(query)
        result = cursor.fetchone()

    # Return the derived values as JSON
        derived_values = {
            'predictions': predictions.tolist(),
            'result': result
        }

        # Cache the customization result
        customization_cache[user_id] = derived_values

```
&nbsp;

* 필요한 모듈(풀링된 DB 및 커서)을 가져오고 데이터베이스 연결 풀을 수정하면 Backend가 MySQL 데이터베이스와의 연결을 자동화 설정할 수 있었습니다. </br>

```
import pymysql
from pymysql import cursors

# MySQL 데이터베이스에 대한 연결 풀 만들기
pool = PooledDB(
    creator=pymysql,  # Specify the database adapter (e.g., pymysql, psycopg2)
    host='localhost',
    user='root',
    password='root',
    database='bikyohaejwo',
    charset='utf8mb4',
    cursorclass=cursors.DictCursor,
    autocommit=True,
    maxconnections=10  # Adjust the pool size as per your requirements
)
```
* ID 값이 데이터 검색 및 대출 상품 권장 사항을 위해 올바르게 수신되어 데이터베이스 쿼리에서 사용됨으로써 데이터 검색, 예측 및 JSON 응답을 성공적으로 수행할 수 있습니다.
&nbsp;

## ✓참고사항
* **개발 순서**
    * 회원 로그인 [token, security] -> 게시판[ back -> front ]  ->   댓글 [ back -> front] -> 파일 [ back -> front] -> </br>
    * 회원탈퇴, 회원정보수정 [token, security] -> 댓글 조회수 [ back -> front ] -> </br>
    * id 마다 각각 Role 부여 [ back -> front] -> 공공데이터 수집 [webscapping] -> </br>
    * Python 통해서 데이터 정제 및 csv파일로 변환(numpy,pandas) [ python -> ELK ] + ELK에 해당 파일 import(분석) => </br>
    * ElK에 있는 URL 통해서 Rest Api 설정 => React로 전달(시각화) -> </br> 
    * 회원가입, 회원정보수정 폼 업데이트 [ back -> front] -> dummy 데이터 생성 및 정제 [ 회귀분석(Python) ] + 금리, 대출한도를 통한 [ 다항선형회귀분석(Python) ] -> 전반적인 UI변경 [ front ]

============================================================================

