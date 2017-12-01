package cn.haiyang.service.admin;

import cn.haiyang.domain.admin.AdminModel;

public interface IAdminService {

    public AdminModel login(String username,String password);

}