package cn.haiyang.service.user;

import cn.haiyang.domain.user.UserModel;

public interface IUserService {
	public UserModel findByUsername(String username);

	public UserModel findByPhone(String phone);

	public boolean addUser(UserModel user);
}
