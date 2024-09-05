package com.boot.Service;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.boot.DAO.UsertbDAO_4;
import com.boot.DTO.SelecGenretbDTO;
import com.boot.DTO.UsertbDTO;
import com.boot.Security.CustomUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service("UserService_4")
@Slf4j
public class UserImpl_4 implements UserService_4 {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	

	@Override
//	@Transactional  // 트랜잭션이 적용된 메서드
	public void updateEmail(UsertbDTO user) {
		log.info("updateEmail 서비스임플");
		
		String loginedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		log.info("@# currentUserId=>"+loginedUserId);
		
		String email = user.getEmail();
        log.info("@# 바꿀 이메일=>"+email);
		
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.updateEmail(email, loginedUserId);
	}

	@Override
	public void updatePassword(UsertbDTO user) {
		log.info("updatePassword 서비스임플");
		String loginedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String ppass = passwordEncoder.encode(user.getPpass());//requestbody에서 꺼낸 비밀번호를 인코딩
		log.info("updatePassword ppass========>"+ppass);
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.updatePassword(ppass, loginedUserId);
		
	}
	
	@Override
	public void updatePhone(UsertbDTO user) {
		log.info("updatePhone 서비스임플");
		
		String loginedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String phone = user.getPhone();
        log.info("@# 바꿀 핸드폰번호=>"+phone);
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.updatePhone(phone, loginedUserId);
	}
	
	@Override
	public void updateBirth(UsertbDTO user) {
		log.info("updateBirth 서비스임플");
		String loginedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String birth = user.getBirth();
        log.info("@# 바꿀 생년월일=>"+birth);
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.updateBirth(birth, loginedUserId);
		
	}
	
	@Override
	public void updateAccount(UsertbDTO user) {
		log.info("updateAccount 서비스임플");
		String loginedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String account = user.getAccount();
        log.info("@# 바꿀 환불계좌=>"+account);
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.updateAccount(account, loginedUserId);
		
	}
	
	@Override
	public void updateSelectGenre(String genreList) {
		log.info("updateSelectGenre 서비스임플");
		log.info("@# 바꿀 장르리스트=>"+genreList);
		
		//인증된 사용자 정보 가져옴
		CustomUserDetails  loginUser = (CustomUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		String uuid = loginUser.getUuId();
    	//선호장르가 ,로 구분된 문자열로 넘어오기 때문에 분리해서 배열로 만들어 insert해 줌
		if (genreList != null) {
			dao.deleteSelectGenre(uuid);//수정전 데이터 삭제
			String arr [] = genreList.split(",");
			for(int i = 0; i<arr.length; i++){
				dao.updateSelectGenre(arr[i], uuid); //새 데이터 입력
			}	
		}
		
	}
	
	@Override
	public void deleteSelectGenre(String uuid) {
		log.info("updateSelectGenre 서비스임플");
		log.info("updateSelectGenre uuid========>"+uuid);
		UsertbDAO_4 dao = sqlSession.getMapper(UsertbDAO_4.class);
		
		dao.deleteSelectGenre(uuid);
	}


	
	
}