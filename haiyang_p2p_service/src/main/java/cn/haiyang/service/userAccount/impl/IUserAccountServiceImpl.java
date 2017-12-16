package cn.haiyang.service.userAccount.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.haiyang.dao.userAccount.IUserAccountDao;
import cn.haiyang.domain.userAccount.UserAccountModel;
import cn.haiyang.service.userAccount.IUserAccountService;
@Service
public class IUserAccountServiceImpl implements IUserAccountService {
@Autowired
private IUserAccountDao udao;

@Override
public void add(int id) {
	UserAccountModel userAccount = new UserAccountModel();
	userAccount.setUserId(id);
	udao.save(userAccount);
	
}
}
