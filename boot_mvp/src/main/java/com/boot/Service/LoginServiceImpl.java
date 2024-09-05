package com.boot.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.boot.DAO.UsertbDAO_3;
import com.boot.DTO.UsertbDTO;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UsertbDAO_3 userdao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UsertbDTO> getUserList() {
        return userdao.getUserList();
    }

    @Override
    public UsertbDTO getUserById(String id) {
        return userdao.getUserById(id);
    }

    @Override
    public UsertbDTO getUserByEmail(String email) {
        return userdao.getUserByEmail(email);
    }

    @Override
    public void insertUser(UsertbDTO userdto) {
        if (!userdto.getPname().isEmpty() && !userdto.getEmail().isEmpty()) {
            // 비밀번호 암호화
            userdto.setPpass(passwordEncoder.encode(userdto.getPpass()));
            userdao.insertUser(userdto);
        }
    }

    @Override
    public void updateUser(UsertbDTO userdto) {
        if (!userdto.getPpass().isEmpty()) {
            // 비밀번호 암호화
            userdto.setPpass(passwordEncoder.encode(userdto.getPpass()));
        }
        userdao.updateUser(userdto);
    }

    @Override
    public void deleteUser(String id) {
        userdao.deleteUser(id);
    }

    @Override
    public boolean checkUserIdExists(String userid) {
        return userdao.checkUserIdExists(userid) > 0;
    }
}