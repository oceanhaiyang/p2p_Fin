package cn.haiyang.domain.product;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 
* @ClassName: FundingNotMatchedModel
* @Description: 待匹配资金实体类
*
*
 */
@Entity
@Table(name="T_FUNDING_NOT_MATCHED")
public class FundingNotMatchedModel {
	
	@Id
	@GeneratedValue()
	@Column(name="F_ID", nullable=false)
	private int fId;
	
	@Column(name="f_invest_record_id")
	private int fInvestRecordId = 0;	//投资记录
	
	@Column(name="f_not_matched_money")
	private Double fNotMatchedMoney = 0.0;	//待匹配金额(投资的金额)
	
	@Column(name="f_founding_type")
	private int fFoundingType = 0;	//资金类型
	
	@Column(name="f_founding_weight")
	private int fFoundingWeight = 0;	//资金
	
	@Column(name="f_is_locked")
	private int fIsLocked = 0;	//是否锁定
	
	@Column(name="f_create_date")
	private Date fCreateDate = new Date(0); //创建时间	
	
	@Transient
	private int userId;//用户ID
	
	public FundingNotMatchedModel() {
		
	}
	
	public FundingNotMatchedModel(FundingNotMatchedModel invest) {
		super();
		this.fId = invest.getfId();
		this.userId = invest.getUserId();
		this.fInvestRecordId = invest.getfInvestRecordId();
		this.fNotMatchedMoney = invest.getfNotMatchedMoney();
		this.fFoundingType = invest.getfFoundingType();
		this.fFoundingWeight = invest.getfFoundingWeight();
		this.fIsLocked = invest.getfIsLocked();
		this.fCreateDate = invest.getfCreateDate();
	}
	
	public int getfId() {
		return fId;
	}
	public void setfId(int fId) {
		this.fId = fId;
	}
	public int getfInvestRecordId() {
		return fInvestRecordId;
	}
	public void setfInvestRecordId(int fInvestRecordId) {
		this.fInvestRecordId = fInvestRecordId;
	}
	public Double getfNotMatchedMoney() {
		return fNotMatchedMoney;
	}
	public void setfNotMatchedMoney(Double fNotMatchedMoney) {
		this.fNotMatchedMoney = fNotMatchedMoney;
	}
	public int getfFoundingType() {
		return fFoundingType;
	}
	public void setfFoundingType(int fFoundingType) {
		this.fFoundingType = fFoundingType;
	}
	public int getfFoundingWeight() {
		return fFoundingWeight;
	}
	public void setfFoundingWeight(int fFoundingWeight) {
		this.fFoundingWeight = fFoundingWeight;
	}
	public int getfIsLocked() {
		return fIsLocked;
	}
	public void setfIsLocked(int fIsLocked) {
		this.fIsLocked = fIsLocked;
	}
	public Date getfCreateDate() {
		return fCreateDate;
	}
	public void setfCreateDate(Date fCreateDate) {
		this.fCreateDate = fCreateDate;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
