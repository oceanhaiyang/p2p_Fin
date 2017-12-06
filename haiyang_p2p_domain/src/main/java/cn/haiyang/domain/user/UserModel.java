package cn.haiyang.domain.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 
* @ClassName: UserModel
* @Description: 用户实体类
 */
@Entity
@Table(name="T_USER")
public class UserModel {
	
	@Id
	@GeneratedValue()
	@Column(name="T_ID", nullable=false)
	private int id ;              //id
	
	@Column(name="T_USERNAME")
	private String username;      //用户登录名
	
	@Column(name="T_PASSWORD")
	private String password;      //登录密码
	
	@Column(name="T_IP")
	private String ip;            //登录Ip
	
	@Column(name="T_EMAIL")
	private String email;         //邮箱
	
	@Column(name="T_PHONE")
	private String phone;         //电话
	
	@Column(name="T_REGESTER_TIME")
	private Date registerTime;    //注册时间
	
	@Column(name="T_LOGIN_TIME")
	private Date loginTime ;      //登录时间
	
	@Column(name="T_RANDOM_CODE")
	private String randomCode;   //随机激活码
	
	@Column(name="T_INVITEID")
	private String inviteid;      //激活码     
	
	@Column(name="T_ONLOCK")
	private int onlock;           //锁
	
	@Column(name="T_REMARK")
	private String remark;        //备注
	
	@Column(name="T_USERTYPE")
	private int userType;      //类型     0投资人   1 借款人
	
	@Column(name="T_PHONE_STATUS")
	private int phoneStatus;  //手机验证
	
	@Column(name="T_EMAIL_STATUS")
	private int emailStatus;  //邮箱验证
	
	@Column(name="T_REALNAME")
	private String realName;  //真实姓名
	
	@Column(name="T_IDENTITY")
	private String identity;   //用户id
	
	@Column(name="T_REALNAME_STATUS")
	private int realNameStatus; //真实验证
	
	@Column(name="T_PAY_PASSWORD")
	private String payPassword;  //支付密码
	
	@Column(name="T_PAY_PWD_STATUS")
	private int payPwdStatus; //支付密码验证
	
	@Column(name="T_USER_SECURE")
	private int userSecure;      //安全等级
	
	@Column(name="T_SUM_FRIEND")
	private String sumFriends;  //好友数量统计
	
	/**
	 * @return id
	 *
	 */
	
	public int getId() {
		return id;
	}

	/**
	 * @param id 要设置的 id
	 *
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return username
	 *
	 */
	
	public String getUsername() {
		return username;
	}

	/**
	 * @param username 要设置的 username
	 *
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return password
	 *
	 */
	
	public String getPassword() {
		return password;
	}

	/**
	 * @param password 要设置的 password
	 *
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return ip
	 *
	 */
	
	public String getIp() {
		return ip;
	}

	/**
	 * @param ip 要设置的 ip
	 *
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * @return email
	 *
	 */
	
	public String getEmail() {
		return email == null?"" : email;
	}

	/**
	 * @param email 要设置的 email
	 *
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return phone
	 *
	 */
	
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone 要设置的 phone
	 *
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return registerTime
	 *
	 */
	
	public Date getRegisterTime() {
		return registerTime == null ? new Date() : registerTime;
	}

	/**
	 * @param registerTime 要设置的 registerTime
	 *
	 */
	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
	}

	/**
	 * @return loginTime
	 *
	 */
	
	public Date getLoginTime() {
		return loginTime;
	}

	/**
	 * @param loginTime 要设置的 loginTime
	 *
	 */
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	/**
	 * @return randomCode
	 *
	 */
	
	public String getRandomCode() {
		return randomCode;
	}

	/**
	 * @param randomCode 要设置的 randomCode
	 *
	 */
	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}

	/**
	 * @return inviteid
	 *
	 */
	
	public String getInviteid() {
		return inviteid;
	}

	/**
	 * @param inviteid 要设置的 inviteid
	 *
	 */
	public void setInviteid(String inviteid) {
		this.inviteid = inviteid;
	}

	/**
	 * @return onlock
	 *
	 */
	
	public int getOnlock() {
		return onlock;
	}

	/**
	 * @param onlock 要设置的 onlock
	 *
	 */
	public void setOnlock(int onlock) {
		this.onlock = onlock;
	}

	/**
	 * @return remark
	 *
	 */
	
	public String getRemark() {
		return remark;
	}

	/**
	 * @param remark 要设置的 remark
	 *
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}

	/**
	 * @return userType
	 *
	 */
	
	public int getUserType() {
		return userType;
	}

	/**
	 * @param userType 要设置的 userType
	 *
	 */
	public void setUserType(int userType) {
		this.userType = userType;
	}

	/**
	 * @return phoneStatus
	 *
	 */
	
	public int getPhoneStatus() {
		return phoneStatus;
	}

	/**
	 * @param phoneStatus 要设置的 phoneStatus
	 *
	 */
	public void setPhoneStatus(int phoneStatus) {
		this.phoneStatus = phoneStatus;
	}

	/**
	 * @return emailStatus
	 *
	 */
	
	public int getEmailStatus() {
		return emailStatus;
	}

	/**
	 * @param emailStatus 要设置的 emailStatus
	 *
	 */
	public void setEmailStatus(int emailStatus) {
		this.emailStatus = emailStatus;
	}

	/**
	 * @return realName
	 *
	 */
	
	public String getRealName() {
		return realName;
	}

	/**
	 * @param realName 要设置的 realName
	 *
	 */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**
	 * @return identity
	 *
	 */
	
	public String getIdentity() {
		return identity;
	}

	/**
	 * @param identity 要设置的 identity
	 *
	 */
	public void setIdentity(String identity) {
		this.identity = identity;
	}

	/**
	 * @return realNameStatus
	 *
	 */
	
	public int getRealNameStatus() {
		return realNameStatus;
	}

	/**
	 * @param realNameStatus 要设置的 realNameStatus
	 *
	 */
	public void setRealNameStatus(int realNameStatus) {
		this.realNameStatus = realNameStatus;
	}

	/**
	 * @return payPassword
	 *
	 */
	
	public String getPayPassword() {
		return payPassword;
	}

	/**
	 * @param payPassword 要设置的 payPassword
	 *
	 */
	public void setPayPassword(String payPassword) {
		this.payPassword = payPassword;
	}

	/**
	 * @return payPwdStatus
	 *
	 */
	
	public int getPayPwdStatus() {
		return payPwdStatus;
	}

	/**
	 * @param payPwdStatus 要设置的 payPwdStatus
	 *
	 */
	public void setPayPwdStatus(int payPwdStatus) {
		this.payPwdStatus = payPwdStatus;
	}

	/**
	 * @return userSecure
	 *
	 */
	
	public int getUserSecure() {
		return userSecure;
	}

	/**
	 * @param userSecure 要设置的 userSecure
	 *
	 */
	public void setUserSecure(int userSecure) {
		this.userSecure = userSecure;
	}

	/**
	 * @return sumFriends
	 *
	 */
	
	public String getSumFriends() {
		return sumFriends;
	}

	/**
	 * @param sumFriends 要设置的 sumFriends
	 *
	 */
	public void setSumFriends(String sumFriends) {
		this.sumFriends = sumFriends;
	}

}
