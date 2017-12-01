package cn.haiyang.service.admin.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.haiyang.dao.admin.IAdminDAO;
import cn.haiyang.domain.admin.AdminModel;
import cn.haiyang.service.admin.IAdminService;

@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private IAdminDAO adminDAO;

    @Override
    public AdminModel login(String username, String password) {
        return adminDAO.login(username,password);
    }
}