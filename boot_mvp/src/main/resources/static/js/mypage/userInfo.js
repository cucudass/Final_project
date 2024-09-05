$(document).ready(function()
{
    /*
        2024-09-01 서연주 
        서브메뉴 눌렀을 때 메뉴 활성화 : active
    */
    $('.subHeader ul li').click(function(){
        $(this).addClass('active');
        $('.navMenu ul li').not(this).removeClass('active');
    });

	/*
		2024-09-04 서연주
		POPUP > 열기
	*/
	$('.modifyBtn').click(function() {
	    console.log("click");
	    // 버튼의 부모 요소 중 .infoDetail을 찾고, 그 안의 .popUp을 선택하여 보여줌
	    $(this).closest('.infoDetail').find('.popUp').css({"display":"flex"}); 
	});

	
	
	/*
		2024-09-04 서연주
		POPUP > 닫기
	*/
	$('.popUp .icon.cancel').click(function(){
		console.log("click");
		$(this).parents('.popUp').css({"display":"none"}); 
	}); 

	$('button.cancel').click(function(){
		console.log("click");
		$(this).parents('.popUp').css({"display":"none"}); 
	}); 


	/*
		2024-09-04 서연주
		회원정보 변경(수정버튼 누르면 변경한 값을 가지고 와서 실행)
	*/
	  function updateInfo(type, url, inputId, csrfTokenId) {
	      event.preventDefault(); // 폼 제출 기본 동작을 막음
	      
	      const newValue = document.getElementById(inputId).value; // 입력값 가져오기
	      const csrfToken = document.getElementById(csrfTokenId).value; // CSRF 토큰 가져오기
	      console.log("csrfToken:" + csrfToken);

	      // 인증 토큰이 필요하면 헤더에 추가하여 fetch 요청
	      fetch(url, {
	          method: "PATCH",
	          headers: {
	              "Content-Type": "application/json",
	              "X-CSRF-TOKEN": csrfToken
	          },
	          body: JSON.stringify({ [type]: newValue }) // JSON 형식으로 전송
	      })
	      .then(response => {
	          if (response.ok) {
	              return response.text();
	          } else {
	              throw new Error(`${type} 변경에 실패했습니다.`);
	          }
	      })
	      .then(data => {
	          alert(data); // 성공 메시지 표시
	          // 팝업창 닫기
	          $(`#${inputId}`).closest('.popUp').css({ "display": "none" });
	      })
	      .catch(error => {
	          console.error("에러 발생:", error);
	          alert(error.message);
	      });
	  }

	  // 이메일 변경 버튼 > 이메일은 변경 불가하도록 변경
//	  $('#emailForm .updateBtn').click(function () {
//	      updateInfo('email', '/api/user/email', 'email', 'token');
//	  });

	  // 휴대폰번호 변경 버튼
	  $('#phoneForm .updateBtn').click(function () {
	      updateInfo('phone', '/api/user/phone', 'phone', 'token');
	  });
	
	  // 비밀번호 변경 버튼
	  $('#ppassForm .updateBtn').click(function () {
			event.preventDefault(); // 폼 제출 기본 동작을 막음

		   const password = $('#ppass').val();
		   const passwordCheck = $('#ppass_check').val();

		   // 비밀번호와 비밀번호 확인 필드가 같은지 확인
		   if (password !== passwordCheck) {
		       alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
		   } else {
		       // 비밀번호가 일치하면 updateInfo 호출
		       updateInfo('ppass', '/api/user/password', 'ppass', 'token');
		   }
	  });
	  
		let valid = false; // 유효성 검사 통과 여부 저장하는 변수
		// 생년월일 유효성 검사
		$('#birth').on('input', function () {//입력필드에 입력할 때 마다
			
			var dateStr = $(this).val();//현재 입력되고 있는 값
		
			// 정규식을 이용하여 YYYY-MM-DD 형식과 두 자리 월/일 검사
			var dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
		
			// 날짜가 올바른 형식인지 확인
			if (dateFormat.test(dateStr)) {
				var year = Number(dateStr.substr(0, 4)); // 입력한 값의 0~4자리까지 (연)
				var month = Number(dateStr.substr(5, 2)); // 입력한 값의 5번째 자리부터 2자리 숫자 (월)
				var day = Number(dateStr.substr(8, 2)); // 입력한 값 9번째 자리부터 2자리 숫자 (일)
				var today = new Date(); // 날짜 변수 선언
				var yearNow = today.getFullYear(); // 올해 연도 가져옴
		
				// 연도의 경우 1900보다 작거나 yearNow보다 크다면 false를 반환합니다.
				if (1900 > year || year > yearNow) {
					$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
					$('#birth_check').css({ "display": "flex" });
					valid = false;
				} else if (month < 1 || month > 12) {
					$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
//					$('#birth_check').css({ "display": "flex", "color":"#9b4e4e", "padding":"5px 20px" });
					$('#birth_check').css({ "display": "flex" });
					valid = false;
				} else if (day < 1 || day > 31) {
					$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
					$('#birth_check').css({ "display": "flex" });
					$('#user_birthdate').focus;
					valid = false;
				} else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
					$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
					$('#birth_check').css({ "display": "flex" });
					valid = false;
				} else if (month == 2) { // 윤달 확인
					var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
					if (day > 29 || (day == 29 && !isleap)) {
						$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
						$('#birth_check').css({ "display": "flex" });
						valid = false;
					} else {
						valid = true;
						$('#birth_check').css('display', 'none');
					}
				} else {
					// $('#birth_check').text('');
					valid = true;
					$('#birth_check').css('display', 'none');
				}
			} else {
				// 형식이 맞지 않거나 두 자리 수가 아닐 때
				$('#birth_check').text('생년월일을 1900-01-01형식으로 입력하세요');
				$('#birth_check').css({ "display": "flex" });
				valid = false;
			}
		
		}); //생년월일 유효성 검사 끝	

	
	  // 생년월일 변경 버튼
	  $('#birthForm .updateBtn').click(function () {
			event.preventDefault(); // 폼 제출 기본 동작을 막음
			console.log("생년월일수정버튼 클릭")
			
			//생년월일 유효성 검사에 통과했으면 birthJ
			if (valid || ($('#newbirth').val() !== null && $('#newbirth').val() !== "")) {
	     		updateInfo('birth', '/api/user/birth', 'birth', 'token');
				
			} else {
				alert("생년월일 값을 형식에 맞춰 입력해주세요.");
				$('#birth').focus();
				return; // 함수 종료
			}
		
	  });
	  
	  // 환불계좌 변경 버튼
	  $('#accountForm .updateBtn').click(function () {
	      updateInfo('account', '/api/user/account', 'account', 'token');
	  });
	  
	  
	  // 휴대폰 번호 입력 필드에 하이픈 자동 추가
	     document.getElementById('phoneInput').addEventListener('input', function(e) {
	         let input = e.target.value;
	         
	         // 숫자만 남기기
	         input = input.replace(/\D/g, '');
	         
	         // 하이픈 추가
	         if (input.length > 6) {
	             input = input.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
	         } else if (input.length > 3) {
	             input = input.replace(/(\d{3})(\d+)/, '$1-$2');
	         }
	         
	         e.target.value = input;
	     });
	     
	     
	  // 생년월일 입력 필드에 하이픈 자동 추가
	  	document.getElementById('birthInput').addEventListener('input', function(e) {
	  	    let input = e.target.value;
	  	    
	  	    // 숫자만 남기기
	  	    input = input.replace(/\D/g, '');

	  	    // 하이픈 추가
	  	    if (input.length > 4 && input.length <= 6) {
	  	        input = input.replace(/(\d{4})(\d+)/, '$1-$2');
	  	    } else if (input.length > 6) {
	  	        input = input.replace(/(\d{4})(\d{2})(\d+)/, '$1-$2-$3');
	  	    }
	  	    
	  	    e.target.value = input;
	  	});
	


});// document ready 끝