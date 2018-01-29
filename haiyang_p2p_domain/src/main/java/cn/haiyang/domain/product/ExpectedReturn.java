   

package cn.haiyang.domain.product;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

//预期收益实体类

@Entity
@Table(name="T_Expected_Return")
public class ExpectedReturn {
	@Id
	@GeneratedValue()
	@Column(name="T_ID", nullable=false)
	private Integer id;  //主键
	
	@Column(name="T_UID")
	private Integer userId;  //用户ID
	
	@Column(name="T_PID")
	private Integer productId; //产品ID
	
	@Column(name="T_RID")
	private Integer investRcord; //投资记录ID
	
	@Column(name="T_EXPECTED_DATE")
	private String expectedDate; //收益日期
	
	@Column(name="T_EXPECTED_MONEY")
	private Double expectedMoney; //收益金额
	
	@Column(name="T_CREATE_DATE")
	private Date createDate; //创建日期
	
	

	/**
	* <p>Title: </p>
	* <p>Description: </p>
	*
	*/ 
	public ExpectedReturn() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ExpectedReturn(String expectedDate, Double expectedMoney) {
		super();
		this.expectedDate = expectedDate;
		this.expectedMoney = expectedMoney;
	}
	
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
	 * @return productId
	 *
	 */
	
	public Integer getProductId() {
		return productId;
	}

	/**
	 * @param productId 要设置的 productId
	 *
	 */
	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	/**
	 * @return investRcord
	 *
	 */
	
	public Integer getInvestRcord() {
		return investRcord;
	}

	/**
	 * @param investRcord 要设置的 investRcord
	 *
	 */
	public void setInvestRcord(Integer investRcord) {
		this.investRcord = investRcord;
	}

	/**
	 * @return expectedDate
	 *
	 */
	
	public String getExpectedDate() {
		return expectedDate;
	}

	/**
	 * @param expectedDate 要设置的 expectedDate
	 *
	 */
	public void setExpectedDate(String expectedDate) {
		this.expectedDate = expectedDate;
	}

	/**
	 * @return expectedMoney
	 *
	 */
	
	public Double getExpectedMoney() {
		return expectedMoney;
	}

	/**
	 * @param expectedMoney 要设置的 expectedMoney
	 *
	 */
	public void setExpectedMoney(Double expectedMoney) {
		this.expectedMoney = expectedMoney;
	}

	/**
	 * @return createDate
	 *
	 */
	
	public Date getCreateDate() {
		return createDate;
	}

	/**
	 * @param createDate 要设置的 createDate
	 *
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
}
