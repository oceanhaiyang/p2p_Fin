package cn.haiyang.domain.creditor;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 类描述：债权实体
 */
@Entity
@Table(name="t_debt_info")
//CreditorModel
public class CreditorModel {
	
		//====债权表字段=====
		@Id
		@GeneratedValue()
		@Column(name="d_id", nullable=false)
		private Integer id;//	债权ID(标的ID)	int
		
		@Column(name="d_debt_no")
		private String debtNo;//	债权编号	varchar(100)
		
		@Column(name="d_contract_No")
		private String contractNo;//	合同编号	varchar(100)
		
		@Column(name="d_debtors_Name")
		private String debtorsName;//	债务人名称	varchar(100)
		
		@Column(name="d_debtors_Id")
		private String debtorsId;//	债务人身份证号	varchar(18)
		
		@Column(name="d_loan_Purpose")
		private String loanPurpose;//	借款用途	varchar(500)
		
		@Column(name="d_loan_Type")
		private String loanType;//	借款类型	varchar(500)
//		@JsonFormat(pattern="yyyy-MM-dd")
		
		@Column(name="d_loan_Start_Date")
		private Date loanStartDate;//	原始借款开始日期	date
		
		@Column(name="d_loan_Period")
		private int loanPeriod = 0;//	原始借款期限	int
//		@JsonFormat(pattern="yyyy-MM-dd")
		
		@Column(name="d_loan_End_Date")
		private Date loanEndDate = new Date(0);//	原始借款到期日期	date
		
		@Column(name="d_repayment_Style")
		private int repaymentStyle = 0;//	还款方式	int
		
		@Column(name="d_repaymen_Date")
		private String repaymenDate;//	还款日	varchar(100)
		
		@Column(name="d_repaymen_Money")
		private double repaymenMoney = 0.0;//	还款金额	numeric(15,2)
		
		@Column(name="d_debt_Money")
		private double debtMoney = 0.0;//	债权金额	numeric(15,2)
		
		@Column(name="d_debt_Year_Rate")
		private double debtYearRate = 0.0;//	债权年化利率	numeric(8,4)
		
		@Column(name="d_debt_Month_Rate")
		private double debtMonthRate = 0.0;//	债权月利率	numeric(8,4)
		
		@Column(name="d_debt_Transferred_Money")
		private double debtTransferredMoney;//	债权转入金额	numeric(15,2)
//		@JsonFormat(pattern="yyyy-MM-dd")
		
		
		@Column(name="d_debt_Transferred_Date")
		private Date debtTransferredDate = new Date(0);//	债权转入日期	timestamp
		
		@Column(name="d_debt_Transferred_Period")
		private int debtTransferredPeriod = 0;//	债权转入期限	int
		
		
//		@JsonFormat(pattern="yyyy-MM-dd")
		@Column(name="d_debt_Ransfer_Out_Date")
		private Date debtRansferOutDate = new Date(0);//	债权转出日期	timestamp
		
		@Column(name="d_creditor")
		private String creditor;//	债权人	varchar(100)
		
		@Column(name="d_debt_Status")
		private int debtStatus = 0;//	债权状态	int
		
		@Column(name="d_borrower_Id")
		private int borrowerId = 0;//	借款人ID	int
		
		@Column(name="d_available_Period")
		private int availablePeriod = 0;//	可用期限	int
		
		@Column(name="d_available_Money")
		private double availableMoney = 0.0;//	可用金额	numeric(15,2)
		
		@Column(name="d_matched_Money")
		private double matchedMoney = 0.0;//	已匹配金额	numeric(15,2)
		
		@Column(name="d_matched_Status")
		private int matchedStatus = 0;//	匹配状态	int  部分匹配11401,  完全匹配11402,   未匹配11403, 正在匹配11404
		
		@Column(name="d_repayment_style_name")
		private String repaymentStyleName; //还款方式名称
		
		@Column(name="d_debt_status_name")
		private String  debtStatusName;//债权状态名字
		
		@Column(name="d_matched_status_name")
		private String matchedStatusName;//匹配状态名称
		
		@Column(name="d_debt_type")
		private String debtType; //标的类型
		
		@Column(name="d_debt_type_name")
		private String debtTypeName;//标的类型名称
		
		//==============用于前端显示=================================
		@Transient
		private String debtStatusDesc;//	债权状态
		
		@Transient
		private String matchedStatusDesc; //匹配描述
		
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getDebtNo() {
			return debtNo;
		}
		public void setDebtNo(String debtNo) {
			this.debtNo = debtNo;
		}
		public String getContractNo() {
			return contractNo;
		}
		public void setContractNo(String contractNo) {
			this.contractNo = contractNo;
		}
		public String getDebtorsName() {
			return debtorsName;
		}
		public void setDebtorsName(String debtorsName) {
			this.debtorsName = debtorsName;
		}
		public String getDebtorsId() {
			return debtorsId;
		}
		public void setDebtorsId(String debtorsId) {
			this.debtorsId = debtorsId;
		}
		public String getLoanPurpose() {
			return loanPurpose;
		}
		public void setLoanPurpose(String loanPurpose) {
			this.loanPurpose = loanPurpose;
		}
		public String getLoanType() {
			return loanType;
		}
		public void setLoanType(String loanType) {
			this.loanType = loanType;
		}
		public Date getLoanStartDate() {
			return loanStartDate;
		}
		public void setLoanStartDate(Date loanStartDate) {
			this.loanStartDate = loanStartDate;
		}
		public int getLoanPeriod() {
			return loanPeriod;
		}
		public void setLoanPeriod(int loanPeriod) {
			this.loanPeriod = loanPeriod;
		}
		public Date getLoanEndDate() {
			return loanEndDate;
		}
		public void setLoanEndDate(Date loanEndDate) {
			this.loanEndDate = loanEndDate;
		}
		public int getRepaymentStyle() {
			return repaymentStyle;
		}
		public void setRepaymentStyle(int repaymentStyle) {
			this.repaymentStyle = repaymentStyle;
		}
		public String getRepaymenDate() {
			return repaymenDate;
		}
		public void setRepaymenDate(String repaymenDate) {
			this.repaymenDate = repaymenDate;
		}
		public double getRepaymenMoney() {
			return repaymenMoney;
		}
		public void setRepaymenMoney(double repaymenMoney) {
			this.repaymenMoney = repaymenMoney;
		}
		public double getDebtMoney() {
			return debtMoney;
		}
		public void setDebtMoney(double debtMoney) {
			this.debtMoney = debtMoney;
		}
		public double getDebtYearRate() {
			return debtYearRate;
		}
		public void setDebtYearRate(double debtYearRate) {
			this.debtYearRate = debtYearRate;
		}
		public double getDebtMonthRate() {
			return debtMonthRate;
		}
		public void setDebtMonthRate(double debtMonthRate) {
			this.debtMonthRate = debtMonthRate;
		}
		public double getDebtTransferredMoney() {
			return debtTransferredMoney;
		}
		public void setDebtTransferredMoney(double debtTransferredMoney) {
			this.debtTransferredMoney = debtTransferredMoney;
		}
		public Date getDebtTransferredDate() {
			return debtTransferredDate;
		}
		public void setDebtTransferredDate(Date debtTransferredDate) {
			this.debtTransferredDate = debtTransferredDate;
		}
		public int getDebtTransferredPeriod() {
			return debtTransferredPeriod;
		}
		public void setDebtTransferredPeriod(int debtTransferredPeriod) {
			this.debtTransferredPeriod = debtTransferredPeriod;
		}
		public Date getDebtRansferOutDate() {
			return debtRansferOutDate;
		}
		public void setDebtRansferOutDate(Date debtRansferOutDate) {
			this.debtRansferOutDate = debtRansferOutDate;
		}
		public String getCreditor() {
			return creditor;
		}
		public void setCreditor(String creditor) {
			this.creditor = creditor;
		}
		public int getDebtStatus() {
			return debtStatus;
		}
		public void setDebtStatus(int debtStatus) {
			this.debtStatus = debtStatus;
		}
		public int getBorrowerId() {
			return borrowerId;
		}
		public void setBorrowerId(int borrowerId) {
			this.borrowerId = borrowerId;
		}
		public int getAvailablePeriod() {
			return availablePeriod;
		}
		public void setAvailablePeriod(int availablePeriod) {
			this.availablePeriod = availablePeriod;
		}
		public double getAvailableMoney() {
			return availableMoney;
		}
		public void setAvailableMoney(double availableMoney) {
			this.availableMoney = availableMoney;
		}
		public double getMatchedMoney() {
			return matchedMoney;
		}
		public void setMatchedMoney(double matchedMoney) {
			this.matchedMoney = matchedMoney;
		}
		public int getMatchedStatus() {
			return matchedStatus;
		}
		public void setMatchedStatus(int matchedStatus) {
			this.matchedStatus = matchedStatus;
		}
		public String getDebtStatusDesc() {
			return debtStatusDesc;
		}
		public void setDebtStatusDesc(String debtStatusDesc) {
			this.debtStatusDesc = debtStatusDesc;
		}
		public String getRepaymentStyleName() {
			return repaymentStyleName;
		}
		public void setRepaymentStyleName(String repaymentStyleName) {
			this.repaymentStyleName = repaymentStyleName;
		}
		public String getDebtStatusName() {
			return debtStatusName;
		}
		public void setDebtStatusName(String debtStatusName) {
			this.debtStatusName = debtStatusName;
		}
		public String getMatchedStatusName() {
			return matchedStatusName;
		}
		public void setMatchedStatusName(String matchedStatusName) {
			this.matchedStatusName = matchedStatusName;
		}
		public String getDebtType() {
			return debtType;
		}
		public void setDebtType(String debtType) {
			this.debtType = debtType;
		}
		public String getDebtTypeName() {
			return debtTypeName;
		}
		public void setDebtTypeName(String debtTypeName) {
			this.debtTypeName = debtTypeName;
		}
		/**
		* @return matchedStatusDesc
		*
		*/
		
		public String getMatchedStatusDesc() {
			return matchedStatusDesc;
		}
		/**
		* @param matchedStatusDesc 要设置的 matchedStatusDesc
		*
		*/
		public void setMatchedStatusDesc(String matchedStatusDesc) {
			this.matchedStatusDesc = matchedStatusDesc;
		}
		
		
}
