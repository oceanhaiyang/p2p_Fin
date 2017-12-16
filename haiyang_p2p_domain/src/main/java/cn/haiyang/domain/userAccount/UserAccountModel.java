package cn.haiyang.domain.userAccount;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
* @ClassName: UserAccountModel
* @Description: 用户账户实体类
 */
@Entity
@Table(name="T_ACCOUNT")
public class UserAccountModel { 

	@Id
	@GeneratedValue()
	@Column(name="T_ID")
	private Integer id;
	
	@Column(name="T_USERID")
	private Integer userId; //user的id
	
	@Column(name="T_TOTAL")
	private double total;   //账户总额
	
	@Column(name="T_BALANCE")
	private double balance; //账户可用余额
	
	@Column(name="T_FROZEN")
	private double frozen;  //账户总计冻结总额
	
	@Column(name="T_INVERSTMENTW")
	private double inverstmentW; //总计待收本金
	
	@Column(name="T_INTEREST_TOTAL")
	private double interestTotal; //总计待收利息
	
	@Column(name="T_ADD_CAPTIAL_TATAL")
	private double addCapitalTotal; //月投总额
	
	@Column(name="T_RECYCLING_INTEREST")
	private double recyclingInterest; //月取总额
	
	@Column(name="T_CAPITAL_TOTAL")
	private double capitalTotal; //月乘总额
	
	@Column(name="T_INVERSTMENTA")
	private double inverstmentA; //已投资总额
	
	@Column(name="T_INTERESTA")
	private double interestA; //已赚取利息
	
	@Column(name="T_UAPPLY_EXTRACT_MONEY")
	private  Double uApplyExtractMoney;//申请提现金额

	/**
	 * @return id
	 *
	 */
	
	public Integer getId() {
		return id;
	}

	/**
	 * @param id 要设置的 id
	 *
	 */
	public void setId(Integer id) {
		this.id = id;
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
	 * @return total
	 *
	 */
	
	public double getTotal() {
		return total;
	}

	/**
	 * @param total 要设置的 total
	 *
	 */
	public void setTotal(double total) {
		this.total = total;
	}

	/**
	 * @return balance
	 *
	 */
	
	public double getBalance() {
		return balance;
	}

	/**
	 * @param balance 要设置的 balance
	 *
	 */
	public void setBalance(double balance) {
		this.balance = balance;
	}

	/**
	 * @return frozen
	 *
	 */
	
	public double getFrozen() {
		return frozen;
	}

	/**
	 * @param frozen 要设置的 frozen
	 *
	 */
	public void setFrozen(double frozen) {
		this.frozen = frozen;
	}

	/**
	 * @return inverstmentW
	 *
	 */
	
	public double getInverstmentW() {
		return inverstmentW;
	}

	/**
	 * @param inverstmentW 要设置的 inverstmentW
	 *
	 */
	public void setInverstmentW(double inverstmentW) {
		this.inverstmentW = inverstmentW;
	}

	/**
	 * @return interestTotal
	 *
	 */
	
	public double getInterestTotal() {
		return interestTotal;
	}

	/**
	 * @param interestTotal 要设置的 interestTotal
	 *
	 */
	public void setInterestTotal(double interestTotal) {
		this.interestTotal = interestTotal;
	}

	/**
	 * @return addCapitalTotal
	 *
	 */
	
	public double getAddCapitalTotal() {
		return addCapitalTotal;
	}

	/**
	 * @param addCapitalTotal 要设置的 addCapitalTotal
	 *
	 */
	public void setAddCapitalTotal(double addCapitalTotal) {
		this.addCapitalTotal = addCapitalTotal;
	}

	/**
	 * @return recyclingInterest
	 *
	 */
	
	public double getRecyclingInterest() {
		return recyclingInterest;
	}

	/**
	 * @param recyclingInterest 要设置的 recyclingInterest
	 *
	 */
	public void setRecyclingInterest(double recyclingInterest) {
		this.recyclingInterest = recyclingInterest;
	}

	/**
	 * @return capitalTotal
	 *
	 */
	
	public double getCapitalTotal() {
		return capitalTotal;
	}

	/**
	 * @param capitalTotal 要设置的 capitalTotal
	 *
	 */
	public void setCapitalTotal(double capitalTotal) {
		this.capitalTotal = capitalTotal;
	}

	/**
	 * @return inverstmentA
	 *
	 */
	
	public double getInverstmentA() {
		return inverstmentA;
	}

	/**
	 * @param inverstmentA 要设置的 inverstmentA
	 *
	 */
	public void setInverstmentA(double inverstmentA) {
		this.inverstmentA = inverstmentA;
	}

	/**
	 * @return interestA
	 *
	 */
	
	public double getInterestA() {
		return interestA;
	}

	/**
	 * @param interestA 要设置的 interestA
	 *
	 */
	public void setInterestA(double interestA) {
		this.interestA = interestA;
	}

	/**
	 * @return uApplyExtractMoney
	 *
	 */
	
	public Double getuApplyExtractMoney() {
		return uApplyExtractMoney;
	}

	/**
	 * @param uApplyExtractMoney 要设置的 uApplyExtractMoney
	 *
	 */
	public void setuApplyExtractMoney(Double uApplyExtractMoney) {
		this.uApplyExtractMoney = uApplyExtractMoney;
	}
	
}
