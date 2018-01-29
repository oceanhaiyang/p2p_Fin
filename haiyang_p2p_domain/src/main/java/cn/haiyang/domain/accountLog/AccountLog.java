package cn.haiyang.domain.accountLog;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 
* @ClassName: AccountLog
* @Description: 交易流水记录表
*
 */
@Entity
@Table(name="t_account_log")
public class AccountLog {
	
	@Id
	@GeneratedValue()
	@Column(name="a_id", nullable=false)
	private int aId;			
	
	@Column(name="a_user_id")
	private int aUserId;					//用户id
	
	@Column(name="a_main_account_id")
	private int aMainAccountId;				//主账户id
	
	@Column(name="p_id")
	private int pId;				//投资记录主键
	
	@Column(name="a_current_period")
	private int aCurrentPeriod;				//当前期
	
	@Column(name="a_receive_or_pay")
	private int aReceiveOrPay;				//收付
	
	@Column(name="a_transfer_serial_no")
	private String aTransferSerialNo;		//交易流水号
	
	@Column(name="a_date")
	private Date aDate;						//交易时间
	
	@Column(name="a_type")
	private int aType;						//交易类型 
	
	@Column(name="a_transfer_status")
	private int aTransferStatus;			//交易状态
	
	@Column(name="a_before_Trading_money")
	private Double aBeforeTradingMoney;		//交易前金额
	
	@Column(name="a_amount")
	private Double aAmount;					//金额
	
	@Column(name="a_after_Trading_money")
	private Double aAfterTradingMoney;		//交易后金额
	
	@Column(name="a_descreption")
	private String aDescreption;				//交易详情

	public int getaId() {
		return aId;
	}

	public void setaId(int aId) {
		this.aId = aId;
	}

	public int getaUserId() {
		return aUserId;
	}

	public void setaUserId(int aUserId) {
		this.aUserId = aUserId;
	}

	public int getaMainAccountId() {
		return aMainAccountId;
	}

	public void setaMainAccountId(int aMainAccountId) {
		this.aMainAccountId = aMainAccountId;
	}

	public int getpId() {
		return pId;
	}

	public void setpId(int pId) {
		this.pId = pId;
	}

	public int getaCurrentPeriod() {
		return aCurrentPeriod;
	}

	public void setaCurrentPeriod(int aCurrentPeriod) {
		this.aCurrentPeriod = aCurrentPeriod;
	}

	public int getaReceiveOrPay() {
		return aReceiveOrPay;
	}

	public void setaReceiveOrPay(int aReceiveOrPay) {
		this.aReceiveOrPay = aReceiveOrPay;
	}

	public String getaTransferSerialNo() {
		return aTransferSerialNo;
	}

	public void setaTransferSerialNo(String aTransferSerialNo) {
		this.aTransferSerialNo = aTransferSerialNo;
	}

	public Date getaDate() {
		return aDate;
	}

	public void setaDate(Date aDate) {
		this.aDate = aDate;
	}

	public int getaType() {
		return aType;
	}

	public void setaType(int aType) {
		this.aType = aType;
	}

	public int getaTransferStatus() {
		return aTransferStatus;
	}

	public void setaTransferStatus(int aTransferStatus) {
		this.aTransferStatus = aTransferStatus;
	}

	public Double getaBeforeTradingMoney() {
		return aBeforeTradingMoney;
	}

	public void setaBeforeTradingMoney(Double aBeforeTradingMoney) {
		this.aBeforeTradingMoney = aBeforeTradingMoney;
	}

	public Double getaAmount() {
		return aAmount;
	}

	public void setaAmount(Double aAmount) {
		this.aAmount = aAmount;
	}

	public Double getaAfterTradingMoney() {
		return aAfterTradingMoney;
	}

	public void setaAfterTradingMoney(Double aAfterTradingMoney) {
		this.aAfterTradingMoney = aAfterTradingMoney;
	}

	public String getaDescreption() {
		return aDescreption;
	}

	public void setaDescreption(String aDescreption) {
		this.aDescreption = aDescreption;
	}
	
}
