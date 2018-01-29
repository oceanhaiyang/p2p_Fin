package cn.haiyang.domain.product;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * 类描述：用户投资实体类
 */

@Entity(name="ProductAccount")
@Table(name="t_product_account")
public class ProductAccount {
	
	@Id
	@GeneratedValue()
	@Column(name="p_id", nullable=false)
	private int pId; //主键
	
	@Column(name="p_product_id")
	private Long pProductId;  //产品id
	
	@Column(name="p_u_id")
	private Long pUid;  //用户id
	
	@Column(name="p_serial_no")
	private String pSerialNo; //投资编号
	
	@Column(name="p_begin_date")
	private Date pBeginDate; //加入日期
	
	@Column(name="p_end_date")
	private Date pEndDate; //到期日期
	
	@Column(name="p_redeem_date") 
	private Date pRedeemDate;  //赎回日期
	
	@Column(name="p_match_date")
	private Date pMatchDate;  //匹配日期
	
	@Column(name="p_amount")
	private Double pAmount; //金额
	
	@Column(name="p_date")
	private Date pDate; //系统时间
	
	@Column(name="p_pro_type")
	private int pProductType; //产品类型
	
	@Column(name="p_earnings_type")
	private int pEarningsType;  //收益率类型
	
	@Column(name="p_earnings")
	private Double pEarnings; //收益率
	
	@Column(name="p_adv_redemption")
	private Double pAdvanceRedemption; //提前赎回利率
	
	@Column(name="p_deadline")
	private int pDeadline; //选择期限
	
	@Column(name="a_current_period")
	private int aCurrentPeriod; //当前期（账户资金日志表）
	
	@Column(name="p_pro_earnings")
	private Double pProspectiveEarnings;  //预期收益
	
	@Column(name="p_exp_annual_income")
	private Double pExpectedAnnualIncome; //预期年化收益
	
	@Column(name="p_month_interest")
	private Double pMonthInterest; //每月盈取利息

	@Column(name="p_monthly_ext_interest")
	private Double pMonthlyExtractInterest; //每月提取利息
	
	@Column(name="p_interest_start_date")
	private Date pInterestStartDate; //开始计息时间
	
	@Column(name="p_interest_end_date")
	private Date pInterestEndDate; //结束计息时间
	
	@Column(name="p_ear_is_finished")
	private int pEarningsIsFinished;  //收益是否完成
	
	@Column(name="p_ava_bal")
	private Double pAvailableBalance;  //可用余额
	
	@Column(name="p_frozen_money")
	private Double pFrozenMoney;  //冻结金额
	
	@Column(name="p_sys_pay_date")
	private int pSystemPaymentDate; //每月回款日
	
	@Column(name="p_current_month")
	private int pCurrentMonth;   //当前期（用户购买产品记录表）
	
	@Column(name="p_deduct_interest")
	private Double pDeductInterest; //扣去利息
	
	@Column(name="p_not_inv_mon")
	private Double pNotInvestMoney;  //未投资金额
	
	@Column(name="p_status")
	private int pStatus; //状态
	
	@Column(name="p_end_inv_tot_mon")
	private Double pEndInvestTotalMoney; //到期应回总本息
	
	@Column(name="p_cur_real_tot_mon")
	private Double pCurrentRealTotalMoney; //当前期实回总本息
	
	@Column(name="p_deadline_count")
	private int pDeadlineCount;  //统计
	
	@Column(name="p_product_name")
	private String pProductName;  //产品名称
	
	@Column(name="p_monthly_deposit")
	private Double pMonthlyDeposit; //月存
	
	@Column(name="p_monthly_deposit_count")
	private int pMonthlyDepositCount; //月存笔数
	
	@Column(name="p_take_month")
	private Double pTakeMonth; //月乘
	
	@Column(name="p_take_month_count")
	private int pTakeMonthCount;  //月乘笔数
	
	@Column(name="p_may_take")
	private Double pMayTake;  //月取
	
	@Column(name="p_may_take_count")
	private int pMayTakeCount;  //月取笔数
	
	@Column(name="p_total_as_day")
	private int pTotalAsDay;  //总天数
	
	@Column(name="p_deadline_as_day")
	private int pDeadlineAsDay;  //投资天数
	
	@Column(name="p_days")
	private Date pDays; 
	
	@Column(name="p_deadlines")
	private int pDeadlines;  //投资期限
	
	@Column(name="u_user_name")
	private String username;  //投资用户名
	
	@Column(name="p_earned_inter")
	private Double pEarnedInterest; //已赚取利息
	
	@Column(name="p_remark")
	private String pRemark; //备注
	
	@Column(name="sum_AvaBal_FrozenMoney")
	private Double sumAvailableBalanceAndFrozenMoney;  //SUM(可用余额+冻结金额)
	
	@Column(name="p_total")
	private int pTotal; //总计

	public int getpId() {
		return pId;
	}

	public void setpId(int pId) {
		this.pId = pId;
	}

	public Long getpUid() {
		return pUid;
	}

	public void setpUid(Long pUid) {
		this.pUid = pUid;
	}

	public String getpSerialNo() {
		return pSerialNo;
	}

	public void setpSerialNo(String pSerialNo) {
		this.pSerialNo = pSerialNo;
	}

	public Date getpBeginDate() {
		return pBeginDate;
	}

	public void setpBeginDate(Date pBeginDate) {
		this.pBeginDate = pBeginDate;
	}

	public Date getpRedeemDate() {
		return pRedeemDate;
	}

	public void setpRedeemDate(Date pRedeemDate) {
		this.pRedeemDate = pRedeemDate;
	}

	public Date getpMatchDate() {
		return pMatchDate;
	}

	public void setpMatchDate(Date pMatchDate) {
		this.pMatchDate = pMatchDate;
	}

	public Double getpAmount() {
		return pAmount;
	}

	public void setpAmount(Double pAmount) {
		this.pAmount = pAmount;
	}

	public Date getpDate() {
		return pDate;
	}

	public void setpDate(Date pDate) {
		this.pDate = pDate;
	}

	public int getpProductType() {
		return pProductType;
	}

	public void setpProductType(int pProductType) {
		this.pProductType = pProductType;
	}

	public int getpEarningsType() {
		return pEarningsType;
	}

	public void setpEarningsType(int pEarningsType) {
		this.pEarningsType = pEarningsType;
	}



	public Double getpEarnings() {
		return pEarnings;
	}



	public void setpEarnings(Double pEarnings) {
		this.pEarnings = pEarnings;
	}



	public Double getpAdvanceRedemption() {
		return pAdvanceRedemption;
	}


	public void setpAdvanceRedemption(Double pAdvanceRedemption) {
		this.pAdvanceRedemption = pAdvanceRedemption;
	}

	public int getpDeadline() {
		return pDeadline;
	}

	public void setpDeadline(int pDeadline) {
		this.pDeadline = pDeadline;
	}

	public int getaCurrentPeriod() {
		return aCurrentPeriod;
	}

	public void setaCurrentPeriod(int aCurrentPeriod) {
		this.aCurrentPeriod = aCurrentPeriod;
	}

	public Double getpProspectiveEarnings() {
		return pProspectiveEarnings;
	}

	public void setpProspectiveEarnings(Double pProspectiveEarnings) {
		this.pProspectiveEarnings = pProspectiveEarnings;
	}

	public Double getpExpectedAnnualIncome() {
		return pExpectedAnnualIncome;
	}


	public void setpExpectedAnnualIncome(Double pExpectedAnnualIncome) {
		this.pExpectedAnnualIncome = pExpectedAnnualIncome;
	}

	public Double getpMonthInterest() {
		return pMonthInterest;
	}


	public void setpMonthInterest(Double pMonthInterest) {
		this.pMonthInterest = pMonthInterest;
	}

	public Double getpMonthlyExtractInterest() {
		return pMonthlyExtractInterest;
	}


	public void setpMonthlyExtractInterest(Double pMonthlyExtractInterest) {
		this.pMonthlyExtractInterest = pMonthlyExtractInterest;
	}

	public Date getpInterestStartDate() {
		return pInterestStartDate;
	}



	public void setpInterestStartDate(Date pInterestStartDate) {
		this.pInterestStartDate = pInterestStartDate;
	}

	public Date getpInterestEndDate() {
		return pInterestEndDate;
	}

	public void setpInterestEndDate(Date pInterestEndDate) {
		this.pInterestEndDate = pInterestEndDate;
	}

	public int getpEarningsIsFinished() {
		return pEarningsIsFinished;
	}

	public void setpEarningsIsFinished(int pEarningsIsFinished) {
		this.pEarningsIsFinished = pEarningsIsFinished;
	}

	public Double getpAvailableBalance() {
		return pAvailableBalance;
	}

	public void setpAvailableBalance(Double pAvailableBalance) {
		this.pAvailableBalance = pAvailableBalance;
	}

	public Double getpFrozenMoney() {
		return pFrozenMoney;
	}

	public void setpFrozenMoney(Double pFrozenMoney) {
		this.pFrozenMoney = pFrozenMoney;
	}

	public int getpSystemPaymentDate() {
		return pSystemPaymentDate;
	}

	public void setpSystemPaymentDate(int pSystemPaymentDate) {
		this.pSystemPaymentDate = pSystemPaymentDate;
	}

	public int getpCurrentMonth() {
		return pCurrentMonth;
	}

	public void setpCurrentMonth(int pCurrentMonth) {
		this.pCurrentMonth = pCurrentMonth;
	}

	public Double getpDeductInterest() {
		return pDeductInterest;
	}

	

	public void setpDeductInterest(Double pDeductInterest) {
		this.pDeductInterest = pDeductInterest;
	}

	public Double getpNotInvestMoney() {
		return pNotInvestMoney;
	}

	public void setpNotInvestMoney(Double pNotInvestMoney) {
		this.pNotInvestMoney = pNotInvestMoney;
	}

	public int getpStatus() {
		return pStatus;
	}

	public void setpStatus(int pStatus) {
		this.pStatus = pStatus;
	}

	public Double getpEndInvestTotalMoney() {
		return pEndInvestTotalMoney;
	}

	public void setpEndInvestTotalMoney(Double pEndInvestTotalMoney) {
		this.pEndInvestTotalMoney = pEndInvestTotalMoney;
	}

	public Double getpCurrentRealTotalMoney() {
		return pCurrentRealTotalMoney;
	}

	public void setpCurrentRealTotalMoney(Double pCurrentRealTotalMoney) {
		this.pCurrentRealTotalMoney = pCurrentRealTotalMoney;
	}

	public int getpDeadlineCount() {
		return pDeadlineCount;
	}

	public void setpDeadlineCount(int pDeadlineCount) {
		this.pDeadlineCount = pDeadlineCount;
	}

	public String getpProductName() {
		return pProductName;
	}

	public void setpProductName(String pProductName) {
		this.pProductName = pProductName;
	}

	public Double getpMonthlyDeposit() {
		return pMonthlyDeposit;
	}

	public void setpMonthlyDeposit(Double pMonthlyDeposit) {
		this.pMonthlyDeposit = pMonthlyDeposit;
	}

	public int getpMonthlyDepositCount() {
		return pMonthlyDepositCount;
	}

	public void setpMonthlyDepositCount(int pMonthlyDepositCount) {
		this.pMonthlyDepositCount = pMonthlyDepositCount;
	}

	public Double getpTakeMonth() {
		return pTakeMonth;
	}

	public void setpTakeMonth(Double pTakeMonth) {
		this.pTakeMonth = pTakeMonth;
	}

	public int getpTakeMonthCount() {
		return pTakeMonthCount;
	}

	public void setpTakeMonthCount(int pTakeMonthCount) {
		this.pTakeMonthCount = pTakeMonthCount;
	}

	public Double getpMayTake() {
		return pMayTake;
	}

	public void setpMayTake(Double pMayTake) {
		this.pMayTake = pMayTake;
	}

	public int getpMayTakeCount() {
		return pMayTakeCount;
	}

	public void setpMayTakeCount(int pMayTakeCount) {
		this.pMayTakeCount = pMayTakeCount;
	}

	public int getpTotalAsDay() {
		return pTotalAsDay;
	}

	public void setpTotalAsDay(int pTotalAsDay) {
		this.pTotalAsDay = pTotalAsDay;
	}

	public int getpDeadlineAsDay() {
		return pDeadlineAsDay;
	}

	public void setpDeadlineAsDay(int pDeadlineAsDay) {
		this.pDeadlineAsDay = pDeadlineAsDay;
	}

	public Date getpDays() {
		return pDays;
	}

	public void setpDays(Date pDays) {
		this.pDays = pDays;
	}

	public int getpDeadlines() {
		return pDeadlines;
	}

	public void setpDeadlines(int pDeadlines) {
		this.pDeadlines = pDeadlines;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Double getpEarnedInterest() {
		return pEarnedInterest;
	}

	public void setpEarnedInterest(Double pEarnedInterest) {
		this.pEarnedInterest = pEarnedInterest;
	}

	public String getpRemark() {
		return pRemark;
	}

	public void setpRemark(String pRemark) {
		this.pRemark = pRemark;
	}

	public Double getSumAvailableBalanceAndFrozenMoney() {
		return sumAvailableBalanceAndFrozenMoney;
	}

	public void setSumAvailableBalanceAndFrozenMoney(Double sumAvailableBalanceAndFrozenMoney) {
		this.sumAvailableBalanceAndFrozenMoney = sumAvailableBalanceAndFrozenMoney;
	}

	public int getpTotal() {
		return pTotal;
	}

	public void setpTotal(int pTotal) {
		this.pTotal = pTotal;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SIMPLE_STYLE);
	}

	public Long getpProductId() {
		return pProductId;
	}

	public void setpProductId(Long pProductId) {
		this.pProductId = pProductId;
	}

	/**
	 * @return pEndDate
	 *
	 */
	
	public Date getpEndDate() {
		return pEndDate;
	}

	/**
	 * @param pEndDate 要设置的 pEndDate
	 *
	 */
	public void setpEndDate(Date pEndDate) {
		this.pEndDate = pEndDate;
	}
	
}
