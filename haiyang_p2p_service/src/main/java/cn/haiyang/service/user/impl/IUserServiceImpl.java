package cn.haiyang.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.haiyang.dao.user.IUserDao;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.service.user.IUserService;

@Service
public class IUserServiceImpl implements IUserService {

	@Autowired
	private IUserDao iUserDao;

	@Override
	public UserModel findByUsername(String username) {
		// TODO Auto-generated method stub
		return iUserDao.findByUsername(username);
	}

	@Override
	public UserModel findByPhone(String phone) {
		// TODO Auto-generated method stub
		return iUserDao.findByPhone(phone);
	}

	@Override
	public boolean addUser(UserModel user) {
		UserModel u = iUserDao.save(user);
		return u != null;
	}

	@Override
	public UserModel login(String username,String password){
		return  iUserDao.findByUsernameAndPassword(username,password);
	}

	@Override
	public UserModel findById(int userId) {
		return iUserDao.findOne(userId);
	}
}
