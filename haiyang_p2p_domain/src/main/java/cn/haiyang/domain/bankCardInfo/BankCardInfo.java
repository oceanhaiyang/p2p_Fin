package cn.haiyang.domain.bankCardInfo;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 类描述：银行卡信息
 */
@Entity
@Table(name="T_BANKCARD")
public class BankCardInfo {
	
	@Id
	@GeneratedValue()
	@Column(name="T_ID")
	private Integer bankInfoId;//主键
	
	@Column(name="T_NUM")
	private String bankCardNum;//银行卡号
	
	@Column(name="T_BANK")
	private String openingBank;//开户行
	
	@Column(name="T_CITY_ID")
	@JsonIgnore
	private Integer cityId;//城市id
	
	@Column(name="T_USER_ID")
	@JsonIgnore
	private Integer userId;//用户表主键 
	
	@Column(name="T_BANK_ID")
	private Integer bankId;//银行编号
	
	@Column(name="T_BANK_BRANCH")
	private String bankBranch;//银行支行
	
	@Column(name="T_PHONE_NUM")
	private String reservePhone;//绑定的手机号码
	
	//=====以下为非此实体对应的表的字段 用于查询、逻辑辅助=======
	@JsonIgnore
	@Transient
	private String username;//用户名
	@Transient
	private String bankName;//银行名称
	@Transient
	private String userRealName;//用户真实姓名
	@JsonIgnore
	@Transient
	private String province;//省
	@JsonIgnore
	@Transient
	private String provinceNum;//省编号
	@JsonIgnore
	@Transient
	private String city;//城市
	@JsonIgnore
	@Transient
	private String cityNum;//市编号
	@JsonIgnore
	@Transient
	private String countryNum;//县乡编号
	@JsonIgnore
	@Transient
	private String country;//县乡
	@Transient
	private Map<String,String> location = new HashMap<String, String>();//城市及其编号（封装数据用）
	
	/**
	* <p>Title: </p>
	* <p>Description: </p>
	*
	*/ 
	public BankCardInfo() {
		// TODO Auto-generated constructor stub
	}

	/**
	* <p>Title: </p>
	* <p>Description: </p>
	* @param bankInfoId
	* @param bankCardNum
	* @param openingBank
	* @param cityId
	* @param userId
	* @param bankId
	* @param bankBranch
	* @param reservePhone
	* @param username
	* @param bankName
	* @param userRealName
	*
	*/ 
	public BankCardInfo(Integer bankInfoId, String bankCardNum,
			String openingBank, Integer cityId, Integer userId, Integer bankId,
			String bankBranch, String reservePhone, String username,
			String bankName, String userRealName) {
		super();
		this.bankInfoId = bankInfoId;
		this.bankCardNum = bankCardNum;
		this.openingBank = openingBank;
		this.cityId = cityId;
		this.userId = userId;
		this.bankId = bankId;
		this.bankBranch = bankBranch;
		this.reservePhone = reservePhone;
		this.username = username;
		this.bankName = bankName;
		this.userRealName = userRealName;
	}

	/**
	 * @return bankInfoId
	 *
	 */
	
	public Integer getBankInfoId() {
		return bankInfoId;
	}

	/**
	 * @param bankInfoId 要设置的 bankInfoId
	 *
	 */
	public void setBankInfoId(Integer bankInfoId) {
		this.bankInfoId = bankInfoId;
	}

	/**
	 * @return bankCardNum
	 *
	 */
	
	public String getBankCardNum() {
		return bankCardNum;
	}



	/**
	 * @param bankCardNum 要设置的 bankCardNum
	 *
	 */
	public void setBankCardNum(String bankCardNum) {
		this.bankCardNum = bankCardNum;
	}



	/**
	 * @return openingBank
	 *
	 */
	
	public String getOpeningBank() {
		return openingBank;
	}



	/**
	 * @param openingBank 要设置的 openingBank
	 *
	 */
	public void setOpeningBank(String openingBank) {
		this.openingBank = openingBank;
	}



	/**
	 * @return cityId
	 *
	 */
	
	public Integer getCityId() {
		return cityId;
	}



	/**
	 * @param cityId 要设置的 cityId
	 *
	 */
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	/**
	 * @return userId
	 *
	 */
	
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId 要设置的 userId
	 *
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * @return bankId
	 *
	 */
	
	public Integer getBankId() {
		return bankId;
	}

	/**
	 * @param bankId 要设置的 bankId
	 *
	 */
	public void setBankId(Integer bankId) {
		this.bankId = bankId;
	}

	/**
	 * @return bankBranch
	 *
	 */
	
	public String getBankBranch() {
		return bankBranch;
	}

	/**
	 * @param bankBranch 要设置的 bankBranch
	 *
	 */
	public void setBankBranch(String bankBranch) {
		this.bankBranch = bankBranch;
	}

	/**
	 * @return reservePhone
	 *
	 */
	
	public String getReservePhone() {
		return reservePhone;
	}

	/**
	 * @param reservePhone 要设置的 reservePhone
	 *
	 */
	public void setReservePhone(String reservePhone) {
		this.reservePhone = reservePhone;
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
	 * @return bankName
	 *
	 */
	
	public String getBankName() {
		return bankName;
	}

	/**
	 * @param bankName 要设置的 bankName
	 *
	 */
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	/**
	 * @return userRealName
	 *
	 */
	
	public String getUserRealName() {
		return userRealName;
	}

	/**
	 * @param userRealName 要设置的 userRealName
	 *
	 */
	public void setUserRealName(String userRealName) {
		this.userRealName = userRealName;
	}

	/**
	 * @return province
	 *
	 */
	
	public String getProvince() {
		return province;
	}

	/**
	 * @param province 要设置的 province
	 *
	 */
	public void setProvince(String province) {
		this.province = province;
	}

	/**
	 * @return provinceNum
	 *
	 */
	
	public String getProvinceNum() {
		return provinceNum;
	}

	/**
	 * @param provinceNum 要设置的 provinceNum
	 *
	 */
	public void setProvinceNum(String provinceNum) {
		this.provinceNum = provinceNum;
	}

	/**
	 * @return city
	 *
	 */
	
	public String getCity() {
		return city;
	}

	/**
	 * @param city 要设置的 city
	 *
	 */
	public void setCity(String city) {
		this.city = city;
	}



	/**
	 * @return cityNum
	 *
	 */
	
	public String getCityNum() {
		return cityNum;
	}

	/**
	 * @param cityNum 要设置的 cityNum
	 *
	 */
	public void setCityNum(String cityNum) {
		this.cityNum = cityNum;
	}

	/**
	 * @return countryNum
	 *
	 */
	
	public String getCountryNum() {
		return countryNum;
	}

	/**
	 * @param countryNum 要设置的 countryNum
	 *
	 */
	public void setCountryNum(String countryNum) {
		this.countryNum = countryNum;
	}

	/**
	 * @return country
	 *
	 */
	
	public String getCountry() {
		return country;
	}

	/**
	 * @param country 要设置的 country
	 *
	 */
	public void setCountry(String country) {
		this.country = country;
	}

	/**
	 * @return location
	 *
	 */
	
	public Map<String, String> getLocation() {
		return location;
	}

	/**
	 * @param location 要设置的 location
	 *
	 */
	public void setLocation(Map<String, String> location) {
		this.location = location;
	}
	
}
