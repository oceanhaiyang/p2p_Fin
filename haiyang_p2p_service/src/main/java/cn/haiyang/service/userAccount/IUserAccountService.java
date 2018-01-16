package cn.haiyang.service.userAccount;

import cn.haiyang.domain.userAccount.UserAccountModel;

public interface IUserAccountService {

	void add(int id);
	UserAccountModel findByUserId(int userId);

}
