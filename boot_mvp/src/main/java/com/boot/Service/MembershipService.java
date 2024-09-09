package com.boot.Service;

import com.boot.DTO.UsertbDTO;

public interface MembershipService {
	//멤버십 생성(등급, 포인트, 마일리지)-회원가입시
	public String insertMembership();
	//멤버십 조회(등급, 포인트, 마일리지)
	public String getMembership();
	//포인트 업데이트(포인트이력이 생기면 등급, 포인트, 마일리지이 함께 변동됨)
	public String updateMembership();
	//포인트 삭제(탈퇴할 때 등급, 포인트, 마일리지이 함께 삭제)
	public String deleteMembership();
	

}