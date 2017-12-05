package cn.haiyang.domain.product;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
* @ClassName: Product
* @Description: 产品实体类
 */
@Entity
@Table(name="T_PRODUCT")
public class Product {
	
	@Id
	@GeneratedValue()
	@Column(name="T_PID", nullable=false)
	private long proId;//产品id
	
	@Column(name="T_PRONUM")
	private String proNum;//产品编号
	
	@Column(name="T_PROTYPE_ID")
	private int proTypeId;//产品类型id（外键）
	
	@Column(name="T_UPPER_LIMIT")
	private int upperTimeLimit;//产品最大期限
	
	@Column(name="T_LOWER_LIMIT")
	private int lowerTimeLimit;//产品最低期限
	
	@Column(name="T_EARTING_TYPE")
	private int earningType;//收益利率类型（134：年利率 ，135：月利率）
	
	@Column(name="T_RETURN_MONEY")
	private int wayToReturnMoney;//回款方式（109：表示一次性回款 ，110：每月提取，到期退出）
	
	@Column(name="T_EARLY_REDEPTION_TYPE")
	private int earlyRedeptionType;//提前赎回类型
	
	@Column(name="T_CLOSE_PERIOD")
	private int closedPeriod;//转让封闭期
	
	@Column(name="T_STATUS")
	private int status ;//状态(0:表示正常；1：表示停用)
	
	@Column(name="T_UPPER_INVEST")
	private double proUpperInvest;//产品投资上限
	
	@Column(name="T_LOWER_INVEST")
	private double proLowerInvest;//产品起投金额

	@Column(name="T_INVEST_RULE")
	private double investRule;//数量规则（投资金额按规则数的整倍数进行投资）
	
	@Column(name="T_PRODUCT_NAME")
	private String productName;//产品名称
	
	@Column(name="T_ALLOW_TRANSFER")
	private int isAllowTransfer; //是否可转让
	
	@Column(name="T_IS_REPEAT_INVEST")
	private int isRepeatInvest;//是否复投
	
	@Transient
	private String IsRepeatInvestDesc; //复投描述
	
	@Transient
	private String earningTypeDesc;//收益利率类型
	
	@Transient
	private String statusDesc ;//状态(0:表示正常；1：表示停用)
	
	@Transient
	private String wayToReturnMoneyDesc;//回款方式
	
	@Transient
	@JsonIgnore
	private String annualInterestRate;//年化利率（json数据储存，1`36种利率分配形式）(接收参数)
	
	@Transient
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date modifyTime;//修改时间
	
	@Transient
	private String isAllowTransferDesc;
	
	@Transient
	private String modifierId;//修改人
	
	@Transient
	private String username;//修改人
	
	@Transient
	private String typeName;//产品类型名称
	
	@Transient
	private String proType;//产品类型
	
	@Transient
	private List<ProductEarningRate> proEarningRate;//产品利率---
	
	
	/**
	 * @return proNum
	 *
	 */
	
	public String getProNum() {
		return proNum;
	}

	/**
	 * @return proId
	 *
	 */
	public long getProId() {
		return proId;
	}

	/**
	 * @param proId 要设置的 proId
	 *
	 */
	public void setProId(long proId) {
		this.proId = proId;
	}

	/**
	 * @param proNum 要设置的 proNum
	 *
	 */
	public void setProNum(String proNum) {
		this.proNum = proNum;
	}

	/**
	 * @return proTypeId
	 *
	 */
	public int getProTypeId() {
		return proTypeId;
	}

	/**
	 * @param proTypeId 要设置的 proTypeId
	 *
	 */
	public void setProTypeId(int proTypeId) {
		this.proTypeId = proTypeId;
	}

	/**
	 * @return upperTimeLimit
	 *
	 */
	public int getUpperTimeLimit() {
		return upperTimeLimit;
	}

	/**
	 * @param upperTimeLimit 要设置的 upperTimeLimit
	 *
	 */
	public void setUpperTimeLimit(int upperTimeLimit) {
		this.upperTimeLimit = upperTimeLimit;
	}

	/**
	 * @return lowerTimeLimit
	 *
	 */
	public int getLowerTimeLimit() {
		return lowerTimeLimit;
	}

	/**
	 * @param lowerTimeLimit 要设置的 lowerTimeLimit
	 *
	 */
	public void setLowerTimeLimit(int lowerTimeLimit) {
		this.lowerTimeLimit = lowerTimeLimit;
	}

	/**
	 * @return earningType
	 *
	 */
	public int getEarningType() {
		return earningType;
	}

	/**
	 * @param earningType 要设置的 earningType
	 *
	 */
	public void setEarningType(int earningType) {
		this.earningType = earningType;
	}

	/**
	 * @return wayToReturnMoney
	 *
	 */
	public int getWayToReturnMoney() {
		return wayToReturnMoney;
	}

	/**
	 * @param wayToReturnMoney 要设置的 wayToReturnMoney
	 *
	 */
	public void setWayToReturnMoney(int wayToReturnMoney) {
		this.wayToReturnMoney = wayToReturnMoney;
	}

	/**
	 * @return earlyRedeptionType
	 *
	 */
	public int getEarlyRedeptionType() {
		return earlyRedeptionType;
	}

	/**
	 * @param earlyRedeptionType 要设置的 earlyRedeptionType
	 *
	 */
	public void setEarlyRedeptionType(int earlyRedeptionType) {
		this.earlyRedeptionType = earlyRedeptionType;
	}

	/**
	 * @return closedPeriod
	 *
	 */
	public int getClosedPeriod() {
		return closedPeriod;
	}

	/**
	 * @param closedPeriod 要设置的 closedPeriod
	 *
	 */
	public void setClosedPeriod(int closedPeriod) {
		this.closedPeriod = closedPeriod;
	}

	/**
	 * @return status
	 *
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status 要设置的 status
	 *
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * @return proUpperInvest
	 *
	 */
	public double getProUpperInvest() {
		return proUpperInvest;
	}

	/**
	 * @param proUpperInvest 要设置的 proUpperInvest
	 *
	 */
	public void setProUpperInvest(double proUpperInvest) {
		this.proUpperInvest = proUpperInvest;
	}

	/**
	 * @return proLowerInvest
	 *
	 */
	public double getProLowerInvest() {
		return proLowerInvest;
	}

	/**
	 * @param proLowerInvest 要设置的 proLowerInvest
	 *
	 */
	public void setProLowerInvest(double proLowerInvest) {
		this.proLowerInvest = proLowerInvest;
	}

	/**
	 * @return investRule
	 *
	 */
	public double getInvestRule() {
		return investRule;
	}

	/**
	 * @param investRule 要设置的 investRule
	 *
	 */
	public void setInvestRule(double investRule) {
		this.investRule = investRule;
	}

	/**
	 * @return productName
	 *
	 */
	
	public String getProductName() {
		return productName;
	}

	/**
	 * @param productName 要设置的 productName
	 *
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * @return earningTypeDesc
	 *
	 */
	
	public String getEarningTypeDesc() {
		return earningTypeDesc;
	}

	/**
	 * @param earningTypeDesc 要设置的 earningTypeDesc
	 *
	 */
	public void setEarningTypeDesc(String earningTypeDesc) {
		this.earningTypeDesc = earningTypeDesc;
	}

	/**
	 * @return statusDesc
	 *
	 */
	
	public String getStatusDesc() {
		return statusDesc;
	}

	/**
	 * @param statusDesc 要设置的 statusDesc
	 *
	 */
	public void setStatusDesc(String statusDesc) {
		this.statusDesc = statusDesc;
	}

	/**
	 * @return wayToReturnMoneyDesc
	 *
	 */
	
	public String getWayToReturnMoneyDesc() {
		return wayToReturnMoneyDesc;
	}

	/**
	 * @param wayToReturnMoneyDesc 要设置的 wayToReturnMoneyDesc
	 *
	 */
	public void setWayToReturnMoneyDesc(String wayToReturnMoneyDesc) {
		this.wayToReturnMoneyDesc = wayToReturnMoneyDesc;
	}

	/**
	 * @return annualInterestRate
	 *
	 */
	
	public String getAnnualInterestRate() {
		return annualInterestRate;
	}

	/**
	 * @param annualInterestRate 要设置的 annualInterestRate
	 *
	 */
	public void setAnnualInterestRate(String annualInterestRate) {
		this.annualInterestRate = annualInterestRate;
	}

	/**
	 * @return modifyTime
	 *
	 */
	
	public Date getModifyTime() {
		return modifyTime == null?new Date() : modifyTime ;
	}

	/**
	 * @param modifyTime 要设置的 modifyTime
	 *
	 */
	public void setModifyTime(Date modifyTime) {
		
		this.modifyTime = modifyTime;
	}

	
	/**
	 * @return modifierId
	 *
	 */
	
	public String getModifierId() {
		return modifierId;
	}

	/**
	 * @param modifierId 要设置的 modifierId
	 *
	 */
	public void setModifierId(String modifierId) {
		this.modifierId = modifierId;
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
	 * @return typeName
	 *
	 */
	
	public String getTypeName() {
		return typeName;
	}

	/**
	 * @param typeName 要设置的 typeName
	 *
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	/**
	 * @return proType
	 *
	 */
	
	public String getProType() {
		return proType;
	}

	/**
	 * @param proType 要设置的 proType
	 *
	 */
	public void setProType(String proType) {
		this.proType = proType;
	}

	/**
	 * @return proEarningRate
	 *
	 */
	
	public List<ProductEarningRate> getProEarningRate() {
		return proEarningRate;
	}

	/**
	 * @param proEarningRate 要设置的 proEarningRate
	 *
	 */
	public void setProEarningRate(List<ProductEarningRate> proEarningRate) {
		this.proEarningRate = proEarningRate;
	}

	/**
	 * @return isAllowTransfer
	 *
	 */
	
	public int getIsAllowTransfer() {
		return isAllowTransfer == 0 ? 139 : isAllowTransfer;
	}

	/**
	 * @param isAllowTransfer 要设置的 isAllowTransfer
	 *
	 */
	public void setIsAllowTransfer(int isAllowTransfer) {
		this.isAllowTransfer = isAllowTransfer;
	}

	/**
	 * @return isAllowTransferDesc
	 *
	 */
	
	public String getIsAllowTransferDesc() {
		return isAllowTransferDesc;
	}

	/**
	 * @param isAllowTransferDesc 要设置的 isAllowTransferDesc
	 *
	 */
	public void setIsAllowTransferDesc(String isAllowTransferDesc) {
		this.isAllowTransferDesc = isAllowTransferDesc;
	}

	/**
	 * @return isRepeatInvest
	 *
	 */
	
	public int getIsRepeatInvest() {
		return isRepeatInvest;
	}

	/**
	 * @param isRepeatInvest 要设置的 isRepeatInvest
	 *
	 */
	public void setIsRepeatInvest(int isRepeatInvest) {
		this.isRepeatInvest = isRepeatInvest;
	}

	/**
	 * @return isRepeatInvestDesc
	 *
	 */
	
	public String getIsRepeatInvestDesc() {
		return IsRepeatInvestDesc;
	}

	/**
	 * @param isRepeatInvestDesc 要设置的 isRepeatInvestDesc
	 *
	 */
	public void setIsRepeatInvestDesc(String isRepeatInvestDesc) {
		IsRepeatInvestDesc = isRepeatInvestDesc;
	}
	
}
