package cn.haiyang.dao.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cn.haiyang.domain.admin.AdminModel;

public interface IAdminDAO extends JpaRepository<AdminModel,Integer>{

    @Query("select a from AdminModel  a where a.username=?1 and a.password=?2")
    public AdminModel login(String username,String password);
}
