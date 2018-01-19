package cn.haiyang.action.user;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.domain.userAccount.UserAccountModel;
import cn.haiyang.filter.GetHttpResponseHeader;
import cn.haiyang.service.user.IUserService;
import cn.haiyang.service.userAccount.IUserAccountService;
import cn.haiyang.utils.*;
import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.*;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
@Namespace("/user")
public class UserAction extends BaseAction implements ModelDriven<UserModel>{
	
	private UserModel user = new UserModel();
	@Override
	public UserModel getModel() {
		// TODO Auto-generated method stub
		return user;
	}
	@Autowired
	private BaseCacheService baseCache;
	
	@Autowired
	private IUserAccountService accountservice;
	@Autowired
	private IUserService iUserService;
	
	
	/**
	 * 生产令牌
	 * @param userName
	 * @return
	 */
	public String generateUserToken(String userName) {

		try {
			// 生成令牌
			String token = TokenUtil.generateUserToken(userName);

			// 根据用户名获取用户
			UserModel user = iUserService.findByUsername(userName);
			// 将用户信息存储到map中。
			Map<String, Object> tokenMap = new HashMap<String, Object>();
			tokenMap.put("id", user.getId());
			tokenMap.put("userName", user.getUsername());
			tokenMap.put("phone", user.getPhone());
			tokenMap.put("userType", user.getUserType());
			tokenMap.put("payPwdStatus", user.getPayPwdStatus());
			tokenMap.put("emailStatus", user.getEmailStatus());
			tokenMap.put("realName", user.getRealName());
			tokenMap.put("identity", user.getIdentity());
			tokenMap.put("realNameStatus", user.getRealNameStatus());
			tokenMap.put("payPhoneStatus", user.getPhoneStatus());

			baseCache.del(token);
			baseCache.setHmap(token, tokenMap); // 将信息存储到redis中

			// 获取配置文件中用户的生命周期，如果没有，默认是30分钟
			String tokenValid = ConfigurableConstants.getProperty("token.validity", "30");
			tokenValid = tokenValid.trim();
			baseCache.expire(token, Long.valueOf(tokenValid) * 60);

			return token;
		} catch (Exception e) {
			e.printStackTrace();
			return Response.build().setStatus("-9999").toJSON();
		}
	}
	
	/**
	 * 产生uuid,保存到redis中
	 */
	@Action("uuid")
	public void user(){
		String uuid = UUID.randomUUID().toString();
		baseCache.set(uuid, uuid);
		baseCache.expire(uuid, 3*60);
		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").setUuid(uuid).toJSON());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 校验验证码
	 */
	@Action("codeValidate")
	public void codeValidate(){
		String signUuid = this.getRequest().getParameter("signUuid");
		String signCode = this.getRequest().getParameter("signCode");
		String _signCode = baseCache.get(signUuid);
		try {
			//录入为空
			if(StringUtils.isEmpty(signCode)){
				this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
				return;
			}
			//验证码为空
			if(StringUtils.isEmpty(_signCode)){
				this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.NULL_OF_VALIDATE_CARD).toJSON());
				return;
			}
			
			if(signCode.equalsIgnoreCase(_signCode)){
				this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
				return;
			}	
			else{
				this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.INPUT_ERROR_OF_VALIDATE_CARD).toJSON());
				return;
				}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 产生验证码，保存在redis中
	 */
	@Action("validateCode")
	public void validateCode(){
		String tokenUuid = this.getRequest().getParameter("tokenUuid");
		String uuid = baseCache.get(tokenUuid);
		try {
			if(StringUtils.isEmpty(uuid))
				return;
			String str = ImageUtil.getRundomStr();
			
			baseCache.del(uuid);
			baseCache.set(tokenUuid, str);
			baseCache.expire(tokenUuid, 3*60);
			
			ImageUtil.getImage(str, this.getResponse().getOutputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 验证用户名是否有效
	 */
	@Action("validateUserName")
	public void validateUserName(){
		String username = this.getRequest().getParameter("username");
		//iUserService.findByUsername(username);
		UserModel user = iUserService.findByUsername(username);
		try {
			if(user == null){
				this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
				return;
			}
			else{
				this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.ALREADY_EXIST_OF_USERNAME).toJSON());
				return;
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Action("validatePhone")
	public void validatePhone(){
		String phone = this.getRequest().getParameter("phone");
		//iUserService.findByUsername(username);
		UserModel user = iUserService.findByPhone(phone);
		try {
			if(user == null){
				this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
				return;
			}
			else{
				this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.MOBILE_ALREADY_REGISTER).toJSON());
				return;
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Action("signup")
	public void regist(){
		String pwdMd5 = MD5Util.md5(user.getUsername() + user.getPassword().toLowerCase());
		user.setPassword(pwdMd5);
		
		boolean flag = iUserService.addUser(user);
		//注册成功，开账户。
		try {
			if(flag){
				accountservice.add(user.getId());
				String token = generateUserToken(user.getUsername());
				Map<String,Integer> map = new HashMap<>();
				map.put("id", user.getId());
				this.getResponse().getWriter().write(Response.build().setStatus("1").setToken(token).setData(map).toJSON());
				return;
			}
			else{
				this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.BREAK_DOWN).toJSON());
				return;
				
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 1.获取数据
	 * 2.验证数据
	 * 3.service处理
	 * 4.返回json到页面
	 */
	@Action("login")
	public void login(){
		String signCode = this.getRequest().getParameter("signCode");
		String signUuid = this.getRequest().getParameter("signUuid");

		String _signCode = baseCache.get(signUuid);
		try {
		if(!_signCode.equalsIgnoreCase(signCode)){
			this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.INPUT_ERROR_OF_VALIDATE_CARD).toJSON());
				return;
			}

		//用户名或手机号登陆都可
		String str = user.getUsername();
		if(CommomUtil.isMobile(str)){
			UserModel user =iUserService.findByPhone(str);
			str = user.getUsername();
		}

		String pwd = MD5Util.md5(str+user.getPassword().toLowerCase());
		UserModel u = iUserService.login(str,pwd);
		if(u!=null){
			//成功，将用户信息保存到redis中
			String token = generateUserToken(u.getUsername());
			/*Map<String,Object> hmap = baseCache.getHmap(token);
			int userId = (int)hmap.get("id");*/
			Map<String,Object> data = new HashMap<String,Object>();
			data.put("userName",u.getUsername());
			data.put("id",u.getId());

			this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.SUCCESS).setData(data).setToken(token).toJSON());

		}
		else{
			this.getResponse().getWriter()
					.write(Response.build().setStatus(FrontStatusConstants.ERROR_OF_USERNAME_PASSWORD).toJSON());
		}

		}catch (IOException e) {
			e.printStackTrace();
		}
	}
//获取用户安全级别
	@Action("userSecure")
	public void userSecure(){
		String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());
		//String token = this.getRequest().getHeader("token");
		try{
			Map<String,Object> hmap = baseCache.getHmap(token);
			int userId = (int)hmap.get("id");
			UserModel u = iUserService.findById(userId);
			List<JSONObject> list = new ArrayList<JSONObject>();
			JSONObject object = new JSONObject();
			object.put("phoneStatus",u.getPhoneStatus());
			object.put("realNameStatus",u.getRealNameStatus());
			object.put("payPwdStatus",u.getPayPwdStatus());
			object.put("emailStatus",u.getEmailStatus());
			list.add(object);

			this.getResponse().getWriter().write(Response.build().setStatus("1").setData(list).toJSON());
		}catch (Exception e){
			e.printStackTrace();
		}
	}
    //获取用户安全详细信息
	@Action("userSecureDetailed")
    public void userSecureDetailed(){

		this.getResponse().setCharacterEncoding("utf-8");
        String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());
        //String token = this.getRequest().getHeader("token");
        try{
            Map<String,Object> hmap = baseCache.getHmap(token);
            int userId = (int)hmap.get("id");
            UserModel u = iUserService.findById(userId);
            List<JSONObject> list = new ArrayList<JSONObject>();
            JSONObject object = new JSONObject();
            object.put("phoneStatus",u.getPhoneStatus());
            object.put("realNameStatus",u.getRealNameStatus());
            object.put("payPwdStatus",u.getPayPwdStatus());
            object.put("emailStatus",u.getEmailStatus());
            object.put("passwordstatus",u.getPassword());
            object.put("username",u.getUsername());
            object.put("phone",u.getPhone());
            list.add(object);

            this.getResponse().getWriter().write(Response.build().setStatus("1").setData(list).toJSON());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
	//账户中心
	@Action("accountHomepage")
	public void accountHomepage(){
		//1.得到token
		String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());
		//2.根据token从redis中获取用户信息，
		Map<String,Object> hamp =  baseCache.getHmap(token);
		 int userId = (int)hamp.get("id");
		 //3.根据id查询账户信息
		UserAccountModel account = accountservice.findByUserId(userId);
		//4.将数据封装，响应到浏览器
		List<JSONObject> list = new ArrayList<JSONObject>();
		JSONObject object = new JSONObject();
		object.put("u_total",account.getTotal());
		object.put("u_balance",account.getBalance());
		object.put("u_interest_a",account.getInterestA());
		list.add(object);

		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").setData(list).toJSON());
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	/**
	 * 1.获取token
	 * 2.从redis中删除
	 * 3.响应数据
	 */
	@Action("logout")
	public void logout(){
		String token = this.getRequest().getHeader("token");
		Map<String,Object> redisToken = baseCache.getHmap(token);

		try {
		if(redisToken ==null ||redisToken.size()==0){
			this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.NULL_TOKEN).toJSON());
			return;
		}
		baseCache.del(token);

		this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
