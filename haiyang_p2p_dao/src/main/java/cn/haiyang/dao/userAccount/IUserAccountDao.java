package cn.haiyang.dao.userAccount;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.haiyang.domain.userAccount.UserAccountModel;

public interface IUserAccountDao extends JpaRepository<UserAccountModel, Integer>{
    UserAccountModel findByUserId(int userId);

}
