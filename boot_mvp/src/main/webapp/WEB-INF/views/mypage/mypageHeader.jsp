<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyMVP_쿠폰/할인권</title>
    <link rel="stylesheet" type="text/css" href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'>  
    <!-- google font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />    
    <!-- import font-awesome, line-awesome -->
    <!-- <link rel="stylesheet" href="${pageContext.request.contextPath}/css/board_detail.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css">
	<!-- swiper-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <!-- import js -->
    <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage/default.css">
</head>
<style>

	.section
	{
	    display: flex;
	    flex-direction: column;
	    gap: 0 40px;
	}
	.subHeader 
	{
	    height: 40px;
	    display: flex;
	    /* justify-content: center; */
	    align-items: center;
	    /* padding: 0 20px; */
	    box-sizing: border-box;
	    max-width:1600px;
	    
	}

	.submenuList 
	{
	    display: flex;
	    gap: 0 20px;
	    color: rgba(153, 162, 185, 0.3);
	    font-size: 16px;
	    font-weight: 600;
	    margin-left: 299px; 
	}


	a.active
	{
	    color: var(--sub-gray);
	    text-decoration: none;
	}
	
</style>
<body>
    
        <div class="subHeader">
            <ul class="submenuList">
                <li class="submenu"><a href="ticket">예매관리</a></li>
                <li class="submenu"><a href="membership">멤버십</a></li>
                <li class="submenu"><a href="movieStory">무비스토리</a></li>
                <li class="submenu"><a href="coupon">쿠폰/할인권</a></li>
                <li class="submenu"><a href="userInfo">회원정보</a></li>
                <li class="submenu"><a href="withdraw">회원탈퇴</a></li>
            </ul>
        </div>
</body>
</html>
<script>
	
	/*
       2024-09-01 서연주 
       선택한 메뉴 색상변경(클래스에 active추가)
   */
   // 모든 링크를 선택합니다.
   const links = document.querySelectorAll('.submenu a');

   // 각 링크에 클릭 이벤트를 추가합니다.
   links.forEach(link => {
       link.addEventListener('click', function(event) {
           // 기본 링크 동작을 방지합니다.
           event.preventDefault();
           
           // 현재 활성화된 항목의 active 클래스를 제거합니다.
           document.querySelector('.submenu.active')?.classList.remove('active');
           
           // 클릭된 링크의 부모 <li>에 active 클래스를 추가합니다.
           this.parentElement.classList.add('active');
           
           // 원래의 링크 이동을 수행하고 싶다면, 아래 주석을 해제하세요.
			 window.location.href = this.href;
       });
   });
</script>