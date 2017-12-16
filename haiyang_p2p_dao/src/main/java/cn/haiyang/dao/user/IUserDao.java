package cn.haiyang.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.haiyang.domain.user.UserModel;

public interface IUserDao extends JpaRepository<UserModel, Integer>{
	public UserModel findByUsername(String username );

	public UserModel findByPhone(String phone);
}
