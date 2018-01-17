package cn.haiyang.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.haiyang.domain.user.UserModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IUserDao extends JpaRepository<UserModel, Integer>{
	public UserModel findByUsername(String username );

	public UserModel findByPhone(String phone);



	public UserModel findByUsernameAndPassword(String username,String password);
	@Modifying
	@Query("update UserModel u set u.phone=?1 ,u.phoneStatus=1 where u.id=?2")
	void updatePhoneStatus(String phone,int userid);
}
