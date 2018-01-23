package cn.haiyang.domain.bankCardInfo;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
* @ClassName: Bank
* @Description: 银行名称字典
*
 */
@Entity
@Table(name="T_BANK")
public class Bank {
	
	 @Id
	 @GeneratedValue()
	 @Column(name="t_id")
	 private Integer bankId;//主键
	 
	 @Column(name="t_number")
	 private String bankNum;//银行编号
	 
	 @Column(name="t_name")
	 private String bankName;//银行名称
	 
	 @Column(name="t_desc")
	 private String bankDesc;//说明
	 
	 @JsonIgnore
	 @Column(name="t_status")
	 private int bankDelStatus;//是否停用该行（0停；1启用）
	 
	 @Column(name="t_city_code")
	 private String cityCode;//城市编号
	 
	 @Column(name="t_level")
	 private int bankLevel;//城市级别
	 
	public Integer getBankId() {
		return bankId;
	}
	
	public void setBankId(Integer bankId) {
		this.bankId = bankId;
	}
	
	public String getBankNum() {
		return bankNum;
	}
	
	public void setBankNum(String bankNum) {
		this.bankNum = bankNum;
	}
	
	public String getBankName() {
		return bankName;
	}
	
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	
	public String getBankDesc() {
		return bankDesc;
	}
	
	public void setBankDesc(String bankDesc) {
		this.bankDesc = bankDesc;
	}
	
	public int getBankDelStatus() {
		return bankDelStatus;
	}
	
	public void setBankDelStatus(int bankDelStatus) {
		this.bankDelStatus = bankDelStatus;
	}
	
	public String getCityCode() {
		return cityCode;
	}
	
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	
	public int getBankLevel() {
		return bankLevel;
	}
	
	public void setBankLevel(int bankLevel) {
		this.bankLevel = bankLevel;
	}
	 
}
